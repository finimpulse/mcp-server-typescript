import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {version} from './utils/version.js';
import {registerAllTools} from './tools/index.js';

export function createServer(): McpServer {
	const server = new McpServer({ name: 'finimpulse', version });
	registerAllTools(server);
	return server;
}
