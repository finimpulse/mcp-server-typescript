---
name: sync-finimpulse-api-docs
description: Downloads the FinImpulse API docs from developers.finimpulse.com into api-docs/ and rebuilds manifest.json — a coverage report of documented endpoints vs MCP tools implemented in src/tools. Use when the user wants to refresh API docs, check which endpoints are missing or changed, audit coverage, or before implementing new tools. To implement a missing endpoint afterwards, use the add-finimpulse-tool skill.
---

# Sync FinImpulse API Docs

`api-docs/` is a committed snapshot of the docs site: one `<slug>.md` per menu page, where the slug is the URL path with `/` → `-` (`/v1/holders/general/` → `v1-holders-general.md`). Every page has a markdown version at `<page-url-without-trailing-slash>.md/`; pages are discovered from the site navigation menu, so new sections are picked up automatically.

`api-docs/manifest.json` is generated — never edit it by hand.

## Step 1: Sync

From the repo root:

```bash
python3 .cursor/skills/sync-finimpulse-api-docs/scripts/sync_docs.py
```

The script replaces all `api-docs/*.md`, then writes `manifest.json`:

| Key | Meaning |
|---|---|
| `missing` | Documented endpoint with no tool — candidates to implement |
| `orphaned_tools` | Tool whose endpoint is no longer in the docs — removed or renamed upstream |
| `skipped` | Intentionally not exposed as tools (`SKIP_ENDPOINT_PATHS` in the script) |
| `no_endpoint_pages` | Guide pages without an endpoint (intro, auth, sandbox, …) |
| `implemented` | Endpoint paths covered by a tool |

Implementation is detected from the URL passed to `client.request(...)` in each `src/tools/**/handler.ts`, so folder names do not matter.

To rebuild only the manifest from the current snapshot (e.g. right after adding a tool):

```bash
python3 .cursor/skills/sync-finimpulse-api-docs/scripts/sync_docs.py --no-fetch
```

## Step 2: Find changed specs of existing tools

```bash
git diff --stat -- .cursor/skills/sync-finimpulse-api-docs/api-docs/
```

For each changed `v1-*.md` that maps to an implemented tool, check the diff of the **Request Parameters** and **Response** sections against the tool's `schema.ts` / `types.ts`. Ignore wording-only changes (titles, descriptions, `updated:` dates).

## Step 3: Report to the user

- Counts from the script output
- `missing` endpoints (with the endpoint string)
- `orphaned_tools` — ask before deleting; the endpoint may still work on the API
- Existing tools whose request/response contract changed in the docs

Then ask the user which missing endpoints to implement and which changed tools to update (all or a selection). Do not write code before the answer. For the chosen items use the **add-finimpulse-tool** skill.
