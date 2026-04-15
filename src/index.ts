import 'dotenv/config';
import {runHttp} from './transports/http.js';
import {runStdio} from './transports/stdio.js';

async function main() {
	const mode = process.env.MCP_TRANSPORT ?? process.argv[2] ?? 'stdio';
	
	switch (mode) {
		case 'http': await runHttp(); break;
		default: await runStdio();
	}
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
