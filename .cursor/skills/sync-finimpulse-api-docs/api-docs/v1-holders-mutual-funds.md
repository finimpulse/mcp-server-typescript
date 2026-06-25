---
title: Mutual Funds
created: 2026-01-13
updated: 2026-03-09
endpoint: POST v1/holders/mutual-funds
auth: Bearer Token
---

# Mutual Funds

Returns a list of mutual funds and ETFs that hold a given stock, including their reported position size, percent held, and estimated value.

This endpoint answers the question, “Which funds hold this stock?”

It is **stock-centric** because insider transactions are not modeled for **ETFs** and **mutual funds**, so the endpoint returns an empty result:

```
"result": {
        "total_count": 0,
        "items_count": 0,
        "items": []
}
```

This is expected behavior, not an error.

## When to Use This Endpoint
- Show “Funds Holding This Stock” sections on equity profile pages.
- Analyze the overlap in ownership between stocks and significant index funds or ETFs.
- Identify the concentration of a stock across passive and active funds.
- Support discovery use cases (e.g. ,“which ETFs give exposure to this stock”).

## Request Parameters
**POST** `v1/holders/mutual-funds` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol). Must be a stock symbol.
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
    - `like` – pattern match (requires `%` as a wildcard)
    - `not_like` - pattern does not match (requires `%` as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     `%` *usage examples:*
    - `%abc%` - matches any string containing "abc"
    - `abc%` - matches any string starting with "abc"
    - `%abc` - matches any string ending with "abc"
     
     **Example:** `"filters": [ "name", "like", "VANGUARD%" ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., value).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "value", "desc": false } ]`
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
     `integer` — Total number of matching fund holders.
- **items_count**   
     `integer` — Number of items returned in the current page.
- **items**   
     `array` — Array of mutual fund/ETF holder records.


### Holder Record Fields


- **name**   
     `string` — Fund or ETF name.
- **position_direct**   
     `integer` — Number of shares of the stock held by the fund.
- **position_report_date**   
     `string` — Reporting date of the fund’s holding.
- **pct_held**   
     `number` — Percent of the company’s outstanding shares held by the fund (fraction; e.g., 0.0299 = 2.99%).
- **value**   
     `number` — Estimated market value of the fund’s position in the stock (typically USD).


### Example Response


```json
{
    "task_id": "54ddba11-eb8d-437b-8f40-883fff2f01dc",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0018,
    "data": {
        "symbol": "NVDA",
        "limit": 20,
        "offset": 0,
        "filters": [
            "name",
            "like",
            "VANGUARD%"
        ],
        "tag": "just tag",
        "sort_by": [
            {
                "selector": "value",
                "desc": false
            }
        ]
    },
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
