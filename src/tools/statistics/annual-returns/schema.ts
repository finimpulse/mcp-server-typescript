import {z} from 'zod';

export const statisticsAnnualReturnsInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
});

export type StatisticsAnnualReturnsInput = z.infer<typeof statisticsAnnualReturnsInputSchema>;
