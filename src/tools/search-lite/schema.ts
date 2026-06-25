import {getFilterExpression} from '../../utils/filters.js';
import {z} from 'zod';

export const searchLiteInputSchema = z.object({
	search_text: z.string().optional().describe('Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).'),
	select_identifiers: z.array(z.string()).optional().describe(
		`A list of field names to include in the response. When provided, each item in the response contains only the specified fields. When not provided or set to null, the full field set is returned. "symbol" and "logo" are always returned regardless of the value passed.`
	),
	quote_types: z.array(z.enum(['mutualfund', 'etf', 'stock'])).optional().describe('Controls which asset types are included in the search. If none are provided, all supported asset types are returned.'),
	symbols: z.array(z.string()).optional().describe(
		`A list of ticker symbols to retrieve. When provided, the response returns only the specified tickers. If a symbol does not exist, it is excluded from the results.`
	),
	limit: z.number().min(1).max(5000).default(10).optional().describe('Maximum number of matched items returned.'),
	offset: z.number().min(0).optional().describe('Pagination offset (0-based).'),
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
			selector: z.string().describe('Metric used for sorting (e.g., amount_usd)'),
			desc: z.boolean().describe('Sorting direction (true for descending, false for ascending).'),
		}),
	).optional().describe(
		`Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:

			selector - Metric used for sorting (e.g., amount_usd).
			desc - Sorting direction (true for descending, false for ascending).
			Sortings can be combined using ,.
			
			Example:
			
			    {
			        "selector": "amount_usd",
			        "desc": true
			    }
			
			`
	),
	has_public_financial_reports: z.boolean().optional().describe('Indicates whether the company provides public financial statements.'),
	show_tickers_without_company_name: z.boolean().optional().describe('Include tickers with missing names. true - include tickers even if the company/fund name is missing; false - exclude tickers without a company/fund name.'),
	hide_tickers_with_company_name: z.boolean().optional().describe('Exclude tickers with available names. true - exclude tickers with a company/fund name; false - include tickers with a company/fund name.'),
	tag: z.string().max(255).optional().describe('User-defined request identifier.'),
})

export type SearchLiteInput = z.infer<typeof searchLiteInputSchema>;
