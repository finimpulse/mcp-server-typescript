import {z} from 'zod';

export const summaryInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type SummaryInput = z.infer<typeof summaryInputSchema>
