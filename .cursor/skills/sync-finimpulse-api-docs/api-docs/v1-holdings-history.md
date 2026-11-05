---
title: Historical ETF Holdings Data API
created: 2026-05-27
updated: 2026-11-05
endpoint: POST v1/holdings/history
auth: Bearer Token
---

# Historical ETF Holdings Data API

Returns the full holdings composition for a selected ETF on a specific historical reporting date.

This is the primary endpoint in the historical holdings workflow. Before calling it, use [**v1/holdings/history/dates/{symbol}**](https://developers.finimpulse.com/v1/holdings/history/dates/) to retrieve the list of available reporting dates for the selected ETF, then pass a valid date here to retrieve the complete portfolio composition as recorded on that date.

Historical holdings coverage begins on **January 1, 2026**, for most ETFs (~10,000 symbols). A subset of ~500 ETFs includes records dating back to 2023-2025. The full list of covered symbols with individual start and end dates is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/09/etf-holdings.txt).

**Note:** Historical holdings snapshots are not updated on a fixed schedule. Update frequency depends on the ETF and may range from several times per week to once per month.

## Asset Type Compatibility

This endpoint is applicable only to **ETFs**. Stocks and mutual funds are not supported.

If no holdings data is available for the requested symbol and date combination, the response returns an empty items array.

## When to Use This Endpoint

- Retrieve the full portfolio composition of an ETF on a specific date.
- Display a holdings breakdown table in an ETF detail or comparison view.
- Analyze position weights and market values for a specific reporting date.
- Screen or filter holdings by weight threshold, market value, or other available fields.
- Track changes in ETF composition across reporting dates.
- Feed portfolio analysis, overlap detection, or AI-driven workflows that operate on full holdings snapshots.

## Request Parameters

**POST** `v1/holdings/history` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **date**   
     `string` *(required)* — Holdings reporting date (YYYY-MM-DD). Must be a date available for the requested symbol. Use **[v1/holdings/history/dates/{symbol}](https://developers.finimpulse.com/v1/holdings/history/dates)** to retrieve the list of available dates.
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **limit**   
     `integer` *(optional)* — Maximum number of matched records returned (user-defined).
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
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., weight_pct).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holdings/history" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "SPY",
      "date": "2026-04-26",
      "limit": 20,
      "offset": 0,
      "filters": [
          "weight_pct",
          ">",
          1
      ],
      "sort_by": [
          {
              "selector": "weight_pct",
              "desc": true
          }
      ],
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/holdings/history";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""SPY"",
    ""date"": ""2026-04-26"",
    ""limit"": 20,
    ""offset"": 0,
    ""filters"": [
        ""weight_pct"",
        "">"",
        1
    ],
    ""sort_by"": [
        {
            ""selector"": ""weight_pct"",
            ""desc"": true
        }
    ],
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holdings/history",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "SPY",
      "date" => "2026-04-26",
      "limit" => 20,
      "offset" => 0,
      "filters" => [
        "weight_pct",
        ">",
        1
      ],
      "sort_by" => [
        [
          "selector" => "weight_pct",
          "desc" => true
        ]
      ],
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

url = "https://api.finimpulse.com/v1/holdings/history"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "SPY",
    "date": "2026-04-26",
    "limit": 20,
    "offset": 0,
    "filters": [
        "weight_pct",
        ">",
        1
    ],
    "sort_by": [
        {
            "selector": "weight_pct",
            "desc": True
        }
    ],
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
    "date": "2026-04-26",
    "limit": 20,
    "offset": 0,
    "filters": [
        "weight_pct",
        ">",
        1
    ],
    "sort_by": [
        {
            "selector": "weight_pct",
            "desc": true
        }
    ],
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

const req = https.request('https://api.finimpulse.com/v1/holdings/history', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

### Pagination Fileds


- **total_count**   
     `integer` — Total number of matching holdings records.
- **items_count**   
     `integer` — Number of holdings records returned.
- **items**   
     `array` — Array of holding records.


### Holding Item

Each item represents a single position in the ETF's holdings composition on the requested date.


- **asset**   
     `string` — Asset identifier (ticker symbol) of the holding.
- **name**   
     `string` — Full name of the holding.
- **isin**   
     `string` — International Securities Identification Number (ISIN). **Temporarily unavailable from September 10, 2026.**
- **cusip**   
     `string` — Committee on Uniform Securities Identification Procedures (CUSIP). **Temporarily unavailable from September 10, 2026.**
- **shares**   
     `integer` — Number of shares held.
- **weight_pct**   
     `number` — Percentage of fund assets allocated to the holding. Values across all holdings may not sum to exactly 100% due to rounding, cash positions, or other non-equity holdings.
- **market_value**   
     `number` — Market value.
- **updated_at**   
     `string` — Timestamp of the last data update (ISO 8601).


### Example Response


```json
{
    "result": {
        "total_count": 12,
        "items_count": 12,
        "items": [
            {
                "asset": "NVDA",
                "name": "NVIDIA CORP",
                "isin": "US67066G1040",
                "cusip": "67066G104",
                "shares": 288592151,
                "weight_pct": 7.947,
                "market_value": 57617820649,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "AAPL",
                "name": "APPLE INC",
                "isin": "US0378331005",
                "cusip": "037833100",
                "shares": 174355685,
                "weight_pct": 6.576,
                "market_value": 47676787718,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "MSFT",
                "name": "MICROSOFT CORP",
                "isin": "US5949181045",
                "cusip": "594918104",
                "shares": 88187105,
                "weight_pct": 5.057,
                "market_value": 36665876659,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "AMZN",
                "name": "AMAZON.COM INC",
                "isin": "US0231351067",
                "cusip": "023135106",
                "shares": 116013043,
                "weight_pct": 4.082,
                "market_value": 29594291883,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "AVGO",
                "name": "BROADCOM INC",
                "isin": "US11135F1012",
                "cusip": "11135F101",
                "shares": 56305930,
                "weight_pct": 3.261,
                "market_value": 23646462584,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "GOOGL",
                "name": "ALPHABET INC CL A",
                "isin": "US02079K3059",
                "cusip": "02079K305",
                "shares": 69140800,
                "weight_pct": 3.232,
                "market_value": 23432458020,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "GOOG",
                "name": "ALPHABET INC CL C",
                "isin": "US02079K1079",
                "cusip": "02079K107",
                "shares": 55550998,
                "weight_pct": 2.588,
                "market_value": 18763418133,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "META",
                "name": "META PLATFORMS INC CLASS A",
                "isin": "US30303M1027",
                "cusip": "30303M102",
                "shares": 25980039,
                "weight_pct": 2.362,
                "market_value": 17125718902,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "TSLA",
                "name": "TESLA INC",
                "isin": "US88160R1014",
                "cusip": "88160R101",
                "shares": 33407856,
                "weight_pct": 1.722,
                "market_value": 12485893026,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "JPM",
                "name": "JPMORGAN CHASE + CO",
                "isin": "US46625H1005",
                "cusip": "46625H100",
                "shares": 32027992,
                "weight_pct": 1.377,
                "market_value": 9983370818,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "LLY",
                "name": "ELI LILLY + CO",
                "isin": "US5324571083",
                "cusip": "532457108",
                "shares": 9413312,
                "weight_pct": 1.191,
                "market_value": 8638614751,
                "updated_at": "2026-04-26T02:04:23Z"
            },
            {
                "asset": "XOM",
                "name": "EXXON MOBIL CORP",
                "isin": "US30231G1022",
                "cusip": "30231G102",
                "shares": 49643075,
                "weight_pct": 1.031,
                "market_value": 7473201455,
                "updated_at": "2026-04-26T02:04:23Z"
            }
        ]
    }
}
```
