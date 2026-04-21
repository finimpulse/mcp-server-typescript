import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {OptionsContractResponse} from './types.js';
import {OptionsContractsInput} from './schema.js';

export async function optionsContractsHandler(input: OptionsContractsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<OptionsContractResponse>('/v1/options/contracts', 'POST', input);
}
