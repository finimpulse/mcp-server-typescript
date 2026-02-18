import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldingsGeneralResponse} from './types.js';
import {HoldingsGeneralInput} from './schema.js';

export async function holdingsGeneralHandler(input: HoldingsGeneralInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldingsGeneralResponse>('/v1/holdings/general', 'POST', input);
}
