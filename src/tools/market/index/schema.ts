import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const marketIndexInputSchema = z.object({
	search_text: z.string().optional().describe('Free-text query (e.g., "GSPC.INDX", "S&P 500", partial symbol, partial name).'),
	select_identifiers: z.array(z.string()).optional().describe(
		'A list of field names to include in the response. When provided, each item contains only the specified fields. When not provided or null, the full field set is returned. "symbol" and "logo" are always returned regardless of the value passed.'
	),
	symbols: z.array(z.string()).optional().describe(
		'A list of index symbols to retrieve (e.g., GSPC.INDX, DJI.INDX, 000001.SS). When provided, only the specified indices are returned. Symbols that do not exist are excluded; if none are found the result is empty.'
	),
	show_tickers_without_company_name: z.boolean().optional().describe('Include indices without a name. true - include indices without a name; false - exclude them.'),
	hide_tickers_with_company_name: z.boolean().optional().describe('Exclude indices with a name. true - exclude indices with a name; false - include them.'),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["regular_market_price_change_percent", ">", 1]')
	),
	sort_by: getSortBySchema('regular_market_price_change_percent'),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type MarketIndexInput = z.infer<typeof marketIndexInputSchema>;
