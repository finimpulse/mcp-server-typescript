import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdersGeneralInputSchema} from './schema.js';
import {holdersGeneralHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerHoldersGeneralTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holders_general', { title: 'Institutional & insider ownership', description: 'Returns a high-level ownership snapshot for an asset, focused on institutional and insider holdings where available. This endpoint is primarily relevant for stocks and returns insider and institutional ownership percentages, the number of institutions, and aggregated insider transaction flow metrics. For ETFs and mutual funds, most ownership fields are not applicable and are returned as null.', inputSchema: holdersGeneralInputSchema, annotations: readOnlyToolAnnotations }, (input) => holdersGeneralHandler(input, client));
}
