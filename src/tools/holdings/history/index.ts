import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdingsHistoryInputSchema} from './schema.js';
import {holdingsHistoryHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldingsHistoryTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holdings_history', { description: 'Returns the full holdings composition (asset, name, shares, weight %, market value) of an ETF on a specific historical reporting date. ETFs only; returns an empty result if no data exists for the symbol and date. Use get_holdings_history_dates first to get valid dates. Supports filtering and sorting (e.g. by weight_pct).', inputSchema: holdingsHistoryInputSchema }, (input) => holdingsHistoryHandler(input, client));
}
