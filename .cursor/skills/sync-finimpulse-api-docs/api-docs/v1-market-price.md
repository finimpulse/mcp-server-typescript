---
title: Market Price
endpoint: GET v1/market-price/{symbol}
auth: Bearer Token
---

# Market Price

Returns the current market price snapshot for a single asset symbol.

The market price endpoint returns the current market price data for a requested ticker. For assets listed on US exchanges, the response includes prices for three trading sessions (pre-market, regular, post-market) as well as a current price field reflecting the most recent traded price. For assets listed on non-US exchanges, only the regular session price and current price are returned.

## Asset Type Compatibility
Applicable to stocks, ETFs, and mutual funds.

- **Stocks and ETFs:** All price fields are returned, including regular market, pre-market, and post-market data, volume, and market capitalization.
- **Mutual funds:** Only the regular market price and change fields are returned. Pre-market and post-market fields, volume, and market capitalization are not applicable.

## When to Use This Endpoint
- Retrieve the current price snapshot for a ticker, including active session data and market state.
- Populate a live price block in a dashboard, widget, or asset detail view.
- Determine which trading session is currently active and select the corresponding price field.
- Build screeners, alerting systems, or automation workflows that require up-to-date session-aware price data.

## Request
**GET** `v1/market-price/{symbol}`

- **symbol** *(path, required)* — Asset identifier (ticker symbol).

### Example Request

```bash
curl --location "https://api.finimpulse.com/v1/market-price/AAPL" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>"
```

## Response

### Identification Fields
- **symbol** `string` — Asset identifier (ticker symbol).
- **name** `string` — Asset display name.
- **quote_type** `string` — Asset class identifier (stock, etf, mutualfund).
- **currency** `string` — Trading currency.
- **market_cap** `number` — Market capitalization.

### Market Info
- **market_state** `string` — Current trading session state: `REGULAR`, `PRE`, `POST`, `CLOSED` (additional values such as `PREPRE`, `POSTPOST`, `OVERNIGHT` may be returned).
- **usd_rate** `number` — FX rate used for USD normalization.

### Current Price
- **current_price** `number` — Most recent traded price (may be delayed up to one hour).
- **current_price_usd** `number` — Most recent traded price, normalized to USD.
- **current_price_change** `number` — Absolute change vs previous regular session close.
- **current_price_change_percent** `number` — Percentage change vs previous regular session close.
- **current_price_update_time** `string` — Timestamp of the most recent data update (ISO 8601).

### Regular Market
- **regular_market_price** `number` — Active price during the regular session and at close.
- **regular_market_price_change** `number` — Absolute regular market change.
- **regular_market_price_change_percent** `number` — Percentage regular market change.
- **regular_market_time** `string` — Timestamp of the last regular market trade.
- **regular_market_open** `number` — Price of the first trade of the current regular session.
- **regular_market_previous_close** `number` — Closing price of the most recent completed regular session.
- **regular_market_volume** `integer` — Trading volume for the regular market session.

### Pre-Market (US-listed assets only)
- **pre_market_price** `number` — Active pre-market price; outside hours returns last traded pre-market price (null if unavailable).
- **pre_market_price_change** `number` — Absolute pre-market change.
- **pre_market_price_change_percent** `number` — Percentage pre-market change.
- **pre_market_time** `string` — Timestamp of the last pre-market trade.

### Post-Market (US-listed assets only)
- **post_market_price** `number` — Active post-market price; outside hours returns last traded post-market price (null if unavailable).
- **post_market_price_change** `number` — Absolute post-market change.
- **post_market_price_change_percent** `number` — Percentage post-market change.
- **post_market_time** `string` — Timestamp of the last post-market trade.

### Example Response

```json
{
    "task_id": "06181843-0022-0055-0000-dc5446d6e937",
    "status_code": 20000,
    "status_message": "OK",
    "live": true,
    "cost": 0.00005,
    "data": {
        "symbol": "AAPL"
    },
    "result": {
        "symbol": "AAPL",
        "name": "Apple",
        "quote_type": "equity",
        "currency": "USD",
        "regular_market_volume": 43734998,
        "market_cap": 4367767306240,
        "usd_rate": null,
        "market_state": "REGULAR",
        "regular_market_open": 298.44,
        "regular_market_previous_close": 295.95,
        "current_price": 297.3828,
        "current_price_usd": 297.3828,
        "current_price_change": 1.4328003,
        "current_price_change_percent": 0.48413593,
        "current_price_update_time": "2026-06-18T17:57:44Z",
        "regular_market_price": 297.3828,
        "regular_market_price_change": 1.4328003,
        "regular_market_price_change_percent": 0.48413593,
        "regular_market_time": "2026-06-18T17:57:42Z",
        "pre_market_price": 297.94,
        "pre_market_price_change": 1.9899902,
        "pre_market_price_change_percent": 0.67240757,
        "pre_market_time": "2026-06-18T13:29:59Z",
        "post_market_price": null,
        "post_market_price_change": null,
        "post_market_price_change_percent": null,
        "post_market_time": null
    }
}
```

## Notes
- For mutual funds, only regular market price and change fields are returned.
- Field-level definitions are available in the [**Glossary**](https://finimpulse.com/glossary/).
