import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {MarketCalendarsResponse} from './types.js';
import {MarketCalendarsInput} from './schema.js';

export async function marketCalendarsHandler(input: MarketCalendarsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<MarketCalendarsResponse>('/v1/market/calendars', 'POST', input);
}
