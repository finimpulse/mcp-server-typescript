import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {profileInputSchema} from './schema.js';
import {profileHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerProfileTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_profile', { description: 'Returns a profile and descriptive metadata for an asset, including identity, classification, governance fields, and fund-specific attributes where applicable. This endpoint acts as a unified profile snapshot. It combines company identity (for stocks), descriptive fund profile (for ETFs and mutual funds), and standardized governance placeholders where available.', inputSchema: profileInputSchema }, (input) => profileHandler(input, client));
}
