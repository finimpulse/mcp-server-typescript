---
title: Stock Analyst Recommendations API
created: 2026-03-04
updated: 2026-11-05
endpoint: POST v1/analysis/recommendations
auth: Bearer Token
---

# Stock Analyst Recommendations API

Returns analyst recommendation breakdown for a ticker over time (rating distribution), including counts for Strong Buy/Buy/Hold/Sell/Strong Sell.

This endpoint provides the data to power **Recommendations** charts and tables in the Analysis section.

Analyst estimates, ratings, and price targets are sourced from third parties and provided for informational purposes only. FinImpulse does not guarantee their accuracy and does not present them as its own investment recommendations.

## Data Freshness

Analyst data is refreshed daily.

## Asset Type Compatibility

- **Stocks**: The endpoint is designed primarily for stocks.
- **ETFs and Mutual funds**: The request can be executed via the unified symbol universe, but results may be empty due to data availability and asset nature.

## When to Use This Endpoint

- Show analyst recommendation breakdown for a ticker over time.
- Build a “Recommendations” chart or table with historical snapshots.
- Track changes in sentiment across Strong Buy / Buy / Hold / Sell / Strong Sell.
- Filter tickers based on recommendation composition (e.g., high Strong Buy, low Sell).

## Request Parameters

**POST** `v1/analysis/recommendations` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD).
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
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
    - `selector` - Metric used for sorting (e.g., date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/analysis/recommendations" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "AAPL",
      "start_date": "2025-01-01",
      "end_date": "2026-01-30",
      "limit": 3,
      "offset": 0,
      "filters": [
          [
              "buy",
              "=",
              24
          ],
          "and",
          [
              "hold",
              "<>",
              10
          ]
      ],
      "sort_by": [
          {
              "selector": "date",
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
var url = "https://api.finimpulse.com/v1/analysis/recommendations";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""AAPL"",
    ""start_date"": ""2025-01-01"",
    ""end_date"": ""2026-01-30"",
    ""limit"": 3,
    ""offset"": 0,
    ""filters"": [
        [
            ""buy"",
            ""="",
            24
        ],
        ""and"",
        [
            ""hold"",
            ""<>"",
            10
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""date"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/analysis/recommendations",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "AAPL",
      "start_date" => "2025-01-01",
      "end_date" => "2026-01-30",
      "limit" => 3,
      "offset" => 0,
      "filters" => [
        [
          "buy",
          "=",
          24
        ],
        "and",
        [
          "hold",
          "<>",
          10
        ]
      ],
      "sort_by" => [
        [
          "selector" => "date",
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

url = "https://api.finimpulse.com/v1/analysis/recommendations"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "AAPL",
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "buy",
            "=",
            24
        ],
        "and",
        [
            "hold",
            "<>",
            10
        ]
    ],
    "sort_by": [
        {
            "selector": "date",
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
    "symbol": "AAPL",
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "buy",
            "=",
            24
        ],
        "and",
        [
            "hold",
            "<>",
            10
        ]
    ],
    "sort_by": [
        {
            "selector": "date",
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

const req = https.request('https://api.finimpulse.com/v1/analysis/recommendations', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of recommendation snapshot records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of recommendation snapshot records.


### Recommendation Item Fields


- **date**   
     `string` — Snapshot date (YYYY-MM-DD).
- **strong_buy**   
     `integer` — Number of Strong Buy recommendations.
- **buy**   
     `integer` — Number of Buy recommendations.
- **hold**   
     `integer` — Number of Hold recommendations.
- **sell**   
     `integer` — Number of Sell recommendations.
- **strong_sell**   
     `integer` — Number of Strong Sell recommendations.


### Example Response


```json
{
    "result": {
        "total_count": 4,
        "items_count": 3,
        "items": [
            {
                "date": "2026-01-01",
                "strong_buy": 6,
                "buy": 24,
                "hold": 15,
                "sell": 1,
                "strong_sell": 2
            },
            {
                "date": "2025-12-01",
                "strong_buy": 5,
                "buy": 24,
                "hold": 15,
                "sell": 1,
                "strong_sell": 3
            },
            {
                "date": "2025-11-01",
                "strong_buy": 5,
                "buy": 24,
                "hold": 15,
                "sell": 1,
                "strong_sell": 3
            }
        ]
    }
}
```


## Notes

- Recommendation values are **counts** (number of analysts).
- Records are typically returned as periodic snapshots (often monthly).
