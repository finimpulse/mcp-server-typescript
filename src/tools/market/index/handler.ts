import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {MarketIndexResponse} from './types.js';
import {MarketIndexInput} from './schema.js';

export async function marketIndexHandler(input: MarketIndexInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<MarketIndexResponse>('/v1/market/index', 'POST', input);
}
