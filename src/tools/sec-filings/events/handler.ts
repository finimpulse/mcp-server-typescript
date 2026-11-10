import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {SecFilingsEventsResponse} from './types.js';
import {SecFilingsEventsInput} from './schema.js';

export async function secFilingsEventsHandler(input: SecFilingsEventsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SecFilingsEventsResponse>('/v1/events', 'POST', input);
}
