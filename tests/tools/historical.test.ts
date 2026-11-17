import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { historiesHandler } from '../../src/tools/historical/handler.js';
import { historiesCurrenciesHandler } from '../../src/tools/historical/currencies/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_histories', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns historical data for AAPL 1d/1mo', async () => {
		const result = await historiesHandler({ symbol: 'AAPL', interval: '1d', range: '1mo' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_histories_currencies', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns historical rates for EUR/USD', async () => {
		const result = await historiesCurrenciesHandler({ currency_from: 'EUR', currency_to: 'USD', interval: '1mo', sort_by: [{ selector: 'date', desc: false }], limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
