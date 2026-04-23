# Integration Tests

Tests call tool handlers directly via `ApiClient` — no MCP protocol, no subprocess.

## Requirements

A valid `API_TOKEN` from [finimpulse.com](https://finimpulse.com).

## Run

**All tests:**
```bash
API_TOKEN=your-token npm test
```

**Single group:**
```bash
API_TOKEN=your-token npx vitest run tests/tools/analysis.test.ts
```

**Verbose output:**
```bash
API_TOKEN=your-token npx vitest run --reporter=verbose
```

**Watch mode (reruns on file save):**
```bash
API_TOKEN=your-token npm run test:watch
```

## Test files

| File | Tools covered |
|------|--------------|
| `search-summary-profile-news.test.ts` | `get_search`, `get_summary`, `get_profile`, `get_news` |
| `historical.test.ts` | `get_histories` |
| `analysis.test.ts` | `get_analysis_analysts`, `get_analysis_earnings`, `get_analysis_recommendations`, `get_analysis_upgrades_downgrades` |
| `holders.test.ts` | `get_holders_general`, `get_holders_institutional`, `get_holders_mutual_funds`, `get_holders_insiders`, `get_holders_insiders_transactions` |
| `financials.test.ts` | `get_financials_general`, `get_financials_income_statement`, `get_financials_balance_sheet`, `get_financials_cash_flow`, `get_financials_valuation_measures` |
| `statistics.test.ts` | `get_statistics_general`, `get_statistics_risks`, `get_statistics_annual_returns` |
| `holdings.test.ts` | `get_holdings_general`, `get_holdings_top_holdings` |
| `options.test.ts` | `get_options_expirations`, `get_options_chain`, `get_options_contracts` |

> `get_holdings_*` use ticker `SPY` (ETF) — holdings data is only available for ETFs and mutual funds.
