import {z} from 'zod';
import {getFilterExpression} from '../../../utils/filters.js';

export const optionsChainInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
	expiration_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
		.describe('Expiration date to retrieve (YYYY-MM-DD). Use get_options_expirations to discover valid dates.'),
	limit: z.number().min(1).max(5000).default(10).optional()
		.describe('Maximum number of contracts to return.'),
	offset: z.number().min(0).optional()
		.describe('Pagination offset (0-based).'),
	filters: getFilterExpression().optional().describe(
		`Optional filter expressions. Each condition is defined as [field, operator, value]. Conditions can be combined using "and"/"or".

Supported operators:
Numeric fields: >, >=, <, <=, =, <>
String fields: like, not_like, contains, not_contains, startswith, endswith

Example: [["contract_size", "=", "REGULAR"], "and", ["bid", "<>", 0]]`
	),
	sort_by: z.array(z.object({
		selector: z.string().describe('Field to sort by (e.g., last_trade_date).'),
		desc: z.boolean().describe('true = descending, false = ascending.'),
	})).optional().describe('Sort configuration. Example: [{"selector": "last_trade_date", "desc": true}]'),
	tag: z.string().max(255).optional()
		.describe('User-defined request identifier returned in the response (max 255 characters).'),
});

export type OptionsChainInput = z.infer<typeof optionsChainInputSchema>;
