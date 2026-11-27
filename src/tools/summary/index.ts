import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {summaryInputSchema} from './schema.js';
import {summaryHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';
import {readOnlyToolAnnotations} from '../../config/tool-annotations.js';

export function registerSummaryTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_summary', { title: 'Asset summary', description: 'Returns a unified snapshot of identity, profile, market data, fundamentals, ownership, analyst coverage, and fund metrics for a single asset symbol.\n' + '\n' + 'It combines a broad set of profile, statistics, risk, and fund performance fields in one response. Use it for a general overview of a ticker instead of calling several tools. For a smaller field set use get_summary_lite.', inputSchema: summaryInputSchema, annotations: readOnlyToolAnnotations }, (input) => summaryHandler(input, client));
}
