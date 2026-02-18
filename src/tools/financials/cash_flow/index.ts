import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsCashFlowInputSchema} from './schema.js';
import {financialsCashFlowHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerFinancialsCashFlowTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_cash_flow', { description: 'Returns detailed Cash Flow Statement data, including operating, investing, and financing cash flows for the selected period. Supports filtering by interval (annual, quarterly, trailing). Use to populate the Cash Flow section or extract multi-period series for liquidity analysis, forecasting, or visualization.', inputSchema: financialsCashFlowInputSchema }, (input) => financialsCashFlowHandler(input, client));
}
