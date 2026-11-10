import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { eventsTickersHandler } from '../../src/tools/events/tickers/handler.js';

const TOKEN = process.env.SANDBOX_API_TOKEN ?? process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_events_tickers', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('SANDBOX_API_TOKEN or API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns earnings and IPO events', async () => {
		const result = await eventsTickersHandler({ limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});

	it('filters earnings events by symbol', async () => {
		const result = await eventsTickersHandler(
			{ event_types: ['earnings'], filters: ['symbol', '=', 'AAPL'], limit: 3 },
			client,
		);
		assertSuccess(result.content[0].text as string);
	});
});
