import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldersInsidersResponse} from './types.js';
import {HoldersInsidersInput} from './schema.js';

export async function holdersInsidersHandler(input: HoldersInsidersInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldersInsidersResponse>('/v1/holders/insiders', 'POST', input);
}
