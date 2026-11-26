import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {profileInputSchema} from './schema.js';
import {profileHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';
import {readOnlyToolAnnotations} from '../../config/tool-annotations.js';

export function registerProfileTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_profile', { title: 'Profiles for companies, ETFs & mutual funds', description: 'Returns a profile and descriptive metadata for an asset, including identity, classification, governance fields, and fund-specific attributes where applicable. This endpoint acts as a unified profile snapshot. It combines company identity (for stocks), descriptive fund profile (for ETFs and mutual funds), and standardized governance placeholders where available.', inputSchema: profileInputSchema, annotations: readOnlyToolAnnotations }, (input) => profileHandler(input, client));
}
