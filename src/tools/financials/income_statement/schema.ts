import {z} from 'zod';

export const financialsIncomeStatementInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	intervals: z.array(z.enum(['annual', 'quarterly', 'trailing'])).optional().describe(
		'Reporting frequencies to return. Supported values: annual, quarterly, trailing. If none are provided, all supported intervals are returned.'
	),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date range filter (YYYY-MM-DD).'),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date range filter (YYYY-MM-DD).'),
});

export type FinancialsIncomeStatementInput = z.infer<typeof financialsIncomeStatementInputSchema>;
