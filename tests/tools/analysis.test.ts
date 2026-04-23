import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { analysisAnalystsHandler } from '../../src/tools/analysis/analysts/handler.js';
import { analysisEarningsHandler } from '../../src/tools/analysis/earnings/handler.js';
import { analysisRecommendationsHandler } from '../../src/tools/analysis/recommendations/handler.js';
import { analysisUpgradesDowngradesHandler } from '../../src/tools/analysis/upgrades-downgrades/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_analysis_analysts', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns analysts for AAPL', async () => {
		const result = await analysisAnalystsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_analysis_earnings', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns earnings for AAPL', async () => {
		const result = await analysisEarningsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_analysis_recommendations', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns recommendations for AAPL', async () => {
		const result = await analysisRecommendationsHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_analysis_upgrades_downgrades', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns upgrades/downgrades for AAPL', async () => {
		const result = await analysisUpgradesDowngradesHandler({ symbol: 'AAPL', limit: 3 }, client);
		assertSuccess(result.content[0].text as string);
	});
});
