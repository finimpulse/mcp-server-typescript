import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsValuationMeasuresInputSchema} from './schema.js';
import {financialsValuationMeasuresHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerFinancialsValuationMeasuresTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_valuation_measures', { description: 'Provides key Valuation Measures for stocks and some funds, including P/E, EV/EBITDA, P/B, and other metrics. Supports filtering by interval (annual, quarterly, trailing). Use to populate the Valuation Measures section or pull valuation metrics aligned to the same date grid as financial statements for comparative analysis.', inputSchema: financialsValuationMeasuresInputSchema }, (input) => financialsValuationMeasuresHandler(input, client));
}
