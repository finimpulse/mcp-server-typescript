import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { holdingsGeneralHandler } from '../../src/tools/holdings/general/handler.js';
import { holdingsTopHoldingsHandler } from '../../src/tools/holdings/top-holdings/handler.js';
import { holdingsHistoryDatesHandler } from '../../src/tools/holdings/history-dates/handler.js';
import { holdingsHistoryHandler } from '../../src/tools/holdings/history/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

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
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
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
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns top holdings for SPY', async () => {
		const result = await holdingsTopHoldingsHandler({ symbol: 'SPY', limit: 5 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holdings_history_dates', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns reporting dates for SPY', async () => {
		const result = await holdingsHistoryDatesHandler({ symbol: 'SPY', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_holdings_history', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns the holdings snapshot for SPY on an available date', async () => {
		// The date should come from get_holdings_history_dates. The Sandbox may return no dates,
		// so fall back to a fixed date to still exercise the request.
		const datesResult = await holdingsHistoryDatesHandler({ symbol: 'SPY', limit: 1 }, client);
		const dates = assertSuccess(datesResult.content[0].text as string);
		const date = JSON.stringify(dates.result).match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '2026-05-18';

		const result = await holdingsHistoryHandler({ symbol: 'SPY', date, limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
