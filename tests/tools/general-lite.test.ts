import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { searchLiteHandler } from '../../src/tools/search-lite/handler.js';
import { summaryLiteHandler } from '../../src/tools/summary-lite/handler.js';
import { marketPriceHandler } from '../../src/tools/market-price/handler.js';
import { metricsHandler } from '../../src/tools/metrics/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_search_lite', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns results for query "Apple"', async () => {
		const result = await searchLiteHandler({ search_text: 'Apple', limit: 3 }, client);
		assertSuccess((result.content[0] as { text: string }).text);
	});
});

describe('get_summary_lite', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns summary for AAPL', async () => {
		const result = await summaryLiteHandler({ symbol: 'AAPL' }, client);
		assertSuccess((result.content[0] as { text: string }).text);
	});
});

describe('get_market_price', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns market price for AAPL', async () => {
		const result = await marketPriceHandler({ symbol: 'AAPL' }, client);
		assertSuccess((result.content[0] as { text: string }).text);
	});
});

describe('get_metrics', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns metrics for NVDA', async () => {
		const result = await metricsHandler({ symbol: 'NVDA' }, client);
		assertSuccess((result.content[0] as { text: string }).text);
	});
});
