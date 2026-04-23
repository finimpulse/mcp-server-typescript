import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {AnalysisUpgradesDowngradesResponse} from './types.js';
import {AnalysisUpgradesDowngradesInput} from './schema.js';

export async function analysisUpgradesDowngradesHandler(input: AnalysisUpgradesDowngradesInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<AnalysisUpgradesDowngradesResponse>('/v1/analysis/upgrades-downgrades', 'POST', input);
}
