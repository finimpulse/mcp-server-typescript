import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {eventsTickersInputSchema} from './schema.js';
import {eventsTickersHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerEventsTickersTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_events_tickers', { description: 'Returns past and upcoming corporate events for ticker symbols: earnings announcements (EPS estimate, actual, surprise) and IPOs (deal status, listing exchange). Fields depend on the event type. Earnings are available up to ~14 months ahead, IPOs ~2-3 weeks ahead; data is updated weekly. Filter by event type, date, or symbol (e.g. filters ["symbol", "=", "AAPL"]). Use to build earnings/IPO calendars or alerts.', inputSchema: eventsTickersInputSchema }, (input) => eventsTickersHandler(input, client));
}
