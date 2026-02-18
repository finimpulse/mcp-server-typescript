import {z} from 'zod';
import {getFilterExpression} from '../../utils/filters.js';

export const newsInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	types: z.array(z.enum(['news', 'press_release'])).optional().describe(
		'News types to include. Supported values: news, press_release. If none are provided, all supported types are returned.'
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Date range filter (YYYY-MM-DD).'
	),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Date range filter (YYYY-MM-DD).'
	),
	limit: z.number().min(1).max(5000).default(10).optional().describe('Maximum number of items to return.'),
	offset: z.number().min(0).optional().describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions.
				Each filter condition is defined as: [field, operator, value]. Conditions can be combined using logical operators and/or.

				Supported operators:

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
				    "title", "<>", null
				]`
	),
	sort_by: z.array(
		z.object({
			selector: z.string().describe('Metric used for sorting (e.g., pub_date)'),
			desc: z.boolean().describe('Sorting direction (true for descending, false for ascending).'),
		}),
	).optional().describe(
		`Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:

			selector - Metric used for sorting (e.g., pub_date).
			desc - Sorting direction (true for descending, false for ascending).
			Sortings can be combined using ,.

			Example:

			    {
			        "selector": "pub_date",
			        "desc": true
			    }

			`
	),
});

export type NewsInput = z.infer<typeof newsInputSchema>;
