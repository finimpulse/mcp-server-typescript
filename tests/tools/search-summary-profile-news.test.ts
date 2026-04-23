import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { searchHandler } from '../../src/tools/search/handler.js';
import { summaryHandler } from '../../src/tools/summary/handler.js';
import { profileHandler } from '../../src/tools/profile/handler.js';
import { newsHandler } from '../../src/tools/news/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_search', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns results for query "Apple"', async () => {
		const result = await searchHandler({ query: 'Apple' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_summary', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns summary for AAPL', async () => {
		const result = await summaryHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_profile', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns profile for AAPL', async () => {
		const result = await profileHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_news', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns news for AAPL', async () => {
		const result = await newsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
