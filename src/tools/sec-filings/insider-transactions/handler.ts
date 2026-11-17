import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {ApiClient} from '../../../http/client.js';
import {SecFilingsInsiderTransactionsResponse} from './types.js';
import {SecFilingsInsiderTransactionsInput} from './schema.js';

export async function secFilingsInsiderTransactionsHandler(input: SecFilingsInsiderTransactionsInput, client: ApiClient): Promise<CallToolResult> {
	return client.request<SecFilingsInsiderTransactionsResponse>('/v1/sec-filings/insider-transactions', 'POST', input);
}
