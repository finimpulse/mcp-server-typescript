---
title: Analysts
created: 2026-03-04
updated: 2026-03-09
endpoint: POST v1/analysis/analysts
auth: Bearer Token
---

# Analysts

Returns a paginated list of analyst-level coverage records for an asset, including per-analyst scores, current rating, sentiment, price target, and the latest announcement date.

This endpoint is typically used to populate an **“Analysts” table** in the Analysis module.

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
     
     **Example:** `"filters": [ ["rating_sentiment", "=", 1], "and", ["analyst", "<>", "Wedbush"] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., announcement_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "announcement_date", "desc": true } ]`
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
     `integer` — Total number of matching records available.
- **items_count**   
     `integer` — Number of records returned in the current response.
- **items**   
     `array` — Array of analyst coverage records.


### Analysts Item Fields


- **uuid**   
     `string` — Unique analyst record identifier.
- **analyst**   
     `string` — Analyst/firm name.
- **direct_score**   
     `number` — Direct score metric for the analyst record.
- **mean_move**   
     `number` — Mean move metric.
- **price_score**   
     `number` — Price score metric.
- **overall_score**   
     `number` — Overall score metric.
- **data_points**   
     `integer` — Number of observations used in scoring.
- **rating_current**   
     `string` — Current analyst rating label.
- **rating_sentiment**   
     `integer` — Normalized sentiment indicator for rating (1 = positive, 0 = neutral, -1 = negative).
- **price_score_current**   
     `number` — Current price target value for this analyst record.
- **announcement_date**   
     `string` — Date of the rating/target announcement (YYYY-MM-DD).


### Example Response


```json
{
    "task_id": "d95b4ee6-85f2-4029-8b8c-11a687c31597",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": {
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
        ]
    },
    "result": {
        "total_count": 15,
        "items_count": 10,
        "items": [
            {
                "uuid": "d5a511dc-a595-5140-8c57-1778e28e3e38",
                "analyst": "JP Morgan",
                "direct_score": 66.026398,
                "mean_move": 48.08615,
                "price_score": 88.683164,
                "overall_score": 65.175677,
                "data_points": 68,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 325,
                "announcement_date": "2026-01-30"
            },
            {
                "uuid": "b5159968-f245-59c4-ad75-dbd17093a948",
                "analyst": "JP Morgan",
                "direct_score": 65.78087,
                "mean_move": 47.522318,
                "price_score": 88.610841,
                "overall_score": 64.869298,
                "data_points": 66,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 315,
                "announcement_date": "2026-01-26"
            },
            {
                "uuid": "b1055bad-35ff-5c6c-9fba-a8b5562d4272",
                "analyst": "Evercore ISI Group",
                "direct_score": 54.872635,
                "mean_move": 31.653071,
                "price_score": 98.673265,
                "overall_score": 56.666892,
                "data_points": 41,
                "rating_current": "Outperform",
                "rating_sentiment": 1,
                "price_score_current": 330,
                "announcement_date": "2026-01-21"
            },
            {
                "uuid": "485d536e-378f-5237-b981-24b31cccd4bd",
                "analyst": "Citigroup",
                "direct_score": 63.12757,
                "mean_move": 46.82659,
                "price_score": 94.763126,
                "overall_score": 64.564387,
                "data_points": 60,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 315,
                "announcement_date": "2026-01-20"
            },
            {
                "uuid": "903ab15b-87f0-5bc6-b831-b591af167234",
                "analyst": "Morgan Stanley",
                "direct_score": 68.740161,
                "mean_move": 43.028528,
                "price_score": 94.348187,
                "overall_score": 66.148276,
                "data_points": 106,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 315,
                "announcement_date": "2025-12-18"
            },
            {
                "uuid": "30da3bfb-0667-50b4-a723-6776b24999f3",
                "analyst": "CLSA",
                "direct_score": 80.719431,
                "mean_move": 39.908218,
                "price_score": 62.678631,
                "overall_score": 64.867907,
                "data_points": 5,
                "rating_current": "Outperform",
                "rating_sentiment": 1,
                "price_score_current": 330,
                "announcement_date": "2025-12-06"
            },
            {
                "uuid": "c05b1f8b-4d98-57b3-a0f3-9b4ac9c8f029",
                "analyst": "Loop Capital",
                "direct_score": 40.228689,
                "mean_move": 40.907123,
                "price_score": 85.029399,
                "overall_score": 49.392361,
                "data_points": 26,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 325,
                "announcement_date": "2025-12-03"
            },
            {
                "uuid": "89026b8b-2c22-5f73-a4ba-91d60648fed7",
                "analyst": "Wells Fargo",
                "direct_score": 48.4881,
                "mean_move": 48.392653,
                "price_score": 55.956145,
                "overall_score": 49.953075,
                "data_points": 34,
                "rating_current": "Overweight",
                "rating_sentiment": 1,
                "price_score_current": 300,
                "announcement_date": "2025-11-01"
            },
            {
                "uuid": "c0902c99-889f-59aa-973f-896f13192feb",
                "analyst": "B of A Securities",
                "direct_score": 42.520934,
                "mean_move": 48.921606,
                "price_score": 85.129199,
                "overall_score": 52.962789,
                "data_points": 118,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 325,
                "announcement_date": "2025-11-01"
            },
            {
                "uuid": "801c6269-519a-57a8-9f8d-87ebe764ad63",
                "analyst": "Argus Research",
                "direct_score": 60.70149,
                "mean_move": 38.440176,
                "price_score": 98.550705,
                "overall_score": 61.592938,
                "data_points": 8,
                "rating_current": "Buy",
                "rating_sentiment": 1,
                "price_score_current": 325,
                "announcement_date": "2025-10-31"
            }
        ]
    }
}
```
