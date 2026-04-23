import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisRecommendationsInputSchema} from './schema.js';
import {analysisRecommendationsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerAnalysisRecommendationsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_recommendations',
		{
			description: 'Returns analyst recommendation breakdown for a ticker over time (periodic snapshots), including counts for Strong Buy, Buy, Hold, Sell, and Strong Sell. Primarily intended for stocks — ETFs and mutual funds may return empty results. Use for building Recommendations charts or tracking sentiment changes over time.',
			inputSchema: analysisRecommendationsInputSchema,
		},
		(input) => analysisRecommendationsHandler(input, client),
	);
}
