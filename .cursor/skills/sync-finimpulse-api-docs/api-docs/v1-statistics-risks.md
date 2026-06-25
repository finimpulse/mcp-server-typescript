---
title: Risks
created: 2025-12-15
updated: 2026-03-09
endpoint: POST v1/statistics/risks
auth: Bearer Token
---

# Risks

Returns risk and risk-adjusted performance metrics for an asset across standardized time horizons.

The returned dataset depends on the asset type and the availability of benchmark-based risk data.

For **mutual funds**, all risk and risk-adjusted performance metrics are available. For **Stocks** and **ETFs**, the response may be empty if risk metrics are not available for the requested asset. In this case, the total count will be **zero**, and the list of items will be **empty**.

## When to Use This Endpoint
- Analyze the risk-adjusted performance of mutual funds.
- Compare funds across different time horizons using standardized risk metrics.
- Evaluate volatility and benchmark fit using metrics such as Alpha, Sharpe Ratio, or R-squared.
- Build fund screeners based on risk constraints.

## Request Parameters
**POST** `v1/statistics/risks` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **limit**   
     `integer` *(optional)* — Maximum number of items to return (user-defined).
- **offset**   
     `integer` *(optional)* — Offset for paginated results.
- **filters**   
     `array` *(optional)* — Optional filter expressions applied to risk metrics. Each filter condition is defined as: `[field, operator, value]`. Conditions can be combined using logical operators `and`/`or`. **Supported operators:** *Numeric fields:*
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
     
     **Example:** `"filters": [ [ "alpha", ">", -0.09 ], "and", [ "type", "<>", 0 ] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., alpha).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "alpha", "desc": true } ]`
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/statistics/risks" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "FARMX",
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
var url = "https://api.finimpulse.com/v1/statistics/risks";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""FARMX"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/statistics/risks",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "FARMX",
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

url = "https://api.finimpulse.com/v1/statistics/risks"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "FARMX",
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
    "symbol": "FARMX",
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

const req = https.request('https://api.finimpulse.com/v1/statistics/risks', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
### Pagination Fields


- **total_count**   
     `integer` — Total number of matching items.
- **items_count**   
     `integer` — Number of items returned in the current response.
- **items**   
     `array` — Array of risk metric records (funds).


### Risk Item Fields

Each item represents a standardized time horizon and its corresponding risk metrics.


- **year**   
     `string` — Time horizon (e.g. 3y, 5y, 10y).
- **type**   
     `integer` — Data category type.
- **alpha**   
     `number` — Alpha.
- **beta**   
     `number` — Beta.
- **mean_annual_return**   
     `number` — Mean annual return.
- **r_squared**   
     `number` — R-squared (0–1).
- **std_dev**   
     `number` — Standard deviation.
- **sharpe_ratio**   
     `number` — Sharpe ratio.
- **treynor_ratio**   
     `number` — Treynor ratio.


### Example Response


```json
{
    "task_id": "18d7e4bb-7165-4b2d-aa88-0c28eaa7593e",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0015,
    "data": {
        "symbol": "FARMX",
        "limit": 10,
        "offset": 0,
        "filters": [
            [
                "alpha",
                ">",
                -0.09
            ],
            "and",
            [
                "type",
                "<>",
                0
            ]
        ],
        "tag": "just tag",
        "sort_by": [
            {
                "selector": "alpha",
                "desc": true
            }
        ]
    },
    "result": {
        "total_count": 3,
        "items_count": 3,
        "items": [
            {
                "year": "5y",
                "type": 1,
                "alpha": -0.0502,
                "beta": 0.0127,
                "mean_annual_return": 0.0112,
                "r_squared": 0.73690003,
                "std_dev": 0.2192,
                "sharpe_ratio": 0.006,
                "treynor_ratio": 0.08819999
            },
            {
                "year": "3y",
                "type": 1,
                "alpha": -0.066,
                "beta": 0.01309999,
                "mean_annual_return": 0.0109,
                "r_squared": 0.8114,
                "std_dev": 0.2643,
                "sharpe_ratio": 0.0049,
                "treynor_ratio": 0.0773
            },
            {
                "year": "10y",
                "type": 1,
                "alpha": -0.0755,
                "beta": 0.01299999,
                "mean_annual_return": 0.0049,
                "r_squared": 0.70559996,
                "std_dev": 0.2219,
                "sharpe_ratio": 0.0029,
                "treynor_ratio": 0.0286
            }
        ]
    }
}
```


## Notes
- Time horizons are standardized and do not represent calendar years.
- Risk metrics are calculated using benchmark-based models where applicable.
- Field availability and calculation logic may vary by asset class.
