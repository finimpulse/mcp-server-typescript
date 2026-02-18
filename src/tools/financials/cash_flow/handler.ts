import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {FinancialsCashFlowResponse} from './types.js';
import {FinancialsCashFlowInput} from './schema.js';

export async function financialsCashFlowHandler(input: FinancialsCashFlowInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<FinancialsCashFlowResponse>('/v1/financials/cash_flow', 'POST', input);
}
