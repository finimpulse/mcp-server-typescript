import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {newsInputSchema} from './schema.js';
import {newsHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerNewsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_news', { description: 'Returns the latest news and press releases for financial assets. This endpoint aggregates news and press releases for stocks, ETFs, and mutual funds. Each item includes a headline, brief description, publication date, list of related tickers, and provider information.', inputSchema: newsInputSchema }, (input) => newsHandler(input, client));
}
