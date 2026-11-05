---
name: add-finimpulse-tool
description: Implements a FinImpulse API endpoint as an MCP tool (4-file pattern in src/tools), registers it, adds a Vitest integration test, and refreshes manifest.json. Also used to update an existing tool after its API doc changed. Use when adding a new tool, implementing a missing endpoint, or writing/fixing tests for a tool. Reads specs from the sync-finimpulse-api-docs skill; run that skill first if api-docs/ is stale or empty.
---

# Add FinImpulse Tool

## Step 0: Read the spec

Specs live in `.cursor/skills/sync-finimpulse-api-docs/api-docs/<slug>.md` (`/v1/analysis/analysts/` → `v1-analysis-analysts.md`). Missing endpoints are listed in `api-docs/manifest.json` → `missing`.

From the spec take: the `endpoint:` line in the frontmatter (method + path), **Asset Type Compatibility**, **Request Parameters**, **Response** fields and the example response.

If the spec is ambiguous (unclear required params, response shape differs from the example, endpoint overlaps an existing tool), ask the user before implementing.

## Step 1: Placement and names

| API path | Folder | Tool name |
|---|---|---|
| `v1/<name>` | `src/tools/<name>/` | `get_<name>` |
| `v1/<group>/<name>` | `src/tools/<group>/<name>/` | `get_<group>_<name>` |
| `v1/<group>/<a>/<b>` | `src/tools/<group>/<a>-<b>/` | `get_<group>_<a>_<b>` |

Hyphens in the tool name become `_` (`upgrades-downgrades` → `get_analysis_upgrades_downgrades`). Import depth to `http/client.js`: `../../` for one level, `../../../` for two.

| Thing | Convention | Example |
|---|---|---|
| Input schema / type | `<camel>InputSchema` / `<Pascal>Input` | `analysisAnalystsInputSchema` / `AnalysisAnalystsInput` |
| Response / row type | `<Pascal>Response` / `<Pascal>Item` | `AnalysisAnalystsResponse` / `AnalysisAnalystsItem` |
| Handler | `<camel>Handler` | `analysisAnalystsHandler` |
| Register function | `register<Pascal>Tool` | `registerAnalysisAnalystsTool` |

Copy the closest existing tool as a starting point: `src/tools/analysis/analysts/` (POST list with filters/sort), `src/tools/market-price/` (GET with path param).

## Step 2: The four files

**`schema.ts`** — Zod input schema.
- Field names match the API JSON keys exactly (snake_case); every field has `.describe()`.
- Fixed allowed values → `z.enum([...])` (arrays → `z.array(z.enum([...]))`), never `z.string()`.
- Dates → `.regex(/^\d{4}-\d{2}-\d{2}$/)`.
- List endpoints include `limit` / `offset`; add `filters` (`getFilterExpression()` from `utils/filters.js`), `sort_by`, `tag` only if the spec lists them.

**`types.ts`** — response interfaces from the spec's Response section. `| null` when the docs mark a field nullable or it does not apply to every asset type. Group fields with comments matching the doc sections (`// Identity`, `// Performance`). No `any`; unknown shapes → `Record<string, unknown>`.

**`handler.ts`** — one call, URL exactly as in the spec:

```typescript
export async function analysisAnalystsHandler(input: AnalysisAnalystsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<AnalysisAnalystsResponse>('/v1/analysis/analysts', 'POST', input);
}
```

Path params (`{symbol}`) go into the URL with `encodeURIComponent`; for POST send the remaining fields as the body (`const {symbol, ...body} = input;`). Keep the literal `/v1/...` prefix in the call — the sync script detects coverage from it.

**`index.ts`** — `server.registerTool('<tool_name>', { description, inputSchema }, (input) => handler(input, client))`. The description says: what data is returned; asset-type coverage only if it differs by type (e.g. "for ETFs and mutual funds returns an empty result"); when to use it, including related tools to call first (e.g. "Use get_options_expirations to discover valid dates").

Register in `src/tools/index.ts`: add the import and the `register...Tool(server, client)` call next to its group.

## Step 3: Test

Tests call handlers directly with a real `ApiClient`. They run against the **Sandbox** token (dummy data, same structure, no charges); `tests/setup.ts` loads `.env`, so `npm test` works if `SANDBOX_API_TOKEN` is set there. Never read `.env`.

Add a `describe` block to the group's file (see the table in `tests/README.md`); for a new group create `tests/tools/<group>.test.ts` and add a row to that table. Follow the file's existing pattern:

```typescript
describe('get_analysis_analysts', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns data for AAPL', async () => {
		const result = await analysisAnalystsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess((result.content[0] as { text: string }).text);
	});
});
```

Args: only required fields plus `limit: 3` on lists. `AAPL` for stocks, `SPY` for ETF/fund-only endpoints (`holdings/*`). If a required arg must come from another endpoint, fetch it first in the test (see `get_options_chain` in `tests/tools/options.test.ts`).

## Step 4: Verify and refresh the manifest

```bash
npm run build
npx vitest run tests/tools/<group>.test.ts
python3 .cursor/skills/sync-finimpulse-api-docs/scripts/sync_docs.py --no-fetch
```

The endpoint must disappear from `missing` in `manifest.json`. If the test fails because no token is configured, tell the user instead of skipping the test.

## Updating an existing tool

When a spec changed (see the sync skill, Step 2): update `schema.ts` / `types.ts` / the description to match, keep the tool name stable, then run Step 4.
