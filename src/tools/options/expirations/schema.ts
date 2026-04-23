import {z} from 'zod';

export const optionsExpirationsInputSchema = z.object({
	symbol: z.string().min(1).describe('Asset identifier (ticker symbol) to retrieve available option expiration dates for.'),
});

export type OptionsExpirationsInput = z.infer<typeof optionsExpirationsInputSchema>;
