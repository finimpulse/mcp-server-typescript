import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {secFilingsEventsInputSchema} from './schema.js';
import {secFilingsEventsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerSecFilingsEventsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_sec_filings_events', { title: 'SEC filing events', description: 'Returns SEC filing events for an asset (stocks, ETFs, mutual funds): filing date, form type (10-K, 8-K, ...), accession number, document metadata and source URL. Query by symbol or cik, optionally limited by filing date range. Covers ~8,000 tickers, refreshed every 7 days. Use to build filing histories or monitor new material filings (e.g. 8-K).', inputSchema: secFilingsEventsInputSchema, annotations: readOnlyToolAnnotations }, (input) => secFilingsEventsHandler(input, client));
}
