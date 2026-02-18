import {z} from 'zod';

export const historiesInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
	types: z.array(z.enum(['historical_price','dividends','splits','capital_gains'])).optional().describe('Record types to include.\n' + '\n' + 'Supported values:\n' + '\n' + 'historical_price\n' + 'dividends\n' + 'splits\n' + 'capital_gains\n' + 'All parameters are of type string and are optional. If none are provided, all supported types are returned.'),
	interval: z.enum(['1d', '1wk', '1mo', '3mo', '6mo', '1y']).optional().describe(
		`Granularity for returned history records.
    Available values:
    * 1d  - 1 day
    * 1wk - 1 week
    * 1mo - 1 month
    * 3mo - 3 months
    * 6mo - 6 months
    * 1y  - 1 year`
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Date range filter (YYYY-MM-DD). Records returned fall within the requested period.'
	),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Date range filter (YYYY-MM-DD). Records returned fall within the requested period.'
	),
	sort_by: z.array(
		z.object({
			selector: z.string().describe("Metric used for sorting (e.g., amount_usd)"),
			desc: z.boolean().describe("Sorting direction (true for descending, false for ascending)."),
		}),
	).optional().describe(
		`Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:

			selector - Metric used for sorting (e.g., date).
			desc - Sorting direction (true for descending, false for ascending).
			Sortings can be combined using ,.
			
			Example:
			
			    {
			        "selector": "date",
			        "desc": true
			    }
			
			`
	),
	limit: z.number().min(1).max(5000).default(10).optional().describe("Maximum number of matched items returned."),
	offset: z.number().min(0).optional().describe(
		`Pagination offset (0-based).`
	),
})

export type HistoriesInput = z.infer<typeof historiesInputSchema>;
