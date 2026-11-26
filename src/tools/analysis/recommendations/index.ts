import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisRecommendationsInputSchema} from './schema.js';
import {analysisRecommendationsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerAnalysisRecommendationsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_recommendations',
		{
			title: 'Analyst recommendations',
			description: 'Returns analyst recommendation breakdown for a ticker over time (periodic snapshots), including counts for Strong Buy, Buy, Hold, Sell, and Strong Sell. Primarily intended for stocks — ETFs and mutual funds may return empty results. Use for building Recommendations charts or tracking sentiment changes over time.',
			inputSchema: analysisRecommendationsInputSchema,
			annotations: readOnlyToolAnnotations,
		},
		(input) => analysisRecommendationsHandler(input, client),
	);
}
