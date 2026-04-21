import {z} from 'zod';
import {getFilterExpression} from '../../../utils/filters.js';

export const analysisUpgradesDowngradesInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
	start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
		.describe('Start date filter (YYYY-MM-DD).'),
	end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
		.describe('End date filter (YYYY-MM-DD).'),
	limit: z.number().min(1).max(5000).default(10).optional()
		.describe('Maximum number of analyst action records to return.'),
	offset: z.number().min(0).optional()
		.describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions. Each condition is defined as [field, operator, value]. Conditions can be combined using "and"/"or".

Supported operators:
Numeric fields: >, >=, <, <=, =, <>
String fields: like, not_like, contains, not_contains, startswith, endswith

Example: [["prior_price_target", "=", 330], "and", ["firm", "<>", "Wedbush"]]`
	),
	sort_by: z.array(z.object({
		selector: z.string().describe('Field to sort by (e.g., grade_date).'),
		desc: z.boolean().describe('true = descending, false = ascending.'),
	})).optional().describe('Sort configuration. Example: [{"selector": "grade_date", "desc": true}]'),
	tag: z.string().max(255).optional()
		.describe('User-defined request identifier returned in the response (max 255 characters).'),
});

export type AnalysisUpgradesDowngradesInput = z.infer<typeof analysisUpgradesDowngradesInputSchema>;
