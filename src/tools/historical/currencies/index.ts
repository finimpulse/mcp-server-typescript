import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {historiesCurrenciesInputSchema} from './schema.js';
import {historiesCurrenciesHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerHistoriesCurrenciesTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_histories_currencies', { title: 'Historical forex rates', description: 'Returns historical forex exchange rates (open, high, low, close, adjusted close) for a currency pair, e.g. EUR/USD: how many units of currency_to equal one unit of currency_from. Supports date range, intervals from daily to yearly, filtering, sorting by date and pagination. Covers ~150 currencies, history from 1996, updated daily. For stocks, ETFs, mutual funds and indices use get_histories instead.', inputSchema: historiesCurrenciesInputSchema, annotations: readOnlyToolAnnotations }, (input) => historiesCurrenciesHandler(input, client));
}
