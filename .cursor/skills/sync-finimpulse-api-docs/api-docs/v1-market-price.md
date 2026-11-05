---
title: Market Price API for Stocks, ETFs &amp; Mutual Funds
created: 2026-06-12
updated: 2026-11-03
endpoint: GET v1/market-price/{symbol}
auth: Bearer Token
---

# Market Price API for Stocks, ETFs &amp; Mutual Funds

Returns a current market price snapshot for a single asset symbol. 

This endpoint returns current market price data for stocks, ETFs, and mutual funds, including the most recent traded price, session prices and changes, trading volume, and market capitalization where applicable.

For assets listed on US exchanges, the response includes prices for three trading sessions:

1. **pre-market** (4:00 AM - 9:30 AM ET)
2. **regular** (9:30 AM - 4:00 PM ET)
3. **post-market** (4:00 PM - 8:00 PM ET)

– as well as a current price field.

For assets listed on non-US exchanges, only the regular session price and current price are returned.

## Data Freshness 

Price data may be delayed by up to one hour. For assets listed on **HKSE**, **LSE**, **NasdaqGS**, **NYSE**, **Tokyo**, and **XETRA**, the delay is up to 30 minutes. To check when a specific price was last updated, use the **current_price_update_time** field.

## Asset Type Compatibility

This endpoint is applicable to stocks, ETFs, and mutual funds. The available fields vary by asset type:

- **Stocks and ETFs**: All price fields are returned, including regular market, pre-market, and post-market data, volume, and market capitalization.
- **Mutual funds**: Only the regular market price and change fields are returned. Pre-market and post-market fields, volume, and market capitalization are not applicable.

## When to Use This Endpoint

- Retrieve the current price snapshot for a ticker, including active session data and market state.
- Populate a live price block in a dashboard, widget, or asset detail view.
- Determine which trading session is currently active, and select the corresponding price field for display or calculation.
- Build screeners, alerting systems, or automation workflows that require up-to-date session-aware price data.
- Support cross-session price comparisons by accessing regular market, pre-market, and post-market values from a single response.

## Request 

**GET** `v1/market-price/{symbol}` 


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/market-price/{symbol}" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>"
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/market-price/{symbol}";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/market-price/{symbol}",
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

url = "https://api.finimpulse.com/v1/market-price/{symbol}"
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

const req = https.request('https://api.finimpulse.com/v1/market-price/{symbol}', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.end();
```


## Response

### Identification Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **name**   
     `string` — Asset display name.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **currency**   
     `string` — Trading currency.
- **market_cap**   
     `number` — Market capitalization.


### Market Info


- **market_state**   
     `string` — Current trading session state for the requested asset. Determines which price field reflects the active price in the response. **Possible values:**
    - `REGULAR` - the regular trading session is in progress.
    - `PRE` - the pre-market session is in progress (applicable to US-listed assets only).
    - `POST` - the post-market session is in progress (applicable to US-listed assets only).
    - `CLOSED` - no active trading session.
     
     Additional values such as `PREPRE`, `POSTPOST`, and `OVERNIGHT` may be returned. Price selection logic is not affected by these states.
- **usd_rate**   
     `number` — FX rate used for USD normalization.


### Current Price


- **current_price**   
     `number` — Most recent traded price collected at the time indicated by `current_price_update_time`.
- **current_price_usd**   
     `number` — Most recent traded price collected at the time indicated by `current_price_update_time`, normalized to USD.
- **current_price_change**   
     `number` — Absolute change in the current price relative to the previous regular session closing price (`regular_market_previous_close`).
- **current_price_change_percent**   
     `number` — Percentage change in the current price relative to the previous regular session closing price (`regular_market_previous_close`).
- **current_price_update_time**   
     `string` — Timestamp of the most recent price update (ISO 8601).


### Regular Market


- **regular_market_price**   
     `number` — Active price during the regular trading session and at market close. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **regular_market_price_change**   
     `number` — Absolute price change for the regular market session in local currency.
- **regular_market_price_change_percent**   
     `number` — Percentage price change for the regular market session.
- **regular_market_time**   
     `string` — Timestamp of the last regular market trade (ISO 8601). 
    - During the **regular** session, reflects the time of the most recent trade at the moment of data collection.
    - For US-listed assets, during **pre-market and post-market** hours, reflects the closing time of the most recent regular session.
- **regular_market_open**   
     `number` — Price of the first trade of the current regular session.
- **regular_market_previous_close**   
     `number` — Closing price of the most recent completed regular session.
- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.


### Pre-Market

Applicable to assets listed on US exchanges only.


- **pre_market_price**   
     `number` — Active price during the pre-market session. Outside pre-market hours, returns the last traded pre-market price. Returns *null* if no pre-market data is available.
- **pre_market_price_change**   
     `number` — Absolute price change for the pre-market session.
- **pre_market_price_change_percent**   
     `number` — Percentage price change for the pre-market session.
- **pre_market_time**   
     `string` — Timestamp of the last pre-market trade (ISO 8601). 
    - **During the pre-market** session, reflects the time of the most recent trade at the moment of data collection.
    - **Outside pre-market** hours, reflects the time of the last trade from the most recent pre-market session.


### Post-Market

Applicable to assets listed on US exchanges only.


- **post_market_price**   
     `number` — Active price during the post-market session. Outside post-market hours, returns the last traded post-market price. Returns *null* if no post-market data is available.
- **post_market_price_change**   
     `number` — Absolute price change for the post-market session.
- **post_market_price_change_percent**   
     `number` — Percentage price change for the post-market session.
- **post_market_time**   
     `string` — Timestamp of the last post-market trade (ISO 8601). 
    - **During the post-market** session, reflects the time of the most recent trade at the moment of data collection.
    - **Outside post-market** hours, reflects the time of the last trade from the most recent post-market session.


### Example Response


```json
{
    "result": {
        "symbol": "AAPL",
        "name": "Apple",
        "quote_type": "stock",
        "currency": "USD",
        "regular_market_volume": 32437635,
        "market_cap": 4938670276608,
        "usd_rate": null,
        "market_state": "POST",
        "regular_market_open": 340.37,
        "regular_market_previous_close": 341.07,
        "current_price": 338.2655,
        "current_price_usd": 338.2655,
        "current_price_change": -0.13449097,
        "current_price_change_percent": -0.03974319,
        "current_price_update_time": "2026-09-28T20:28:26Z",
        "regular_market_price": 338.4,
        "regular_market_price_change": -2.6700134,
        "regular_market_price_change_percent": -0.7828345,
        "regular_market_time": "2026-09-28T20:00:01Z",
        "pre_market_price": 340.48,
        "pre_market_price_change": -0.58999634,
        "pre_market_price_change_percent": -0.17298394,
        "pre_market_time": "2026-09-28T13:29:59Z",
        "post_market_price": 338.2655,
        "post_market_price_change": -0.13449097,
        "post_market_price_change_percent": -0.03974319,
        "post_market_time": "2026-09-28T20:28:20Z"
    }
}
```
