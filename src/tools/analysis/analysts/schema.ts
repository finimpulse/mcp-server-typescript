import {z} from 'zod';
import {getFilterExpression} from '../../../utils/filters.js';

export const analysisAnalystsInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
	limit: z.number().min(1).max(5000).default(10).optional()
		.describe('Maximum number of analyst records to return.'),
	offset: z.number().min(0).optional()
		.describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions. Each condition is defined as [field, operator, value]. Conditions can be combined using "and"/"or".

Supported operators:
Numeric fields: >, >=, <, <=, =, <>
String fields: like, not_like, contains, not_contains, startswith, endswith

Example: [["rating_sentiment", "=", 1], "and", ["analyst", "<>", "Wedbush"]]`
	),
	sort_by: z.array(z.object({
		selector: z.string().describe('Field to sort by (e.g., announcement_date).'),
		desc: z.boolean().describe('true = descending, false = ascending.'),
	})).optional().describe('Sort configuration. Example: [{"selector": "announcement_date", "desc": true}]'),
	tag: z.string().max(255).optional()
		.describe('User-defined request identifier returned in the response (max 255 characters).'),
});

export type AnalysisAnalystsInput = z.infer<typeof analysisAnalystsInputSchema>;
