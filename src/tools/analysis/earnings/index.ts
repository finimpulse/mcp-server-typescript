import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisEarningsInputSchema} from './schema.js';
import {analysisEarningsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerAnalysisEarningsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_earnings',
		{
			title: 'Earnings & analyst estimates',
			description: 'Returns earnings and estimate records for an asset, including EPS actuals, earnings vs. revenue, EPS trends, revisions, and growth metrics. Supports filtering by type and accounting methodology (GAAP/normalized). Primarily intended for stocks — ETFs and mutual funds may return empty results. Use to compare reported and estimated earnings or to track estimate revisions.',
			inputSchema: analysisEarningsInputSchema,
			annotations: readOnlyToolAnnotations,
		},
		(input) => analysisEarningsHandler(input, client),
	);
}
