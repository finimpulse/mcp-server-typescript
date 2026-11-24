import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {createServer} from '../server.js';

export async function runStdio() {
	const token = process.env.API_TOKEN ?? '';
	if (!token) {
		console.error("Warning: API_TOKEN is not set. Tools will return 401 Unauthorized. Get a token at https://app.finimpulse.com/developer/settings");
	}
	const server = createServer(token);
	await server.connect(new StdioServerTransport());
	console.error("Finimpulse MCP Server running on stdio");
}
