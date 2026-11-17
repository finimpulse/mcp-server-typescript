import {z} from 'zod';
import {getFilterDescription, getFilterExpression, getSortBySchema} from '../../../utils/filters.js';

export const secFilingsInsiderTransactionsInputSchema = z.object({
	symbol: z.string().min(1).optional().describe(
		'Asset identifier (ticker symbol). Required if cik is not provided. Takes priority when both are specified.'
	),
	cik: z.string().optional().describe('Central Index Key (CIK) of the company, up to 10 digits. Required if symbol is not provided.'),
	accession_number: z.string().min(1).describe(
		'Unique SEC accession number of the Form 4 or Form 4/A filing. Get it (with symbol and cik) from get_sec_filings_events filtered by form.'
	),
	transaction_types: z.array(
		z.enum(['non_derivative_transaction', 'derivative_transaction', 'non_derivative_holding', 'derivative_holding', 'unknown'])
	).optional().describe(
		'Record types to return. Any combination of: non_derivative_transaction, derivative_transaction, non_derivative_holding, derivative_holding, unknown. If omitted, all types are returned.'
	),
	filters: getFilterExpression().optional().describe(
		getFilterDescription('"filters": ["transaction_code", "=", "S"]') + '\nSupported on all fields except owner_relationship and transaction_type (use transaction_types instead).'
	),
	sort_by: getSortBySchema('transaction_date', 'Results are sorted by transaction_type in ascending order by default.'),
	limit: z.number().int().min(1).max(1000).optional().describe('Maximum number of matched items returned. Default: 100, maximum: 1000.'),
	offset: z.number().int().min(0).optional().describe('Pagination offset (0-based).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier (max 255 characters). Returned in the response; does not affect processing.'),
});

export type SecFilingsInsiderTransactionsInput = z.infer<typeof secFilingsInsiderTransactionsInputSchema>;
