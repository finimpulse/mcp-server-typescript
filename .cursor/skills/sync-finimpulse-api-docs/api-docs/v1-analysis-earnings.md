---
title: Earnings
created: 2026-03-04
updated: 2026-03-09
endpoint: POST v1/analysis/earnings
auth: Bearer Token
---

# Earnings

Returns earnings- and estimate-related analysis records for an asset, including earnings, revenue, EPS actuals, EPS trends, revisions, and growth metrics (depending on requested types).

This endpoint provides data for the **Earnings &amp; Estimates** section of the Analysis module and supports derived analytics, including surprises, estimate revisions, and earnings/revenue history.

## Asset Type Compatibility

- **Stocks:** Fully supported and are the primary intended use case for this endpoint.
- **ETFs and Mutual Funds**: The request can be executed via the unified symbol universe, but may return an empty result depending on data availability and asset nature.

## When to Use This Endpoint

- Populate the **Earnings &amp; Estimates** section of the Analysis module with historical and forward-looking earnings data.
- Power earnings-focused dashboards and widgets that require EPS actuals, revenue history, estimate consensus, trends, revisions, and growth metrics.
- Support derived analytics such as earnings surprises, estimate revision tracking, and benchmark-relative growth comparisons.
- Feed downstream analytics pipelines that need comprehensive earnings data without multiple separate calls.

## Request Parameters

**POST** `v1/analysis/earnings` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **types**   
     `array` *(optional)* — List of analysis record types to return. **Supported values:**
    - `eps_actual`
    - `earnings_revenue`
    - `earnings`
    - `revenue`
    - `eps_trend`
    - `eps_revisions`
    - `growth`
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported types are returned. You can request any subset of types. Returned records will contain a `type` field, allowing you to mix types in a single response safely. **Example:** `"types": [ "eps_actual", "earnings_revenue" ]`
- **methodologies**   
     `array` *(optional)* — Accounting methodologies to filter earnings data. 
    - `GAAP`: Official earnings calculated according to Generally Accepted Accounting Principles.
    - `normalized`: Adjusted earnings, excluding one-time or non-recurring items.
     
     **Example:** `"methodologies": ["normalized", "gaap"]`
- **comparison_symbols**   
     `array` *(optional)* — Tickers or indices to include in growth estimates comparisons. Note that S&amp;P 500 is always included by default and does not need to be specified. **Example:** `"comparison_symbols": ["NDAQ", "DOW"],`
- **start_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **limit**   
     `integer` *(optional)* — Maximum number of items to return (user-defined).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **filters**   
     `array` *(optional)* — Optional filter expressions. Each filter condition is defined as: `[field, operator, value]`. Conditions can be combined using logical operators `and`/`or`. **Supported operators:** *Numeric fields:*
    - `>` - greater than
    - `>=` - greater than or equal
    - `<` - less than
    - `<=` - less than or equal
    - `=` - equals
    - `<>` - not equal
     
     *String fields:*
    - `like` – pattern match (requires % as a wildcard)
    - `not_like` - pattern does not match (requires % as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     *`%` usage examples:*
    - %abc% - matches any string containing "abc"
    - abc% - matches any string starting with "abc"
    - %abc - matches any string ending with "abc"
     
     **Example:** `"filters": [ [ "actual", "=", 1.57 ], "and", [ "surprise_pct", "<>", 4.52 ] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "date", "desc": true } ]`
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/analysis/earnings" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "AAPL",
      "start_date": "2025-01-01",
      "end_date": "2026-01-30",
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
var url = "https://api.finimpulse.com/v1/analysis/earnings";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""AAPL"",
    ""start_date"": ""2025-01-01"",
    ""end_date"": ""2026-01-30"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/analysis/earnings",
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

url = "https://api.finimpulse.com/v1/analysis/earnings"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "AAPL",
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
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
    "symbol": "AAPL",
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
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

const req = https.request('https://api.finimpulse.com/v1/analysis/earnings', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains metafields and a list of earnings records. The fields within each record may vary depending on its type.

### Meta Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **target_price**   
     `number` — Price target.
- **target_average_price**   
     `number` — Average price target.
- **target_low_price**   
     `number` — Lowest price target.
- **target_high_price**   
     `number` — Highest price target.
- **total_count**   
     `integer` — Total number of matching records available.
- **items_count**   
     `integer` — Number of records returned in the current response.
- **items**   
     `array` — Array of earnings records.


### EPS Actual


- **type**   
     `string` — Record type ("eps_actual" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **methodology**   
     `string` — Indicates the accounting basis used for calculation (normalized / GAAP).
- **actual**   
     `number` — EPS actual.
- **estimate**   
     `number` — EPS estimate.
- **surprise**   
     `number` — EPS surprise.
- **surprise_pct**   
     `number` — Surprise percentage.


### Earnings vs. Revenue


- **type**   
     `string` — Record type ("earnings_revenue" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **methodology**   
     `string` — Indicates the accounting basis used for calculation (normalized / GAAP).
- **revenue**   
     `number` — Total revenue for the period.
- **earnings**   
     `number` — Total earnings for the period.


### Earnings


- **type**   
     `string` — Record type ("earnings" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **analysts**   
     `integer` — Number of analysts contributing to the estimate.
- **avg**   
     `number` — Average EPS estimate.
- **low**   
     `number` — Low EPS estimate.
- **high**   
     `number` — High EPS estimate.
- **year_ago_eps**   
     `number` — EPS from the comparable prior-year period (null if not available).
- **year_ago_revenue**   
     `number` — Comparable prior-year revenue (not used for EPS estimates; may be null).
- **growth**   
     `number` — Growth value for the period.


### Revenue


- **type**   
     `string` — Record type ("revenue" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **analysts**   
     `integer` — Number of analysts contributing to the estimate.
- **avg**   
     `number` — Average revenue estimate.
- **low**   
     `number` — Low revenue estimate.
- **high**   
     `number` — High revenue estimate.
- **year_ago_eps**   
     `number` — Comparable prior-year EPS (not used for revenue estimates; may be null).
- **year_ago_revenue**   
     `number` — Revenue from the comparable prior-year period (null if not available).
- **growth**   
     `number` — Growth value for the period.


### EPS Trend


- **type**   
     `string` — Record type ("eps_trend" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **current**   
     `number` — EPS value as of the record date.
- **seven_days_ago**   
     `number` — EPS estimate 7 days ago.
- **thirty_days_ago**   
     `number` — EPS estimate 30 days ago.
- **sixty_days_ago**   
     `number` — EPS estimate 60 days ago.
- **ninety_days_ago**   
     `number` — EPS estimate 90 days ago.


### EPS Revisions


- **type**   
     `string` — Record type ("eps_revisions" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **up_last7days**   
     `integer` — Number of upward revisions in last 7 days.
- **up_last30days**   
     `integer` — Number of upward revisions in last 30 days.
- **down_last7days**   
     `integer` — Number of downward revisions in last 7 days.
- **down_last30days**   
     `integer` — Number of downward revisions in last 30 days.


### Growth


- **type**   
     `string` — Record type ("growth" expected).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **date_type**   
     `string` — Date granularity (quarter/year).
- **growth**   
     `number` — Growth value.
- **growth_benchmark**   
     `number` — Benchmark growth value (null if not available).
- **symbol_benchmark**   
     `string` — Benchmark symbol identifier (if available).


### Example Response


```json
{
    "task_id": "2a40aeee-8e92-43bf-8ba1-70d9b8e124c4",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": {
        "symbol": "AAPL",
        "limit": 5,
        "offset": 0,
        "filters": [
            [
                "actual",
                "=",
                1.57
            ],
            "and",
            [
                "surprise_pct",
                "<>",
                4.52
            ]
        ],
        "start_date": "2025-01-01",
        "end_date": "2026-01-30",
        "sort_by": [
            {
                "selector": "date",
                "desc": true
            }
        ],
        "types": [
            "eps_actual",
            "earnings_revenue"
        ],
        "methodologies": [
            "normalized",
            "gaap"
        ]
    },
    "result": {
        "symbol": "AAPL",
        "target_price": 264.72,
        "target_average_price": 293.06952,
        "target_low_price": 205,
        "target_high_price": 350,
        "total_count": 4,
        "items_count": 4,
        "items": [
            {
                "type": "eps_actual",
                "date": "2025-04-01",
                "date_type": "quarter",
                "methodology": "normalized",
                "actual": 1.57,
                "estimate": 1.42572,
                "surprise": 0.14428,
                "surprise_pct": 10.12
            },
            {
                "type": "earnings_revenue",
                "date": "2025-04-01",
                "date_type": "quarter",
                "methodology": "normalized",
                "revenue": 94036000000,
                "earnings": 23434000000
            },
            {
                "type": "eps_actual",
                "date": "2025-04-01",
                "date_type": "quarter",
                "methodology": "gaap",
                "actual": 1.57,
                "estimate": 1.42572,
                "surprise": 0.14428,
                "surprise_pct": 10.12
            },
            {
                "type": "earnings_revenue",
                "date": "2025-04-01",
                "date_type": "quarter",
                "methodology": "gaap",
                "revenue": 94036000000,
                "earnings": 23434000000
            }
        ]
    }
}
```


## Notes

- The result set may include records of the same **type** with different **date_type** values (quarter and annual). Filter or group data based on **date_type**.
- Percent values are returned as fractions (e.g., 0.69359 = 69.359%).
