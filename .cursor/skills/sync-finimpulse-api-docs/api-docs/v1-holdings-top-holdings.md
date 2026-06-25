---
title: Top 10 Holdings
created: 2026-01-12
updated: 2026-03-16
endpoint: POST v1/holdings/top-holdings
auth: Bearer Token
---

# Top 10 Holdings

Returns the list of top 10 holdings for a fund-like asset, including ETFs and mutual funds.

This endpoint provides a ranked breakdown of the 10 most significant underlying positions in a fund portfolio, expressed as a percentage of total net assets. It is typically used to show portfolio concentration and exposure to individual securities.

## Asset Type Compatibility
- **Mutual funds**: Returns a list of the top 10 holdings when holdings disclosure data is available.
- **ETFs**: Returns a list of the top 10 holdings when holdings disclosure data is available.
- **Stocks**: The request can be executed because all assets share a unified symbol universe, but it returns an empty result set. This indicates that the asset does not represent a portfolio of holdings, nor is it a request error.

## When to Use This Endpoint
- Display the largest positions held by an ETF or mutual fund.
- Analyze portfolio concentration and issuer exposure.
- Support transparency features such as “Top 10 Holdings” tables on asset pages.
- Compare the overlap between funds based on their most extensive constituents.

## Request Parameters
**POST** `v1/holdings/top-holdings` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
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
     
     **Example:** `"filters": ["holding_name", "like", "Amazon%"]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., holding_percent).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "holding_percent", "desc": true } ]`
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (1-10).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holdings/top-holdings" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "SPY",
      "limit": 10,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/holdings/top-holdings";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""SPY"",
    ""limit"": 10,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holdings/top-holdings",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "SPY",
      "limit" => 10,
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

url = "https://api.finimpulse.com/v1/holdings/top-holdings"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "SPY",
    "limit": 10,
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
    "symbol": "SPY",
    "limit": 10,
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

const req = https.request('https://api.finimpulse.com/v1/holdings/top-holdings', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response contains a paginated list of holdings records for the requested asset.

### Pagination Fields


- **total_count**   
     `integer` — Total number of holdings records available.
- **items_count**   
     `integer` — Number of holdings returned in the current response.
- **items**   
     `array` — Array of top 10 holding records. Each record represents a single underlying security held by the fund.


### Record Fields


- **holding_symbol**   
     `string` — Ticker symbol of the underlying holding.
- **holding_name**   
     `string` — Full name of the underlying security.
- **holding_percent**   
     `number` — Weight of the holding as a proportion of the total fund assets.


### Example Response


```json
{
    "task_id": "75157e2a-6dff-452f-8a92-8bf96c801513",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0004,
    "data": {
        "symbol": "SPY",
        "limit": 10,
        "offset": 0,
        "sort_by": [
            {
                "selector": "holding_percent",
                "desc": true
            }
        ]
    },
    "result": {
        "total_count": 10,
        "items_count": 10,
        "items": [
            {
                "holding_symbol": "NVDA",
                "holding_name": "NVIDIA Corp",
                "holding_percent": 0.0731524
            },
            {
                "holding_symbol": "AAPL",
                "holding_name": "Apple Inc",
                "holding_percent": 0.0663206
            },
            {
                "holding_symbol": "MSFT",
                "holding_name": "Microsoft Corp",
                "holding_percent": 0.049592
            },
            {
                "holding_symbol": "AMZN",
                "holding_name": "Amazon.com Inc",
                "holding_percent": 0.0347069
            },
            {
                "holding_symbol": "GOOGL",
                "holding_name": "Alphabet Inc Class A",
                "holding_percent": 0.0308148
            },
            {
                "holding_symbol": "AVGO",
                "holding_name": "Broadcom Inc",
                "holding_percent": 0.02563669
            },
            {
                "holding_symbol": "GOOG",
                "holding_name": "Alphabet Inc Class C",
                "holding_percent": 0.0246022
            },
            {
                "holding_symbol": "META",
                "holding_name": "Meta Platforms Inc Class A",
                "holding_percent": 0.0239823
            },
            {
                "holding_symbol": "TSLA",
                "holding_name": "Tesla Inc",
                "holding_percent": 0.0192143
            },
            {
                "holding_symbol": "BRK-B",
                "holding_name": "Berkshire Hathaway Inc Class B",
                "holding_percent": 0.0157297
            }
        ]
    }
}
```


## Notes
- Holdings weights may not sum to exactly one due to rounding, partial disclosure, or excluded minor positions.
- Percentages are expressed as decimal fractions.
- Full calculation methodology and field definitions are documented in the [**Glossary**](https://finimpulse.com/glossary/).
