import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldingsHistoryResponse} from './types.js';
import {HoldingsHistoryInput} from './schema.js';

export async function holdingsHistoryHandler(input: HoldingsHistoryInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldingsHistoryResponse>('/v1/holdings/history', 'POST', input);
}
