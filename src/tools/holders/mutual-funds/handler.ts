import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldersMutualFundsResponse} from './types.js';
import {HoldersMutualFundsInput} from './schema.js';

export async function holdersMutualFundsHandler(input: HoldersMutualFundsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldersMutualFundsResponse>('/v1/holders/mutual-funds', 'POST', input);
}
