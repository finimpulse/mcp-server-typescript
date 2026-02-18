import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdersInsidersInputSchema} from './schema.js';
import {holdersInsidersHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldersInsidersTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holders_insiders', { description: 'Returns a paginated list of insider transaction records for an asset, including recent insider actions, roles, and reported positions. Applicable only to stocks — for ETFs and mutual funds returns an empty result.', inputSchema: holdersInsidersInputSchema }, (input) => holdersInsidersHandler(input, client));
}
