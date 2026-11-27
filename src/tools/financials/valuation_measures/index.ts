import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {financialsValuationMeasuresInputSchema} from './schema.js';
import {financialsValuationMeasuresHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';
import {readOnlyToolAnnotations} from '../../../config/tool-annotations.js';

export function registerFinancialsValuationMeasuresTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_financials_valuation_measures', { title: 'Historical valuation metrics', description: 'Provides key Valuation Measures for stocks and some funds, including P/E, EV/EBITDA, P/B, and other metrics. Supports filtering by interval (annual, quarterly, trailing). Valuation metrics use the same date grid as the financial statements, so they can be compared period by period.', inputSchema: financialsValuationMeasuresInputSchema, annotations: readOnlyToolAnnotations }, (input) => financialsValuationMeasuresHandler(input, client));
}
