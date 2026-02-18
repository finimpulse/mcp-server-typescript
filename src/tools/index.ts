import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {registerSearchTool} from './search/index.js';
import {ApiClient} from '../http/client.js';

export function registerAllTools(server: McpServer, client: ApiClient): void {
	registerSearchTool(server, client);
	// registerSecondTool(server);
}
