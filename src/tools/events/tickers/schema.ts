import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const eventsTickersInputSchema = z.object({
	event_types: z.array(z.enum(['earnings', 'ipo'])).optional().describe(
		'Types of corporate events to include. Supported values: earnings, ipo. If not specified, events of all types are returned.'
	),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["symbol", "=", "AAPL"]')
	),
	sort_by: getSortBySchema('start_date_time', 'By default, results are sorted by start_date_time in descending order, then by symbol in alphabetical order.'),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type EventsTickersInput = z.infer<typeof eventsTickersInputSchema>;
