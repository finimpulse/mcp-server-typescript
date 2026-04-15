import express, { Request, Response, NextFunction } from 'express';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from '../server.js';

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL ?? 'http://localhost:8000';
const STATIC_API_TOKEN = process.env.API_TOKEN ?? '';
const apiTokenCache = new Map<string, string>();

async function exchangeOAuthToken(oauthToken: string): Promise<string | null> {
	const cached = apiTokenCache.get(oauthToken);
	if (cached) return cached;

	try {
		const res = await fetch(`${AUTH_SERVER_URL}/api/mcp/token`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${oauthToken}` },
		});
		if (!res.ok) return null;
		const data = await res.json() as { token?: string; api_token?: string };
		const apiToken = data.token ?? data.api_token;
		if (apiToken) apiTokenCache.set(oauthToken, apiToken);
		return apiToken ?? null;
	} catch {
		return null;
	}
}

async function resolveApiToken(req: Request): Promise<string | null> {
	if (STATIC_API_TOKEN) return STATIC_API_TOKEN;

	const oauthToken = req.headers.authorization?.replace("Bearer ", "") ?? '';
	if (!oauthToken) return null;
	return exchangeOAuthToken(oauthToken);
}

export async function bearerAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	const apiToken = await resolveApiToken(req);
	if (!apiToken) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	req.apiToken = apiToken;
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

	if (!STATIC_API_TOKEN) {
		app.get('/.well-known/oauth-protected-resource', (req, res) => {
			const resource = `${req.protocol}://${req.get('host')}`;
			res.json({ resource, authorization_servers: [AUTH_SERVER_URL] });
		});
	}

	app.post('/mcp', bearerAuth, handleMcpRequest);
	app.get('/mcp', bearerAuth, handleMcpRequest);
	app.delete('/mcp', bearerAuth, handleMcpRequest);

	const port = Number(process.env.PORT ?? 3000);
	app.listen(port, () => console.error(`Finimpulse MCP Server running on HTTP :${port}`));
}
