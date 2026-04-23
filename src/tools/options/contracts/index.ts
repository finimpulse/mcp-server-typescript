import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {optionsContractsInputSchema} from './schema.js';
import {optionsContractsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerOptionsContractsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_options_contracts',
		{
			description: 'Returns a single option contract snapshot by its full contract identifier, including pricing, bid/ask, volume, open interest, implied volatility, moneyness, and Greeks (delta, gamma, theta, vega, rho). Applicable to stocks and ETFs with listed options — mutual funds are not supported. Use for contract detail panels, deep-link flows, or refreshing a single contract without reloading the full chain.',
			inputSchema: optionsContractsInputSchema,
		},
		(input) => optionsContractsHandler(input, client),
	);
}
