import {z} from 'zod';
import {getFilterExpression} from '../../../utils/filters.js';

export const statisticsRisksInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	limit: z.number().min(1).max(5000).default(10).optional().describe('Maximum number of items to return.'),
	offset: z.number().min(0).optional().describe('Offset for paginated results.'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions applied to risk metrics.
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
				    [ "alpha", ">", -0.09 ], "and", [ "type", "<>", 0 ]
				]`
	),
	sort_by: z.array(
		z.object({
			selector: z.string().describe('Metric used for sorting (e.g., alpha)'),
			desc: z.boolean().describe('Sorting direction (true for descending, false for ascending).'),
		}),
	).optional().describe(
		`Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:

			selector - Metric used for sorting (e.g., alpha).
			desc - Sorting direction (true for descending, false for ascending).
			Sortings can be combined using ,.

			Example:

			    {
			        "selector": "alpha",
			        "desc": true
			    }

			`
	),
});

export type StatisticsRisksInput = z.infer<typeof statisticsRisksInputSchema>;
