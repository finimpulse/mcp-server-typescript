import {z} from 'zod';

export const holdingsHistoryDatesInputSchema = z.object({
	symbol: z.string().min(1).describe('ETF identifier (ticker symbol).'),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe(
		'Start of the date range filter (YYYY-MM-DD). Only dates on and after this value are returned. Coverage begins on 2026-01-01 for most ETFs (~500 ETFs go back to 2023-2025).'
	),
	limit: z.number().int().min(1).optional().describe('Maximum number of matched records returned.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type HoldingsHistoryDatesInput = z.infer<typeof holdingsHistoryDatesInputSchema>;
