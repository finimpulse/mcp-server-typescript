import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {SearchLiteResponse} from './types.js';
import {SearchLiteInput} from './schema.js';
import {ApiClient} from '../../http/client.js';

export async function searchLiteHandler(input: SearchLiteInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SearchLiteResponse>('/v1/search-lite', 'POST', input);
}
