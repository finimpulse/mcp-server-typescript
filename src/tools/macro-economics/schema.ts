import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../utils/filters.js';

export const macroEconomicsInputSchema = z.object({
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["country_iso3", "=", "CHE"]') + '\nFilterable fields include country_iso3 (ISO 3166-1 alpha-3) and year.'
	),
	sort_by: getSortBySchema('year'),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type MacroEconomicsInput = z.infer<typeof macroEconomicsInputSchema>;
