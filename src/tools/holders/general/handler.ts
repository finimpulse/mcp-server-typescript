import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldersGeneralResponse} from './types.js';
import {HoldersGeneralInput} from './schema.js';

export async function holdersGeneralHandler(input: HoldersGeneralInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldersGeneralResponse>('/v1/holders/general', 'POST', input);
}
