import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {optionsChainInputSchema} from './schema.js';
import {optionsChainHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerOptionsChainTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_options_chain',
		{
			title: 'Options chain for stocks & ETFs',
			description: 'Returns the full option chain for a single underlying ticker and expiration date, including all call and put contracts with pricing, bid/ask, volume, open interest, implied volatility, and moneyness. Applicable to stocks and ETFs with listed options — mutual funds are not supported. Use get_options_expirations first to discover valid expiration dates. Use to inspect all contracts for one expiration or to evaluate option strategies.',
			inputSchema: optionsChainInputSchema,
			annotations: readOnlyToolAnnotations,
		},
		(input) => optionsChainHandler(input, client),
	);
}
