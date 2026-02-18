import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {FinancialsIncomeStatementResponse} from './types.js';
import {FinancialsIncomeStatementInput} from './schema.js';

export async function financialsIncomeStatementHandler(input: FinancialsIncomeStatementInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<FinancialsIncomeStatementResponse>('/v1/financials/income_statement', 'POST', input);
}
