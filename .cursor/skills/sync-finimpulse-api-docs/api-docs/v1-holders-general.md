---
title: General
created: 2026-01-13
updated: 2026-02-06
endpoint: POST v1/holders/general
auth: Bearer Token
---

# General

Returns a high-level ownership snapshot for an asset, focused on institutional and insider holdings where available.

This endpoint is primarily relevant for **stocks** and returns insider and institutional ownership percentages, the number of institutions, and aggregated insider transaction flow metrics.

For **ETFs** and **mutual funds**, most ownership fields are not applicable and are returned as *null*.

## When to Use This Endpoint
- Display a quick ownership snapshot on an equity profile page.
- Support ownership-focused screening or filters (e.g., “high institutional ownership”).
- Provide context for liquidity/positioning signals in analytics (institutional share, insider flow).
- Power **Holders** modules (as a top-level summary), alongside the more detailed holders endpoints.

## Request Parameters
**POST** `v1/holders/general` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holders/general" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/holders/general";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holders/general",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
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

url = "https://api.finimpulse.com/v1/holders/general"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
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

const req = https.request('https://api.finimpulse.com/v1/holders/general', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
Returns a single object with the ownership summary fields.

- **symbol**   
     `string` — Asset symbol.
- **insiders_percent_held**   
     `number` — Insiders percent held.
- **institutions_percent_held**   
     `number` — Institutions percent held.
- **institutions_float_percent_held**   
     `number` — Institutions float percent held.
- **institutions_count**   
     `integer` — Institutions count.
- **buy_info_shares**   
     `integer` — Insider buy shares (aggregated).
- **sell_info_shares**   
     `integer` — Insider sell shares (aggregated).
- **net_info_shares**   
     `integer` — Net insider shares (buy - sell).
- **net_percent_insider_shares**   
     `number` — Net insider shares as % (normalized indicator).
- **total_insider_shares**   
     `integer` — Total insider shares held.


### Example Response


```json
{
    "task_id": "9217d708-1152-4971-a019-b0a54253401f",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.01,
    "data": {
        "symbol": "NVDA",
        "tag": "just tag"
    },
    "result": {
        "symbol": "NVDA",
        "insiders_percent_held": 0.0433,
        "institutions_percent_held": 0.69654,
        "institutions_float_percent_held": 0.72807,
        "institutions_count": 7010,
        "buy_info_shares": 4415192,
        "sell_info_shares": 7101141,
        "net_info_shares": -2685949,
        "net_percent_insider_shares": -0.003,
        "total_insider_shares": 1052189952
    }
}
```


## Notes
- Percent values are returned as fractions (e.g., 0.69359 = 69.359%).
- Full definitions are maintained in the [**Glossary**](https://finimpulse.com/glossary/).
