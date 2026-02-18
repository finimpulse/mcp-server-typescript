import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsGeneralInputSchema} from './schema.js';
import {financialsGeneralHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerFinancialsGeneralTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_general', { description: 'Returns financial statements and valuation measures for equity (stocks mostly) across multiple reporting intervals. Provides structured financial reporting data (Income Statement, Balance Sheet, Cash Flow) and valuation snapshots (Valuation Measures) in a unified response. Supports filtering by type and interval (annual, quarterly, trailing).', inputSchema: financialsGeneralInputSchema }, (input) => financialsGeneralHandler(input, client));
}
