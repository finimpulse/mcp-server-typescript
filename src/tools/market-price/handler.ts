import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {MarketPriceResponse} from './types.js';
import {MarketPriceInput} from './schema.js';

export async function marketPriceHandler(input: MarketPriceInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<MarketPriceResponse>(`/v1/market-price/${encodeURIComponent(input.symbol)}`, 'GET');
}
