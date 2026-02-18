import {z} from 'zod';

export const holdingsGeneralInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type HoldingsGeneralInput = z.infer<typeof holdingsGeneralInputSchema>;
