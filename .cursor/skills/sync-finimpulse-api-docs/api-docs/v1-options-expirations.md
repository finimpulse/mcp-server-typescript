---
title: Expirations
created: 2026-03-10
updated: 2026-03-10
endpoint: GET v1/options/expirations/{symbol}
auth: Bearer Token
---

# Expirations

Returns the list of available option expiration dates for a single underlying symbol.

This endpoint serves as the entry point to the options dataset in the FinImpulse API. It lists the expiration dates available for an underlying, so you can build a valid request to [**/v1/options/chain**](https://developers.finimpulse.com/v1/options/chain/).

## Options Endpoint Workflow

This endpoint is the first step in a three-stage options workflow:

1. **GET /v1/options/expirations/{symbol}**: Retrieve the list of available expiration dates for the underlying.
2. [**POST /v1/options/chain**](https://developers.finimpulse.com/v1/options/chain/): Retrieve the full option chain for a selected expiration date. This is the primary data endpoint — it returns all available contracts with call and put prices, strike levels, volume, and liquidity fields.
3. [**POST /v1/options/contracts**](https://developers.finimpulse.com/v1/options/contracts/)**:** Retrieve data for a single contract. Use this only when you need detailed data on one specific contract rather than the full chain.

## Asset Type Compatibility

This endpoint is applicable to optionable underlying symbols for which expiration data is available in the upstream dataset.

- **Stocks and ETFs**: Supported when the asset has listed options coverage.
- **Mutual funds**: Generally not applicable.

If a ticker is valid but has no options coverage, the response can return an empty ***items*** array.

## When to Use This Endpoint

- Load the expiration dropdown after a user selects a ticker in an options UI flow.
- Check whether a symbol has listed options coverage before displaying the Options tab.
- Preselect the nearest available expiration for a simplified or default options workflow.
- Build expiration calendars for screening tools, strategy builders, or AI-driven analytics.
- Filter expirations dynamically by maturity range — for example, to isolate short-dated or long-dated options.

## Request 

**GET** `v1/options/expirations/{symbol}` 


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/options/expirations/{symbol}" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>"
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/options/expirations/{symbol}";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.GetAsync(url);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```


```php
<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.finimpulse.com/v1/options/expirations/{symbol}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
```


```python
import urllib.request
import json

url = "https://api.finimpulse.com/v1/options/expirations/{symbol}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}

req = urllib.request.Request(url, headers=headers, method="GET")

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode("utf-8"))
    print(result)
```


```javascript
const https = require('https');

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>'
  }
};

const req = https.request('https://api.finimpulse.com/v1/options/expirations/{symbol}', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.end();
```


## Response

### Pagination Fields


- **total_count**   
     `integer` — Total number of expiration records available for the ticker.
- **items_count**   
     `integer` — Number of expiration records returned in this response.
- **items**   
     `array` — Array of expiration entries.


### Expiration Item

Each item represents one available expiration date for the requested underlying.


- **type**   
     `string` — Record type. Expected value - "expiration".
- **expiration_date**   
     `string` — Available option expiration date (YYYY-MM-DD).


### Example Response


```json
{
    "task_id": "8dbf1a4b-f22b-45b4-b293-f1f2c6042c8b",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0004,
    "data": {
        "symbol": "NVDA"
    },
    "result": {
        "total_count": 39,
        "items_count": 39,
        "items": [
            {
                "type": "expiration",
                "expiration_date": "2026-01-30"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-02"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-04"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-06"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-09"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-11"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-13"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-18"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-20"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-23"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-02-27"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-02"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-04"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-06"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-09"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-11"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-13"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-16"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-18"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-20"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-03-27"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-04-02"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-04-10"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-04-17"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-04-24"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-05-15"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-06-18"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-07-17"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-08-21"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-09-18"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-11-20"
            },
            {
                "type": "expiration",
                "expiration_date": "2026-12-18"
            },
            {
                "type": "expiration",
                "expiration_date": "2027-01-15"
            },
            {
                "type": "expiration",
                "expiration_date": "2027-03-19"
            },
            {
                "type": "expiration",
                "expiration_date": "2027-06-17"
            },
            {
                "type": "expiration",
                "expiration_date": "2027-09-17"
            },
            {
                "type": "expiration",
                "expiration_date": "2027-12-17"
            },
            {
                "type": "expiration",
                "expiration_date": "2028-01-21"
            },
            {
                "type": "expiration",
                "expiration_date": "2028-12-15"
            }
        ]
    }
}
```


## Notes

- Returned dates are not guaranteed to be continuous or evenly spaced. Weekly, monthly, and LEAPS-style expirations can all appear together.
- The presence of expiration dates does not guarantee equal contract coverage across all strikes or both option types.
- Expiration dates should be interpreted in the context of the underlying market or exchange.
