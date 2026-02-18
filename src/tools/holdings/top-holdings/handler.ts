import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldingsTopHoldingsResponse} from './types.js';
import {HoldingsTopHoldingsInput} from './schema.js';

export async function holdingsTopHoldingsHandler(input: HoldingsTopHoldingsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldingsTopHoldingsResponse>('/v1/holdings/top-holdings', 'POST', input);
}
