---
title: Institutional Holders API for Stocks
created: 2026-01-13
updated: 2026-11-05
endpoint: POST v1/holders/institutional
auth: Bearer Token
---

# Institutional Holders API for Stocks

Returns a paginated list of institutional holders for an asset.

This endpoint returns a list of **institutional holders**, including each holder’s reported position, percent held, and estimated value. Supports filtering and sorting.

## Asset Type Compatibility
This endpoint is primarily relevant for **stocks**.

For **ETFs** and **mutual funds**, the response is typically empty because institutional holder filings in this format are equity-focused in the upstream source. It commonly returns:

```
"result": {
        "total_count": 0,
        "items_count": 0,
        "items": []
}
```

## When to Use This Endpoint
- Populate “Top Institutional Holders” tables for stocks.
- Enable holder-based filtering and ranking (e.g., show only holders above X%).
- Support ownership analytics and concentration views (e.g., top holders by value).

## Request Parameters
**POST** `v1/holders/institutional` 

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
    - `selector` - Metric used for sorting (e.g., value).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holders/institutional" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "limit": 3,
      "offset": 0,
      "filters": [
          [
              "pct_held",
              ">",
              0.0407
          ]
      ],
      "sort_by": [
          {
              "selector": "value",
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
var url = "https://api.finimpulse.com/v1/holders/institutional";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""limit"": 3,
    ""offset"": 0,
    ""filters"": [
        [
            ""pct_held"",
            "">"",
            0.0407
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""value"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holders/institutional",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "limit" => 3,
      "offset" => 0,
      "filters" => [
        [
          "pct_held",
          ">",
          0.0407
        ]
      ],
      "sort_by" => [
        [
          "selector" => "value",
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

url = "https://api.finimpulse.com/v1/holders/institutional"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "pct_held",
            ">",
            0.0407
        ]
    ],
    "sort_by": [
        {
            "selector": "value",
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
    "symbol": "NVDA",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "pct_held",
            ">",
            0.0407
        ]
    ],
    "sort_by": [
        {
            "selector": "value",
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

const req = https.request('https://api.finimpulse.com/v1/holders/institutional', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
Returns an object with pagination metadata and an array of institutional holder records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching holder records.
- **items_count**   
     `integer` — Number of holder records returned.
- **items**   
     `array` — Array of institutional holder records.


### Holder Record Fields


- **name**   
     `string` — Institution name.
- **position_direct**   
     `integer` — Shares held in a direct position.
- **position_report_date**   
     `string` — Date of the filed position report.
- **pct_held**   
     `number` — Percentage of shares held by institutions.
- **value**   
     `number` — Market value of the reported position.


### Example Response


```json
{
    "result": {
        "total_count": 2,
        "items_count": 2,
        "items": [
            {
                "name": "Vanguard Group Inc",
                "position_direct": 2266683275,
                "position_report_date": "2025-12-31T00:00:00Z",
                "pct_held": 0.0933,
                "value": 420719084056
            },
            {
                "name": "Blackrock Inc.",
                "position_direct": 1929259144,
                "position_report_date": "2025-09-30T00:00:00Z",
                "pct_held": 0.0794,
                "value": 358089790895
            }
        ]
    }
}
```
