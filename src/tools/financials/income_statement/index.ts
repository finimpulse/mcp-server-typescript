import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsIncomeStatementInputSchema} from './schema.js';
import {financialsIncomeStatementHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerFinancialsIncomeStatementTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_income_statement', { description: 'Returns detailed Income Statement data for stocks and some funds, including revenue, expenses, and net income for the selected period. Supports filtering by interval (annual, quarterly, trailing). Use to populate the Income Statement section or pull time-series data for financial modeling and charting.', inputSchema: financialsIncomeStatementInputSchema }, (input) => financialsIncomeStatementHandler(input, client));
}
