import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdersMutualFundsInputSchema} from './schema.js';
import {holdersMutualFundsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldersMutualFundsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holders_mutual_funds', { description: 'Returns a list of mutual funds and ETFs that hold a given stock, including their reported position size, percent held, and estimated value. Answers the question "Which funds hold this stock?". Stock-centric endpoint — returns empty result for ETF and mutual fund symbols.', inputSchema: holdersMutualFundsInputSchema }, (input) => holdersMutualFundsHandler(input, client));
}
