import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../http/client.js';
import {MetricsResponse} from './types.js';
import {MetricsInput} from './schema.js';

export async function metricsHandler(input: MetricsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<MetricsResponse>('/v1/metrics', 'POST', input);
}
