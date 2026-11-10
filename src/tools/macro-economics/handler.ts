import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {MacroEconomicsResponse} from './types.js';
import {MacroEconomicsInput} from './schema.js';

export async function macroEconomicsHandler(input: MacroEconomicsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<MacroEconomicsResponse>('/v1/macro-economics', 'POST', input);
}
