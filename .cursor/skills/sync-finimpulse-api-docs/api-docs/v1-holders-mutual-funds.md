---
title: Mutual Fund &amp; ETF Holders API for Stocks
created: 2026-01-13
updated: 2026-11-05
endpoint: POST v1/holders/mutual-funds
auth: Bearer Token
---

# Mutual Fund &amp; ETF Holders API for Stocks

Returns a list of mutual funds and ETFs that hold a given stock, including their reported position size, percent held, and estimated value.

This endpoint returns the mutual funds and ETFs that hold a given stock, including each fund's reported position size, percent held, and estimated value.

It is **stock-centric**, so for **ETFs** and **mutual funds** the endpoint returns an empty result:

```
"result": {
        "total_count": 0,
        "items_count": 0,
        "items": []
}
```

This is expected behavior.

## When to Use This Endpoint
- Show “Funds Holding This Stock” sections on equity profile pages.
- Analyze the overlap in ownership between stocks and significant index funds or ETFs.
- Identify the concentration of a stock across passive and active funds.
- Support discovery use cases (e.g. ,“which ETFs give exposure to this stock”).

## Request Parameters
**POST** `v1/holders/mutual-funds` 

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
curl --location "https://api.finimpulse.com/v1/holders/mutual-funds" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "limit": 20,
      "offset": 0,
      "filters": [
          "name",
          "like",
          "VANGUARD%"
      ],
      "sort_by": [
          {
              "selector": "value",
              "desc": false
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
var url = "https://api.finimpulse.com/v1/holders/mutual-funds";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""limit"": 20,
    ""offset"": 0,
    ""filters"": [
        ""name"",
        ""like"",
        ""VANGUARD%""
    ],
    ""sort_by"": [
        {
            ""selector"": ""value"",
            ""desc"": false
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holders/mutual-funds",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "limit" => 20,
      "offset" => 0,
      "filters" => [
        "name",
        "like",
        "VANGUARD%"
      ],
      "sort_by" => [
        [
          "selector" => "value",
          "desc" => false
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

url = "https://api.finimpulse.com/v1/holders/mutual-funds"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "limit": 20,
    "offset": 0,
    "filters": [
        "name",
        "like",
        "VANGUARD%"
    ],
    "sort_by": [
        {
            "selector": "value",
            "desc": False
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
    "limit": 20,
    "offset": 0,
    "filters": [
        "name",
        "like",
        "VANGUARD%"
    ],
    "sort_by": [
        {
            "selector": "value",
            "desc": false
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

const req = https.request('https://api.finimpulse.com/v1/holders/mutual-funds', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
Returns pagination metadata and a list of fund holder records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching holder records.
- **items_count**   
     `integer` — Number of holder records returned.
- **items**   
     `array` — Array of mutual fund/ETF holder records.


### Holder Record Fields


- **name**   
     `string` — Fund or ETF name.
- **position_direct**   
     `integer` — Shares held in a direct position.
- **position_report_date**   
     `string` — Date of the fund’s holding report.
- **pct_held**   
     `number` — Percentage of shares held by the fund.
- **value**   
     `number` — Market value of the reported position.


### Example Response


```json
{
    "result": {
        "total_count": 5,
        "items_count": 5,
        "items": [
            {
                "name": "VANGUARD WORLD FUND-Vanguard Information Technology Index Fund",
                "position_direct": 122445532,
                "position_report_date": "2025-11-30T00:00:00Z",
                "pct_held": 0.005,
                "value": 22727115269
            },
            {
                "name": "VANGUARD INSTITUTIONAL INDEX FUNDS-Vanguard Institutional Index Fund",
                "position_direct": 142238009,
                "position_report_date": "2025-09-30T00:00:00Z",
                "pct_held": 0.00589999,
                "value": 26400796937
            },
            {
                "name": "VANGUARD INDEX FUNDS-Vanguard Growth Index Fund",
                "position_direct": 220607426,
                "position_report_date": "2025-09-30T00:00:00Z",
                "pct_held": 0.0091,
                "value": 40946944474
            },
            {
                "name": "VANGUARD INDEX FUNDS-Vanguard 500 Index Fund",
                "position_direct": 602010941,
                "position_report_date": "2025-09-30T00:00:00Z",
                "pct_held": 0.0248,
                "value": 111739251126
            },
            {
                "name": "VANGUARD INDEX FUNDS-Vanguard Total Stock Market Index Fund",
                "position_direct": 726650679,
                "position_report_date": "2025-09-30T00:00:00Z",
                "pct_held": 0.0299,
                "value": 134873632972
            }
        ]
    }
}
```
