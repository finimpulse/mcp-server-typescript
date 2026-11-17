import {z} from 'zod';
import {getFilterDescription, getFilterExpression} from '../../../utils/filters.js';

export const historiesCurrenciesInputSchema = z.object({
	currency_from: z.string().regex(/^[A-Z]{3}$/).optional().describe(
		'Base currency code (uppercase 3-letter code, e.g., GBP). Required unless search_after_token is provided.'
	),
	currency_to: z.string().regex(/^[A-Z]{3}$/).optional().describe(
		'Quote currency code (uppercase 3-letter code, e.g., EUR). Required unless search_after_token is provided.'
	),
	interval: z.enum(['1d', '1wk', '1mo', '3mo', '6mo', '1y']).optional().describe(
		`Granularity for returned history records. If omitted, daily records (1d) are returned.
    Available values:
    * 1d  - 1 day
    * 1wk - 1 week
    * 1mo - 1 month
    * 3mo - 3 months
    * 6mo - 6 months
    * 1y  - 1 year`
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Start of the date range filter (YYYY-MM-DD). If omitted, records are returned from the earliest available date.'
	),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'End of the date range filter (YYYY-MM-DD). If omitted, records are returned up to the most recent available date.'
	),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["close", ">", 1.1]') + '\nFilterable fields: date, open, high, low, close, adj_close.'
	),
	sort_by: z.array(
		z.object({
			selector: z.enum(['date']).describe('Field used for sorting. The only supported value is date.'),
			desc: z.boolean().describe('Sorting direction (true for descending, false for ascending).'),
		}),
	).optional().describe(
		'Optional sorting configuration. Records can be sorted by date only: [{"selector": "date", "desc": false}]. By default, records are sorted by date in descending order.'
	),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	search_after_token: z.string().optional().describe(
		'Pagination token. Pass the search_after_token value from the previous response to fetch the next page, together with limit. Other request parameters do not need to be repeated.'
	),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type HistoriesCurrenciesInput = z.infer<typeof historiesCurrenciesInputSchema>;
