import {z} from 'zod';

export const metricsInputSchema = z.object({
	symbol: z.string().describe('Asset identifier (ticker symbol).'),
	tag: z.string().max(255).optional().describe('User-defined request identifier.'),
});

export type MetricsInput = z.infer<typeof metricsInputSchema>;
