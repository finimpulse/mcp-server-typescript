import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {NewsResponse} from './types.js';
import {NewsInput} from './schema.js';

export async function newsHandler(input: NewsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<NewsResponse>('/v1/news', 'POST', input);
}
