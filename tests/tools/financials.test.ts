import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { financialsGeneralHandler } from '../../src/tools/financials/general/handler.js';
import { financialsIncomeStatementHandler } from '../../src/tools/financials/income_statement/handler.js';
import { financialsBalanceSheetHandler } from '../../src/tools/financials/balance_sheet/handler.js';
import { financialsCashFlowHandler } from '../../src/tools/financials/cash_flow/handler.js';
import { financialsValuationMeasuresHandler } from '../../src/tools/financials/valuation_measures/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_financials_general', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns general financials for AAPL', async () => {
		const result = await financialsGeneralHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_financials_income_statement', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns income statement for AAPL', async () => {
		const result = await financialsIncomeStatementHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_financials_balance_sheet', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns balance sheet for AAPL', async () => {
		const result = await financialsBalanceSheetHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_financials_cash_flow', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns cash flow for AAPL', async () => {
		const result = await financialsCashFlowHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_financials_valuation_measures', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns valuation measures for AAPL', async () => {
		const result = await financialsValuationMeasuresHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
