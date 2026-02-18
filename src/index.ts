import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {createServer} from './server.js';

async function main() {
	const server = createServer();
	await server.connect(new StdioServerTransport());
	console.error("Finimpulse MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
