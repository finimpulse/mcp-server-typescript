import {ApiClient} from '../../http/client.js';
import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {SummaryLiteResponse} from './types.js';
import {SummaryLiteInput} from './schema.js';

export async function summaryLiteHandler(input: SummaryLiteInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SummaryLiteResponse>('/v1/summary-lite', 'POST', input);
}
