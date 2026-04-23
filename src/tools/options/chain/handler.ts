import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {OptionsChainResponse} from './types.js';
import {OptionsChainInput} from './schema.js';

export async function optionsChainHandler(input: OptionsChainInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<OptionsChainResponse>('/v1/options/chain', 'POST', input);
}
