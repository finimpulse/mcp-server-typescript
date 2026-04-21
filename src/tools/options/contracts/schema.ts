import {z} from 'zod';

export const optionsContractsInputSchema = z.object({
	contract_name: z.string().min(1).describe('Full option contract identifier (e.g., NVDA260311C00155000).'),
});

export type OptionsContractsInput = z.infer<typeof optionsContractsInputSchema>;
