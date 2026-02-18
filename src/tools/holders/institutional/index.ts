import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdersInstitutionalInputSchema} from './schema.js';
import {holdersInstitutionalHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldersInstitutionalTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holders_institutional', { description: 'Returns a paginated list of institutional holders for an asset. Includes each holder\'s reported position, percent held, and estimated value. Supports filtering and sorting. Primarily relevant for stocks; for ETFs and mutual funds the response is typically empty.', inputSchema: holdersInstitutionalInputSchema }, (input) => holdersInstitutionalHandler(input, client));
}
