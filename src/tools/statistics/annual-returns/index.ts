import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {statisticsAnnualReturnsInputSchema} from './schema.js';
import {statisticsAnnualReturnsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerStatisticsAnnualReturnsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_statistics_annual_returns', { description: 'Returns historical annual total returns for an asset by calendar year, including quarterly breakdowns and category comparison values where available. Available for ETFs and mutual funds; returns empty result for stocks. Use to analyze long-term historical performance, compare against category averages, or build performance tables.', inputSchema: statisticsAnnualReturnsInputSchema }, (input) => statisticsAnnualReturnsHandler(input, client));
}
