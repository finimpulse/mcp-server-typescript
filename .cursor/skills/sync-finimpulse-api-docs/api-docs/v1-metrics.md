---
title: Metrics & Dividends
endpoint: POST v1/metrics
auth: Bearer Token
---

# Metrics & Dividends

Returns dividend data, returns, profitability, growth, leverage, and business quality metrics for a single asset symbol.

This endpoint retrieves a focused set of financial and market metrics for a single asset symbol, covering dividend data, historical returns, profitability, growth, leverage, and business quality indicators.

## Asset Type Compatibility
Primarily applicable to stocks. For ETFs and mutual funds, fundamental and profitability fields are generally not applicable and are returned as null.

## When to Use This Endpoint
- Retrieve dividend data, historical returns, and risk metrics for a single asset symbol.
- Assess profitability, growth, leverage, and business quality indicators for stocks.
- Access a consolidated set of financial metrics without retrieving a full data snapshot.

## Request Parameters
**POST** `v1/metrics`

- **symbol** `string` *(required)* — Asset identifier (ticker symbol).
- **tag** `string` *(optional)* — User-defined task identifier (max 255 characters). Returned in the response data object.

### Example Request

```bash
curl --location "https://api.finimpulse.com/v1/metrics" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "tag": "just tag"
  }'
```

## Response
Returns an array containing a single object for the requested symbol.

### Identification Fields
- **symbol** `string` — Asset identifier (ticker symbol).

### Dividends & Yield
- **dividend_rate** `number` — Forward dividend rate.
- **dividend_rate_usd** `number` — Forward dividend rate normalized to USD.
- **dividend_yield** `number` — Forward dividend yield.
- **trailing_annual_dividend_rate** `number` — Trailing 12-month dividend rate.
- **trailing_annual_dividend_rate_usd** `number` — Trailing 12-month dividend rate normalized to USD.
- **trailing_annual_dividend_yield** `number` — Trailing 12-month dividend yield.

### Returns & Performance
- **one_year_return** `number` — Total return over the past year.
- **three_year_return** `number` — Total return over the past three years.

### Technical Indicators
- **fifty_day_average_change_percent** `number` — Percent difference vs 50-day average.
- **two_hundred_day_average_change_percent** `number` — Percent difference vs 200-day average.

### Profitability & Margins
- **free_cash_flow_margin** `number` — Free cash flow margin (FCF Margin).
- **return_on_invested_capital** `number` — Return on Invested Capital (ROIC).
- **net_margin** `number` — Net Margin.
- **return_on_equity** `number` — Return on Equity (ROE).

### Growth & Risk
- **beta** `number` — Beta.
- **debt_to_equity** `number` — Debt-to-Equity (D/E).
- **revenue_stability** `number` — Revenue stability.
- **revenue_growth** `number` — Revenue growth.
- **eps_growth** `number` — EPS (Earnings Per Share) growth.

### Example Response

```json
{
    "task_id": "06181804-0022-0058-0000-c65366875038",
    "status_code": 20000,
    "status_message": "OK",
    "live": true,
    "cost": 0.0002,
    "data": {
        "symbol": "NVDA",
        "tag": "just tag"
    },
    "result": [
        {
            "symbol": "NVDA",
            "dividend_rate": 1,
            "dividend_rate_usd": 1,
            "dividend_yield": 0.48,
            "trailing_annual_dividend_rate": 0.04,
            "trailing_annual_dividend_rate_usd": 0.04,
            "trailing_annual_dividend_yield": 0.01882795,
            "one_year_return": 43.348,
            "three_year_return": 385.829,
            "beta": 2.202,
            "fifty_day_average_change_percent": -0.38336746,
            "two_hundred_day_average_change_percent": 9.422114,
            "free_cash_flow_margin": 0.50366308,
            "return_on_invested_capital": 0.6676865922020258,
            "net_margin": 0.55602534,
            "return_on_equity": 0.58058635,
            "debt_to_equity": 0.05338413,
            "revenue_stability": 0.878539068377033,
            "revenue_growth": 0.5165969048251269,
            "eps_growth": 0.6632099331361276
        }
    ]
}
```

## Notes
- Percent-like fields are returned as fractions (e.g., 0.02 = 2%).
- Some fields may be null depending on asset type and data coverage.
- Field-level definitions are available in the [**Glossary**](https://finimpulse.com/glossary/).
