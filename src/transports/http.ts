import express, { Request, Response, NextFunction } from 'express';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from '../server.js';
import { version } from '../utils/version.js';

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL ?? 'https://data.finimpulse.com';
const STATIC_API_TOKEN = process.env.API_TOKEN ?? '';
const MCPRUSH_CLAIM_TOKEN = 'mcprush.com-62b1b2937f289323db941261';
const GLAMA_CLAIM_TOKEN = 'glama_claim_vSgIXc_mWqED_N43mNFyPnfiAvk0OI5X';
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

	const directToken = req.headers['x-api-token'] as string | undefined;
	if (directToken) return directToken;

	const oauthToken = req.headers.authorization?.replace("Bearer ", "") ?? '';
	if (!oauthToken) return null;
	return exchangeOAuthToken(oauthToken);
}

export async function bearerAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
	const apiToken = await resolveApiToken(req);
	if (!apiToken) {
		res.set('WWW-Authenticate', `Bearer resource_metadata="${req.protocol}://${req.get('host')}/.well-known/oauth-protected-resource"`);
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
	app.set('trust proxy', true);
	app.use(express.json());

	app.get('/health', (_req, res) => {
		res.json({ status: 'ok', version });
	});

	// Domain ownership proofs for MCPRush and Glama: keep them public and served, Glama re-checks daily.
	app.get('/.well-known/mcprush.com-claim.txt', (_req, res) => {
		res.type('text/plain').send(`${MCPRUSH_CLAIM_TOKEN}\n`);
	});
	app.get('/.well-known/glama.json', (_req, res) => {
		res.json({ $schema: 'https://glama.ai/mcp/schemas/connector.json', claim: GLAMA_CLAIM_TOKEN });
	});

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
