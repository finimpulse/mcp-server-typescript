---
title: General
created: 2026-01-28
updated: 2026-02-06
endpoint: POST v1/holdings/general
auth: Bearer Token
---

# General

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
     `string` — Asset symbol.


### Asset Allocation

High-level allocation across asset classes within the fund.


- **cash_position**   
     `number` — Cash and cash equivalents allocation.
- **stock_position**   
     `number` — Equity holdings allocation.
- **bond_position**   
     `number` — Bond holdings allocation.
- **other_position**   
     `number` — Other asset classes allocation.
- **preferred_position**   
     `number` — Preferred securities allocation.
- **convertible_position**   
     `number` — Convertible securities allocation.


### Valuation Characteristics (Holdings-weighted)

Aggregated valuation metrics calculated across the fund’s holdings, weighted by position size.


- **price_to_earnings**   
     `number` — Price to earnings ratio.
- **price_to_book_holding**   
     `number` — Price to book ratio.
- **price_to_sales**   
     `number` — Price to sales ratio.
- **price_to_cashflow**   
     `number` — Price to cash flow ratio.


### Market Size and Growth Characteristics

Aggregated market-cap and growth indicators derived from the underlying holdings.


- **median_market_cap**   
     `number` — Median market capitalization.
- **three_year_earnings_growth**   
     `number` — Three-year earnings growth.


### Sector Allocation

Sector exposure of the fund, expressed as a proportion of total assets.


- **realestate**   
     `number` — Real estate sector exposure.
- **consumer_cyclical**   
     `number` — Consumer cyclical sector exposure.
- **basic_materials**   
     `number` — Basic materials sector exposure.
- **consumer_defensive**   
     `number` — Consumer defensive sector exposure.
- **technology**   
     `number` — Technology sector exposure.
- **communication_services**   
     `number` — Communication services sector exposure.
- **financial_services**   
     `number` — Financial services sector exposure.
- **utilities**   
     `number` — Utilities sector exposure.
- **industrials**   
     `number` — Industrials sector exposure.
- **energy**   
     `number` — Energy sector exposure.
- **healthcare**   
     `number` — Healthcare sector exposure.


### Example Response


```json
{
    "task_id": "e32ae526-2dc5-46e8-af1e-100a2a11d30f",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.01,
    "data": {
        "symbol": "SPY",
        "tag": "just tag"
    },
    "result": {
        "symbol": "SPY",
        "cash_position": 0.0026,
        "stock_position": 0.9974,
        "bond_position": 0,
        "other_position": 0,
        "preferred_position": 0,
        "convertible_position": 0,
        "price_to_earnings": 0.03622,
        "price_to_book_holding": 0.19672,
        "price_to_sales": 0.28377,
        "price_to_cashflow": 0.05073,
        "median_market_cap": null,
        "three_year_earnings_growth": null,
        "realestate": 0.0183,
        "consumer_cyclical": 0.1055,
        "basic_materials": 0.0165,
        "consumer_defensive": 0.0471,
        "technology": 0.3509,
        "communication_services": 0.1089,
        "financial_services": 0.1313,
        "utilities": 0.0225,
        "industrials": 0.0749,
        "energy": 0.02809999,
        "healthcare": 0.0959
    }
}
```


## Notes
- All allocation and sector values represent proportions of the total portfolio.
- Sector weights may not sum to exactly one due to rounding or partial data availability.
- Percentages are expressed as decimal fractions (e.g. 0.25 = 25%)
- Full calculation methodology and field definitions are documented in the [**Glossary**](https://finimpulse.com/glossary/).
