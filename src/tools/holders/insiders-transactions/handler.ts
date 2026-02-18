import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {HoldersInsidersTransactionsResponse} from './types.js';
import {HoldersInsidersTransactionsInput} from './schema.js';

export async function holdersInsidersTransactionsHandler(input: HoldersInsidersTransactionsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<HoldersInsidersTransactionsResponse>('/v1/holders/insiders-transactions', 'POST', input);
}
