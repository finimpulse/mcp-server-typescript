import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {metricsInputSchema} from './schema.js';
import {metricsHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerMetricsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_metrics', { description: 'Returns dividend data, returns, profitability, growth, leverage, and business quality metrics for a single asset symbol. Retrieves a focused set of financial and market metrics covering dividend data, historical returns, profitability, growth, leverage, and business quality indicators. Primarily applicable to stocks.', inputSchema: metricsInputSchema }, (input) => metricsHandler(input, client));
}
