import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdingsGeneralInputSchema} from './schema.js';
import {holdingsGeneralHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerHoldingsGeneralTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holdings_general', { description: 'Returns consolidated portfolio composition and holdings-level aggregates for a fund (ETF or mutual fund), including asset allocation, sector exposure, and aggregated valuation characteristics of the underlying holdings. For stocks, all fields return null. Use to populate Holdings Overview or Portfolio Composition sections.', inputSchema: holdingsGeneralInputSchema }, (input) => holdingsGeneralHandler(input, client));
}
