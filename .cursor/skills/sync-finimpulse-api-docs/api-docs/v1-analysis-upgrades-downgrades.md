---
title: Upgrades &amp; Downgrades
created: 2026-03-04
updated: 2026-03-09
endpoint: POST v1/analysis/upgrades-downgrades
auth: Bearer Token
---

# Upgrades &amp; Downgrades

Returns a feed of analyst rating actions for a ticker, including upgrades/downgrades (rating changes), reiterations, and price target changes.

This endpoint is typically used to power an “**Upgrades &amp; Downgrades**” table in the Analysis module.

## Asset Type Compatibility

- **Stocks**: Fully supported. Stocks are the primary use case for this endpoint.
- **ETFs and Mutual funds**: The request can be executed via a unified symbol system, but results may be empty as analyst ratings and price targets are rarely issued for these asset types.

## When to Use This Endpoint

- Display a chronological feed of analyst actions for a ticker, including upgrades, downgrades, reiterations, and price target changes.
- Track rating changes (from/to grade) and updates to price targets over time.
- Filter, sort, or aggregate actions to support alerts, screening, or research workflows.
- Power an **“Upgrades &amp; Downgrades”** table or chart in the Analysis module.

## Request Parameters

**POST** `v1/analysis/upgrades-downgrades` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
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
     
     **Example:** `"filters": [ ["prior_price_target", "=", 330], "and", ["firm", "<>", "Wedbush"] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., grade_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "grade_date", "desc": true } ]`
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/analysis/upgrades-downgrades" \
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
var url = "https://api.finimpulse.com/v1/analysis/upgrades-downgrades";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/analysis/upgrades-downgrades",
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

url = "https://api.finimpulse.com/v1/analysis/upgrades-downgrades"
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

const req = https.request('https://api.finimpulse.com/v1/analysis/upgrades-downgrades', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of analyst action records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records available.
- **items_count**   
     `integer` — Number of records returned in the current response.
- **items**   
     `array` — Array of analyst action records.


### Upgrades/Downgrades Item Fields


- **grade_date**   
     `string` — Action timestamp (UTC, ISO 8601).
- **firm**   
     `string` — Analyst firm name.
- **to_grade**   
     `string` — New/current rating grade.
- **from_grade**   
     `string` — Previous rating grade.
- **action**   
     `string` — Action type code (e.g., main, reit, up, down, init).
- **price_target_action**   
     `string` — Price target change label.
- **current_price_target**   
     `number` — Updated price target after the action.
- **prior_price_target**   
     `number` — Previous price target before the action.


### Example Response


```json
{
    "task_id": "4b764499-ddc3-4984-99d6-6e92df807558",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": {
        "symbol": "AAPL",
        "limit": 5,
        "offset": 0,
        "filters": [
            [
                "prior_price_target",
                "=",
                330
            ],
            "and",
            [
                "firm",
                "<>",
                "Wedbush"
            ]
        ],
        "start_date": "2025-01-01",
        "end_date": "2026-01-30",
        "sort_by": [
            {
                "selector": "grade_date",
                "desc": true
            }
        ]
    },
    "result": {
        "total_count": 2,
        "items_count": 2,
        "items": [
            {
                "grade_date": "2026-01-20T17:58:17Z",
                "firm": "Citigroup",
                "to_grade": "Buy",
                "from_grade": "Buy",
                "action": "main",
                "price_target_action": "Lowers",
                "current_price_target": 315,
                "prior_price_target": 330
            },
            {
                "grade_date": "2026-01-20T12:22:33Z",
                "firm": "Evercore ISI Group",
                "to_grade": "Outperform",
                "from_grade": "Outperform",
                "action": "reit",
                "price_target_action": "Maintains",
                "current_price_target": 330,
                "prior_price_target": 330
            }
        ]
    }
}
```


## Notes

- **to_grade** and **from_grade** can be the same when the analyst **reiterates or maintains** the previous rating.
