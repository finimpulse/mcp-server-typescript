import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {FinancialsValuationMeasuresResponse} from './types.js';
import {FinancialsValuationMeasuresInput} from './schema.js';

export async function financialsValuationMeasuresHandler(input: FinancialsValuationMeasuresInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<FinancialsValuationMeasuresResponse>('/v1/financials/valuation_measures', 'POST', input);
}
