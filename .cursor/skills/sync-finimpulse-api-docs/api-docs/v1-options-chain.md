---
title: Chain
created: 2026-03-10
updated: 2026-03-10
endpoint: POST v1/options/chain
auth: Bearer Token
---

# Chain

Returns the option chain for a single underlying ticker and expiration date.

This endpoint provides the core options data. It returns option contracts for a selected underlying and expiration date, including pricing, liquidity, implied volatility, and moneyness fields.

## Asset Type Compatibility

The endpoint is applicable to optionable underlyings for which contract-level chain data is available in the provider dataset.

- **Stocks and ETFs**: Supported when listed options are available.
- **Mutual funds**: Generally not applicable.

If a ticker is valid but has no options coverage, the response can return an empty ***items*** array.

## When to Use This Endpoint

- Retrieve the full or paginated option chain for a selected underlying and expiration date.
- Populate the Options tab or chain table after a user selects a ticker and expiration.
- Display both calls and puts in a unified layout using a consistent contract schema.
- Apply filtering and sorting to surface liquid or relevant contracts before rendering.
- Support lazy loading and pagination for large chains with many strike levels.
- Discover tradable contracts by filtering on bid, ask, volume, or open interest.
- Feed strategy builders, screeners, or AI workflows with normalized strike-level data.

## Request Parameters

**POST** `v1/options/chain` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **expiration_date**   
     `string` *(required)* — Expiration date to retrieve (YYYY-MM-DD).
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
    - `like` – pattern match (requires % as a wildcard)
    - `not_like` - pattern does not match (requires % as a wildcard)
    - `contains` - value exists in string
    - `not_contains` - value does not exist in string
    - `startswith` - string starts with value
    - `endswith` - string ends with value
     
     *`%` usage examples:*
    - %abc% - matches any string containing "abc"
    - abc% - matches any string starting with "abc"
    - %abc - matches any string ending with "abc"
     
     **Example:** `"filters": [ [ "contract_size", "=", "REGULAR" ], "and", [ "bid", "<>", 0 ] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., last_trade_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "last_trade_date", "desc": true } ]`
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/options/chain" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "expiration_date": "2026-01-30",
      "limit": 5,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/options/chain";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""expiration_date"": ""2026-01-30"",
    ""limit"": 5,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/options/chain",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "expiration_date" => "2026-01-30",
      "limit" => 5,
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

url = "https://api.finimpulse.com/v1/options/chain"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "expiration_date": "2026-01-30",
    "limit": 5,
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
    "expiration_date": "2026-01-30",
    "limit": 5,
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

const req = https.request('https://api.finimpulse.com/v1/options/chain', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

### Meta Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **underlying_price**   
     `number` — Current/reference price of the underlying asset used with the option chain snapshot.
- **expiration_date**   
     `string` — Expiration date for all returned contracts.
- **total_count**   
     `integer` — Total number of contracts available.
- **items_count**   
     `integer` — Number of contracts returned in this response.
- **items**   
     `array` — Array of option contract entries.


### Option Contract Item

Each item represents one option contract in the selected expiration chain.


- **contract_name**   
     `string` — Full option contract identifier.
- **option_type**   
     `string` — Contract side. Expected values include `call` and `put`.
- **strike**   
     `number` — Strike price of the contract.
- **currency**   
     `string` — Pricing currency.
- **last_price**   
     `number` — Last traded contract price.
- **change**   
     `number` — Absolute change in contract price versus prior reference.
- **percent_change**   
     `number` — Percentage change in contract price (returned as a fraction).
- **volume**   
     `integer` — Traded contract volume.
- **open_interest**   
     `integer` — Open interest for the contract.
- **bid**   
     `number` — Current bid price.
- **ask**   
     `number` — Current ask price.
- **contract_size**   
     `string` — Contract size classification (e.g. "REGULAR").
- **last_trade_date**   
     `string` — Timestamp of the last recorded trade for the contract.
- **implied_volatility**   
     `number` — Implied volatility (returned as a fraction).
- **in_the_money**   
     `boolean` — Indicates whether the contract is currently in the money based on the underlying/reference price.


### Example Response


```json
{
    "task_id": "37acf6e5-654f-4d11-b424-746f3e5118cb",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0014,
    "data": {
        "symbol": "NVDA",
        "limit": 5,
        "offset": 0,
        "filters": [
            [
                "contract_size",
                "=",
                "REGULAR"
            ],
            "and",
            [
                "bid",
                "<>",
                0
            ]
        ],
        "expiration_date": "2026-01-30",
        "sort_by": [
            {
                "selector": "last_trade_date",
                "desc": true
            }
        ]
    },
    "result": {
        "symbol": "NVDA",
        "underlying_price": 191.13,
        "expiration_date": "2026-01-30",
        "total_count": 56,
        "items_count": 5,
        "items": [
            {
                "contract_name": "NVDA260130C00190000",
                "option_type": "call",
                "strike": 190,
                "currency": "USD",
                "last_price": 1.18,
                "change": -1.98,
                "percent_change": -62.65823,
                "volume": 150366,
                "open_interest": 103969,
                "bid": 1,
                "ask": 1.4,
                "contract_size": "REGULAR",
                "last_trade_date": "2026-01-30 20:59:59",
                "implied_volatility": 0.174324,
                "in_the_money": true
            },
            {
                "contract_name": "NVDA260130P00192500",
                "option_type": "put",
                "strike": 192.5,
                "currency": "USD",
                "last_price": 1.3,
                "change": -0.2,
                "percent_change": -13.333336,
                "volume": 131744,
                "open_interest": 8444,
                "bid": 1.11,
                "ask": 1.45,
                "contract_size": "REGULAR",
                "last_trade_date": "2026-01-30 20:59:54",
                "implied_volatility": 0.121102,
                "in_the_money": true
            },
            {
                "contract_name": "NVDA260130C00170000",
                "option_type": "call",
                "strike": 170,
                "currency": "USD",
                "last_price": 21.15,
                "change": -1.5,
                "percent_change": -6.622516,
                "volume": 954,
                "open_interest": 2846,
                "bid": 19.75,
                "ask": 21.3,
                "contract_size": "REGULAR",
                "last_trade_date": "2026-01-30 20:59:51",
                "implied_volatility": 1.246097,
                "in_the_money": true
            },
            {
                "contract_name": "NVDA260130C00185000",
                "option_type": "call",
                "strike": 185,
                "currency": "USD",
                "last_price": 6.3,
                "change": -1.399999,
                "percent_change": -18.181814,
                "volume": 9304,
                "open_interest": 19206,
                "bid": 6.2,
                "ask": 6.4,
                "contract_size": "REGULAR",
                "last_trade_date": "2026-01-30 20:59:50",
                "implied_volatility": 0.50977,
                "in_the_money": true
            },
            {
                "contract_name": "NVDA260130C00180000",
                "option_type": "call",
                "strike": 180,
                "currency": "USD",
                "last_price": 11.2,
                "change": -1.449999,
                "percent_change": -11.46245,
                "volume": 3239,
                "open_interest": 6622,
                "bid": 9.75,
                "ask": 11.4,
                "contract_size": "REGULAR",
                "last_trade_date": "2026-01-30 20:59:50",
                "implied_volatility": 0.803712,
                "in_the_money": true
            }
        ]
    }
}
```


## Notes

- This endpoint returns contracts for one expiration date at a time. Use [**/v1/options/expirations/{symbol}**](https://developers.finimpulse.com/v1/options/expirations/) first to discover valid dates.
- Some extreme or stale contracts can contain unusual values for implied volatility or price-related fields due to low liquidity or calculation artifacts.
- The returned chain is a snapshot and can change throughout the trading session as quotes and trades update.
