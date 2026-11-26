import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {secFilingsInsiderTransactionsInputSchema} from './schema.js';
import {secFilingsInsiderTransactionsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerSecFilingsInsiderTransactionsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_sec_filings_insider_transactions', { title: 'SEC Form 4 insider transactions', description: 'Returns record-level data from a single SEC Form 4 / Form 4/A filing for a stock: non-derivative and derivative transactions and holdings with SEC transaction codes, shares owned after the transaction, direct/indirect ownership, footnotes and the link to the original SEC document. Requires accession_number plus symbol or cik: first call get_sec_filings_events and filter by form (4, 4/A) to get them. One request covers one filing; for a simplified insider transaction history across filings use get_holders_insiders_transactions.', inputSchema: secFilingsInsiderTransactionsInputSchema, annotations: readOnlyToolAnnotations }, (input) => secFilingsInsiderTransactionsHandler(input, client));
}
