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

/**
 * Description of the `filters` parameter for endpoints that support the extended operator set
 * (`=`, `<>`, `>`, `>=`, `<`, `<=`, `in` and string operators, combined with and/or/not).
 */
export function getFilterDescription(example: string): string {
	return [
		'Optional filter expressions. Each filter condition is defined as [field, operator, value]. Conditions can be combined using the logical operators and, or, and not.',
		'',
		'Supported operators:',
		'Any field type (numbers, strings, booleans, dates): = (equals), <> (not equal)',
		'Numbers and dates: > (greater than), >= (greater than or equal), < (less than), <= (less than or equal)',
		'List of values: in (matches any value in the list, e.g. ["field", "in", ["value_1", "value_2"]])',
		'Strings: like (pattern match, requires % as a wildcard), not_like (pattern does not match), contains (value exists in string), not_contains (value does not exist in string), startswith, endswith',
		'',
		'% usage examples: %abc% - contains "abc"; abc% - starts with "abc"; %abc - ends with "abc".',
		'String operators are case-sensitive. Dates are compared as text, so pass date values in the same format as the field returns them. Fields that contain arrays cannot be filtered.',
		'',
		`Example: ${example}`,
	].join('\n');
}

/**
 * Zod schema of the `sort_by` parameter: a list of `{selector, desc}` objects.
 */
export function getSortBySchema(selectorExample: string, defaultOrder?: string): z.ZodOptional<z.ZodArray<z.ZodObject<{selector: z.ZodString; desc: z.ZodBoolean}>>> {
	return z.array(
		z.object({
			selector: z.string().describe(`Field used for sorting (e.g., ${selectorExample}).`),
			desc: z.boolean().describe('Sorting direction (true for descending, false for ascending).'),
		}),
	).optional().describe(
		`Optional sorting configuration. Each sorting setup is an object {selector, desc}; multiple setups can be combined in the array.${defaultOrder ? ' ' + defaultOrder : ''}`
	);
}
