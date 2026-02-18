import {ApiClient} from '../../http/client.js';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {historiesInputSchema} from './schema.js';
import {historiesHandler} from './handler.js';

export function registerHistoriesTool(server: McpServer, client: ApiClient): void {
	server.registerTool('get_histories', { description: 'Returns time-series data for an asset in a single unified stream. This endpoint can return historical prices and, optionally, additional history “event” types such as dividends, splits, and capital gains (where available). It is a configurable endpoint that lets you control the date range, interval, included record types, sorting, and page size.', inputSchema: historiesInputSchema }, (input) => historiesHandler(input, client));
}
