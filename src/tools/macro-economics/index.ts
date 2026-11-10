import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {macroEconomicsInputSchema} from './schema.js';
import {macroEconomicsHandler} from './handler.js';
import {ApiClient} from '../../http/client.js';

export function registerMacroEconomicsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_macro_economics', { description: 'Returns annual macroeconomic indicators by country (50+ countries, 1970 to current year; current-year values are forecasts): GDP, inflation, unemployment, interest rates, trade, government finances, consumption. One record per country per year with 38 indicators. Updated quarterly. Filter by country_iso3 and year. Source: OECD Data Explorer; use and redistribution are subject to the OECD Terms and Conditions, including source attribution.', inputSchema: macroEconomicsInputSchema }, (input) => macroEconomicsHandler(input, client));
}
