import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {newsInputSchema} from './schema.js';
import {newsHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerNewsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_news', { description: 'Returns news articles and press releases for one asset symbol (stock, ETF, mutual fund, or index): headline, short description, publication date, related tickers, provider, and link to the source. News may appear with a delay of up to 3 days. If no news matches the request, the API returns status code 40400 (Not Found), which is expected and not an error.', inputSchema: newsInputSchema }, (input) => newsHandler(input, client));
}
