import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {createServer} from '../server.js';

export async function runStdio() {
	const token = process.env.API_TOKEN ?? '';
	const server = createServer(token);
	await server.connect(new StdioServerTransport());
	console.error("Finimpulse MCP Server running on stdio");
}
