import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {marketCalendarsInputSchema} from './schema.js';
import {marketCalendarsHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerMarketCalendarsTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_market_calendars', { description: 'Returns the macroeconomic release calendar: scheduled data releases (e.g. Unemployment Rate, CPI, Retail Sales) for 71 countries and the euro area, covering recent releases and roughly the next 30 days. Each record has the release time, reference period, and actual, prior and originally reported values (after_release_actual is null until published). Updated weekly. Filter by country, date or indicator.', inputSchema: marketCalendarsInputSchema }, (input) => marketCalendarsHandler(input, client));
}
