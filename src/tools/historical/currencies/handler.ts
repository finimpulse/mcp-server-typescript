import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HistoriesCurrenciesResponse} from './types.js';
import {HistoriesCurrenciesInput} from './schema.js';

export async function historiesCurrenciesHandler(input: HistoriesCurrenciesInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HistoriesCurrenciesResponse>('/v1/histories/currencies', 'POST', input);
}
