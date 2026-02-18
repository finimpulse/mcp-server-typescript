// transports/http.ts
import express, { Request, Response, NextFunction } from 'express';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from '../server.js';

export function bearerAuth(req: Request, res: Response, next: NextFunction): void {
	const token = req.headers.authorization?.replace("Bearer ", "") ?? '';
	if (!token) {
		res.status(401).json({ error: "Missing API token" });
		return;
	}
	req.apiToken = token;
	next();
}

export async function handleMcpRequest(req: Request, res: Response): Promise<void> {
	const server = createServer(req.apiToken);
	const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
	await server.connect(transport);
	await transport.handleRequest(req, res, req.body);
}

export async function runHttp(): Promise<void> {
	const app = express();
	app.use(express.json());
	
	app.post('/http', bearerAuth, handleMcpRequest);
	app.post('/mcp', bearerAuth, handleMcpRequest);
	
	const port = Number(process.env.PORT ?? 3000);
	app.listen(port, () => console.error(`Finimpulse MCP Server running on HTTP :${port}`));
}
