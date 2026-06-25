---
title: Search Lite
endpoint: POST v1/search-lite
auth: Bearer Token
---

# Search Lite

Returns a unified, cross-asset search result for stocks, ETFs, and mutual funds with a focused field set covering core identification, current pricing, and key performance metrics.

Designed for search scenarios where a full field set is not required, this endpoint allows searching across stocks, ETFs, and mutual funds and returns core identification, pricing, and performance data only. The response field set is fixed, but it is possible to control which fields are included through the `select_identifiers` parameter. For a comprehensive field set use the `/v1/search` endpoint.

## When to Use This Endpoint
- Search across stocks, ETFs, and mutual funds and retrieve core identification, pricing, and performance data in a single request.
- Build asset search interfaces and autocomplete flows with essential identification and price fields.
- Retrieve only the fields required for a specific use case by specifying them through the `select_identifiers` parameter.

## Request Parameters
**POST** `v1/search-lite`

- **search_text** `string` *(optional)* — Free-text query (e.g., "NVDA", "NVIDIA", partial ticker, partial name).
- **select_identifiers** `array` *(optional)* — A list of field names to include in the response. When not provided or null, the full field set is returned. `symbol` and `logo` are always returned.
- **quote_types** `array` *(optional)* — Controls which asset types are included: `stock`, `etf`, `mutualfund`. If none are provided, all supported asset types are returned.
- **symbols** `array` *(optional)* — A list of ticker symbols to retrieve. When provided, only the specified tickers are returned. Missing symbols are excluded.
- **offset** `integer` *(optional)* — Pagination offset (0-based).
- **limit** `integer` *(optional)* — Maximum number of matched items returned.
- **filters** `array` *(optional)* — Optional filter expressions. Each condition is `[field, operator, value]`, combined with `and`/`or`. Numeric operators: `>`, `>=`, `<`, `<=`, `=`, `<>`. String operators: `like`, `not_like`, `contains`, `not_contains`, `startswith`, `endswith` (`%` wildcard).
- **sort_by** `array` *(optional)* — Sorting config. Each setup is `{ "selector": "amount_usd", "desc": true }`.
- **has_public_financial_reports** `boolean` *(optional)* — Filter on whether the company provides public financial statements.
- **show_tickers_without_company_name** `boolean` *(optional)* — Include tickers with missing names.
- **hide_tickers_with_company_name** `boolean` *(optional)* — Exclude tickers with available names.
- **tag** `string` *(optional)* — User-defined task identifier (max 255 characters). Returned in the response data object.

### Example Request

```bash
curl --location "https://api.finimpulse.com/v1/search-lite" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "search_text": "stock",
      "select_identifiers": ["display_name", "short_name", "long_name", "quote_type"],
      "offset": 0,
      "limit": 10,
      "tag": "just tag"
  }'
```

## Response
Contains pagination metadata and a list of matched assets. Returned fields depend on `select_identifiers`.

### Pagination Fields
- **total_count** `integer` — Total number of matching assets.
- **search_after_token** `string` — Token for pagination; pass in the next request to fetch the next page.
- **items_count** `integer` — Number of items returned.
- **items** `array` — Array of matched instruments. The same underlying company/fund can appear multiple times across exchanges/currencies.

### Identification Fields
- **symbol** `string` — Asset identifier (ticker symbol).
- **logo** `string` — URL of the company or fund logo image.
- **display_name** `string` — Asset display name.
- **short_name** `string` — Short descriptive name.
- **long_name** `string` — Full legal or formal name.
- **quote_type** `string` — Asset class identifier (stock, etf, mutualfund).

### Asset Fundamentals
- **sector** `string` — Sector classification.
- **industry** `string` — Industry classification.

### Trading & Exchange Info
- **currency** `string` — Trading currency.
- **exchange** `string` — Exchange code.

### Price Data
- **current_price** `number` — Most recent traded price (may be delayed up to one hour).
- **current_price_usd** `number` — Most recent traded price, normalized to USD.
- **regular_market_price** `number` — Active price during the regular session and at close.
- **regular_market_price_usd** `number` — Regular market price normalized to USD.
- **regular_market_price_change** `number` — Absolute regular market change (local currency).
- **regular_market_price_change_usd** `number` — Absolute regular market change, USD.
- **regular_market_price_change_percent** `number` — Percentage regular market change.
- **pre_market_price_usd** `number` — Pre-market price, USD (null if unavailable).
- **post_market_price_usd** `number` — Post-market price, USD (null if unavailable).
- **fifty_two_week_low** `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high** `number` — Highest price in the last 52 weeks.

### Other Market Data
- **regular_market_volume** `integer` — Trading volume for the regular market session.
- **amount** `number` — Market cap in local currency.
- **amount_usd** `number` — USD-normalized market cap.
- **dividend_yield** `number` — Forward dividend yield.
- **one_year_return** `number` — Total return over the past year.

### Example Response

```json
{
    "task_id": "06181746-0022-0056-0000-1baa11c0ea68",
    "status_code": 20000,
    "status_message": "OK",
    "live": true,
    "cost": 0.00055,
    "data": {
        "limit": 10,
        "offset": 0,
        "tag": "just tag",
        "search_text": "stock",
        "select_identifiers": ["display_name", "short_name", "long_name"]
    },
    "result": {
        "total_count": 2841,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6...",
        "items_count": 1,
        "items": [
            {
                "symbol": "VTI",
                "display_name": null,
                "short_name": "Vanguard Total Stock Market ETF",
                "long_name": "Vanguard Total Stock Market Index Fund ETF Shares",
                "logo": "https://cdn.finimpulse.com/e95392c7-2f34-5f72-2e20-1cba9926c2fc"
            }
        ]
    }
}
```

## Notes
- Some fields may be null depending on asset type and data coverage.
- Field-level definitions are available in the [**Glossary**](https://finimpulse.com/glossary/).
