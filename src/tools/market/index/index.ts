import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {marketIndexInputSchema} from './schema.js';
import {marketIndexHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerMarketIndexTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_market_index', { description: 'Searches ~39,000 global market indices (e.g. S&P 500, Dow Jones, Nasdaq Composite, VIX, Treasury yield indices) and returns latest closing price, daily change, 52-week range and one-year return. Updated every 24 hours; no intraday prices. Use select_identifiers to reduce response size. For historical index prices use get_histories.', inputSchema: marketIndexInputSchema }, (input) => marketIndexHandler(input, client));
}
