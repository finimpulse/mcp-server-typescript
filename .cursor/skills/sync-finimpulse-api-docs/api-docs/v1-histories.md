---
title: Histories
created: 2026-01-28
updated: 2026-03-09
endpoint: POST v1/histories
auth: Bearer Token
---

# Histories

Returns time-series data for an asset in a single unified stream.

This endpoint can return historical prices and, optionally, additional history “event” types such as dividends, splits, and capital gains (where available). It is a configurable endpoint that lets you control the date range, interval, included record types, sorting, and page size.

## Asset Type Compatibility
*/histories* works consistently across stocks, ETFs, and mutual funds.

- ***historical_price***: The primary type and is generally available for all assets with price history.
- ***dividends*** and ***splits***: Depend on the availability of corporate actions/distributions data for the asset.
- ***capital_gains***: Typically present only for some funds (often older share classes/specific fund structures).

If a requested type has no data for the asset, it will simply be absent from items.

## USD Normalization
By default, all currency-denominated fields are returned in the asset's native currency. For assets traded in non-USD currencies, **you can request automatic conversion to USD by passing the "*use_usd*" parameter**.

When **“use_usd”: true** is set, all currency-denominated fields across all record types are converted to USD at the applicable historical exchange rate for each date.

This removes the need for client-side currency conversion, providing a consistent USD baseline across all assets and record types.


## When to Use This Endpoint
- Power the **Historical Data** tab (prices, with optional corporate actions overlays).
- Build a **single list** of timeline records (including prices and events) for charts and tables.
- Pull data for export (CSV/Sheets) with consistent sorting and pagination.
- Show dividends/splits alongside prices without calling separate endpoints.

## Request Parameters
**POST** `v1/histories` 

- **symbol**   
     `sring` *(required)* — Asset identifier (ticker symbol).
- **types**   
     `array` *(optional)* — Record types to include. **Supported values:**
    - `historical_price`
    - `dividends`
    - `splits`
    - `capital_gains`
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported types are returned. **Example:** `"types": [ "historical_price", "dividends", "splits", "capital_gains" ]`
- **interval**   
     `string` *(optional)* — Granularity for returned history records. **Available values:**
    - `1d` (1 day)
    - `1wk` (1 week)
    - `1mo` (1 month)
    - `3mo` (3 month)
    - `6mo` (6 month)
    - `1y` (1 year)
     
     Supported intervals depend on the data source and asset coverage.
- **start_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
- **end_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., date).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. **Example:** ` { "selector": "date", "desc": true }`
- **limit**   
     `integer` *(optional)* — Maximum number of items to return (user-defined).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based)
- **use_usd**   
     `boolean` *(optional)* — Controls whether currency-denominated fields are returned in USD or in the asset's native currency. 
    - `true` - all currency-denominated fields are returned in USD
    - `false` - all currency-denominated fields are returned in the asset's native currency (default)
     
     Ignored for assets already denominated in USD.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/histories" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "interval": "1d",
      "start_date": "2025-12-01",
      "end_date": "2025-12-30",
      "limit": 5,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/histories";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""interval"": ""1d"",
    ""start_date"": ""2025-12-01"",
    ""end_date"": ""2025-12-30"",
    ""limit"": 5,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/histories",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "interval" => "1d",
      "start_date" => "2025-12-01",
      "end_date" => "2025-12-30",
      "limit" => 5,
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

url = "https://api.finimpulse.com/v1/histories"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "interval": "1d",
    "start_date": "2025-12-01",
    "end_date": "2025-12-30",
    "limit": 5,
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
    "symbol": "NVDA",
    "interval": "1d",
    "start_date": "2025-12-01",
    "end_date": "2025-12-30",
    "limit": 5,
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

const req = https.request('https://api.finimpulse.com/v1/histories', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
### Meta Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **quote_type**   
     `string` — Asset type (e.g., equity, etf, mutualfund).
- **currency**   
     `string` — Trading currency.
- **time_offset**   
     `integer` — Exchange time offset in seconds.
- **exchange_timezone_name**   
     `string` — Exchange time zone name (e.g., America/New_York).
- **full_exchange_name**   
     `string` — Exchange name.
- **display_name**   
     `string` — Preferred asset name (if available).
- **market_region**   
     `string` — Market/country code.
- **total_count**   
     `integer` — Total number of items that match filters.
- **search_after_token**   
     `string` — Token for pagination. Pass it in the next request to fetch the next page. **Format:** `"search_after_token": "token_here"`
- **items_count**   
     `integer` — Number of items returned.
- **items**   
     `array` — Array of history records.


### Historical Price


- **type**   
     `string` — Record type (historical_price expected).
- **date**   
     `string` — Trading date (YYYY-MM-DD).
- **open**   
     `number` — Open price for the interval.
- **high**   
     `number` — High price for the interval.
- **low**   
     `number` — Low price for the interval.
- **close**   
     `number` — Close price for the interval.
- **adj_close**   
     `number` — Adjusted close price.
- **volume**   
     `number` — Traded volume for the interval.


### Dividends


- **type**   
     `string` — Record type (dividends expected).
- **date**   
     `string` — Trading date (YYYY-MM-DD).
- **amount**   
     `number` — Dividend amount.


### Splits


- **type**   
     `string` — Record type (splits expected).
- **date**   
     `string` — Trading date (YYYY-MM-DD).
- **numerator**   
     `integer` — Number of shares after the split.
- **denominator**   
     `integer` — Number of shares before the split.


### Capital Gains


- **type**   
     `string` — Record type (capital_gains expected).
- **date**   
     `string` — Trading date (YYYY-MM-DD).
- **amount**   
     `number` — Realized capital gain or loss amount (positive value = capital gain, negative value = capital loss).


### Example Response


```json
{
    "task_id": "6a5e231c-27b7-436f-b5b8-54ebc30f62be",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0004,
    "data": {
        "symbol": "NVDA",
        "interval": "1d",
        "start_date": "2025-12-01",
        "end_date": "2025-12-30",
        "sort_by": [
            {
                "selector": "date",
                "desc": true
            }
        ],
        "limit": 5,
        "offset": 0,
        "tag": "just tag",
        "types": [
            "historical_price",
            "dividends",
            "splits",
            "capital_gains"
        ]
    },
    "result": {
        "symbol": "NVDA",
        "quote_type": "equity",
        "currency": "USD",
        "time_offset": -14400,
        "exchange_timezone_name": "America/New_York",
        "full_exchange_name": "NasdaqGS",
        "display_name": "NVIDIA",
        "market_region": "US_OT",
        "total_count": 21,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzeW1ib2wiOiJOVkRBIiwidXNlX3VzZCI6ZmFsc2UsInR5cGVzIjpbImhpc3RvcmljYWxfcHJpY2UiLCJkaXZpZGVuZHMiLCJzcGxpdHMiLCJjYXBpdGFsX2dhaW5zIl0sImludGVydmFsIjoiMWQiLCJzdGFydF9kYXRlIjoiMjAyNS0xMi0wMSIsImVuZF9kYXRlIjoiMjAyNS0xMi0zMCIsInF1ZXJ5IjpudWxsLCJvcmRlcl9ieSI6eyJvcmRlcl9maWVsZCI6ImRhdGUiLCJvcmRlcl90eXBlIjoiRGVzYyIsIm5leHQiOm51bGx9LCJsaW1pdCI6NSwib2Zmc2V0IjpudWxsLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsiZGF0ZSI6IjIwMjUtMTItMjIifSwiVG9rZW5SZWFsT2Zmc2V0Ijo1LCJUb3RhbENvdW50IjoyMX19",
        "items_count": 5,
        "items": [
            {
                "type": "historical_price",
                "open": 187.71000671,
                "high": 188.75999451,
                "low": 185.91000366,
                "close": 188.22000122,
                "adj_close": 188.22000122,
                "volume": 120006100,
                "date": "2025-12-29"
            },
            {
                "type": "historical_price",
                "open": 189.91999817,
                "high": 192.69000244,
                "low": 188,
                "close": 190.52999878,
                "adj_close": 190.52999878,
                "volume": 139740300,
                "date": "2025-12-26"
            },
            {
                "type": "historical_price",
                "open": 187.94000244,
                "high": 188.91000366,
                "low": 186.58999634,
                "close": 188.61000061,
                "adj_close": 188.61000061,
                "volume": 65528500,
                "date": "2025-12-24"
            },
            {
                "type": "historical_price",
                "open": 182.97000122,
                "high": 189.33000183,
                "low": 182.8999939,
                "close": 189.21000671,
                "adj_close": 189.21000671,
                "volume": 174873600,
                "date": "2025-12-23"
            },
            {
                "type": "historical_price",
                "open": 183.91999817,
                "high": 184.16000366,
                "low": 182.3500061,
                "close": 183.69000244,
                "adj_close": 183.69000244,
                "volume": 129064400,
                "date": "2025-12-22"
            }
        ]
    }
}
```
