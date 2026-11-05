---
title: Stock Earnings &amp; Analyst Estimates API
created: 2026-03-04
updated: 2026-11-05
endpoint: POST v1/analysis/earnings
auth: Bearer Token
---

# Stock Earnings &amp; Analyst Estimates API

Returns earnings- and estimate-related analysis records for an asset, including earnings, revenue, EPS actuals, EPS trends, revisions, and growth metrics (depending on requested types).

This endpoint provides data for the **Earnings &amp; Estimates** section of the Analysis module and supports derived analytics, including surprises, estimate revisions, and earnings/revenue history.

Analyst estimates, ratings, and price targets are sourced from third parties and provided for informational purposes only. FinImpulse does not guarantee their accuracy and does not present them as its own investment recommendations.

## Data Freshness

Analyst data is refreshed daily.

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
     `array` *(optional)* — Analysis record types to return. **Supported values:**
    - `eps_actual`
    - `earnings_revenue`
    - `earnings`
    - `revenue`
    - `eps_trend`
    - `eps_revisions`
    - `growth`
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported types are returned. You can request any subset of types. Returned records will contain a `type` field, allowing you to mix types in a single response safely.
- **methodologies**   
     `array` *(optional)* — Accounting methodologies. Applies to `eps_actual` and `earnings_revenue` records only. EPS values for all other record types are normalized and unaffected by this parameter. 
    - `gaap`: Official earnings calculated according to Generally Accepted Accounting Principles.
    - `normalized`: Adjusted earnings, excluding one-time or non-recurring items.
- **comparison_symbols**   
     `array` *(optional)* — Tickers or indices to include in growth estimates comparisons. Note that S&amp;P 500 is always included by default and does not need to be specified.
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
curl --location "https://api.finimpulse.com/v1/analysis/earnings" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "AAPL",
      "types": [
          "eps_actual",
          "earnings_revenue"
      ],
      "methodologies": [
          "normalized",
          "gaap"
      ],
      "comparison_symbols": [
          "NDAQ",
          "DOW"
      ],
      "start_date": "2025-01-01",
      "end_date": "2026-01-30",
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
var url = "https://api.finimpulse.com/v1/analysis/earnings";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""AAPL"",
    ""types"": [
        ""eps_actual"",
        ""earnings_revenue""
    ],
    ""methodologies"": [
        ""normalized"",
        ""gaap""
    ],
    ""comparison_symbols"": [
        ""NDAQ"",
        ""DOW""
    ],
    ""start_date"": ""2025-01-01"",
    ""end_date"": ""2026-01-30"",
    ""limit"": 5,
    ""offset"": 0,
    ""filters"": [
        [
            ""actual"",
            ""="",
            1.57
        ],
        ""and"",
        [
            ""surprise_pct"",
            ""<>"",
            4.52
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
      "types" => [
        "eps_actual",
        "earnings_revenue"
      ],
      "methodologies" => [
        "normalized",
        "gaap"
      ],
      "comparison_symbols" => [
        "NDAQ",
        "DOW"
      ],
      "start_date" => "2025-01-01",
      "end_date" => "2026-01-30",
      "limit" => 5,
      "offset" => 0,
      "filters" => [
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

url = "https://api.finimpulse.com/v1/analysis/earnings"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "AAPL",
    "types": [
        "eps_actual",
        "earnings_revenue"
    ],
    "methodologies": [
        "normalized",
        "gaap"
    ],
    "comparison_symbols": [
        "NDAQ",
        "DOW"
    ],
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
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
    "types": [
        "eps_actual",
        "earnings_revenue"
    ],
    "methodologies": [
        "normalized",
        "gaap"
    ],
    "comparison_symbols": [
        "NDAQ",
        "DOW"
    ],
    "start_date": "2025-01-01",
    "end_date": "2026-01-30",
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

The response contains **meta**  fields and a list of earnings records. The fields within each record may vary depending on its **type**.

### Meta Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **target_price**   
     `number` — Current market price of the asset.
- **target_average_price**   
     `number` — Average analyst target price across all estimates.
- **target_low_price**   
     `number` — Analyst target low price.
- **target_high_price**   
     `number` — Analyst target high price.
- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of earnings records.


### Earnings Per Share (EPS) Actual


- **type**   
     `string` — Record type ("eps_actual" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **methodology**   
     `string` — Accounting methodology (normalized or gaap).
- **actual**   
     `number` — EPS actual.
- **estimate**   
     `number` — EPS estimate.
- **surprise**   
     `number` — EPS surprise.
- **surprise_pct**   
     `number` — EPS surprise, expressed as a percentage.


### Earnings vs. Revenue


- **type**   
     `string` — Record type ("earnings_revenue" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **methodology**   
     `string` — Accounting methodology (normalized or gaap).
- **revenue**   
     `number` — Total revenue for the period.
- **earnings**   
     `number` — Total earnings for the period.


### Earnings


- **type**   
     `string` — Record type ("earnings" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **analysts**   
     `integer` — Number of analysts contributing to the estimate.
- **avg**   
     `number` — Average EPS estimate.
- **low**   
     `number` — Lowest EPS estimate.
- **high**   
     `number` — Highest EPS estimate.
- **year_ago_eps**   
     `number` — EPS from the comparable prior-year period.
- **year_ago_revenue**   
     `number` — Revenue from the comparable prior-year period.
- **growth**   
     `number` — Growth value for the period (calculated as avg / year_ago_eps − 1).


### Revenue


- **type**   
     `string` — Record type ("revenue" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **analysts**   
     `integer` — Number of analysts contributing to the estimate.
- **avg**   
     `number` — Average revenue estimate.
- **low**   
     `number` — Lowest revenue estimate.
- **high**   
     `number` — Highest revenue estimate.
- **year_ago_eps**   
     `number` — EPS from the comparable prior-year period.
- **year_ago_revenue**   
     `number` — Revenue from the comparable prior-year period.
- **growth**   
     `number` — Growth value for the period.


### EPS Trend


- **type**   
     `string` — Record type ("eps_trend" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **current**   
     `number` — Current EPS value.
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
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **up_last7days**   
     `integer` — Number of upward EPS revisions in the last 7 days.
- **up_last30days**   
     `integer` — Number of upward EPS revisions in the last 30 days.
- **down_last7days**   
     `integer` — Number of downward EPS revisions in the last 7 days.
- **down_last30days**   
     `integer` — Number of downward EPS revisions in the last 30 days.


### Growth


- **type**   
     `string` — Record type ("growth" expected).
- **date**   
     `string` — The reporting period associated with the analyst data (YYYY-MM-DD). 
    - For `date_type = quarter`, the value identifies a quarterly reporting period.
    - For `date_type = year`, it identifies an annual reporting period.
     
     Dates are aligned to calendar periods and should not be interpreted as the fiscal period start date, fiscal period end date, or earnings announcement date.
- **date_type**   
     `string` — Date granularity (quarter/year). The result set may include records of the same `type` with different `date_type` values. Filter or group data based on `date_type`.
- **growth**   
     `number` — Growth value for the period.
- **growth_benchmark**   
     `number` — Benchmark growth value.
- **symbol_benchmark**   
     `string` — Benchmark symbol identifier.


### Example Response


```json
{
    "result": {
        "symbol": "AAPL",
        "target_price": 324.72,
        "target_average_price": 316.75714,
        "target_low_price": 215,
        "target_high_price": 400,
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


## Note

- This endpoint does not currently expose explicit fiscal calendar metadata such as fiscal year, fiscal quarter, period start date, or period end date. Companies may use non-calendar fiscal years or 52/53-week fiscal calendars, so fiscal periods should not be derived from items\[\].date alone. 
    
    The endpoint also does not provide a stable key linking individual estimate records to a specific earnings release. The [Summary Data API](https://developers.finimpulse.com/v1/summary/) returns earnings calendar fields, but there is no documented mapping between those fields and records returned by this endpoint. A record should not be labeled as the estimate for the next earnings release based on items\[\].date alone.
- Monetary values (prices, EPS, revenue) are returned in the asset’s trading currency, e.g., USD for NASDAQ-listed stocks.
- Percent values are returned as fractions (e.g., 0.69359 = 69.359%), except surprise_pct, which is returned in percent (e.g., 2.9 = 2.9%).
