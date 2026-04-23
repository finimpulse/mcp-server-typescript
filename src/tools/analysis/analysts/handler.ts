import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {AnalysisAnalystsResponse} from './types.js';
import {AnalysisAnalystsInput} from './schema.js';

export async function analysisAnalystsHandler(input: AnalysisAnalystsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<AnalysisAnalystsResponse>('/v1/analysis/analysts', 'POST', input);
}
