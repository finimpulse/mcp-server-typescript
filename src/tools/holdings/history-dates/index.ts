import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdingsHistoryDatesInputSchema} from './schema.js';
import {holdingsHistoryDatesHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerHoldingsHistoryDatesTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holdings_history_dates', { title: 'Historical holdings reporting dates', description: 'Returns the list of available historical holdings reporting dates for an ETF. ETFs only (stocks and mutual funds are not supported); returns an empty result if no data exists. Call this first to get a valid date, then pass it to get_holdings_history.', inputSchema: holdingsHistoryDatesInputSchema, annotations: readOnlyToolAnnotations }, (input) => holdingsHistoryDatesHandler(input, client));
}
