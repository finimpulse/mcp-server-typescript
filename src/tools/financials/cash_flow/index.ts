import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsCashFlowInputSchema} from './schema.js';
import {financialsCashFlowHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerFinancialsCashFlowTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_cash_flow', { title: 'Cash flow statements', description: 'Returns detailed Cash Flow Statement data, including operating, investing, and financing cash flows for the selected period. Supports filtering by interval (annual, quarterly, trailing). Use for multi-period cash flow series in liquidity analysis, forecasting, or charts.', inputSchema: financialsCashFlowInputSchema, annotations: readOnlyToolAnnotations }, (input) => financialsCashFlowHandler(input, client));
}
