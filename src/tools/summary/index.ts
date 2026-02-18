import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {summaryInputSchema} from './schema.js';
import {summaryHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerSummaryTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_summary', { description: 'Returns a unified snapshot of identity, profile, market data, fundamentals, ownership, analyst coverage, and fund metrics for a single asset symbol.\n' + '\n' + 'The /v1/summary endpoint is the most comprehensive single-call snapshot in FinImpulse. It aggregates a broad set of fields used across Summary, Profile, Statistics & Risk, and fund performance views. Use it when you need fast, accurate, high-coverage data for a ticker without orchestrating multiple endpoints.', inputSchema: summaryInputSchema }, (input) => summaryHandler(input, client));
}
