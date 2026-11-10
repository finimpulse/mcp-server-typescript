import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldingsHistoryDatesResponse} from './types.js';
import {HoldingsHistoryDatesInput} from './schema.js';

export async function holdingsHistoryDatesHandler(input: HoldingsHistoryDatesInput, client: ApiClient): Promise<CallToolResult> {
	const {symbol, ...body} = input;
	return client.request<HoldingsHistoryDatesResponse>(`/v1/holdings/history/dates/${encodeURIComponent(symbol)}`, 'POST', body);
}
