import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {holdingsTopHoldingsInputSchema} from './schema.js';
import {holdingsTopHoldingsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerHoldingsTopHoldingsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_holdings_top_holdings', { title: 'Top 10 holdings', description: 'Returns the list of top holdings for a fund (ETF or mutual fund), including ticker symbol, name, and weight as a percentage of total net assets. Supports filtering and sorting. For stocks returns an empty result. Use to display portfolio concentration, issuer exposure, or Top Holdings tables.', inputSchema: holdingsTopHoldingsInputSchema, annotations: readOnlyToolAnnotations }, (input) => holdingsTopHoldingsHandler(input, client));
}
