---
title: Search API for Stocks, ETFs, Mutual Funds &amp; Indices
created: 2026-01-23
updated: 2026-11-05
endpoint: POST v1/search
auth: Bearer Token
---

# Search API for Stocks, ETFs, Mutual Funds &amp; Indices

Returns a unified, cross-asset search result for stocks, ETFs, mutual funds, and indices. 

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint returns a broad, normalized set of price, liquidity, performance, and classification fields for stocks, ETFs (including sector ETFs, e.g., XLK, XLF), mutual funds, and indices, so different asset types can be ranked and compared in a single response.

For a focused field set covering core identification, pricing, and performance data only, use the [Lightweight Search API](https://developers.finimpulse.com/v1/search-lite/).

## Coverage

Asset TypesStocks, ETFs, mutual funds, indices Exchanges~108 ([download the full list](https://developers.finimpulse.com/wp-content/uploads/2026/11/exchanges.txt)) Market Regions~60 ([download the full list](https://developers.finimpulse.com/wp-content/uploads/2026/11/market_region_codes.txt)) Listings730,000+

Coverage figures are approximate and may change over time.

## Data Freshness

Price fields are delayed by up to one hour. Other fields are updated as their values change.

The time of the latest price update is returned in **current_price_update_time**, and the time of the latest record update is returned in **update_time**.

## Asset Type Compatibility

The endpoint supports stocks, ETFs, mutual funds, and indices. All asset types share a unified response structure.

The set of populated fields depends on the asset type: for example, profitability and growth metrics apply to stocks, and **fund_inception_date** applies to funds. For indices, price, volume, technical indicator, and return fields are populated, while dividend, market value, classification, and fundamental fields return **null**.

## Data Availability &amp; Limitations

- Some fields may be **null** if a specific value is not available for a given asset. This does not indicate an error.
- By default, tickers without a company or fund name are excluded from results. To include them, set **show_tickers_without_company_name** to **true**.
- The same company or fund can appear multiple times if it trades on several exchanges or in several currencies.
- **founded_date** reflects the date of the first available price record. FinImpulse historical price data goes back to 1970, so for assets listed earlier, the value is the start of available data rather than the actual listing date.
- Ratio metrics can take extreme values when revenue or equity is close to zero. When equity is negative, **debt_to_equity** is negative, and the sign of **return_on_equity** is inverted: loss-making companies may show a positive value.

## When to Use This Endpoint
- Power a global asset search across stocks, ETFs, mutual funds, and indices by name, ticker, or partial match.
- Build stock and fund screeners with custom filters on price, liquidity, dividend, and fundamental fields.
- Populate ranked lists, such as the largest companies by market capitalization or top performers by one-year return.
- Retrieve data for a watchlist or portfolio by passing a predefined list of symbols.
- Display assets from different markets in a single comparison table using USD-normalized values.

## Request Parameters
**POST** `v1/search` 

- **search_text**   
     `string` *(optional)* — Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).
- **quote_types**   
     `array` *(optional)* — Controls which asset types are included in the search. **Available types:**
    - `stock`
    - `etf`
    - `mutualfund`
    - `index`
     
     All values are of type string. If none are provided, all supported asset types are returned. Note that sector ETFs are included when filtering by `etf`. The `sector` value is not supported in `quote_types` and returns an error.
- **symbols**   
     `array` *(optional)* — A list of ticker symbols to retrieve. When provided, the response returns only the specified tickers. **Important notes:**
    - If a symbol does not exist, it is excluded from the results.
    - Returns an empty result set if none of the specified symbols are found.
- **has_public_financial_reports**   
     `boolean` *(optional)* — Indicates whether the company provides public financial statements. 
    - `true` - the company has public financial reports available
    - `false` - the company does not have public financial reports
- **show_tickers_without_company_name**   
     `boolean` *(optional)* — Include tickers without a company/fund name. 
    - `true` - include tickers without the company/fund name
    - `false` - exclude tickers without a company/fund name
- **hide_tickers_with_company_name**   
     `boolean` *(optional)* — Exclude tickers with a company/fund name. 
    - `true` - exclude tickers with a company/fund name
    - `false` - include tickers with a company/fund name
- **filters**   
     `array` *(optional)* — Optional filter expressions. Each filter condition is defined as `[field, operator, value]`. Conditions can be combined using the logical operators `and`, `or`, and `not`. **Supported operators:** *Any field type (numbers, strings, booleans, dates):*
    - `=` - equals
    - `<>` - not equal
     
     *Numbers and dates:*
    - `>` - greater than
    - `>=` - greater than or equal
    - `<` - less than
    - `<=` - less than or equal
     
     *List of values:*
    - `in` - matches any value in the list (e.g., \["field", "in", \["value_1", "value_2"\]\])
     
     *Strings:*
    - `like` - pattern match (requires % as a wildcard)
    - `not_like` - pattern does not match (requires % as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     *`%` usage examples:*
    - `%abc%` - matches any string containing “abc”
    - `abc%` - matches any string starting with “abc”
    - `%abc` - matches any string ending with “abc”
     
     String operators are case-sensitive. Dates are compared as text, so pass date values in the same format as the field returns them. Fields that contain arrays cannot be filtered.
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as an object `{selector, desc}`: 
    - `selector` - Field used for sorting (e.g., amount_usd).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined). 
    - Default: 100
    - Maximum: 1000
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **search_after_token**   
     `string` *(optional)* — Token for pagination. Use the value returned in the previous response to fetch the next page. Pass `limit` with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/search" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "search_text": "NV",
      "quote_types": [
          "stock"
      ],
      "has_public_financial_reports": true,
      "show_tickers_without_company_name": true,
      "filters": [
          "amount_usd",
          ">",
          10000000000
      ],
      "sort_by": [
          {
              "selector": "amount_usd",
              "desc": true
          },
          {
              "selector": "symbol",
              "desc": false
          }
      ],
      "limit": 3,
      "offset": 0,
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
    ""search_text"": ""NV"",
    ""quote_types"": [
        ""stock""
    ],
    ""has_public_financial_reports"": true,
    ""show_tickers_without_company_name"": true,
    ""filters"": [
        ""amount_usd"",
        "">"",
        10000000000
    ],
    ""sort_by"": [
        {
            ""selector"": ""amount_usd"",
            ""desc"": true
        },
        {
            ""selector"": ""symbol"",
            ""desc"": false
        }
    ],
    ""limit"": 3,
    ""offset"": 0,
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
      "search_text" => "NV",
      "quote_types" => [
        "stock"
      ],
      "has_public_financial_reports" => true,
      "show_tickers_without_company_name" => true,
      "filters" => [
        "amount_usd",
        ">",
        10000000000
      ],
      "sort_by" => [
        [
          "selector" => "amount_usd",
          "desc" => true
        ],
        [
          "selector" => "symbol",
          "desc" => false
        ]
      ],
      "limit" => 3,
      "offset" => 0,
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
    "search_text": "NV",
    "quote_types": [
        "stock"
    ],
    "has_public_financial_reports": True,
    "show_tickers_without_company_name": True,
    "filters": [
        "amount_usd",
        ">",
        10000000000
    ],
    "sort_by": [
        {
            "selector": "amount_usd",
            "desc": True
        },
        {
            "selector": "symbol",
            "desc": False
        }
    ],
    "limit": 3,
    "offset": 0,
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
    "search_text": "NV",
    "quote_types": [
        "stock"
    ],
    "has_public_financial_reports": true,
    "show_tickers_without_company_name": true,
    "filters": [
        "amount_usd",
        ">",
        10000000000
    ],
    "sort_by": [
        {
            "selector": "amount_usd",
            "desc": true
        },
        {
            "selector": "symbol",
            "desc": false
        }
    ],
    "limit": 3,
    "offset": 0,
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
     `string` — Token for pagination. Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items_count**   
     `integer` — Number of assets returned.
- **items**   
     `array` — Array of assets. The same underlying company or fund can appear multiple times if it trades on numerous exchanges or currencies.


### Identification Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **logo**   
     `string` — URL of the company or fund logo image.
- **display_name**   
     `string` — Asset display name.
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full legal or formal name.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund, sector, index). **Note**: sector is returned for sector ETFs (XLK, XLF, XLV, XLY, XLP, XLC, XLI, XLE, XLB, XLRE, XLU). To filter them, use etf in `quote_types`.
- **quote_source_name**   
     `string` — Data source label for the quote.


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
     `string` — Sector classification.
- **industry**   
     `string` — Industry classification.
- **founded_date**   
     `string` — Date of the first available price record (ISO 8601).
- **fund_inception_date**   
     `string` — Fund inception date.


### Price Data


- **current_price**   
     `number` — Most recent traded price collected at the time indicated by `current_price_update_time`. May reflect a delay of up to one hour.
- **current_price_usd**   
     `number` — Most recent traded price collected at the time indicated by `current_price_update_time`, normalized to USD. May reflect a delay of up to one hour.
- **current_price_update_time**   
     `string` — Timestamp of the most recent price update (ISO 8601).
- **regular_market_price**   
     `number` — Active price during the regular trading session and at market close. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **regular_market_price_usd**   
     `number` — Active price during the regular trading session and at market close, normalized to USD. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **regular_market_price_change**   
     `number` — Absolute price change for the regular market session in local currency.
- **regular_market_price_change_usd**   
     `number` — Absolute price change for the regular market session, normalized to USD.
- **regular_market_price_change_percent**   
     `number` — Percentage price change for the regular market session.
- **regular_market_time**   
     `string` — Timestamp of the last regular market trade (ISO 8601). 
    - During the **regular session**, reflects the time of the most recent trade at the moment of data collection.
    - For US-listed assets, during **pre-market and post-market** hours, reflects the closing time of the most recent regular session.
- **pre_market_price**   
     `number` — Active price during the pre-market session. Outside pre-market hours, returns the last traded pre-market price. Returns *null* if no pre-market data is available.
- **pre_market_price_usd**   
     `number` — Active price during the pre-market session, normalized to USD. Outside pre-market hours, returns the last traded pre-market price. Returns *null* if no pre-market data is available.
- **pre_market_time**   
     `string` — Timestamp of the last pre-market trade (ISO 8601). 
    - **During the pre-market session**, reflects the time of the most recent trade at the moment of data collection.
    - **Outside pre-market hours**, reflects the time of the last trade from the most recent pre-market session.


### Volume &amp; Liquidity


- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.
- **average_daily_volume_3_month**   
     `number` — Average volume over the last 3 months.
- **average_daily_volume_10_day**   
     `number` — Average volume over the last 10 trading days.


### Technical Indicators


- **fifty_day_average**   
     `number` — 50-day moving average.
- **fifty_day_average_change**   
     `number` — Difference between current price and 50-day average.
- **fifty_day_average_change_percent**   
     `number` — Percent difference between current price and 50-day average.
- **two_hundred_day_average**   
     `number` — 200-day moving average.
- **two_hundred_day_average_change**   
     `number` — Difference between current price and 200-day average.
- **two_hundred_day_average_change_percent**   
     `number` — Percent difference between current price and 200-day average.
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.
- **fifty_two_week_low_change**   
     `number` — Change from the 52-week low.
- **fifty_two_week_low_change_percent**   
     `number` — Percent change from the 52-week low.
- **fifty_two_week_high_change**   
     `number` — Change from the 52-week high.
- **fifty_two_week_high_change_percent**   
     `number` — Percent change from the 52-week high.
- **fifty_two_week_change_percent**   
     `number` — Percent change in price over the last 52 weeks.


### Returns &amp; Performance


- **one_year_return**   
     `number` — Total return over the past year.
- **three_year_return**   
     `number` — Total return over the past three years.


### Dividends &amp; Yield


- **dividend_rate**   
     `number` — Forward dividend rate.
- **dividend_rate_usd**   
     `number` — Forward dividend rate normalized to USD.
- **dividend_yield**   
     `number` — Forward dividend yield.
- **trailing_annual_dividend_rate**   
     `number` — Trailing 12-month dividend rate.
- **trailing_annual_dividend_rate_usd**   
     `number` — Trailing 12-month dividend rate normalized to USD.
- **trailing_annual_dividend_yield**   
     `number` — Trailing 12-month dividend yield.


### Market Value &amp; Normalization


- **amount**   
     `number` — Market cap in local currency.
- **amount_usd**   
     `number` — USD-normalized market cap.
- **usd_rate**   
     `number` — FX rate used for USD normalization.


### Profitability &amp; Margins


- **free_cash_flow_margin**   
     `number` — Free cash flow margin (FCF margin).
- **net_margin**   
     `number` — Net margin.
- **return_on_equity**   
     `number` — Return on equity (ROE).
- **return_on_invested_capital**   
     `number` — Return on invested capital (ROIC).


### Growth &amp; Risk


- **revenue_growth**   
     `number` — Revenue growth.
- **eps_growth**   
     `number` — Earnings per share (EPS) growth.
- **one_year_change_percent_basic_eps**   
     `number` — 1-year percentage change in Basic EPS.
- **revenue_stability**   
     `number` — Revenue stability.
- **beta**   
     `number` — Beta.
- **debt_to_equity**   
     `number` — Debt-to-equity (D/E).


### Metadata


- **update_time**   
     `string` — Timestamp of the most recent data update (ISO 8601).


### Example Response


```json
{
    "result": {
        "total_count": 181,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzZWFyY2hfdGV4dCI6Ik5WIiwiaXNfYXV0b2NvbXBsZXRlIjpmYWxzZSwicXVvdGVfdHlwZXMiOlszXSwiaGFzX3B1YmxpY19maW5hbmNpYWxfcmVwb3J0cyI6dHJ1ZSwic3ltYm9scyI6bnVsbCwic2VsZWN0X2lkZW50aWZpZXJzIjpudWxsLCJxdWVyeSI6eyJmaWVsZCI6ImFtb3VudF91c2QiLCJ0eXBlIjoiZ3QiLCJ2YWx1ZSI6MTAwMDAwMDAwMDB9LCJvcmRlcl9ieSI6eyJvcmRlcl9maWVsZCI6ImFtb3VudF91c2QiLCJvcmRlcl90eXBlIjoiRGVzYyIsIm5leHQiOnsib3JkZXJfZmllbGQiOiJzeW1ib2wiLCJvcmRlcl90eXBlIjoiQXNjIiwibmV4dCI6bnVsbH19LCJsaW1pdCI6Mywib2Zmc2V0IjpudWxsLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsiYW1vdW50X3VzZCI6NDg3OTE0MjYxNzA4OC4wLCJzeW1ib2wiOiJOVkRBIiwicmFuayI6MjM4ODd9LCJUb2tlblJlYWxPZmZzZXQiOjMsIlRvdGFsQ291bnQiOjE4MX19",
        "items_count": 3,
        "items": [
            {
                "symbol": "1NVDA.MI",
                "display_name": null,
                "short_name": "NVIDIA CORP",
                "long_name": "NVIDIA Corporation",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/0bf85aae-791f-a689-a2c1-ebbf84e7cc81",
                "quote_source_name": "Delayed Quote",
                "fifty_day_average": 195.4632,
                "fifty_day_average_change": 13.236801,
                "fifty_day_average_change_percent": 6.7720175,
                "two_hundred_day_average": 177.49045,
                "two_hundred_day_average_change": 31.209549,
                "two_hundred_day_average_change_percent": 17.58379,
                "average_daily_volume_3_month": 41361,
                "average_daily_volume_10_day": 23486,
                "one_year_return": 28.875,
                "three_year_return": 398.21,
                "currency": "EUR",
                "current_price": 208.7,
                "current_price_usd": 234.943142199,
                "current_price_update_time": "2026-11-01T16:02:22Z",
                "regular_market_price": 208.7,
                "regular_market_price_usd": 234.943142199,
                "regular_market_price_change": 4.149994,
                "regular_market_price_change_usd": 4.67183819102538,
                "regular_market_price_change_percent": 2.0288408,
                "regular_market_time": "2026-10-02T15:35:23Z",
                "regular_market_volume": 50318,
                "pre_market_price": null,
                "pre_market_price_usd": null,
                "pre_market_time": null,
                "full_exchange_name": "Milan",
                "exchange": "MIL",
                "exchange_timezone_name": "Europe/Rome",
                "exchange_timezone_short_name": "CET",
                "fifty_two_week_low_change": 64.23999,
                "fifty_two_week_low_change_percent": 44.46905,
                "fifty_two_week_high_change": -7.350006,
                "fifty_two_week_high_change_percent": -3.4019932,
                "fifty_two_week_low": 144.46,
                "fifty_two_week_high": 216.05,
                "fifty_two_week_change_percent": 1.496005,
                "trailing_annual_dividend_rate": 0.28,
                "trailing_annual_dividend_rate_usd": 0.3152088156,
                "trailing_annual_dividend_yield": 0.13688585,
                "dividend_rate": 0.88,
                "dividend_rate_usd": 0.9906562776,
                "dividend_yield": 0.48,
                "time_offset": 3600,
                "market_region": "IT",
                "sector": "Technology",
                "industry": "Semiconductors",
                "amount": 5039478800384,
                "amount_usd": 5673171942536.962,
                "update_time": "2026-11-02T16:05:34Z",
                "usd_rate": 1.12574577,
                "beta": 2.216,
                "founded_date": "2019-12-02T08:00:00Z",
                "fund_inception_date": null,
                "free_cash_flow_margin": null,
                "return_on_invested_capital": null,
                "net_margin": null,
                "return_on_equity": null,
                "debt_to_equity": null,
                "revenue_stability": null,
                "revenue_growth": null,
                "eps_growth": null,
                "one_year_change_percent_basic_eps": null
            },
            {
                "symbol": "0R1I.IL",
                "display_name": null,
                "short_name": "NVIDIA CORP NVIDIA ORD SHS",
                "long_name": "NVIDIA Corporation",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/f9642c01-5bcd-8a22-fb57-d0f7c87c414e",
                "quote_source_name": "Delayed Quote",
                "fifty_day_average": 222.796,
                "fifty_day_average_change": -15.445999,
                "fifty_day_average_change_percent": -6.932799,
                "two_hundred_day_average": 205.03142,
                "two_hundred_day_average_change": 2.3185883,
                "two_hundred_day_average_change_percent": 1.1308453,
                "average_daily_volume_3_month": 759955,
                "average_daily_volume_10_day": 585013,
                "one_year_return": 1.592,
                "three_year_return": -53.048,
                "currency": "USD",
                "current_price": 207.35,
                "current_price_usd": 207.35,
                "current_price_update_time": "2026-11-02T17:42:38Z",
                "regular_market_price": 207.35,
                "regular_market_price_usd": 207.35,
                "regular_market_price_change": 2.050003,
                "regular_market_price_change_usd": 2.050003,
                "regular_market_price_change_percent": 0.9985402,
                "regular_market_time": "2026-11-02T17:27:33Z",
                "regular_market_volume": 568826,
                "pre_market_price": null,
                "pre_market_price_usd": null,
                "pre_market_time": null,
                "full_exchange_name": "IOB",
                "exchange": "IOB",
                "exchange_timezone_name": "Europe/London",
                "exchange_timezone_short_name": "GMT",
                "fifty_two_week_low_change": 107.350006,
                "fifty_two_week_low_change_percent": 107.35,
                "fifty_two_week_high_change": -36.01999,
                "fifty_two_week_high_change_percent": -14.800505,
                "fifty_two_week_low": 100,
                "fifty_two_week_high": 243.37,
                "fifty_two_week_change_percent": -1.1412323,
                "trailing_annual_dividend_rate": 0.016,
                "trailing_annual_dividend_rate_usd": 0.016,
                "trailing_annual_dividend_yield": 0.00779347,
                "dividend_rate": 0.4,
                "dividend_rate_usd": 0.4,
                "dividend_yield": 0.34,
                "time_offset": 0,
                "market_region": "GB",
                "sector": "Technology",
                "industry": "Semiconductors",
                "amount": 5131456741376,
                "amount_usd": 5131456741376,
                "update_time": "2026-11-02T17:42:38Z",
                "usd_rate": null,
                "beta": 1.693779,
                "founded_date": "2014-11-04T08:00:00Z",
                "fund_inception_date": null,
                "free_cash_flow_margin": 0.50366308,
                "return_on_invested_capital": 0.6676865922020258,
                "net_margin": 0.55602534,
                "return_on_equity": 0.76333339,
                "debt_to_equity": 0.07018748,
                "revenue_stability": 0.878539068377033,
                "revenue_growth": 0.5165969048251269,
                "eps_growth": 0.6632099331361276,
                "one_year_change_percent_basic_eps": 65.993265
            },
            {
                "symbol": "NVDA",
                "display_name": "NVIDIA",
                "short_name": "NVIDIA Corporation",
                "long_name": "NVIDIA Corporation",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/f77c41e6-f5cd-653b-1d73-b179528f1095",
                "quote_source_name": "Nasdaq Real Time Price",
                "fifty_day_average": 221.7486,
                "fifty_day_average_change": -19.688599,
                "fifty_day_average_change_percent": -8.878793,
                "two_hundred_day_average": 204.38455,
                "two_hundred_day_average_change": -2.3245544,
                "two_hundred_day_average_change_percent": -1.1373435,
                "average_daily_volume_3_month": 114133204,
                "average_daily_volume_10_day": 98524360,
                "one_year_return": -0.212,
                "three_year_return": 348.972,
                "currency": "USD",
                "current_price": 204.5,
                "current_price_usd": 204.5,
                "current_price_update_time": "2026-11-03T11:53:20Z",
                "regular_market_price": 202.06,
                "regular_market_price_usd": 202.06,
                "regular_market_price_change": -2.5800018,
                "regular_market_price_change_usd": -2.5800018,
                "regular_market_price_change_percent": -1.2607515,
                "regular_market_time": "2026-11-02T21:00:01Z",
                "regular_market_volume": 119222246,
                "pre_market_price": 205.33,
                "pre_market_price_usd": 205.33,
                "pre_market_time": "2026-11-03T10:24:32Z",
                "full_exchange_name": "NasdaqGS",
                "exchange": "NMS",
                "exchange_timezone_name": "America/New_York",
                "exchange_timezone_short_name": "EST",
                "fifty_two_week_low_change": 37.789993,
                "fifty_two_week_low_change_percent": 23.004805,
                "fifty_two_week_high_change": -41.309998,
                "fifty_two_week_high_change_percent": -16.974154,
                "fifty_two_week_low": 164.27,
                "fifty_two_week_high": 243.37,
                "fifty_two_week_change_percent": -1.0827541,
                "trailing_annual_dividend_rate": 0.28,
                "trailing_annual_dividend_rate_usd": 0.28,
                "trailing_annual_dividend_yield": 0.13682564,
                "dividend_rate": 1,
                "dividend_rate_usd": 1,
                "dividend_yield": 0.49,
                "time_offset": -18000,
                "market_region": "US",
                "sector": "Technology",
                "industry": "Semiconductors",
                "amount": 4879142617088,
                "amount_usd": 4879142617088,
                "update_time": "2026-11-03T10:24:46Z",
                "usd_rate": null,
                "beta": 2.216,
                "founded_date": "1999-01-22T14:30:00Z",
                "fund_inception_date": null,
                "free_cash_flow_margin": 0.50366308,
                "return_on_invested_capital": 0.6676865922020258,
                "net_margin": 0.55602534,
                "return_on_equity": 0.76333339,
                "debt_to_equity": 0.07018748,
                "revenue_stability": 0.878539068377033,
                "revenue_growth": 0.5165969048251269,
                "eps_growth": 0.6632099331361276,
                "one_year_change_percent_basic_eps": 65.993265
            }
        ]
    }
}
```


## Units and Formats

- Prices, market cap, and dividend rates are returned in the trading currency specified in **currency**. Fields with the **_usd** suffix are normalized to USD using **usd_rate**. For assets traded in USD, **usd_rate** is null.
- Fields with the **_percent** suffix, as well as **dividend_yield**, **trailing_annual_dividend_yield**, **one_year_return**, and **three_year_return**, are expressed in percentage points (for example, 0.31 = 0.31%).
- **net_margin**, **free_cash_flow_margin**, **return_on_equity**, **return_on_invested_capital**, **revenue_growth**, and **eps_growth** are expressed as decimal fractions (for example, 0.27 = 27%).
- **debt_to_equity** and **beta** are expressed as multiples (for example, a **debt_to_equity** of 1.34 means debt equals 1.34 times equity).

## Pagination &amp; Limits 

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- To keep the order consistent across pages, pass **sort_by**, for example, by **symbol**.

## Related APIs

- [Lightweight Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search-lite/)
- [Global Market Index Search API ](https://developers.finimpulse.com/v1/market/index/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary-lite/)
- [Company, ETF &amp; Mutual Fund Profile API](https://developers.finimpulse.com/v1/profile/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)

## Build with this API

- [Build Stock Screening Platforms Using Ticker Search API](https://finimpulse.com/rest-api-use-cases/ticker-search-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
