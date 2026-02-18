import {getFilterExpression} from '../../utils/filters.js';
import {z} from 'zod';

export const searchInputSchema = z.object({
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
})

export type SearchInput = z.infer<typeof searchInputSchema>;
