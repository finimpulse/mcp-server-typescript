import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsBalanceSheetInputSchema} from './schema.js';
import {financialsBalanceSheetHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerFinancialsBalanceSheetTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_balance_sheet', { title: 'Balance sheets', description: 'Returns comprehensive Balance Sheet data for stocks and some funds, providing a snapshot of a company\'s financial position and capital structure. Supports filtering by interval (annual, quarterly, trailing). Use to populate the Balance Sheet section or retrieve historical data for solvency analysis, ratios, and modeling.', inputSchema: financialsBalanceSheetInputSchema, annotations: readOnlyToolAnnotations }, (input) => financialsBalanceSheetHandler(input, client));
}
