import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {StatisticsGeneralResponse} from './types.js';
import {StatisticsGeneralInput} from './schema.js';

export async function statisticsGeneralHandler(input: StatisticsGeneralInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<StatisticsGeneralResponse>('/v1/statistics/general', 'POST', input);
}
