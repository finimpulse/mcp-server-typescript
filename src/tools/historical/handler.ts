import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {HistoriesResponse} from './types.js';
import {HistoriesInput} from './schema.js';

export async function historiesHandler(input: HistoriesInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HistoriesResponse>('/v1/histories', 'POST', input);
}
