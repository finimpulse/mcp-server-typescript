---
name: sync-finimpulse-api-docs
description: Add new FinImpulse API endpoints as MCP tools, write integration tests, and keep manifest.json in sync. Use when implementing a new tool, adding an endpoint, writing tests for an existing tool, or checking which endpoints are missing from the MCP server.
---

# FinImpulse MCP Tool Development

## API Docs Reference

All endpoint specs are in `api-docs/` (relative to this skill). Each file is named after its endpoint path (e.g. `v1-analysis-analysts.md`). Read the relevant file before implementing — it contains request params, response fields, and example responses.

`api-docs/manifest.json` tracks implementation status:
- `implemented_tools` — already done, skip these
- `missing` — not yet implemented, prioritize these
- `skipped` — intentionally excluded

## Tool File Structure

Each tool lives in `src/tools/<group>/<endpoint>/` with exactly 4 files:

```
src/tools/analysis/analysts/
├── schema.ts    — Zod input schema
├── types.ts     — TypeScript interfaces for API response
├── handler.ts   — calls client.request(...)
└── index.ts     — registers tool on McpServer
```

### schema.ts

```typescript
import { z } from 'zod';
import { getFilterExpression } from '../../../utils/filters.js';

export const myToolInputSchema = z.object({
    symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
    limit: z.number().min(1).max(5000).default(10).optional()
        .describe('Maximum number of records to return.'),
    offset: z.number().min(0).optional().describe('Pagination offset (0-based).'),
    // add filters/sort_by if the endpoint supports them (check api-doc)
    filters: getFilterExpression().optional().describe('...'),
    sort_by: z.array(z.object({
        selector: z.string().describe('Field to sort by.'),
        desc: z.boolean().describe('true = descending, false = ascending.'),
    })).optional().describe('Sort config.'),
    tag: z.string().max(255).optional().describe('User-defined request identifier.'),
});

export type MyToolInput = z.infer<typeof myToolInputSchema>;
```

### types.ts

Define interfaces based on the **Response** section of the api-doc file:

```typescript
export interface MyToolItem {
    uuid: string;
    // ... fields from api-doc "Response Fields" section
}

export interface MyToolResponse {
    total_count: number;
    items_count: number;
    items: MyToolItem[];
}
```

### handler.ts

```typescript
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from '../../../http/client.js';
import { MyToolResponse } from './types.js';
import { MyToolInput } from './schema.js';

export async function myToolHandler(input: MyToolInput, client: ApiClient): Promise<CallToolResult> {
    return client.request<MyToolResponse>('/v1/group/endpoint', 'POST', input);
}
```

### index.ts

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { myToolInputSchema } from './schema.js';
import { myToolHandler } from './handler.js';
import { ApiClient } from '../../../http/client.js';

export function registerMyTool(server: McpServer, client: ApiClient): void {
    server.registerTool(
        'get_my_tool',
        {
            description: 'Copy the first paragraph from the api-doc file.',
            inputSchema: myToolInputSchema,
        },
        (input) => myToolHandler(input, client),
    );
}
```

## Registration

Add to `src/tools/index.ts`:

1. Import: `import { registerMyTool } from './group/endpoint/index.js';`
2. Call inside `registerAllTools`: `registerMyTool(server, client);`

## Integration Test

Tests are grouped by endpoint group. Add to the relevant `tests/tools/<group>.test.ts`, or create a new file:

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { myToolHandler } from '../../src/tools/group/endpoint/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
    expect(text).not.toMatch(/^Error:/);
    const parsed = JSON.parse(text);
    expect(parsed.status_code).toBe(20000);
    expect(parsed.data).toBeDefined();
    return parsed;
}

describe('get_my_tool', () => {
    let client: ApiClient;
    beforeAll(() => {
        if (!TOKEN) throw new Error('API_TOKEN env var is required');
        client = new ApiClient(TOKEN);
    });

    it('returns data for AAPL', async () => {
        const result = await myToolHandler({ symbol: 'AAPL', limit: 3 }, client);
        assertSuccess(result.content[0].text as string);
    });
});
```

> Use `SPY` instead of `AAPL` for `holdings/*` tools — ETF/mutual fund data only.

## Build & Test

For full test commands and a map of which test file covers which tools, see [tests/README.md](../../../../tests/README.md).

```bash
# Build TypeScript
npm run build

# Run all tests
API_TOKEN=your-token npm test

# Run single test file
API_TOKEN=your-token npx vitest run tests/tools/analysis.test.ts

# Verbose output
API_TOKEN=your-token npx vitest run --reporter=verbose
```

When adding a new tool, check `tests/README.md` to find the right test file for its group. If no file exists for the group yet, create `tests/tools/<group>.test.ts` and add a row to the table in `tests/README.md`.

## Update manifest.json

After implementing a tool, add its endpoint path to `implemented_tools` in `api-docs/manifest.json` and remove it from `missing` if it was there. Update `implemented_count` and `matched_count` accordingly.

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| MCP tool name | `get_<group>_<endpoint>` | `get_analysis_analysts` |
| Handler function | `<group><Endpoint>Handler` | `analysisAnalystsHandler` |
| Register function | `register<Group><Endpoint>Tool` | `registerAnalysisAnalystsTool` |
| Input schema | `<group><Endpoint>InputSchema` | `analysisAnalystsInputSchema` |
| Input type | `<group><Endpoint>Input` | `AnalysisAnalystsInput` |
| Response interface | `<group><Endpoint>Response` | `AnalysisAnalystsResponse` |
| Item interface | `<group><Endpoint>Item` | `AnalysisAnalystsItem` |
