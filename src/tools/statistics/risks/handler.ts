import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {StatisticsRisksResponse} from './types.js';
import {StatisticsRisksInput} from './schema.js';

export async function statisticsRisksHandler(input: StatisticsRisksInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<StatisticsRisksResponse>('/v1/statistics/risks', 'POST', input);
}
