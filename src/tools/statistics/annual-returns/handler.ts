import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {StatisticsAnnualReturnsResponse} from './types.js';
import {StatisticsAnnualReturnsInput} from './schema.js';

export async function statisticsAnnualReturnsHandler(input: StatisticsAnnualReturnsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<StatisticsAnnualReturnsResponse>('/v1/statistics/annual-returns', 'POST', input);
}
