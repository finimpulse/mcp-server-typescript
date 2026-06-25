import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {summaryLiteInputSchema} from './schema.js';
import {summaryLiteHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerSummaryLiteTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_summary_lite', { description: 'Returns a focused snapshot of key identification, market, and fundamental data for a single asset symbol. Retrieves core identification, current pricing, key valuation metrics, and fundamental data. The response field set is fixed, but it is possible to control which fields are included through the select_identifiers parameter. For a comprehensive field set use the /v1/summary endpoint.', inputSchema: summaryLiteInputSchema }, (input) => summaryLiteHandler(input, client));
}
