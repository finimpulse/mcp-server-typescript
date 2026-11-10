import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { secFilingsEventsHandler } from '../../src/tools/sec-filings/events/handler.js';

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
