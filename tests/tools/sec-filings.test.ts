import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { secFilingsEventsHandler } from '../../src/tools/sec-filings/events/handler.js';
import { secFilingsInsiderTransactionsHandler } from '../../src/tools/sec-filings/insider-transactions/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_sec_filings_events', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns filing events for AAPL', async () => {
		const result = await secFilingsEventsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_sec_filings_insider_transactions', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns Form 4 records for a filing of AAPL', async () => {
		const events = await secFilingsEventsHandler({ symbol: 'AAPL', filters: ['form', '=', '4'], limit: 1 }, client);
		const parsed = assertSuccess(events.content[0].text as string);
		const filing = parsed.result.items[0];
		expect(filing?.accession_number).toBeDefined();

		const result = await secFilingsInsiderTransactionsHandler(
			{ symbol: filing.symbol, cik: filing.cik, accession_number: filing.accession_number, limit: 3 },
			client,
		);
		assertSuccess(result.content[0].text as string);
	});

	it('returns the API validation message when both symbol and cik are missing', async () => {
		const result = await secFilingsInsiderTransactionsHandler({ accession_number: '0001185185-26-005515' }, client);
		expect(result.isError).toBe(true);
		expect(result.content[0].text).toMatch(/^Error: FinImpulse API returned HTTP 422 \(Code: 40000\): .*symbol field is required when cik is not present/);
	});
});
