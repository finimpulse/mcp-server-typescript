import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../utils/filters.js';

export const newsInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	types: z.array(z.enum(['news', 'press_release'])).optional().describe(
		'News types to include. Supported values: news, press_release. If no values are provided, all supported types are returned.'
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Start of the date range filter (YYYY-MM-DD). If omitted, news from the earliest available date is returned.'
	),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'End of the date range filter (YYYY-MM-DD). If omitted, news up to the most recent available date is returned.'
	),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["title", "contains", "Buyback"]')
	),
	sort_by: getSortBySchema('pub_date'),
	limit: z.number().int().min(1).max(1000).optional().describe(
		'Maximum number of matched items returned. Default: 100, maximum: 1000.'
	),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
});

export type NewsInput = z.infer<typeof newsInputSchema>;
