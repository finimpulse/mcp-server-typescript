import {z} from 'zod';

export const financialsGeneralInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	types: z.array(z.enum(['income_statement', 'balance_sheet', 'cash_flow', 'valuation_measures'])).optional().describe(
		'Data blocks to return. Available values: income_statement, balance_sheet, cash_flow, valuation_measures. If none are provided, all supported types are returned.'
	),
	intervals: z.array(z.enum(['annual', 'quarterly', 'trailing'])).optional().describe(
		'Reporting frequencies to return. Supported values: annual, quarterly, trailing. If none are provided, all supported intervals are returned.'
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date range filter (YYYY-MM-DD).'),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date range filter (YYYY-MM-DD).'),
});

export type FinancialsGeneralInput = z.infer<typeof financialsGeneralInputSchema>;
