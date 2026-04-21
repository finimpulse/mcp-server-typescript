import {z} from 'zod';
import {getFilterExpression} from '../../../utils/filters.js';

export const analysisEarningsInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
	types: z.array(z.enum([
		'eps_actual',
		'earnings_revenue',
		'earnings',
		'revenue',
		'eps_trend',
		'eps_revisions',
		'growth',
	])).optional().describe(
		'List of analysis record types to return. If omitted, all types are returned. ' +
		'Supported values: eps_actual, earnings_revenue, earnings, revenue, eps_trend, eps_revisions, growth.'
	),
	methodologies: z.array(z.enum(['gaap', 'normalized'])).optional()
		.describe('Accounting methodologies to filter earnings data. Values: "gaap", "normalized".'),
	comparison_symbols: z.array(z.string()).optional()
		.describe('Tickers or indices to include in growth estimate comparisons. S&P 500 is always included by default.'),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
		.describe('Start date filter (YYYY-MM-DD).'),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
		.describe('End date filter (YYYY-MM-DD).'),
	limit: z.number().min(1).max(5000).default(10).optional()
		.describe('Maximum number of items to return.'),
	offset: z.number().min(0).optional()
		.describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions. Each condition is defined as [field, operator, value]. Conditions can be combined using "and"/"or".

Supported operators:
Numeric fields: >, >=, <, <=, =, <>
String fields: like, not_like, contains, not_contains, startswith, endswith

Example: [["actual", "=", 1.57], "and", ["surprise_pct", "<>", 4.52]]`
	),
	sort_by: z.array(z.object({
		selector: z.string().describe('Field to sort by (e.g., date).'),
		desc: z.boolean().describe('true = descending, false = ascending.'),
	})).optional().describe('Sort configuration. Example: [{"selector": "date", "desc": true}]'),
	tag: z.string().max(255).optional()
		.describe('User-defined request identifier returned in the response (max 255 characters).'),
});

export type AnalysisEarningsInput = z.infer<typeof analysisEarningsInputSchema>;
