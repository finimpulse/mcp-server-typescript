---
title: Stock Financial Metrics &amp; Dividends API
created: 2026-06-18
updated: 2026-11-03
endpoint: POST v1/metrics
auth: Bearer Token
---

# Stock Financial Metrics &amp; Dividends API

Returns dividend, performance, technical, profitability, growth, and risk metrics for a single asset symbol. 

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint retrieves a focused set of financial and market metrics for a single asset, including dividends, historical returns, technical indicators, and key profitability, growth, and risk measures.

## Coverage

Asset TypesStocks, ETFs, mutual funds, indicesMarket Regions~54Listings~370,000Metrics20

Coverage figures are approximate and may change over time.

## Data Freshness

Metrics are updated once a day.

## Asset Type Compatibility

Primarily designed for stocks. Other asset types (ETFs, mutual funds, and indices) are also supported, but many fields are returned as null (such as profitability, growth, and leverage metrics).

## Data Availability &amp; Limitations

- Some fields may be **null** if a specific value is not available for a given asset. This does not indicate an error.
- For listings quoted in minor currency units (for example, pence on the London Stock Exchange), **trailing_annual_dividend_yield** may be significantly lower than the actual value.

## When to Use This Endpoint

- Add a key metrics panel to stock detail pages in investment research or portfolio apps.
- Build a dividend tracker that shows forward and trailing payouts for each holding in a portfolio.
- Calculate portfolio dividend income for holdings from different markets using USD-normalized dividend rates.
- Feed profitability, growth, and leverage metrics into stock comparison or scoring models.
- Monitor whether watchlist assets are priced above or below their 50-day and 200-day moving averages.

## Request Parameters

**POST** `v1/metrics` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


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


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/metrics";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/metrics",
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

url = "https://api.finimpulse.com/v1/metrics"
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

const req = https.request('https://api.finimpulse.com/v1/metrics', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response returns a result array with a single object for the requested symbol.

### Identification Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).


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


### Returns &amp; Performance


- **one_year_return**   
     `number` — Total return over the past year.
- **three_year_return**   
     `number` — Total return over the past three years.


### Technical Indicators


- **fifty_day_average_change_percent**   
     `number` — Percent difference between current price and 50-day average.
- **two_hundred_day_average_change_percent**   
     `number` — Percent difference between current price and 200-day average.
- **fifty_two_week_change_percent**   
     `number` — Percent change in price over the last 52 weeks.


### Profitability &amp; Margins


- **free_cash_flow_margin**   
     `number` — Free cash flow margin (FCF margin).
- **return_on_invested_capital**   
     `number` — Return on invested capital (ROIC).
- **net_margin**   
     `number` — Net margin.
- **return_on_equity**   
     `number` — Return on equity (ROE).


### Growth &amp; Risk


- **beta**   
     `number` — Beta.
- **debt_to_equity**   
     `number` — Debt-to-equity (D/E).
- **revenue_stability**   
     `number` — Revenue stability.
- **revenue_growth**   
     `number` — Revenue growth.
- **eps_growth**   
     `number` — Earnings per share (EPS) growth.


### Example Response


```json
{
    "result": [
        {
            "symbol": "NVDA",
            "dividend_rate": 1,
            "dividend_rate_usd": 1,
            "dividend_yield": 0.47,
            "trailing_annual_dividend_rate": 0.04,
            "trailing_annual_dividend_rate_usd": 0.04,
            "trailing_annual_dividend_yield": 0.01888574,
            "one_year_return": 24.487,
            "three_year_return": 367.351,
            "beta": 2.211,
            "fifty_day_average_change_percent": 1.3786548,
            "fifty_two_week_change_percent": 24.000704,
            "two_hundred_day_average_change_percent": 10.594051,
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


## Units and Formats

- Dividend yields, one- and three-year returns, and price change fields are expressed as percentages (e.g., 2.25 represents 2.25%).
- Profitability and growth fields are expressed as decimal values (e.g., 0.0614 represents 6.14%). **debt_to_equity** is expressed as a ratio (e.g., 1.41 means debt equals 1.41 times equity).
- Dividend rates are expressed in the asset’s currency. For listings quoted in minor currency units, such as pence, rates are expressed in the major unit, such as pounds.

## Related APIs

- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)
- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Stock Financial Statements &amp; Valuation APIs](https://developers.finimpulse.com/financial-statements/)
- [Risk &amp; Risk-Adjusted Performance Metrics API](https://developers.finimpulse.com/v1/statistics/risks/)

## Build with this API

- [Build Company Metrics Comparison Tools Using Metrics &amp; Dividends API](https://finimpulse.com/rest-api-use-cases/metrics-dividends-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
