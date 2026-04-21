import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {AnalysisRecommendationsResponse} from './types.js';
import {AnalysisRecommendationsInput} from './schema.js';

export async function analysisRecommendationsHandler(input: AnalysisRecommendationsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<AnalysisRecommendationsResponse>('/v1/analysis/recommendations', 'POST', input);
}
