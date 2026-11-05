---
title: Company Insider Roster &amp; Activity API
created: 2026-01-13
updated: 2026-11-05
endpoint: POST v1/holders/insiders
auth: Bearer Token
---

# Company Insider Roster &amp; Activity API

Returns a paginated list of insider transaction records for an asset, including recent insider actions, roles, and reported positions.

This endpoint is **applicable only to stocks**. For **ETFs** and **mutual funds**, insider transactions do not exist in this model, so the endpoint returns an empty result:

```
"result": {
        "total_count": 0,
        "items_count": 0,
        "items": []
}
```

This is expected behavior, as insider ownership and insider trading disclosures apply only to operating companies (stocks).

## When to Use This Endpoint
- Display recent insider activity on equity profile pages.
- Analyze insider behavior as a qualitative signal (buying, selling, gifts).
- Support governance and ownership transparency features.
- Complement aggregated insider metrics from [v1/holders/general](https://developers.finimpulse.com/v1/holders/general/).

## Request Parameters
**POST** `v1/holders/insiders` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **limit**   
     `integer` *(optional)* — Maximum number of matched insider records returned (user-defined).
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
    - `selector` - Metric used for sorting (e.g., position_report_date).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holders/insiders" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "limit": 3,
      "offset": 0,
      "filters": [
          "relation",
          "like",
          "Chief%"
      ],
      "sort_by": [
          {
              "selector": "position_report_date",
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
var url = "https://api.finimpulse.com/v1/holders/insiders";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""limit"": 3,
    ""offset"": 0,
    ""filters"": [
        ""relation"",
        ""like"",
        ""Chief%""
    ],
    ""sort_by"": [
        {
            ""selector"": ""position_report_date"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holders/insiders",
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
        "relation",
        "like",
        "Chief%"
      ],
      "sort_by" => [
        [
          "selector" => "position_report_date",
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

url = "https://api.finimpulse.com/v1/holders/insiders"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "limit": 3,
    "offset": 0,
    "filters": [
        "relation",
        "like",
        "Chief%"
    ],
    "sort_by": [
        {
            "selector": "position_report_date",
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
        "relation",
        "like",
        "Chief%"
    ],
    "sort_by": [
        {
            "selector": "position_report_date",
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

const req = https.request('https://api.finimpulse.com/v1/holders/insiders', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
Returns pagination metadata and a list of insider transaction records.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching insider records.
- **items_count**   
     `integer` — Number of insider records returned.
- **items**   
     `array` — Array of insider transaction records.


### Insider Transaction Entry Item


- **name**   
     `string` — Insider name.
- **relation**   
     `string` — Insider’s relationship to the company (e.g. Director, Officer).
- **transaction_description**   
     `string` — Description of the most recent reported transaction (e.g. Sale, Purchase, Stock Gift).
- **latest_trans_date**   
     `string` — Date of the most recent reported insider transaction.
- **position_direct**   
     `integer` — Shares held in a direct position. May be **null** when the filing reports a transaction but not an updated position.
- **position_report_date**   
     `string` — Date of the insider’s position report.


### Example Response


```json
{
    "result": {
        "total_count": 2,
        "items_count": 2,
        "items": [
            {
                "name": "HUANG JEN-HSUN",
                "relation": "Chief Executive Officer",
                "transaction_description": "Stock Gift",
                "latest_trans_date": "2025-12-17",
                "position_direct": null,
                "position_report_date": "2026-02-04"
            },
            {
                "name": "KRESS COLETTE M.",
                "relation": "Chief Financial Officer",
                "transaction_description": "Sale",
                "latest_trans_date": "2026-01-13",
                "position_direct": null,
                "position_report_date": "2026-02-04"
            }
        ]
    }
}
```


## Notes
- A single insider may appear multiple times across pages if multiple filings have been made historically.
- Dates reflect filing/reporting timelines, not trade execution timestamps.
