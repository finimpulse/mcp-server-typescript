import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {ProfileResponse} from './types.js';
import {ProfileInput} from './schema.js';

export async function profileHandler(input: ProfileInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<ProfileResponse>('/v1/profile', 'POST', input);
}
