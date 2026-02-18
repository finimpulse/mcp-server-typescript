import {z} from 'zod';

export const profileInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
