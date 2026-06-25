import {z} from 'zod';

export const marketPriceInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol).'),
});

export type MarketPriceInput = z.infer<typeof marketPriceInputSchema>;
