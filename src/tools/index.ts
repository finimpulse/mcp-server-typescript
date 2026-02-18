import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {ApiClient} from '../http/client.js';
import {registerSearchTool} from './search/index.js';
import {registerHistoriesTool} from './historical/index.js';

export function registerAllTools(server: McpServer, client: ApiClient): void {
	registerSearchTool(server, client);
	registerHistoriesTool(server, client)
}
