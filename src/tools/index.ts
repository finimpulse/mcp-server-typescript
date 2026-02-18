import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {registerSearchTool} from './search/index.js';

export function registerAllTools(server: McpServer): void {
	registerSearchTool(server);
	// registerSecondTool(server);
}
