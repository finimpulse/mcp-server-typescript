import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { statisticsGeneralHandler } from '../../src/tools/statistics/general/handler.js';
import { statisticsRisksHandler } from '../../src/tools/statistics/risks/handler.js';
import { statisticsAnnualReturnsHandler } from '../../src/tools/statistics/annual-returns/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_statistics_general', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns general statistics for AAPL', async () => {
		const result = await statisticsGeneralHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_statistics_risks', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns risk statistics for AAPL', async () => {
		const result = await statisticsRisksHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_statistics_annual_returns', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns annual returns for AAPL', async () => {
		const result = await statisticsAnnualReturnsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
