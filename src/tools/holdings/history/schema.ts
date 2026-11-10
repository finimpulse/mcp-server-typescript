import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const holdingsHistoryInputSchema = z.object({
	symbol: z.string().min(1).describe('ETF identifier (ticker symbol).'),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe(
		'Holdings reporting date (YYYY-MM-DD). Must be a date available for the requested symbol; use get_holdings_history_dates to retrieve valid dates.'
	),
	limit: z.number().int().min(1).optional().describe('Maximum number of matched records returned.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["weight_pct", ">", 1]')
	),
	sort_by: getSortBySchema('weight_pct'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type HoldingsHistoryInput = z.infer<typeof holdingsHistoryInputSchema>;
