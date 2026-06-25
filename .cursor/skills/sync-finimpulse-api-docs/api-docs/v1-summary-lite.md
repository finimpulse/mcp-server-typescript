---
title: Summary Lite
endpoint: POST v1/summary-lite
auth: Bearer Token
---

# Summary Lite

Returns a focused snapshot of key identification, market, and fundamental data for a single asset symbol.

This endpoint retrieves core identification, current pricing, key valuation metrics, and fundamental data for a single asset symbol. The response field set is fixed, but it is possible to control which fields are included through the `select_identifiers` parameter. For a comprehensive field set use the `/v1/summary` endpoint.

## Asset Type Compatibility
Uses a unified schema across stocks, ETFs, and mutual funds. Fields not relevant for a given asset type are returned as null.

- **Stocks:** Company identification, price data, valuation multiples, dividends, volume, market cap, and beta.
- **ETFs:** Fund identification, price data, volume, and market cap. Valuation multiples and company-specific fields are generally not applicable.
- **Mutual funds:** Fund identification and price data. Most market and valuation fields are generally not applicable.

## When to Use This Endpoint
- Retrieve key identification, pricing, and fundamental data for a single asset symbol.
- Populate asset detail views, widgets, or dashboards where only core metrics are needed.
- Retrieve only the fields required for a specific use case by specifying them through the `select_identifiers` parameter.

## Request Parameters
**POST** `v1/summary-lite`

- **symbol** `string` *(required)* — Asset identifier (ticker symbol).
- **select_identifiers** `array` *(optional)* — A list of field names to include in the response. When not provided or null, the full field set is returned. `symbol` and `logo` are always returned.
- **tag** `string` *(optional)* — User-defined task identifier (max 255 characters). Returned in the response data object.

### Example Request

```bash
curl --location "https://api.finimpulse.com/v1/summary-lite" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "select_identifiers": ["display_name", "quote_type"],
      "tag": "just tag"
  }'
```

## Response
Returns a single summary object for the requested symbol. Returned fields depend on `select_identifiers`.

### Identity & Classification
- **symbol** `string` — Asset symbol (ticker).
- **logo** `string` — URL of the company or fund logo image.
- **display_name** `string` — Asset display name.
- **quote_type** `string` — Asset class identifier (stock, etf, mutualfund).
- **full_time_employees** `integer` — Number of full-time employees.

### Address & Contact
- **city** `string` — City.
- **country** `string` — Country.
- **website** `string` — Official website URL.

### Sector & Industry Classification
- **sector** `string` — Sector name.
- **industry** `string` — Industry name.

### Price Data
- **current_price** `number` — Most recent traded price (may be delayed up to one hour).
- **current_price_usd** `number` — Most recent traded price, normalized to USD.
- **regular_market_price_usd** `number` — Regular session price normalized to USD.
- **pre_market_price_usd** `number` — Pre-market price, USD (null if unavailable).
- **post_market_price_usd** `number` — Post-market price, USD (null if unavailable).
- **fifty_two_week_low** `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high** `number` — Highest price in the last 52 weeks.

### Dividends & Distributions
- **dividend_rate** `number` — Forward annual dividend rate.
- **dividend_yield** `number` — Forward dividend yield.

### Market & Risk Metrics
- **average_volume** `integer` — Average volume.
- **average_volume_10days** `integer` — Average volume over the last 10 trading days.
- **market_cap** `number` — Market capitalization.
- **beta** `number` — Beta vs benchmark.

### Valuation Measures - Internal Snapshot (Stocks)
- **valuation_measures_pe_ratio** `number` — P/E ratio.
- **valuation_measures_forward_pe_ratio** `number` — Forward P/E ratio.
- **valuation_measures_pb_ratio** `number` — Price-to-book ratio.
- **valuation_measures_ps_ratio** `number` — Price-to-sales ratio.

### Example Response

```json
{
    "task_id": "06181819-0022-0057-0000-530898c9b9da",
    "status_code": 20000,
    "status_message": "OK",
    "live": true,
    "cost": 0.0002,
    "data": {
        "symbol": "NVDA",
        "tag": "just tag"
    },
    "result": {
        "symbol": "NVDA",
        "display_name": "NVIDIA",
        "quote_type": "equity",
        "logo": "https://cdn.finimpulse.com/f77c41e6-f5cd-653b-1d73-b179528f1095",
        "sector": "Technology",
        "industry": "Semiconductors",
        "country": "United States",
        "city": "Santa Clara",
        "website": "https://www.nvidia.com",
        "full_time_employees": 42000,
        "current_price": 209.7321,
        "current_price_usd": 209.7321,
        "fifty_two_week_low": 140.85,
        "fifty_two_week_high": 236.54,
        "dividend_rate": 1,
        "dividend_yield": 0.0049,
        "average_volume": 166129995,
        "average_volume_10days": 188416280,
        "market_cap": 5023677808640,
        "beta": 2.202
    }
}
```

## Notes
- Percent-like fields are returned as fractions (e.g., 0.02 = 2%).
- Some fields may be null depending on asset type and data coverage.
