import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdersInsidersTransactionsInputSchema} from './schema.js';
import {holdersInsidersTransactionsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldersInsidersTransactionsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holders_insiders_transactions', { description: 'Returns a detailed, paginated list of insider transactions for a stock, including transaction descriptions, share counts, values, filer identity, and ownership type. More granular than get_holders_insiders. Applicable only to stocks — for ETFs and mutual funds returns an empty result.', inputSchema: holdersInsidersTransactionsInputSchema }, (input) => holdersInsidersTransactionsHandler(input, client));
}
