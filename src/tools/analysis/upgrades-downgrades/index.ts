import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {analysisUpgradesDowngradesInputSchema} from './schema.js';
import {analysisUpgradesDowngradesHandler} from './handler.js';
import {ApiClient} from '../../../http/client.js';

export function registerAnalysisUpgradesDowngradesTool(server: McpServer, client: ApiClient): void {
	server.registerTool(
		'get_analysis_upgrades_downgrades',
		{
			description: 'Returns a feed of analyst rating actions for a ticker, including upgrades, downgrades, reiterations, and price target changes (from/to grade, action type, current and prior price targets). Primarily intended for stocks — ETFs and mutual funds rarely have analyst rating coverage. Use for populating an Upgrades & Downgrades table or tracking rating action feeds.',
			inputSchema: analysisUpgradesDowngradesInputSchema,
		},
		(input) => analysisUpgradesDowngradesHandler(input, client),
	);
}
