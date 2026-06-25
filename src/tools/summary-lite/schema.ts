import {z} from 'zod';

export const summaryLiteInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	select_identifiers: z.array(z.string()).optional().describe(
		`A list of field names to include in the response. When provided, the response contains only the specified fields. When not provided or set to null, the full field set is returned. "symbol" and "logo" are always returned regardless of the value passed.`
	),
	tag: z.string().max(255).optional().describe('User-defined request identifier.'),
});

export type SummaryLiteInput = z.infer<typeof summaryLiteInputSchema>;
