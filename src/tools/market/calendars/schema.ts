import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const marketCalendarsInputSchema = z.object({
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["country_code_iso3", "=", "USA"]') + '\nFilterable fields include country_code_iso3, economic_release, start_date_time and period.'
	),
	sort_by: getSortBySchema('start_date_time', 'By default, results are sorted by start_date_time in descending order, then by economic_release in alphabetical order.'),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type MarketCalendarsInput = z.infer<typeof marketCalendarsInputSchema>;
