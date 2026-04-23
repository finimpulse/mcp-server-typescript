import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { holdersGeneralHandler } from '../../src/tools/holders/general/handler.js';
import { holdersInstitutionalHandler } from '../../src/tools/holders/institutional/handler.js';
import { holdersMutualFundsHandler } from '../../src/tools/holders/mutual-funds/handler.js';
import { holdersInsidersHandler } from '../../src/tools/holders/insiders/handler.js';
import { holdersInsidersTransactionsHandler } from '../../src/tools/holders/insiders-transactions/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_holders_general', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns general holders for AAPL', async () => {
		const result = await holdersGeneralHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holders_institutional', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns institutional holders for AAPL', async () => {
		const result = await holdersInstitutionalHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holders_mutual_funds', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns mutual fund holders for AAPL', async () => {
		const result = await holdersMutualFundsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holders_insiders', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns insider holders for AAPL', async () => {
		const result = await holdersInsidersHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holders_insiders_transactions', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns insider transactions for AAPL', async () => {
		const result = await holdersInsidersTransactionsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
