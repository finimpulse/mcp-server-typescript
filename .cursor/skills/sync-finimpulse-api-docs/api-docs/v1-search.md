---
title: Search
created: 2026-01-23
updated: 2026-04-17
endpoint: POST v1/search
auth: Bearer Token
---

# Search

Returns a unified, cross-asset search result for financial instruments, including stocks, ETFs, and mutual funds.

This endpoint powers global asset search, ticker autocomplete, discovery flows, and AI-assisted search scenarios. It returns a normalized set of price, liquidity, performance, and classification fields, allowing different asset types to be ranked and compared in a single response.

## When to Use This Endpoint
- Search across stocks, ETFs, and mutual funds in one request.
- Rank assets by size, liquidity, or market relevance.
- Display comparable results across asset types and currencies.

## Request Parameters
**POST** `v1/search` 

- **search_text**   
     `string` *(optional)* — Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).
- **quote_types**   
     `array` *(optional)* — Controls which asset types are included in the search. **Available types:**
    - `stock`
    - `etf`
    - `mutualfund`
     
     All three parameters are of type **string** and are **optional**. If none are provided, all supported asset types are returned. **Example:** `"quote_types": ["mutualfund","etf","stock"]`
- **symbols**   
     `array` *(optional)* — A list of ticker symbols to retrieve. When provided, the response returns only the specified tickers. **Important notes:**
    - If a symbol does not exist, it is excluded from the results.
    - Returns an empty result set if none of the specified symbols are found.
     
     **Example:** `"symbols": ["NVDA", "SPY", "AAPL"]`
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined).
- **filters**   
     `array` *(optional)* — Optional filter expressions. Each filter condition is defined as: `[field, operator, value]`. Conditions can be combined using logical operators `and`/`or`. **Supported operators:** *Numeric fields:*
    - `>` - greater than
    - `>=` - greater than or equal
    - `<` - less than
    - `<=` - less than or equal
    - `=` - equals
    - `<>` - not equal
     
     *String fields:*
    - `like` – pattern match (requires `%` as a wildcard)
    - `not_like` - pattern does not match (requires `%` as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     `%` *usage examples:*
    - `%abc%` - matches any string containing "abc"
    - `abc%` - matches any string starting with "abc"
    - `%abc` - matches any string ending with "abc"
     
     **Example:** `"filters": [ "short_name", "contains", "Market" ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., amount_usd).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "amount_usd", "desc": true } ]`
- **has_public_financial_reports**   
     `boolean` *(optional)* — Indicates whether the company provides public financial statements. 
    - `true` - the company has public financial reports available
    - `false` - the company does not have public financial reports
- **show_tickers_without_company_name**   
     `boolean` *(optional)* — Include tickers with missing names. 
    - `true` - include tickers even if the company/fund name is missing
    - `false` - exclude tickers without a company/fund name
     
     This parameter determines the filtering logic in the dashboard for tickers with or without company/fund names.
- **hide_tickers_with_company_name**   
     `boolean` *(optional)* — Exclude tickers with available names. 
    - `true` - exclude tickers with a company/fund name
    - `false` - include tickers with a company/fund name
     
     This parameter determines the filtering logic in the dashboard for tickers with or without company/fund names.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/search" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "search_text": "fund",
      "offset": 0,
      "limit": 10,
      "has_public_financial_reports": true,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/search";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""search_text"": ""fund"",
    ""offset"": 0,
    ""limit"": 10,
    ""has_public_financial_reports"": true,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/search",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "search_text" => "fund",
      "offset" => 0,
      "limit" => 10,
      "has_public_financial_reports" => true,
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

url = "https://api.finimpulse.com/v1/search"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "search_text": "fund",
    "offset": 0,
    "limit": 10,
    "has_public_financial_reports": True,
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
    "search_text": "fund",
    "offset": 0,
    "limit": 10,
    "has_public_financial_reports": true,
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

const req = https.request('https://api.finimpulse.com/v1/search', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response contains pagination metadata and a list of matched assets.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching assets.
- **search_after_token**   
     `string` — Token for pagination. Pass it in the next request to fetch the next page. **Format:** `"search_after_token": "token_here"`
- **items_count**   
     `integer` — Number of items returned.
- **items**   
     `array` — An array, where each item represents a single exchange-listed instrument. The same underlying company or fund can appear multiple times if it trades on numerous exchanges or currencies.


### Identification Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **display_name**   
     `string` — Preferred display name (if available).
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full legal or formal name (company/fund).
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **quote_source_name**   
     `string` — Data source label for the quote (e.g., real-time vs delayed).


### Trading &amp; Exchange Info


- **currency**   
     `string` — Trading currency.
- **full_exchange_name**   
     `string` — Exchange name.
- **exchange**   
     `string` — Exchange code.
- **exchange_timezone_name**   
     `string` — Exchange time zone name.
- **exchange_timezone_short_name**   
     `string` — Exchange time zone abbreviation.
- **time_offset**   
     `integer` — Exchange time offset in seconds.
- **market_region**   
     `string` — Market/country code.


### Asset Fundamentals


- **sector**   
     `string` — Sector classification (stocks and some ETFs).
- **industry**   
     `string` — Industry classification.
- **founded_date**   
     `string` — Company founding date (stocks) or reference date (if available).
- **fund_inception_date**   
     `string` — Fund inception date (ETFs and mutual funds).


### Price Data


- **regular_market_price**   
     `number` — Latest traded price in local currency.
- **regular_market_price_usd**   
     `number` — USD-normalized price.
- **regular_market_change**   
     `number` — Absolute price change in local currency.
- **regular_market_change_usd**   
     `number` — Absolute price change normalized to USD (if available).
- **regular_market_change_percent**   
     `number` — Percentage price change.
- **regular_market_time**   
     `string` — Time of the last trade that set the current market price.


### Volume &amp; Liquidity


- **regular_market_volume**   
     `integer` — Latest trading volume.
- **average_daily_volume_3_month**   
     `number` — 3-month average trading volume.
- **average_daily_volume_10_day**   
     `number` — 10-day average trading volume.


### Technical Indicators


- **fifty_day_average**   
     `number` — 50-day moving average.
- **fifty_day_average_change**   
     `number` — Difference between current price and 50-day average.
- **fifty_day_average_change_percent**   
     `number` — Percent difference vs 50-day average.
- **two_hundred_day_average**   
     `number` — 200-day moving average.
- **two_hundred_day_average_change**   
     `number` — Difference between current price and 200-day average.
- **two_hundred_day_average_change_percent**   
     `number` — Percent difference vs 200-day average.
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the previous 52 weeks.
- **fifty_two_week_low_change**   
     `number` — Change from the 52-week low.
- **fifty_two_week_low_change_percent**   
     `number` — Percent change from the 52-week low.
- **fifty_two_week_high_change**   
     `number` — Change from the 52-week high.
- **fifty_two_week_high_change_percent**   
     `number` — Percent change from the 52-week high.


### Returns &amp; Performance


- **one_year_return**   
     `number` — Total return over the past year (if available).
- **three_year_return**   
     `number` — Total return over the past three years (if available).


### Dividends &amp; Yield


- **dividend_rate**   
     `number` — Forward dividend rate.
- **dividend_yield**   
     `number` — Forward dividend yield.
- **trailing_annual_dividend_rate**   
     `number` — Trailing 12-month dividend rate.
- **trailing_annual_dividend_yield**   
     `number` — Trailing 12-month dividend yield.


### Market Value &amp; Normalization


- **amount**   
     `number` — Market value or net assets in local currency.
- **amount_usd**   
     `number` — USD-normalized market value or net assets (standard global ranking key).
- **usd_rate**   
     `number` — FX rate used for USD normalization.


### Profitability &amp; Margins


- **free_cash_flow_margin**   
     `number` — Free cash flow margin.
- **net_margin**   
     `number` — Net Margin.
- **return_on_equity**   
     `number` — Return on Equity (ROE).
- **return_on_invested_capital**   
     `number` — Return on Invested Capital (ROIC).


### Growth &amp; Risk


- **revenue_growth**   
     `number` — Compound annual growth rate of revenue over 3 and 5 years.
- **eps_growth**   
     `number` — Compound annual growth rate of earnings per share over 3 and 5 years.
- **revenue_stability**   
     `number` — Standard deviation of annual revenue growth rates (last 5 years).
- **beta**   
     `number` — Beta.
- **debt_to_equity**   
     `number` — Debt-to-Equity (D/E).


### Metadata


- **update_time**   
     `string` — Date and time of the last data update.


### Example Response


```json
{  
  "task_id": "5da1cb74-3fde-42a4-8b69-7cb8030459ee",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0024,
    "data": {
        "limit": 10,
        "offset": 0,
        "filters": [
            "short_name",
            "contains",
            "Market"
        ],
        "search_text": "fund",
        "has_public_financial_reports": true,
        "sort_by": [
            {
                "selector": "amount_usd",
                "desc": true
            }
        ],
        "quote_types": [
            "mutualfund",
            "etf",
            "stock"
        ]
    },
    "result": {
        "total_count": 2,
        "search_after_token": null,
        "items_count": 2,
        "items": [
            {
                "symbol": "EMF",
                "display_name": null,
                "short_name": "Templeton Emerging Markets Fund",
                "long_name": "Templeton Emerging Markets Fund",
                "quote_type": "stock",
                "quote_source_name": "Delayed Quote",
                "fifty_day_average": 19.1242,
                "fifty_day_average_change": -0.24420166,
                "fifty_day_average_change_percent": -1.2769247,
                "two_hundred_day_average": 17.04795,
                "two_hundred_day_average_change": 1.8320484,
                "two_hundred_day_average_change_percent": 10.746443,
                "average_daily_volume_3_month": 81833,
                "average_daily_volume_10_day": 59500,
                "one_year_return": 67.228,
                "three_year_return": 63.181,
                "currency": "USD",
                "regular_market_price": 18.88,
                "regular_market_price_usd": 18.88,
                "regular_market_change": 1.09,
                "regular_market_change_usd": 1.09,
                "regular_market_change_percent": 6.12703,
                "regular_market_time": "2026-04-08T20:00:02Z",
                "regular_market_volume": 65463,
                "full_exchange_name": "NYSE",
                "exchange": "NYQ",
                "exchange_timezone_name": "America/New_York",
                "exchange_timezone_short_name": "EDT",
                "fifty_two_week_low_change": 7.249999,
                "fifty_two_week_low_change_percent": 62.33877,
                "fifty_two_week_high_change": -2.3200016,
                "fifty_two_week_high_change_percent": -10.943403,
                "fifty_two_week_low": 11.63,
                "fifty_two_week_high": 21.2,
                "trailing_annual_dividend_rate": 0.951,
                "trailing_annual_dividend_yield": 5.3456996,
                "dividend_rate": 0.88,
                "dividend_yield": 4.95,
                "time_offset": -14400,
                "market_region": "US",
                "sector": "Financial Services",
                "industry": "Asset Management",
                "amount": 282216288,
                "amount_usd": 282216288,
                "update_time": "2026-04-09T11:36:26Z",
                "usd_rate": null,
                "beta": 0.881,
                "founded_date": "1987-02-26T14:30:00Z",
                "fund_inception_date": null,
                "free_cash_flow_margin": 0,
                "return_on_invested_capital": 0,
                "net_margin": 0.98784344,
                "return_on_equity": 0.12201155,
                "debt_to_equity": 0.02138823,
                "revenue_stability": 19.630419036973684,
                "revenue_growth": -0.13503351116579054,
                "eps_growth": -0.12340175362102368
            },
            {
                "symbol": "EDF",
                "display_name": null,
                "short_name": "Stone Harbor Emerging Markets I",
                "long_name": "Virtus Stone Harbor Emerging Markets Income Fund",
                "quote_type": "stock",
                "quote_source_name": "Delayed Quote",
                "fifty_day_average": 5.0538,
                "fifty_day_average_change": 0.13619995,
                "fifty_day_average_change_percent": 2.6950007,
                "two_hundred_day_average": 5.0106,
                "two_hundred_day_average_change": 0.17939997,
                "two_hundred_day_average_change_percent": 3.580409,
                "average_daily_volume_3_month": 247711,
                "average_daily_volume_10_day": 244760,
                "one_year_return": 19.585,
                "three_year_return": 15.333,
                "currency": "USD",
                "regular_market_price": 5.19,
                "regular_market_price_usd": 5.19,
                "regular_market_change": 0.0999999,
                "regular_market_change_usd": 0.0999999,
                "regular_market_change_percent": 1.96463,
                "regular_market_time": "2026-04-08T20:00:02Z",
                "regular_market_volume": 187965,
                "full_exchange_name": "NYSE",
                "exchange": "NYQ",
                "exchange_timezone_name": "America/New_York",
                "exchange_timezone_short_name": "EDT",
                "fifty_two_week_low_change": 0.97000027,
                "fifty_two_week_low_change_percent": 22.985789,
                "fifty_two_week_high_change": -0.1500001,
                "fifty_two_week_high_change_percent": -2.8089905,
                "fifty_two_week_low": 4.22,
                "fifty_two_week_high": 5.34,
                "trailing_annual_dividend_rate": 0,
                "trailing_annual_dividend_yield": 0,
                "dividend_rate": 0.72,
                "dividend_yield": 14.15,
                "time_offset": -14400,
                "market_region": "US",
                "sector": "Financial Services",
                "industry": "Asset Management",
                "amount": 166223936,
                "amount_usd": 166223936,
                "update_time": "2026-04-09T11:36:08Z",
                "usd_rate": null,
                "beta": null,
                "founded_date": "2010-12-27T14:30:00Z",
                "fund_inception_date": null,
                "free_cash_flow_margin": -0.68015338,
                "return_on_invested_capital": 0,
                "net_margin": 0.98571816,
                "return_on_equity": 0.16813101,
                "debt_to_equity": 0.25520935,
                "revenue_stability": 3.4229035783771558,
                "revenue_growth": 1.0827617564272258,
                "eps_growth": null
            }
        ]
    }
}
```


## Notes
- USD-normalized fields enable consistent cross-market sorting and ranking across all markets.
- Some fields may be *null* depending on asset type and data coverage. It does not indicate an error; it reflects asset-specific applicability.

All metric names, field definitions, and calculation details are defined in the [***Glossary***](https://finimpulse.com/glossary/).
