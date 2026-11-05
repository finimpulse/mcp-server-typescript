#!/usr/bin/env python3
"""Sync FinImpulse API docs and rebuild the coverage manifest.

Usage (from the repo root):
    python3 .cursor/skills/sync-finimpulse-api-docs/scripts/sync_docs.py            # download docs + manifest
    python3 .cursor/skills/sync-finimpulse-api-docs/scripts/sync_docs.py --no-fetch # manifest only
"""
import argparse
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

BASE_URL = "https://developers.finimpulse.com"
SKILL_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = SKILL_DIR / "api-docs"
REPO_ROOT = SKILL_DIR.parents[2]
TOOLS_DIR = REPO_ROOT / "src" / "tools"

# Doc pages that describe an endpoint but are not worth exposing as MCP tools.
SKIP_ENDPOINT_PATHS = {
    "errors",
    "appendix/user_data",
}

# The docs site occasionally contains Cyrillic look-alike letters inside English words.
HOMOGLYPHS = str.maketrans(
    "\u0410\u0412\u0421\u0415\u041d\u0406\u041a\u041c\u041e\u0420\u0422\u0425"
    "\u0430\u0435\u0456\u043e\u0440\u0441\u0443\u0445",
    "ABCEHIKMOPTXaeiopcyx",
)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="ignore")


def discover_pages() -> list[str]:
    html = fetch(BASE_URL + "/")
    hrefs = re.findall(
        r'class="menu-item[^"]*".*?<a[^>]+href="(' + re.escape(BASE_URL) + r'/[^"]+)"',
        html,
        re.DOTALL,
    )
    return sorted({h for h in hrefs if h.rstrip("/") != BASE_URL})


def download_docs() -> None:
    pages = discover_pages()
    if not pages:
        sys.exit("No doc pages found in the site menu; the page layout may have changed.")
    print(f"Found {len(pages)} doc pages")

    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    for old in DOCS_DIR.glob("*.md"):
        old.unlink()

    failed = []
    for page_url in pages:
        slug = page_url[len(BASE_URL):].strip("/").replace("/", "-")
        try:
            content = fetch(page_url.rstrip("/") + ".md/").translate(HOMOGLYPHS)
            (DOCS_DIR / f"{slug}.md").write_text(content)
        except Exception as e:  # noqa: BLE001
            failed.append(f"{slug}: {e}")
        time.sleep(0.1)

    print(f"Saved {len(pages) - len(failed)} pages, {len(failed)} failed")
    for f in failed:
        print("  FAILED", f)


def normalize_path(path: str) -> str:
    """'v1/holdings/history/dates/{symbol}' or '/v1/market-price/${...}' -> 'holdings/history/dates'."""
    path = re.sub(r"/(\{[^}]+\}|\$\{[^}]+\})", "", path)
    path = re.sub(r"^/?v1/", "", path)
    return path.strip("/")


def read_doc_endpoints() -> tuple[list[dict], list[str]]:
    endpoints, no_endpoint = [], []
    for doc in sorted(DOCS_DIR.glob("*.md")):
        m = re.search(r"^endpoint:\s*(\S+)\s+(\S+)", doc.read_text(), re.MULTILINE)
        if not m:
            no_endpoint.append(doc.stem)
            continue
        endpoints.append({
            "slug": doc.stem,
            "endpoint": f"{m.group(1)} {m.group(2)}",
            "path": normalize_path(m.group(2)),
        })
    return endpoints, no_endpoint


def read_implemented() -> dict[str, str]:
    """Map normalized API path -> handler file, taken from client.request(...) calls."""
    implemented = {}
    for handler in sorted(TOOLS_DIR.rglob("handler.ts")):
        for url in re.findall(r"\.request<[^>]*>\(\s*[`'\"](/v1/[^`'\"]+)", handler.read_text()):
            implemented[normalize_path(url)] = str(handler.relative_to(REPO_ROOT))
    return implemented


def build_manifest() -> dict:
    endpoints, no_endpoint = read_doc_endpoints()
    implemented = read_implemented()
    doc_paths = {e["path"] for e in endpoints}

    missing, skipped, covered = [], [], []
    for e in endpoints:
        if e["path"] in SKIP_ENDPOINT_PATHS:
            skipped.append(e["endpoint"])
        elif e["path"] in implemented:
            covered.append(e["path"])
        else:
            missing.append({"slug": e["slug"], "endpoint": e["endpoint"]})

    orphaned = [
        {"path": p, "handler": h}
        for p, h in sorted(implemented.items())
        if p not in doc_paths
    ]

    return {
        "counts": {
            "doc_endpoints": len(endpoints),
            "implemented": len(covered),
            "missing": len(missing),
            "skipped": len(skipped),
            "orphaned_tools": len(orphaned),
        },
        "missing": missing,
        "orphaned_tools": orphaned,
        "skipped": skipped,
        "no_endpoint_pages": no_endpoint,
        "implemented": sorted(covered),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--no-fetch", action="store_true", help="skip downloading, only rebuild manifest.json")
    args = parser.parse_args()

    if not args.no_fetch:
        download_docs()

    manifest = build_manifest()
    (DOCS_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    print(json.dumps(manifest["counts"], indent=2))
    for m in manifest["missing"]:
        print(f"  missing:  {m['endpoint']}  ({m['slug']}.md)")
    for o in manifest["orphaned_tools"]:
        print(f"  orphaned: {o['path']}  ({o['handler']})")


if __name__ == "__main__":
    main()
