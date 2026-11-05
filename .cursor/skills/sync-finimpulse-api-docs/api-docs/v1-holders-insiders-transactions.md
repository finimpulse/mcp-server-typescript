---
title: Stock Insider Transactions API
created: 2026-01-13
updated: 2026-11-05
endpoint: POST v1/holders/insiders-transactions
auth: Bearer Token
---

# Stock Insider Transactions API

Provides transaction-level data and is more granular than /holders/insiders.

This endpoint returns a detailed, paginated list of insider transactions for a stock, including transaction descriptions, share counts, values, filer identity, and ownership type.

It is **stock-centric**, so for **ETFs** and **mutual funds** the endpoint returns an empty result:

```
"result": {
        "total_count": 0,
        "items_count": 0,
        "items": []
}
```

This behavior is expected.

## When to Use This Endpoint
- Display a full insider trading history for a stock.
- Power “Insider Transactions” tables and timelines.
- Analyze insider behavior patterns (sales vs awards vs purchases).
- Complement [v1/holders/insiders](https://developers.finimpulse.com/v1/holders/insiders/) (summary) with transaction-level detail.
- Support compliance, governance, and transparency use cases.

## Request Parameters
**POST** `v1/holders/insiders-transactions` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **limit**   
     `integer` *(optional)* — Maximum number of matched transaction records returned (user-defined).
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
    - `selector` - Metric used for sorting (e.g., shares).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holders/insiders-transactions" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "limit": 3,
      "offset": 0,
      "filters": [
          "shares",
          ">",
          10000
      ],
      "sort_by": [
          {
              "selector": "shares",
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
var url = "https://api.finimpulse.com/v1/holders/insiders-transactions";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""limit"": 3,
    ""offset"": 0,
    ""filters"": [
        ""shares"",
        "">"",
        10000
    ],
    ""sort_by"": [
        {
            ""selector"": ""shares"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holders/insiders-transactions",
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
        "shares",
        ">",
        10000
      ],
      "sort_by" => [
        [
          "selector" => "shares",
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

url = "https://api.finimpulse.com/v1/holders/insiders-transactions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "limit": 3,
    "offset": 0,
    "filters": [
        "shares",
        ">",
        10000
    ],
    "sort_by": [
        {
            "selector": "shares",
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
    "limit": 3,
    "offset": 0,
    "filters": [
        "shares",
        ">",
        10000
    ],
    "sort_by": [
        {
            "selector": "shares",
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

const req = https.request('https://api.finimpulse.com/v1/holders/insiders-transactions', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
Returns pagination metadata and an array of insider transaction records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching insider transactions.
- **items_count**   
     `integer` — Number of insider transactions returned.
- **items**   
     `array` — Array of insider transaction entries.


### Insider Transaction Record Fields


- **shares**   
     `integer` — Number of shares involved in the transaction.
- **value**   
     `number` — Transaction value (may be 0 for non-cash events such as grants).
- **transaction_text**   
     `string` — Description of the transaction. May include pricing details.
- **filer_name**   
     `string` — Insider name (who filed the transaction).
- **filer_relation**   
     `string` — Insider’s relationship to the company (e.g. Director, Officer).
- **start_date**   
     `string` — Date the transaction was reported.
- **ownership**   
     `string` — Ownership type. ***Possible values:***
    - `D — Direct ownership` Shares are owned or transacted directly by the insider in their personal capacity.
    - `I — Indirect ownership` Shares are owned or transacted indirectly, typically through trusts, family members, controlled entities, partnerships, or investment vehicles. The insider has a beneficial interest but does not hold the shares in a personal account.


### Example Response


```json
{
    "result": {
        "total_count": 131,
        "items_count": 3,
        "items": [
            {
                "shares": 12728,
                "value": 2341117,
                "transaction_text": "Sale at price 183.93 per share.",
                "filer_name": "SEAWELL A BROOKE",
                "filer_relation": "Director",
                "start_date": "2025-12-02",
                "ownership": "I"
            },
            {
                "shares": 20000,
                "value": 2368377,
                "transaction_text": "Sale at price 116.99 - 118.87 per share.",
                "filer_name": "SHAH AARTI S",
                "filer_relation": "Director",
                "start_date": "2025-03-20",
                "ownership": "D"
            },
            {
                "shares": 24590,
                "value": 4425727,
                "transaction_text": "Sale at price 176.91 - 180.88 per share.",
                "filer_name": "ROBERTSON DONALD F JR",
                "filer_relation": "Officer",
                "start_date": "2025-12-19",
                "ownership": "D"
            }
        ]
    }
}
```


## Notes
- A single insider may have multiple transaction records across time.
- The same insider can appear with both **Direct (D)** and **Indirect (I)** ownership types.
- Dates reflect filing timelines and may differ slightly from execution dates.
