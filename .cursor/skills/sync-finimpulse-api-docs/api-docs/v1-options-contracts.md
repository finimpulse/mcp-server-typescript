---
title: Option Contract Data &amp; Greeks API
created: 2026-03-10
updated: 2026-11-03
endpoint: POST v1/options/contracts
auth: Bearer Token
---

# Option Contract Data &amp; Greeks API

Returns a single option contract snapshot for a specific contract identifier.

This endpoint retrieves a single exact option contract by its full contract name. It returns the same core contract-level fields as [**/v1/options/chain**](https://developers.finimpulse.com/v1/options/chain/), but scoped to a single instrument.

Use it when you need a clean, direct lookup for contract details, pricing, liquidity, implied volatility, and related metadata without loading the full chain.

## Options Endpoint Workflow

This endpoint is the third step in a three-stage options workflow:

1. [**GET /v1/options/expirations/{symbol}**](https://developers.finimpulse.com/v1/options/expirations/): Retrieve the list of available expiration dates for the underlying.
2. [**POST /v1/options/chain**](https://developers.finimpulse.com/v1/options/chain/): Retrieve the full option chain for a selected expiration date.
3. **POST /v1/options/contracts**: Retrieve data for a single contract, looked up by the **contract_name** obtained from [**POST /v1/options/chain**](https://developers.finimpulse.com/v1/options/chain/).

## Asset Type Compatibility

This endpoint is applicable to listed option contracts for supported underlying assets.

- **Stocks and ETFs**: Supported when the stock has listed options coverage in the provider
- **Mutual funds**: Generally not applicable.

If a ticker is valid but has no options coverage, the response can return an empty ***items*** array.

## When to Use This Endpoint

- Open a contract detail panel after a user clicks a specific **call** or **put** in the chain table.
- Confirm the selected contract before adding it to a watchlist, strategy builder, or trade idea flow.
- Refresh a single contract snapshot without reloading the entire options chain.
- Support detail drawers, side panels, modals, or confirmation steps in options UI flows.
- Enable deep-link or saved-state flows where the UI stores only the **contract_name**.
- Feed pricing, AI, or strategy workflows that operate on a single already-identified contract.

## Request Parameters

**POST** `v1/options/contracts` 

- **contract_name**   
     `string` *(required)* — Full option contract identifier.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/options/contracts" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "contract_name": "NVDA260311C00155000"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/options/contracts";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""contract_name"": ""NVDA260311C00155000""
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/options/contracts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "contract_name" => "NVDA260311C00155000"
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

url = "https://api.finimpulse.com/v1/options/contracts"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "contract_name": "NVDA260311C00155000"
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
    "contract_name": "NVDA260311C00155000"
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request('https://api.finimpulse.com/v1/options/contracts', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response returns a single contract snapshot for the requested option identifier.

- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **underlying_price**   
     `number` — Current price of the underlying asset.
- **expiration_date**   
     `string` — Expiration date (YYYY-MM-DD).
- **contract_name**   
     `string` — Full option contract identifier.
- **option_type**   
     `string` — Contract side. **Possible values:**
    - `call`
    - `put`
- **strike**   
     `number` — Strike price.
- **currency**   
     `string` — Trading currency.
- **last_price**   
     `number` — Last traded price.
- **change**   
     `number` — Absolute price change.
- **percent_change**   
     `number` — Percentage price change.
- **volume**   
     `integer` — Traded volume.
- **open_interest**   
     `integer` — Open interest.
- **bid**   
     `number` — Bid price.
- **ask**   
     `number` — Ask price.
- **contract_size**   
     `string` — Contract size classification (e.g., REGULAR).
- **last_trade_date**   
     `string` — Timestamp of the last recorded trade (ISO 8601).
- **implied_volatility**   
     `number` — Implied volatility.
- **in_the_money**   
     `boolean` — Indicates whether the contract is currently in the money.
- **greeks**   
     `array` — Array of greeks (delta, gamma, theta, vega, rho). Returns `null` if values are not available.


### Example Response


```json
{
    "result": {
        "symbol": "NVDA",
        "underlying_price": 182.65,
        "expiration_date": "2026-03-11",
        "contract_name": "NVDA260311C00155000",
        "option_type": "call",
        "strike": 155,
        "currency": "USD",
        "last_price": 24.6,
        "change": -1.559999,
        "percent_change": -5.9633,
        "volume": 20,
        "open_interest": 108,
        "bid": 25.1,
        "ask": 29.3,
        "contract_size": "REGULAR",
        "last_trade_date": "2026-03-09 15:51:46",
        "implied_volatility": -3444640.17943362,
        "in_the_money": true,
        "greeks": {
            "delta": 0,
            "gamma": -0,
            "theta": -0.02,
            "vega": 0,
            "rho": 0
        }
    }
}
```
