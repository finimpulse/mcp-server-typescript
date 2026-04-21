import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisAnalystsInputSchema} from './schema.js';
import {analysisAnalystsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerAnalysisAnalystsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_analysts',
		{
			description: 'Returns a paginated list of analyst-level coverage records for an asset, including per-analyst scores, current rating, sentiment, price target, and latest announcement date. Primarily intended for stocks — ETFs and mutual funds may return empty results. Use for populating an Analysts table in the Analysis module, filtering by sentiment, or sorting by announcement date.',
			inputSchema: analysisAnalystsInputSchema,
		},
		(input) => analysisAnalystsHandler(input, client),
	);
}
