import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {version} from './utils/version.js';
import {defaultGlobalToolConfig} from './config/global.tool.js';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

const API_BASE = "https://api.finimpulse.com";
const USER_AGENT = `FinImpulse-MCP-TypeScript-SDK/${version}`;
const API_TOKEN = process.env.API_TOKEN ?? '';

console.error("API_TOKEN:", API_TOKEN ? "set" : "EMPTY");

type UUID = string & { readonly __brand: 'UUID' };

interface FinImpulseFullResponse<T> {
	task_id: UUID;
	status_code: number;
	status_message: string;
	cost: number;
	data: Record<string, any>
	result: T
}

interface SearchItem {
	symbol: string;
	display_name: string;
	short_name: string;
	long_name: string;
	quote_type: string;
	quote_source_name: string | null;
	fifty_day_average: number;
	fifty_day_average_change: number;
	fifty_day_average_change_percent: number;
	two_hundred_day_average: number;
	two_hundred_day_average_change: number;
	two_hundred_day_average_change_percent: number;
	average_daily_volume_3_month: number;
	average_daily_volume_10_day: number;
	one_year_return: number;
	three_year_return: number;
	currency: string;
	regular_market_price: number;
	regular_market_price_usd: number;
	regular_market_change: number;
	regular_market_change_usd: number;
	regular_market_change_percent: number;
	regular_market_time: string;
	regular_market_volume: number;
	full_exchange_name: string;
	exchange: string;
	exchange_timezone_name: string;
	exchange_timezone_short_name: string;
	fifty_two_week_low_change: number;
	fifty_two_week_low_change_percent: number;
	fifty_two_week_high_change: number;
	fifty_two_week_high_change_percent: number;
	fifty_two_week_low: number;
	fifty_two_week_high: number;
	trailing_annual_dividend_rate: number;
	trailing_annual_dividend_yield: number;
	dividend_rate: number;
	dividend_yield: number;
	time_offset: number;
	market_region: string;
	sector: string;
	industry: string;
	amount: number;
	amount_usd: number;
	update_time: string;
	usd_rate: number | null;
	founded_date: string | null;
	fund_inception_date: string | null;
}

interface SearchResponse {
	total_count: number;
	search_after_token: string;
	items_count: number;
	items: SearchItem[];
}

// Create server instance
const server = new McpServer({
	name: "finimpulse",
	version,
});

async function makeRequest<T>(url: string, method: string = 'POST', body?: any, forceFull: boolean = false): Promise<CallToolResult> {
	const headers: HeadersInit = {
		"User-Agent": USER_AGENT,
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: 'Bearer ' + API_TOKEN
	};
	
	// if(!defaultGlobalToolConfig.fullResponse && !forceFull){
	// 	url += '.ai';
	// }
	const bodyStr = body ? JSON.stringify(body) : undefined;
	console.error("BODY STRING:", bodyStr);
	try {
		const response = await fetch(url, {
			method,
			headers,
			body: bodyStr
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return validateAndFormatResponse<T>(await response.json() as FinImpulseFullResponse<T>)
	} catch (error) {
		console.error("Error making request:", error);
		return formatErrorResponse(error);
	}
}

server.registerTool(
	"get_search",
	{
		description: "Returns a unified, cross-asset search result for financial instruments, including stocks, ETFs, and mutual funds.",
		inputSchema: {
			search_text: z.string().optional().describe('Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).'),
			quote_types: z.array(z.enum(['mutualfund','etf','stock'])).optional().describe(`Controls which asset types are included in the search.`),
			limit: z.number().min(1).max(5000).default(10).optional().describe("Maximum number of matched items returned."),
			offset: z.number().min(0).optional().describe(
				`Pagination offset (0-based).`
			),
			filters: getFilterExpression().optional().describe(
				`Optional filter expressions.
					Each filter condition is defined as: [field, operator, value]. Conditions can be combined using logical operators and/or.
					
					Supported operators:
					
					Numeric fields:
					
					> - greater than
					>= - greater than or equal
					< - less than
					<= - less than or equal
					= - equals
					<> - not equal
					String fields:
					
					like – pattern match (requires % as a wildcard)
					not_like - pattern does not match (requires % as a wildcard)
					contains - value exists in string
					not_contains - value does not exist in string
					startswith - string starts with value
					endswith - string ends with value
					% usage examples:
					
					%abc% - matches any string containing "abc"
					abc% - matches any string starting with "abc"
					%abc - matches any string ending with "abc"
					Example:
					
					"filters": [
					    "short_name", "contains", "Market"
					]`
			),
			sort_by: z.array(
				z.object({
					selector: z.string().describe("Metric used for sorting (e.g., amount_usd)"),
					desc: z.boolean().describe("Sorting direction (true for descending, false for ascending)."),
				}),
			).optional().describe(
	`results sorting rules
				optional field
				you can use the same values as in the filters array to sort the results
				possible sorting types:
				asc – results will be sorted in the ascending order
				desc – results will be sorted in the descending order
				you should use a comma to set up a sorting type
				example:
				["keyword_data.keyword_info.competition,desc"]
				default rule:
				["ranked_serp_element.serp_item.rank_group,asc"]
				note that you can set no more than three sorting rules in a single request
				you should use a comma to separate several sorting rules
				example:
				["keyword_data.keyword_info.search_volume,desc","keyword_data.keyword_info.cpc,desc"]`
				),
			has_public_financial_reports: z.boolean().optional().describe('Indicates whether the company provides public financial statements.'),
		},
	},
	async ({ search_text, quote_types, offset, limit, filters, sort_by, has_public_financial_reports }) => {
		const search_url = `${API_BASE}/v1/search`;
		return await makeRequest<SearchResponse>(search_url, 'POST', {
			search_text,
			quote_types,
			offset,
			limit,
			filters,
			sort_by,
			has_public_financial_reports
		});
	},
);


function getFilterExpression(): z.ZodType<any> {
	if (defaultGlobalToolConfig.simpleFilter) {
		// Permissive filter schema for LLM tool compatibility (e.g., OpenAI/ChatGPT).
		// If you modify this behavior, re-verify compatibility with OpenAI tools.
		return z.any();
	}
		return z.array(z.union([z.array(z.union([z.string(), z.number(), z.boolean()])).length(3), z.enum(["and", "or"]), z.array(z.unknown()).length(3), z.union([z.string(), z.number(), z.unknown()]), z.any()])).max(3);
}


function validateAndFormatResponse<T>(response: FinImpulseFullResponse<T>): CallToolResult{
	// console.error(JSON.stringify(response));
	// if (defaultGlobalToolConfig.fullResponse || this.supportOnlyFullResponse()) {
	// 	let data = response as DataForSEOFullResponse;
	// 	this.validateResponseFull(data);
	// 	let result = data.tasks[0].result;
	// 	return this.formatResponse(result);
	// }
	validateResponse(response);
	return formatResponse(response);
}
function validateResponse(response: FinImpulseFullResponse<any>): void {
	if (response.status_code / 100 !== 200) {
		throw new Error(`API Error: ${response.status_message} (Code: ${response.status_code})`);
	}
}

function formatResponse<T>(data: FinImpulseFullResponse<T>): CallToolResult {
	// const fieldConfig = FieldConfigurationManager.getInstance();
	// if (fieldConfig.hasConfiguration()) {
	// 	const toolName = this.getName();
	// 	if (fieldConfig.isToolConfigured(toolName)) {
	// 		const fields = fieldConfig.getFieldsForTool(toolName);
	// 		if (fields && fields.length > 0) {
	// 			data = filterFields(data, parseFieldPaths(fields));
	// 		}
	// 	}
	// }
	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(data, null, 2),
			},
		],
	};
}

function formatErrorResponse(error: unknown): CallToolResult {
	return {
		content: [
			{
				type: "text",
				text: `Error: ${formatError(error)}`,
			},
		],
	};
}

function formatError(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}


async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
