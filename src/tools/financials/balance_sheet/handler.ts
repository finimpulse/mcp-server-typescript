import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {FinancialsBalanceSheetResponse} from './types.js';
import {FinancialsBalanceSheetInput} from './schema.js';

export async function financialsBalanceSheetHandler(input: FinancialsBalanceSheetInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<FinancialsBalanceSheetResponse>('/v1/financials/balance_sheet', 'POST', input);
}
