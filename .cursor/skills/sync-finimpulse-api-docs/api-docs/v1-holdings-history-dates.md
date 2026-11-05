---
title: Historical ETF Holdings Reporting Dates API
created: 2026-05-27
updated: 2026-11-03
endpoint: POST v1/holdings/history/dates/{symbol}
auth: Bearer Token
---

# Historical ETF Holdings Reporting Dates API

Returns the list of available historical holdings reporting dates for the selected ETF.

This endpoint serves as the entry point to the historical holdings dataset in the FinImpulse API. It lists the dates for which holdings data is available for the requested ETF, so you can build a valid request to [**v1/holdings/history**](https://developers.finimpulse.com/v1/holdings/history/).

Historical holdings coverage begins on **January 1, 2026**, for most ETFs (~10,000 symbols). A subset of ~500 ETFs includes records dating back to 2023-2025. The full list of covered symbols with individual start and end dates is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/09/etf-holdings.txt).

**Note:** Historical holdings snapshots are not updated on a fixed schedule. Update frequency depends on the ETF and may range from several times per week to once per month.

## Historical Holdings Workflow

This endpoint is the first step in a two-stage historical holdings workflow:

1. [**v1/holdings/history/dates/{symbol}**](https://developers.finimpulse.com/v1/holdings/history/dates/): Retrieve the list of available holdings reporting dates for the selected ETF.
2. [**v1/holdings/history**](https://developers.finimpulse.com/v1/holdings/history/): The primary data endpoint. Retrieve the full holdings composition for a selected symbol and reporting date.

## Asset Type Compatibility

This endpoint is applicable only to **ETFs**. Stocks and mutual funds are not supported.

If no holdings data is available for the requested symbol, the response returns an empty items array.

## When to Use This Endpoint

- Load the available reporting dates before requesting a holdings snapshot.
- Check whether an ETF has historical holdings coverage.
- Preselect the most recent available date for a default holdings workflow.
- Build date selectors or calendars for portfolio composition tools and ETF analysis flows.
- Filter available dates by range using *start_date* to scope results to a specific period.

## Request Parameters

**POST** `v1/holdings/history/dates/{symbol}` 

- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD). Only dates on and after this value are returned. Note that historical holdings coverage begins from **January 1, 2026** for most symbols. A subset of ~500 ETFs has records available from 2023-2025. Requests with a `start_date` prior to the earliest available record for the requested symbol will return dates from that record onward.
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **limit**   
     `integer` *(optional)* — Maximum number of matched records returned (user-defined).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/holdings/history/dates/{symbol}" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "start_date": "2026-05-17",
      "limit": 3,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/holdings/history/dates/{symbol}";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""start_date"": ""2026-05-17"",
    ""limit"": 3,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/holdings/history/dates/{symbol}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "start_date" => "2026-05-17",
      "limit" => 3,
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

url = "https://api.finimpulse.com/v1/holdings/history/dates/{symbol}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "start_date": "2026-05-17",
    "limit": 3,
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
    "start_date": "2026-05-17",
    "limit": 3,
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

const req = https.request('https://api.finimpulse.com/v1/holdings/history/dates/{symbol}', options, (res) => {
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
     `integer` — Total number of matching reporting dates.
- **items_count**   
     `integer` — Number of reporting dates returned.
- **items**   
     `array` — Array of reporting dates.


### Date Item

Each item represents one available holdings reporting date for the requested ETF.


- **type**   
     `string` — Record type (`date` expected).
- **history_date**   
     `string` — Holdings reporting date (YYYY-MM-DD).


### Example Response


```json
{
    "result": {
        "total_count": 6,
        "items_count": 3,
        "items": [
            {
                "type": "date",
                "history_date": "2026-05-18"
            },
            {
                "type": "date",
                "history_date": "2026-05-19"
            },
            {
                "type": "date",
                "history_date": "2026-05-21"
            }
        ]
    }
}
```
