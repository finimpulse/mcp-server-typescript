import {z} from 'zod';

export const statisticsGeneralInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type StatisticsGeneralInput = z.infer<typeof statisticsGeneralInputSchema>;
