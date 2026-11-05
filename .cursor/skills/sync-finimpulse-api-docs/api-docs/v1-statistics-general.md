---
title: Statistics API for Stocks, ETFs &amp; Mutual Funds
created: 2026-01-28
updated: 2026-11-03
endpoint: POST v1/statistics/general
auth: Bearer Token
---

# Statistics API for Stocks, ETFs &amp; Mutual Funds

Returns a consolidated set of key statistics and performance indicators for an asset.

This endpoint acts as a **unified statistics snapshot**, combining price data, valuation metrics, dividends, risk indicators, and trailing performance where applicable.

## Asset Type Compatibility
The set of returned statistics varies by asset class:

- **Stocks:** Returns a complete set of company-level statistics, including price data, valuation metrics, dividends, financial ratios, ownership data, and analyst information.
- **ETFs:** Returns fund-level statistics, including price data, category classification, trailing performance, and distribution metrics. Company-level financial statements and analyst forecasts are not applicable.
- **Mutual funds:** Returns fund-level statistics and performance indicators, including trailing returns, category-relative metrics, rankings, and load-adjusted returns. Company-specific financial data is not applicable.

## When to Use This Endpoint
- Retrieve a single, normalized statistics snapshot for an asset.
- Populate asset **Summary** and **Statistics** views.
- Compare trailing performance against category benchmarks.
- Access valuation, dividend, and risk-related indicators in one request

## Request Parameters
**POST** `v1/statistics/general` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/statistics/general" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/statistics/general";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""tag"": ""just tag""
}";
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync(url, content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```


```php
<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.finimpulse.com/v1/statistics/general",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "tag" => "just tag"
    ]
  )
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
```


```python
import urllib.request
import json

url = "https://api.finimpulse.com/v1/statistics/general"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "tag": "just tag"
}

req = urllib.request.Request(url,
    data=json.dumps(data).encode("utf-8"),
    headers=headers,
    method="POST")

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode("utf-8"))
    print(result)
```


```javascript
const https = require('https');

const data = JSON.stringify({
    "symbol": "NVDA",
    "tag": "just tag"
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request('https://api.finimpulse.com/v1/statistics/general', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response is an array containing a single statistics object for the requested asset.

### General Information


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **currency**   
     `string` — Trading currency.
- **update_time**   
     `string` — Timestamp of the most recent data update (ISO 8601).
- **price_hint**   
     `integer` — Price precision hint (decimal places).


### Price and Market Data


- **current_price**   
     `number` — Most recent traded price. May reflect a delay of up to one hour.
- **previous_close**   
     `number` — Previous close price.
- **open**   
     `number` — Opening price.
- **day_low**   
     `number` — Intraday low price.
- **day_high**   
     `number` — Intraday high price.
- **regular_market_previous_close**   
     `number` — Closing price of the most recent completed regular session.
- **regular_market_open**   
     `number` — Price of the first trade of the current regular session.
- **regular_market_day_low**   
     `number` — Regular market intraday low.
- **regular_market_day_high**   
     `number` — Regular market intraday high.
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.
- **fifty_two_week_change**   
     `number` — Change in price over the last 52 weeks.
- **sand_p_fifty_two_week_change**   
     `number` — S&amp;P 500 52-week price change.
- **all_time_low**   
     `number` — All-time low price.
- **all_time_high**   
     `number` — All-time high price.
- **fifty_day_average**   
     `number` — 50-day moving average.
- **two_hundred_day_average**   
     `number` — 200-day moving average.


### Trading Volume and Liquidity


- **volume**   
     `integer` — Trading volume.
- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.
- **average_volume**   
     `integer` — Average trading volume.
- **average_volume_10days**   
     `integer` — Average volume over the last 10 trading days.
- **average_daily_volume_10_day**   
     `integer` — Average volume over the last 10 trading days (duplicate of `average_volume_10days`).
- **bid**   
     `number` — Bid price.
- **ask**   
     `number` — Ask price.
- **bid_size**   
     `integer` — Bid size (shares/units).
- **ask_size**   
     `integer` — Ask size (shares/units).


### Dividends


- **dividend_rate**   
     `number` — Forward dividend rate.
- **dividend_yield**   
     `number` — Forward dividend yield.
- **ex_dividend_date**   
     `string` — Ex-dividend date.
- **payout_ratio**   
     `number` — Dividend payout ratio.
- **trailing_annual_dividend_rate**   
     `number` — Trailing 12-month dividend rate.
- **trailing_annual_dividend_yield**   
     `number` — Trailing 12-month dividend yield.
- **five_year_avg_dividend_yield**   
     `number` — Five-year average dividend yield.
- **last_dividend_value**   
     `number` — Last dividend amount.
- **last_dividend_date**   
     `string` — Last dividend payment date.


### Valuation and Ratios


- **market_cap**   
     `integer` — Market capitalization.
- **enterprise_value**   
     `integer` — Enterprise value (EV).
- **trailing_pe**   
     `number` — Trailing Price-to-Earnings (P/E) ratio.
- **forward_pe**   
     `number` — Forward Price-to-Earnings (P/E) ratio.
- **price_to_book**   
     `number` — Price-to-book (P/B) ratio.
- **price_to_sales_trailing_12_months**   
     `number` — Price-to-sales (P/S) ratio (TTM).
- **enterprise_to_revenue**   
     `number` — Enterprise value-to-revenue (EV/Revenue) ratio.
- **enterprise_to_ebitda**   
     `number` — Enterprise value-to-EBITDA (EV/EBITDA) ratio.
- **beta**   
     `number` — Beta.
- **book_value**   
     `number` — Book value per share.
- **profit_margins**   
     `number` — Profit margin.
- **forward_eps**   
     `number` — Forward earnings per share (EPS) estimate.
- **trailing_eps**   
     `number` — Trailing earnings per share (EPS).


### Ownership and Trading Metrics

Equity-specific ownership and short-interest indicators.


- **shares_outstanding**   
     `integer` — Shares outstanding.
- **float_shares**   
     `integer` — Float shares.
- **shares_short**   
     `integer` — Shares sold short.
- **shares_short_prior_month**   
     `integer` — Shares sold short as of the prior month.
- **shares_short_previous_month_date**   
     `string` — Reference date for the prior month's short interest figure.
- **shares_percent_shares_out**   
     `number` — Short interest as a percentage of shares outstanding
- **short_ratio**   
     `number` — Short interest ratio.
- **short_percent_of_float**   
     `number` — Short interest as a percentage of float shares.
- **held_percent_insiders**   
     `number` — Percentage of shares held by insiders.
- **held_percent_institutions**   
     `number` — Percentage of shares held by institutions.
- **date_short_interest**   
     `string` — Reference date for the current short interest figure.
- **implied_shares_outstanding**   
     `integer` — Implied shares outstanding.


### Financial Performance

Fundamental company performance and profitability metrics.


- **total_revenue**   
     `integer` — Total revenue for the period.
- **revenue_per_share**   
     `number` — Revenue per share.
- **revenue_growth**   
     `number` — Revenue growth.
- **net_income_to_common**   
     `integer` — Net income available to common shareholders.
- **earnings_growth**   
     `number` — Earnings growth.
- **earnings_quarterly_growth**   
     `number` — Quarterly earnings growth (YoY).
- **gross_profits**   
     `integer` — Gross profit.
- **gross_margins**   
     `number` — Gross margin.
- **operating_margins**   
     `number` — Operating margin.
- **ebitda_margins**   
     `number` — EBITDA margin.
- **ebitda**   
     `integer` — Earnings before interest, taxes, depreciation, and amortization (EBITDA).
- **free_cashflow**   
     `integer` — Free cash flow (FCF).
- **operating_cashflow**   
     `integer` — Operating cash flow (OCF).
- **return_on_assets**   
     `number` — Return on Assets (ROA).
- **return_on_equity**   
     `number` — Return on Equity (ROE).
- **last_fiscal_year_end**   
     `string` — End date of the last fiscal year.
- **next_fiscal_year_end**   
     `string` — End date of the next fiscal year.
- **most_recent_quarter**   
     `string` — End date of the most recent quarter (MRQ).


### Balance Sheet and Liquidity


- **total_cash**   
     `integer` — Total cash and cash equivalents.
- **total_cash_per_share**   
     `number` — Cash and cash equivalents per share.
- **total_debt**   
     `integer` — Total debt.
- **debt_to_equity**   
     `number` — Debt-to-Equity (D/E).
- **current_ratio**   
     `number` — Current ratio.
- **quick_ratio**   
     `number` — Quick ratio.


### Trailing Performance


- **trailing_ytd**   
     `number` — Trailing year-to-date (YTD) return.
- **trailing_one_month**   
     `number` — Trailing 1-month return.
- **trailing_three_month**   
     `number` — Trailing 3-month return.
- **trailing_one_year**   
     `number` — Trailing 1-year return.
- **trailing_three_year**   
     `number` — Trailing 3-year return.
- **trailing_five_year**   
     `number` — Trailing 5-year return.
- **trailing_ten_year**   
     `number` — Trailing 10-year return.
- **trailing_last_bull_mkt**   
     `number` — Trailing return during the last bull market period.
- **trailing_last_bear_mkt**   
     `number` — Trailing return during the last bear market period.


### Category-Relative Performance


- **trailing_category_ytd**   
     `number` — Category trailing year-to-date (YTD) return.
- **trailing_category_one_month**   
     `number` — Category trailing 1-month return.
- **trailing_category_three_month**   
     `number` — Category trailing 3-month return.
- **trailing_category_one_year**   
     `number` — Category trailing 1-year return.
- **trailing_category_three_year**   
     `number` — Category trailing 3-year return.
- **trailing_category_five_year**   
     `number` — Category trailing 5-year return.
- **trailing_category_ten_year**   
     `number` — Category trailing 10-year return.
- **trailing_category_last_bull_mkt**   
     `number` — Category trailing return during the last bull market.
- **trailing_category_last_bear_mkt**   
     `number` — Category trailing return during the last bear market.


### Load-Adjusted Returns and Rankings

Mutual fund–specific performance adjustments and rankings.


- **load_adjusted_one_year**   
     `number` — Load-adjusted 1-year return.
- **load_adjusted_three_year**   
     `number` — Load-adjusted 3-year return.
- **load_adjusted_five_year**   
     `number` — Load-adjusted 5-year return.
- **load_adjusted_ten_year**   
     `number` — Load-adjusted 10-year return.
- **rank_ytd**   
     `integer` — Category rank, year-to-date (YTD).
- **rank_one_month**   
     `integer` — Category rank, 1-month.
- **rank_three_month**   
     `integer` — Category rank, 3-month.
- **rank_one_year**   
     `integer` — Category rank, 1-year.
- **rank_three_year**   
     `integer` — Category rank, 3-year.
- **rank_five_year**   
     `integer` — Category rank, 5-year.
- **num_years_up**   
     `integer` — Number of years with a positive return.
- **num_years_down**   
     `integer` — Number of years with a negative return.
- **best_one_yr_total_return**   
     `number` — Best 1-year total return.


### Risk Indicators


- **audit_risk**   
     `integer` — Audit risk score.
- **board_risk**   
     `integer` — Board risk score.
- **compensation_risk**   
     `integer` — Compensation risk score.
- **share_holder_rights_risk**   
     `integer` — Shareholder rights risk score.
- **overall_risk**   
     `integer` — Overall risk score.


### Asset Classification


- **category**   
     `string` — Fund category classification.
- **fund_family**   
     `string` — Fund family.
- **legal_type**   
     `string` — Legal structure/type.


### Analyst Data and Corporate Actions


- **last_split_factor**   
     `string` — Ratio of the last stock split (e.g. "4:1").
- **last_split_date**   
     `string` — Date of the last stock split.
- **target_high_price**   
     `number` — Analyst target high price.
- **target_low_price**   
     `number` — Analyst target low price.
- **target_mean_price**   
     `number` — Analyst target mean price.
- **target_median_price**   
     `number` — Analyst target median price.
- **recommendation_mean**   
     `number` — Average analyst recommendation score.
- **recommendation_key**   
     `string` — Recommendation label (e.g., strong_buy).
- **number_of_analyst_opinions**   
     `integer` — Number of analyst opinions.


### Example Response


```json
{
    "result": [
        {
            "symbol": "NVDA",
            "quote_type": "stock",
            "currency": "USD",
            "audit_risk": 5,
            "board_risk": 9,
            "compensation_risk": 4,
            "share_holder_rights_risk": 8,
            "overall_risk": 8,
            "previous_close": 191.13,
            "open": 187.2,
            "day_low": 184.88,
            "day_high": 190.3,
            "regular_market_previous_close": 191.13,
            "regular_market_open": 187.2,
            "regular_market_day_low": 184.88,
            "regular_market_day_high": 190.3,
            "dividend_rate": 0.04,
            "dividend_yield": 0.0002,
            "ex_dividend_date": "2025-12-04T00:00:00Z",
            "payout_ratio": 0.0099,
            "five_year_avg_dividend_yield": 0.05,
            "trailing_pe": 45.829628,
            "volume": 160114156,
            "regular_market_volume": 160114156,
            "average_volume": 181422162,
            "average_volume_10days": 163937740,
            "average_daily_volume_10_day": 163937740,
            "bid": 185.52,
            "ask": 185.67,
            "bid_size": 500,
            "ask_size": 400,
            "market_cap": 4519046938624,
            "fifty_two_week_low": 86.62,
            "fifty_two_week_high": 212.19,
            "all_time_high": 212.19,
            "all_time_low": 0.033333,
            "price_to_sales_trailing_12_months": 24.14769,
            "fifty_day_average": 183.9022,
            "two_hundred_day_average": 168.1236,
            "trailing_annual_dividend_rate": 0.04,
            "trailing_annual_dividend_yield": 0.00020928,
            "price_hint": 2,
            "enterprise_value": 4460536922112,
            "forward_pe": 24.218866,
            "profit_margins": 0.53007,
            "float_shares": 23330673000,
            "shares_outstanding": 24305000000,
            "shares_short": 261838673,
            "shares_short_prior_month": 264294883,
            "shares_short_previous_month_date": "2025-12-15T00:00:00Z",
            "date_short_interest": "2026-01-15T00:00:00Z",
            "shares_percent_shares_out": 0.0108,
            "held_percent_insiders": 0.0433,
            "held_percent_institutions": 0.69654,
            "short_ratio": 1.64,
            "short_percent_of_float": 0.0112,
            "beta": 2.314,
            "implied_shares_outstanding": 24347000000,
            "category": null,
            "book_value": 4.892,
            "price_to_book": 37.941536,
            "fund_family": null,
            "legal_type": null,
            "last_fiscal_year_end": "2025-01-26T00:00:00Z",
            "next_fiscal_year_end": "2026-01-26T00:00:00Z",
            "most_recent_quarter": "2025-10-26T00:00:00Z",
            "earnings_quarterly_growth": 0.653,
            "net_income_to_common": 99198001152,
            "trailing_eps": 4.05,
            "forward_eps": 7.66386,
            "last_split_factor": "10:1",
            "last_split_date": "2024-06-10T00:00:00Z",
            "enterprise_to_revenue": 23.835,
            "enterprise_to_ebitda": 39.58,
            "fifty_two_week_change": 0.56434894,
            "sand_p_fifty_two_week_change": 0.15544534,
            "last_dividend_value": 0.01,
            "last_dividend_date": "2025-12-04T00:00:00Z",
            "current_price": 185.61,
            "target_high_price": 352,
            "target_low_price": 140,
            "target_mean_price": 253.62138,
            "target_median_price": 250,
            "recommendation_mean": 1.34375,
            "recommendation_key": "strong_buy",
            "number_of_analyst_opinions": 58,
            "total_cash": 60608000000,
            "total_cash_per_share": 2.494,
            "ebitda": 112696000512,
            "total_debt": 10821999616,
            "quick_ratio": 3.605,
            "current_ratio": 4.468,
            "total_revenue": 187141996544,
            "debt_to_equity": 9.102,
            "revenue_per_share": 7.668,
            "return_on_assets": 0.53528,
            "return_on_equity": 1.07359,
            "gross_profits": 131092996096,
            "free_cashflow": 53282873344,
            "operating_cashflow": 83158999040,
            "earnings_growth": 0.667,
            "revenue_growth": 0.625,
            "gross_margins": 0.7005,
            "ebitda_margins": 0.60220003,
            "operating_margins": 0.63168997,
            "update_time": "2026-02-03T14:02:10Z",
            "trailing_ytd": null,
            "trailing_one_month": null,
            "trailing_three_month": null,
            "trailing_one_year": null,
            "trailing_three_year": null,
            "trailing_five_year": null,
            "trailing_ten_year": null,
            "trailing_last_bull_mkt": null,
            "trailing_last_bear_mkt": null,
            "trailing_category_ytd": null,
            "trailing_category_one_month": null,
            "trailing_category_three_month": null,
            "trailing_category_one_year": null,
            "trailing_category_three_year": null,
            "trailing_category_five_year": null,
            "trailing_category_ten_year": null,
            "trailing_category_last_bull_mkt": null,
            "trailing_category_last_bear_mkt": null,
            "load_adjusted_one_year": null,
            "load_adjusted_three_year": null,
            "load_adjusted_five_year": null,
            "load_adjusted_ten_year": null,
            "rank_ytd": null,
            "rank_one_month": null,
            "rank_three_month": null,
            "rank_one_year": null,
            "rank_three_year": null,
            "rank_five_year": null,
            "num_years_up": null,
            "num_years_down": null,
            "best_one_yr_total_return": null
        }
    ]
}
```


## Notes
- Fields that are not relevant for a given asset type are returned as **null**.
- Complete definitions, formulas, and calculation methodology for all fields are available in the **[Glossary](https://finimpulse.com/glossary/)**.
