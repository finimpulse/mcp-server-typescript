import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const secFilingsEventsInputSchema = z.object({
	symbol: z.string().min(1).optional().describe('Asset identifier (ticker symbol).'),
	cik: z.string().optional().describe('Central Index Key (CIK).'),
	start_filing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Start of the filing date range filter (YYYY-MM-DD). Minimum supported date is 1990-01-01.'
	),
	end_filing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'End of the filing date range filter (YYYY-MM-DD). Minimum supported date is 1990-01-01.'
	),
	limit: z.number().int().min(1).optional().describe('Maximum number of matched items returned.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["form", "=", "8-K"]') + '\nSupported on all fields except file_url.'
	),
	sort_by: getSortBySchema('cik', 'Results are sorted by filing_date in descending order by default.'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type SecFilingsEventsInput = z.infer<typeof secFilingsEventsInputSchema>;
