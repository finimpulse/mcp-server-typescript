import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {AnalysisEarningsResponse} from './types.js';
import {AnalysisEarningsInput} from './schema.js';

export async function analysisEarningsHandler(input: AnalysisEarningsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<AnalysisEarningsResponse>('/v1/analysis/earnings', 'POST', input);
}
