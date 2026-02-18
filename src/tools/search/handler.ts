import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {SearchResponse} from './types.js';
import {makeRequest} from '../../http/client.js';
import {SearchInput} from './schema.js';

export async function searchHandler(input: SearchInput): Promise<CallToolResult> {
	return makeRequest<SearchResponse>('/v1/search', 'POST', input);
}
