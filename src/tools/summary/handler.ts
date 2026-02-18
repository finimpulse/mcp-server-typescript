import {ApiClient} from '../../http/client.js';
import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {SummaryResponse} from './types.js';
import {SummaryInput} from './schema.js';

export async function summaryHandler(input: SummaryInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SummaryResponse>('/v1/summary', 'POST', input);
}
