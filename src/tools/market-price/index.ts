import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {marketPriceInputSchema} from './schema.js';
import {marketPriceHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerMarketPriceTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_market_price', { description: 'Returns the current market price snapshot for a single asset symbol. For US-listed assets the response includes pre-market, regular, and post-market session prices, as well as a current price field reflecting the most recent traded price. For non-US assets, only the regular session and current price are returned. Applicable to stocks, ETFs, and mutual funds.', inputSchema: marketPriceInputSchema }, (input) => marketPriceHandler(input, client));
}
