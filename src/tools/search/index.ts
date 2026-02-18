import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {searchInputSchema} from './schema.js';
import {searchHandler} from './handler.js';

export function registerSearchTool(server: McpServer): void {
	server.registerTool('get_search', { description: 'Returns a unified, cross-asset search result for financial instruments, including stocks, ETFs, and mutual funds.', inputSchema: searchInputSchema }, searchHandler);
}
