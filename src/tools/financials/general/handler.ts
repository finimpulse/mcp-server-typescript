import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {FinancialsGeneralResponse} from './types.js';
import {FinancialsGeneralInput} from './schema.js';

export async function financialsGeneralHandler(input: FinancialsGeneralInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<FinancialsGeneralResponse>('/v1/financials/general', 'POST', input);
}
