import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisEarningsInputSchema} from './schema.js';
import {analysisEarningsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerAnalysisEarningsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_earnings',
		{
			description: 'Returns earnings and estimate records for an asset, including EPS actuals, earnings vs. revenue, EPS trends, revisions, and growth metrics. Supports filtering by type and accounting methodology (GAAP/normalized). Primarily intended for stocks — ETFs and mutual funds may return empty results. Use for populating Earnings & Estimates dashboards or feeding earnings analytics pipelines.',
			inputSchema: analysisEarningsInputSchema,
		},
		(input) => analysisEarningsHandler(input, client),
	);
}
