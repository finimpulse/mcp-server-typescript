import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {searchLiteInputSchema} from './schema.js';
import {searchLiteHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerSearchLiteTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_search_lite', { description: 'Returns a unified, cross-asset search result for stocks, ETFs, and mutual funds with a focused field set covering core identification, current pricing, and key performance metrics. The response field set is fixed, but it is possible to control which fields are included through the select_identifiers parameter. For a comprehensive field set use the /v1/search endpoint.', inputSchema: searchLiteInputSchema }, (input) => searchLiteHandler(input, client));
}
