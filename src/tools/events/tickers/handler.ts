import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {EventsTickersResponse} from './types.js';
import {EventsTickersInput} from './schema.js';

export async function eventsTickersHandler(input: EventsTickersInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<EventsTickersResponse>('/v1/events/tickers', 'POST', input);
}
