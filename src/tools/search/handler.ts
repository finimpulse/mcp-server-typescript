import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {SearchResponse} from './types.js';
import {SearchInput} from './schema.js';
import {ApiClient} from '../../http/client.js';

export async function searchHandler(input: SearchInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SearchResponse>('/v1/search', 'POST', input);
}
