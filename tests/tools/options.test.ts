import { describe, it, expect, beforeAll } from 'vitest';
import { ApiClient } from '../../src/http/client.js';
import { optionsChainHandler } from '../../src/tools/options/chain/handler.js';
import { optionsContractsHandler } from '../../src/tools/options/contracts/handler.js';
import { optionsExpirationsHandler } from '../../src/tools/options/expirations/handler.js';

const TOKEN = process.env.API_TOKEN;

function assertSuccess(text: string) {
	expect(text).not.toMatch(/^Error:/);
	const parsed = JSON.parse(text);
	expect(parsed.status_code).toBe(20000);
	expect(parsed.data).toBeDefined();
	return parsed;
}

describe('get_options_expirations', () => {
	let client: ApiClient;
	beforeAll(() => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
	});

	it('returns expirations for AAPL', async () => {
		const result = await optionsExpirationsHandler({ symbol: 'AAPL' }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_options_chain', () => {
	let client: ApiClient;
	let expirationDate: string;

	beforeAll(async () => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
		// Fetch the nearest expiration date dynamically
		const expResult = await optionsExpirationsHandler({ symbol: 'AAPL' }, client);
		const expParsed = JSON.parse(expResult.content[0].text as string);
		expirationDate = expParsed.result.items[0].expiration_date;
	});

	it('returns options chain for AAPL with valid expiration date', async () => {
		const result = await optionsChainHandler({ symbol: 'AAPL', expiration_date: expirationDate, limit: 5 }, client);
		assertSuccess(result.content[0].text as string);
	});
});

describe('get_options_contracts', () => {
	let client: ApiClient;
	let contractName: string;

	beforeAll(async () => {
		if (!TOKEN) throw new Error('API_TOKEN env var is required');
		client = new ApiClient(TOKEN);
		// Fetch a real contract name from the chain
		const expResult = await optionsExpirationsHandler({ symbol: 'AAPL' }, client);
		const expParsed = JSON.parse(expResult.content[0].text as string);
		const expirationDate: string = expParsed.result.items[0].expiration_date;
		const chainResult = await optionsChainHandler({ symbol: 'AAPL', expiration_date: expirationDate, limit: 1 }, client);
		const chainParsed = JSON.parse(chainResult.content[0].text as string);
		contractName = chainParsed.result.items[0].contract_name;
	});

	it('returns contract details for a real AAPL contract', async () => {
		const result = await optionsContractsHandler({ contract_name: contractName }, client);
		assertSuccess(result.content[0].text as string);
	});
});
