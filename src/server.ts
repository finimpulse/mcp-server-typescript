import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {version} from './utils/version.js';
import {registerAllTools} from './tools/index.js';
import {ApiClient} from './http/client.js';

export function createServer(apiToken: string): McpServer {
	const server = new McpServer({ name: 'finimpulse', version });
	const client = new ApiClient(apiToken);
	registerAllTools(server, client);
	return server;
}
