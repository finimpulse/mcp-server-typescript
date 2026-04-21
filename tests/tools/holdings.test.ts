import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { holdingsGeneralHandler } from '../../src/tools/holdings/general/handler.js';
import { holdingsTopHoldingsHandler } from '../../src/tools/holdings/top-holdings/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

// Holdings data is only available for ETFs and mutual funds, not individual stocks
describe('get_holdings_general', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns general holdings for SPY', async () => {
		const result = await holdingsGeneralHandler({ symbol: 'SPY' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holdings_top_holdings', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns top holdings for SPY', async () => {
		const result = await holdingsTopHoldingsHandler({ symbol: 'SPY', limit: 5 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
