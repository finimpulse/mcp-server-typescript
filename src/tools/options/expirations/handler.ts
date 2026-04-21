import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {OptionsExpirationsResponse} from './types.js';
import {OptionsExpirationsInput} from './schema.js';

export async function optionsExpirationsHandler(input: OptionsExpirationsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<OptionsExpirationsResponse>(`/v1/options/expirations/${encodeURIComponent(input.symbol)}`, 'GET');
}
