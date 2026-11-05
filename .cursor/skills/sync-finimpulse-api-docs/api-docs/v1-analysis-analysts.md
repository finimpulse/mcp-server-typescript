---
title: Analyst Coverage, Ratings &amp; Price Targets API
created: 2026-03-04
updated: 2026-11-05
endpoint: POST v1/analysis/analysts
auth: Bearer Token
---

# Analyst Coverage, Ratings &amp; Price Targets API

Returns a paginated list of analyst-level coverage records for an asset, including per-analyst scores, current rating, sentiment, price target, and the latest announcement date.

This endpoint is typically used to populate an **Analysts** table in the Analysis module.

Analyst estimates, ratings, and price targets are sourced from third parties and provided for informational purposes only. FinImpulse does not guarantee their accuracy and does not present them as its own investment recommendations.

## Data Freshness

Analyst data is refreshed daily.

## Asset Type Compatibility

- **Stocks**: This endpoint is primarily intended for stocks.
- **ETFs and Mutual funds**: The request can be executed via a unified symbol universe, but results may be empty depending on data availability and asset nature.

## When to Use This Endpoint

- Show a list of analysts or firms covering a ticker, including their current ratings and price targets.
- Filter analysts by sentiment or exclude specific firms.
- Sort by the latest announcement date to surface the most recent opinions first.
- Support analyst quality scoring views, such as overall score, price score, and direct score.

## Request Parameters

**POST** `v1/analysis/analysts` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
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
    - `selector` - Metric used for sorting (e.g., announcement_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/analysis/analysts" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "AAPL",
      "limit": 10,
      "offset": 0,
      "filters": [
          [
              "rating_sentiment",
              "=",
              1
          ],
          "and",
          [
              "analyst",
              "<>",
              "Wedbush"
          ]
      ],
      "sort_by": [
          {
              "selector": "announcement_date",
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
var url = "https://api.finimpulse.com/v1/analysis/analysts";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""AAPL"",
    ""limit"": 10,
    ""offset"": 0,
    ""filters"": [
        [
            ""rating_sentiment"",
            ""="",
            1
        ],
        ""and"",
        [
            ""analyst"",
            ""<>"",
            ""Wedbush""
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""announcement_date"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/analysis/analysts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "AAPL",
      "limit" => 10,
      "offset" => 0,
      "filters" => [
        [
          "rating_sentiment",
          "=",
          1
        ],
        "and",
        [
          "analyst",
          "<>",
          "Wedbush"
        ]
      ],
      "sort_by" => [
        [
          "selector" => "announcement_date",
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

url = "https://api.finimpulse.com/v1/analysis/analysts"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "AAPL",
    "limit": 10,
    "offset": 0,
    "filters": [
        [
            "rating_sentiment",
            "=",
            1
        ],
        "and",
        [
            "analyst",
            "<>",
            "Wedbush"
        ]
    ],
    "sort_by": [
        {
            "selector": "announcement_date",
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
    "limit": 10,
    "offset": 0,
    "filters": [
        [
            "rating_sentiment",
            "=",
            1
        ],
        "and",
        [
            "analyst",
            "<>",
            "Wedbush"
        ]
    ],
    "sort_by": [
        {
            "selector": "announcement_date",
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

const req = https.request('https://api.finimpulse.com/v1/analysis/analysts', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of analyst coverage records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of analyst coverage records.


### Analysts Item Fields

Each item represents one analyst/firm’s coverage record.


- **uuid**   
     `string` — Unique identifier for the analyst record.
- **analyst**   
     `string` — Analyst or firm name.
- **direct_score**   
     `number` — Direct score metric.
- **mean_move**   
     `number` — Mean move metric.
- **price_score**   
     `number` — Price score metric.
- **overall_score**   
     `number` — Overall score metric.
- **data_points**   
     `integer` — Number of observations used in scoring.
- **rating_current**   
     `string` — Current analyst rating label (e.g., "Buy", "Hold", "Sell")
- **rating_sentiment**   
     `integer` — Normalized sentiment indicator for rating. 
    - 1 = positive
    - 0 = neutral
    - -1 = negative
- **price_score_current**   
     `number` — Current price target.
- **announcement_date**   
     `string` — Rating/target announcement date (YYYY-MM-DD).


### Example Response


```json
{
    "result": {
        "total_count": 28,
        "items_count": 10,
        "items": [
            {
                "uuid": "2da928c8-8fbc-58f1-aa3d-e13575b26358",
                "analyst": "Evercore ISI Group",
                "direct_score": 56.651166,
                "mean_move": 30.786328,
                "price_score": 98.734843,
                "overall_score": 57.30845,
                "data_points": 43,
                "rating_current": "Outperform",
                "rating_sentiment": 1,
                "price_score_current": 365,
                "announcement_date": "2026-06-25"
            },
            {
                "uuid": "ffdbbb30-16b0-5bc1-b0ca-855169567b3d",
                "analyst": "B of A Securities",
                "direct_score": 45.194874,
                "mean_move": 48.626565,
                "price_score": 85.514777,
                "overall_score": 54.288362,
                "data_points": 122,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 380,
                "announcement_date": "2026-06-18"
            },
            {
                "uuid": "ee7aeed2-0cb4-5fb2-a2ba-12d3502fffec",
                "analyst": "Morgan Stanley",
                "direct_score": 69.170373,
                "mean_move": 43.636651,
                "price_score": 94.502845,
                "overall_score": 66.576751,
                "data_points": 109,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 360,
                "announcement_date": "2026-06-10"
            },
            {
                "uuid": "53b629b0-ae8a-5e4b-9b9b-4ac9085a53ef",
                "analyst": "TD Cowen",
                "direct_score": 47.52634,
                "mean_move": 27.479961,
                "price_score": 100,
                "overall_score": 52.007159,
                "data_points": 8,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 350,
                "announcement_date": "2026-06-09"
            },
            {
                "uuid": "c7ad99ef-eb2e-5786-b5dd-c7acaf776e6f",
                "analyst": "B of A Securities",
                "direct_score": 44.784053,
                "mean_move": 48.937181,
                "price_score": 85.409987,
                "overall_score": 54.155178,
                "data_points": 121,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 380,
                "announcement_date": "2026-05-26"
            },
            {
                "uuid": "4b6c31b6-833e-58e5-9877-34e3ca594dea",
                "analyst": "Tigress Financial",
                "direct_score": 69.628915,
                "mean_move": 43.084814,
                "price_score": 99.779968,
                "overall_score": 67.695895,
                "data_points": 12,
                "rating_current": "Strong Buy",
                "rating_sentiment": 1,
                "price_score_current": 375,
                "announcement_date": "2026-05-15"
            },
            {
                "uuid": "6931ed6d-288f-5103-ac39-e53c4989a59d",
                "analyst": "Evercore ISI Group",
                "direct_score": 56.155942,
                "mean_move": 29.490036,
                "price_score": 98.725806,
                "overall_score": 56.670143,
                "data_points": 42,
                "rating_current": "Outperform",
                "rating_sentiment": 1,
                "price_score_current": 365,
                "announcement_date": "2026-05-15"
            },
            {
                "uuid": "8d76f143-cd0b-5225-86b8-7b8d030bb446",
                "analyst": "Morgan Stanley",
                "direct_score": 68.9767,
                "mean_move": 43.712388,
                "price_score": 94.472109,
                "overall_score": 66.496488,
                "data_points": 108,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 330,
                "announcement_date": "2026-05-02"
            },
            {
                "uuid": "87bbf7f8-ba1b-55e7-9420-24529ab6245c",
                "analyst": "TD Cowen",
                "direct_score": 44.262995,
                "mean_move": 24.698699,
                "price_score": 100,
                "overall_score": 49.541107,
                "data_points": 7,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 335,
                "announcement_date": "2026-05-01"
            },
            {
                "uuid": "884e1cce-3184-5163-a2b1-7d384c0b5227",
                "analyst": "Wells Fargo",
                "direct_score": 46.051518,
                "mean_move": 49.099306,
                "price_score": 56.404109,
                "overall_score": 49.036373,
                "data_points": 35,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 310,
                "announcement_date": "2026-05-01"
            }
        ]
    }
}
```
