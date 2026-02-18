import {defaultGlobalToolConfig} from '../config/global.tool.js';
import {z} from 'zod';

export function getFilterExpression(): z.ZodType<any> {
	if (defaultGlobalToolConfig.simpleFilter) {
		// Permissive filter schema for LLM tool compatibility (e.g., OpenAI/ChatGPT).
		// If you modify this behavior, re-verify compatibility with OpenAI tools.
		return z.any();
	}
	return z.array(z.union([z.array(z.union([z.string(), z.number(), z.boolean()])).length(3), z.enum(["and", "or"]), z.array(z.unknown()).length(3), z.union([z.string(), z.number(), z.unknown()]), z.any()])).max(3);
}
