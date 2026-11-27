import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisAnalystsInputSchema} from './schema.js';
import {analysisAnalystsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerAnalysisAnalystsTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_analysts',
		{
			title: 'Analyst coverage, ratings & price targets',
			description: 'Returns a paginated list of analyst-level coverage records for an asset, including per-analyst scores, current rating, sentiment, price target, and latest announcement date. Primarily intended for stocks — ETFs and mutual funds may return empty results. Use to list individual analysts covering a stock, filter them by sentiment, or sort them by announcement date.',
			inputSchema: analysisAnalystsInputSchema,
			annotations: readOnlyToolAnnotations,
		},
		(input) => analysisAnalystsHandler(input, client),
	);
}
