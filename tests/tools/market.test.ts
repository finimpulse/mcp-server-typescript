import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { marketIndexHandler } from '../../src/tools/market/index/handler.js';
import { marketCalendarsHandler } from '../../src/tools/market/calendars/handler.js';
import { macroEconomicsHandler } from '../../src/tools/macro-economics/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_market_index', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns indices matching a search text', async () => {
		const result = await marketIndexHandler({ search_text: 'S&P 500', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});

	it('returns requested indices by symbol', async () => {
		const result = await marketIndexHandler({ symbols: ['GSPC.INDX', 'DJI.INDX'], limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_market_calendars', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns macroeconomic release events', async () => {
		const result = await marketCalendarsHandler({ limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_macro_economics', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns indicators for Switzerland', async () => {
		const result = await macroEconomicsHandler(
			{ filters: ['country_iso3', '=', 'CHE'], sort_by: [{ selector: 'year', desc: true }], limit: 3 },
			client,
		);
		assertSuccess(result.content[0].text as string);
	});
});
