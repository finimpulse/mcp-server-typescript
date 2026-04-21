import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {optionsExpirationsInputSchema} from './schema.js';
import {optionsExpirationsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerOptionsExpirationsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_options_expirations',
		{
			description: 'Returns the list of available option expiration dates for a single underlying symbol. Applicable to stocks and ETFs with listed options — mutual funds are not supported. Use as the first step before calling get_options_chain to discover valid expiration dates, build expiration dropdowns, or check whether a symbol has options coverage.',
			inputSchema: optionsExpirationsInputSchema,
		},
		(input) => optionsExpirationsHandler(input, client),
	);
}
