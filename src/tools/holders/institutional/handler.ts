import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldersInstitutionalResponse} from './types.js';
import {HoldersInstitutionalInput} from './schema.js';

export async function holdersInstitutionalHandler(input: HoldersInstitutionalInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldersInstitutionalResponse>('/v1/holders/institutional', 'POST', input);
}
