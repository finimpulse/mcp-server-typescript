import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsIncomeStatementInputSchema} from './schema.js';
import {financialsIncomeStatementHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerFinancialsIncomeStatementTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_income_statement', { title: 'Income statements', description: 'Returns detailed Income Statement data for stocks and some funds, including revenue, expenses, and net income for the selected period. Supports filtering by interval (annual, quarterly, trailing). Use for revenue, expense, and earnings time series in financial modeling and charts.', inputSchema: financialsIncomeStatementInputSchema, annotations: readOnlyToolAnnotations }, (input) => financialsIncomeStatementHandler(input, client));
}
