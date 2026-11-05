---
title: ETF &amp; Mutual Fund Holdings Overview API
created: 2026-01-28
updated: 2026-11-03
endpoint: POST v1/holdings/general
auth: Bearer Token
---

# ETF &amp; Mutual Fund Holdings Overview API

Returns consolidated portfolio composition and holdings-level aggregates for a fund-like asset, including ETFs and mutual funds.

This endpoint provides a high-level snapshot of how a fund is constructed: asset allocation, sector exposure, and aggregated valuation characteristics of the underlying holdings.

## Asset Type Compatibility
- **Mutual funds**: Returns a complete holdings overview when underlying holdings data is available.
- **ETFs**: Returns a complete holdings overview when underlying holdings data is available.
- **Stocks**: Returns **null** values for all holdings fields because the asset does not represent a diversified portfolio. However, the request can still be executed, as all assets share a unified symbol universe.

## When to Use This Endpoint
- Retrieve a fund’s high-level allocation mix (cash, equity, bonds, and other instruments).
- Display sector exposure breakdowns for ETFs and mutual funds.
- Populate **Holdings Overview/Portfolio Composition** sections in asset pages.
- Support fund screening and comparison based on holdings-derived characteristics.

## Request Parameters
**POST** `v1/holdings/general` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holdings/general" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "SPY",
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/holdings/general";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""SPY"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holdings/general",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "SPY",
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

url = "https://api.finimpulse.com/v1/holdings/general"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "SPY",
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
    "symbol": "SPY",
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

const req = https.request('https://api.finimpulse.com/v1/holdings/general', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response is a single object containing holdings overview fields for the requested asset.

### General Information


- **symbol**   
     `string` — Asset identifier (ticker symbol).


### Asset Allocation


- **cash_position**   
     `number` — Percentage of fund assets held in cash.
- **stock_position**   
     `number` — Percentage of fund assets held in stocks.
- **bond_position**   
     `number` — Percentage of fund assets held in bonds.
- **other_position**   
     `number` — Percentage of fund assets held in other instruments.
- **preferred_position**   
     `number` — Percentage of fund assets held in preferred stock.
- **convertible_position**   
     `number` — Percentage of fund assets held in convertible securities.


### Valuation Characteristics (Holdings-weighted)


- **price_to_earnings**   
     `number` — Price-to-earnings (P/E) ratio.
- **price_to_book_holding**   
     `number` — Holdings-weigted price-to-book (P/B) ratio.
- **price_to_sales**   
     `number` — Price-to-sales (P/S) ratio.
- **price_to_cashflow**   
     `number` — Price-to-cash flow (P/CF) ratio.


### Market Size and Growth Characteristics


- **median_market_cap**   
     `number` — Median market capitalization of fund holdings.
- **three_year_earnings_growth**   
     `number` — 3-year earnings growth.


### Sector Allocation


- **realestate**   
     `number` — Percentage of fund assets in the real estate sector.
- **consumer_cyclical**   
     `number` — Percentage of fund assets in the consumer cyclical sector.
- **basic_materials**   
     `number` — Percentage of fund assets in the basic materials sector.
- **consumer_defensive**   
     `number` — Percentage of fund assets in the consumer defensive sector.
- **technology**   
     `number` — Percentage of fund assets in the technology sector.
- **communication_services**   
     `number` — Percentage of fund assets in the communication services sector.
- **financial_services**   
     `number` — Percentage of fund assets in the financial services sector.
- **utilities**   
     `number` — Percentage of fund assets in the utilities sector.
- **industrials**   
     `number` — Percentage of fund assets in the industrials sector.
- **energy**   
     `number` — Percentage of fund assets in the energy sector.
- **healthcare**   
     `number` — Percentage of fund assets in the healthcare sector.


### Example Response


```json
{
    "result": {
        "symbol": "SPY",
        "cash_position": 0.0011,
        "stock_position": 0.9989,
        "bond_position": 0,
        "other_position": 0,
        "preferred_position": 0,
        "convertible_position": 0,
        "price_to_earnings": 0.03691,
        "price_to_book_holding": 0.18424,
        "price_to_sales": 0.2638,
        "price_to_cashflow": 0.04899,
        "median_market_cap": null,
        "three_year_earnings_growth": null,
        "realestate": 0.01809999,
        "consumer_cyclical": 0.0989,
        "basic_materials": 0.0167,
        "consumer_defensive": 0.045,
        "technology": 0.39049998,
        "communication_services": 0.1064,
        "financial_services": 0.1107,
        "utilities": 0.0211,
        "industrials": 0.0782,
        "energy": 0.0313,
        "healthcare": 0.083
    }
}
```


## Notes
- All allocation and sector values represent proportions of the total portfolio.
- Sector weights may not sum to exactly one due to rounding or partial data availability.
- Percentages are expressed as decimal fractions (e.g. 0.25 = 25%)
- Full calculation methodology and field definitions are documented in the [**Glossary**](https://finimpulse.com/glossary/).
