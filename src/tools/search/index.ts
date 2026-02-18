import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {searchInputSchema} from './schema.js';
import {searchHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerSearchTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_search', { description: 'Returns a unified, cross-asset search result for financial instruments, including stocks, ETFs, and mutual funds. This endpoint powers global asset search, ticker autocomplete, discovery flows, and AI-assisted search scenarios. It returns a normalized set of price, liquidity, performance, and classification fields, allowing different asset types to be ranked and compared in a single response.', inputSchema: searchInputSchema }, (input) => searchHandler(input, client));
}
