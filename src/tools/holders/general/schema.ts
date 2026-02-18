import {z} from 'zod';

export const holdersGeneralInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type HoldersGeneralInput = z.infer<typeof holdersGeneralInputSchema>;
