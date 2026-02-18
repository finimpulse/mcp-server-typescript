import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {statisticsGeneralInputSchema} from './schema.js';
import {statisticsGeneralHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerStatisticsGeneralTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_statistics_general', { description: 'Returns a consolidated set of key statistics and performance indicators for an asset. Acts as a unified statistics snapshot combining price data, valuation metrics, dividends, risk indicators, and trailing performance. Covers stocks (valuation, ownership, financial ratios, analyst data) and funds/ETFs (trailing returns, category-relative metrics, rankings).', inputSchema: statisticsGeneralInputSchema }, (input) => statisticsGeneralHandler(input, client));
}
