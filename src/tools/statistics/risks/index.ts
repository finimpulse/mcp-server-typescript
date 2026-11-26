import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {statisticsRisksInputSchema} from './schema.js';
import {statisticsRisksHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerStatisticsRisksTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_statistics_risks', { title: 'Risk & risk-adjusted performance metrics', description: 'Returns risk and risk-adjusted performance metrics for an asset across standardized time horizons (3y, 5y, 10y). All risk metrics are available for mutual funds; for stocks and ETFs the response may be empty. Metrics include Alpha, Beta, Sharpe Ratio, Treynor Ratio, R-squared, standard deviation, and mean annual return.', inputSchema: statisticsRisksInputSchema, annotations: readOnlyToolAnnotations }, (input) => statisticsRisksHandler(input, client));
}
