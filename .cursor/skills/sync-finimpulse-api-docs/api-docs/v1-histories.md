---
title: Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices
created: 2026-01-28
updated: 2026-11-06
endpoint: POST v1/histories
auth: Bearer Token
---

# Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices

Returns historical price data for an asset, including dividends, splits, and capital gains, in a single stream. 

**Available via:** [REST API ](https://developers.finimpulse.com/)· [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint returns historical price data for stocks, ETFs, mutual funds, and indices, along with dividends, stock splits, and capital gains where available. It is a configurable endpoint that lets you control the date range, interval (from daily to yearly), and included record types, and optionally convert all values to USD.

## Coverage

Asset TypesStocks, ETFs, mutual funds, indicesMarket Regions~60Listings730,000+Historical Depth1970 to presentIntervalsDaily, weekly, monthly, quarterly, semiannual, yearly

Coverage figures are approximate and may change over time.

## Data Freshness 

Historical data is updated once a day with records for the previous trading day.

## Asset Type Compatibility
The Historical Price Data API works across stocks, ETFs, mutual funds, and indices. Available record types depend on the asset type:

- **Stocks**: historical prices, dividends, and splits.
- **ETFs**: historical prices, dividends, splits, and capital gains (only for some ETFs, depending on their distribution history).
- **Mutual Funds**: historical prices, dividends, splits, and capital gains (only for some funds, depending on their distribution history).
- **Indices**: historical prices only.

## USD Normalization
By default, all currency-denominated fields are returned in the asset's native currency. For assets quoted in currencies other than USD, you can set **use_usd** to true to convert these values to USD.

When **“use_usd”: true** is set, each value is converted at the historical exchange rate for its date, so every price, dividend, and capital gain reflects the rate that applied on that day. This eliminates the need for client-side currency conversion and provides a consistent USD basis for comparing assets across markets.


## Data Availability &amp; Limitations

- Dividends, splits, and capital gains may not be available for all assets. If a requested record type has no data for the asset, it is not included in items.
- If none of the requested record types have data for the asset, the response contains an empty items array, and all asset metadata fields are **null**.
- Some fields may be **null** if a specific value is not available for a given asset. This does not indicate an error.
- Intraday data is not available. The shortest supported interval is one day (1d).

## When to Use This Endpoint
- Build historical price charts for stocks, ETFs, mutual funds, and indices, with dividends and splits marked on the same timeline.
- Display price history tables with open, high, low, close, adjusted close, and volume for any date range and interval.
- Track index performance over time, such as the Dow Jones Industrial Average or the Nikkei 225.
- Compare assets from different markets on a consistent USD basis.
- Retrieve dividend, split, and capital gains history for income and corporate action analysis.

## Request Parameters
**POST** `v1/histories` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol). Not required when `search_after_token` is provided.
- **types**   
     `array` *(optional)* — Record types to include. **Supported values:**
    - `historical_price`
    - `dividends`
    - `splits`
    - `capital_gains`
     
     Each value is a **string**. You can pass any combination of the supported values. If no values are provided, all supported types are returned.
- **interval**   
     `string` *(optional)* — Granularity for returned history records. **Available values:**
    - `1d` (1 day)
    - `1wk` (1 week)
    - `1mo` (1 month)
    - `3mo` (3 months)
    - `6mo` (6 months)
    - `1y` (1 year)
     
     If no value is provided, daily records (1d) are returned.
- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD). If omitted, records are returned from the earliest available date.
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD). If omitted, records are returned up to the most recent available date.
- **use_usd**   
     `boolean` *(optional)* — Controls whether currency-denominated fields are returned in USD or in the asset's native currency. 
    - `true` - all currency-denominated fields are returned in USD
    - `false` - all currency-denominated fields are returned in the asset's native currency (default)
     
     Ignored for assets already denominated in USD.
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as an object `{selector, desc}`: 
    - `selector` - Field used for sorting (e.g., date).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined). 
    - Default: 100
    - Maximum: 1000
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based)
- **search_after_token**   
     `string` *(optional)* — Token for pagination. Use the value returned in the previous response to fetch the next page. Pass `limit` with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/histories" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NOKIA.HE",
      "types": [
          "historical_price",
          "dividends",
          "splits",
          "capital_gains"
      ],
      "interval": "1d",
      "start_date": "2025-12-01",
      "end_date": "2025-12-30",
      "use_usd": true,
      "sort_by": [
          {
              "selector": "date",
              "desc": true
          }
      ],
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
var url = "https://api.finimpulse.com/v1/histories";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NOKIA.HE"",
    ""types"": [
        ""historical_price"",
        ""dividends"",
        ""splits"",
        ""capital_gains""
    ],
    ""interval"": ""1d"",
    ""start_date"": ""2025-12-01"",
    ""end_date"": ""2025-12-30"",
    ""use_usd"": true,
    ""sort_by"": [
        {
            ""selector"": ""date"",
            ""desc"": true
        }
    ],
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/histories",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NOKIA.HE",
      "types" => [
        "historical_price",
        "dividends",
        "splits",
        "capital_gains"
      ],
      "interval" => "1d",
      "start_date" => "2025-12-01",
      "end_date" => "2025-12-30",
      "use_usd" => true,
      "sort_by" => [
        [
          "selector" => "date",
          "desc" => true
        ]
      ],
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

url = "https://api.finimpulse.com/v1/histories"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NOKIA.HE",
    "types": [
        "historical_price",
        "dividends",
        "splits",
        "capital_gains"
    ],
    "interval": "1d",
    "start_date": "2025-12-01",
    "end_date": "2025-12-30",
    "use_usd": True,
    "sort_by": [
        {
            "selector": "date",
            "desc": True
        }
    ],
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
    "symbol": "NOKIA.HE",
    "types": [
        "historical_price",
        "dividends",
        "splits",
        "capital_gains"
    ],
    "interval": "1d",
    "start_date": "2025-12-01",
    "end_date": "2025-12-30",
    "use_usd": true,
    "sort_by": [
        {
            "selector": "date",
            "desc": true
        }
    ],
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

const req = https.request('https://api.finimpulse.com/v1/histories', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response contains asset metadata, pagination fields, and a list of history records. Each item represents a price record for one interval or a single dividend, split, or capital gain event.

### Asset Metadata


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund, index, sector). **Note**: sector is returned for sector ETFs (XLK, XLF, XLV, XLY, XLP, XLC, XLI, XLE, XLB, XLRE, XLU).
- **currency**   
     `string` — Trading currency.
- **time_offset**   
     `integer` — Exchange time offset in seconds.
- **exchange_timezone_name**   
     `string` — Exchange time zone name.
- **full_exchange_name**   
     `string` — Exchange name.
- **display_name**   
     `string` — Asset display name.
- **market_region**   
     `string` — Market/country code.


### Pagination Fields


- **total_count**   
     `integer` — Total number of matching history records.
- **search_after_token**   
     `string` — Token for pagination. Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items_count**   
     `integer` — Number of history records returned.
- **items**   
     `array` — Array of history records.


### Historical Price


- **type**   
     `string` — Record type (historical_price).
- **date**   
     `string` — Record date (YYYY-MM-DD).
- **open**   
     `number` — Market open price for the interval.
- **high**   
     `number` — Highest price for the interval.
- **low**   
     `number` — Lowest price for the interval.
- **close**   
     `number` — Close price for the interval.
- **adj_close**   
     `number` — Adjusted close price for the interval.
- **volume**   
     `number` — Trading volume for the interval.


### Dividends


- **type**   
     `string` — Record type (dividends).
- **date**   
     `string` — Event date (YYYY-MM-DD).
- **amount**   
     `number` — Dividend amount.


### Splits


- **type**   
     `string` — Record type (splits).
- **date**   
     `string` — Event date (YYYY-MM-DD).
- **numerator**   
     `integer` — Number of shares after the split.
- **denominator**   
     `integer` — Number of shares before the split.


### Capital Gains


- **type**   
     `string` — Record type (capital_gains).
- **date**   
     `string` — Event date (YYYY-MM-DD).
- **amount**   
     `number` — Realized capital gain or loss amount 
    - positive value = capital gain
    - negative value = capital loss


### Example Response


```json
{
    "result": {
        "symbol": "NOKIA.HE",
        "quote_type": "stock",
        "currency": "USD",
        "time_offset": 10800,
        "exchange_timezone_name": "Europe/Helsinki",
        "full_exchange_name": "Helsinki",
        "display_name": null,
        "market_region": "FI",
        "total_count": 18,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzeW1ib2wiOiJOT0tJQS5IRSIsInVzZV91c2QiOnRydWUsInR5cGVzIjpbImhpc3RvcmljYWxfcHJpY2UiLCJkaXZpZGVuZHMiLCJzcGxpdHMiLCJjYXBpdGFsX2dhaW5zIl0sImludGVydmFsIjoiMWQiLCJzdGFydF9kYXRlIjoiMjAyNS0xMi0wMSIsImVuZF9kYXRlIjoiMjAyNS0xMi0zMCIsInF1ZXJ5IjpudWxsLCJvcmRlcl9ieSI6eyJvcmRlcl9maWVsZCI6ImRhdGUiLCJvcmRlcl90eXBlIjoiRGVzYyIsIm5leHQiOm51bGx9LCJsaW1pdCI6NSwib2Zmc2V0IjpudWxsLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsiZGF0ZSI6IjIwMjUtMTItMTgifSwiVG9rZW5SZWFsT2Zmc2V0Ijo1LCJUb3RhbENvdW50IjoxOH19",
        "items_count": 5,
        "items": [
            {
                "type": "historical_price",
                "open": 6.557415656036558,
                "high": 6.571542483339749,
                "low": 6.451460831145478,
                "close": 6.566833729269171,
                "adj_close": 6.566833729269171,
                "volume": 7396059.44720707,
                "date": "2025-12-29"
            },
            {
                "type": "historical_price",
                "open": 6.530102973053067,
                "high": 6.541868629804295,
                "low": 6.483039216516871,
                "close": 6.492451859577361,
                "adj_close": 6.492451859577361,
                "volume": 6461769.63645807,
                "date": "2025-12-23"
            },
            {
                "type": "historical_price",
                "open": 6.439451645,
                "high": 6.516725041323812,
                "low": 6.411352020602403,
                "close": 6.441793099866685,
                "adj_close": 6.441793099866685,
                "volume": 8697302.52557367,
                "date": "2025-12-22"
            },
            {
                "type": "historical_price",
                "open": 6.327169537869001,
                "high": 6.449116575,
                "low": 6.317789121925666,
                "close": 6.399868986761997,
                "adj_close": 6.399868986761997,
                "volume": 22863284.96219175,
                "date": "2025-12-19"
            },
            {
                "type": "historical_price",
                "open": 6.2187358496,
                "high": 6.423052075411154,
                "low": 6.192902932019542,
                "close": 6.376082818380458,
                "adj_close": 6.376082818380458,
                "volume": 12163534.975946,
                "date": "2025-12-18"
            }
        ]
    }
}
```


## Units and Formats 

- Currency-denominated fields (**open**, **high**, **low**, **close**, **adj_close**, **amount**) are expressed in the currency indicated by the currency field.
- For indices, **open**, **high**, **low**, **close**, and **adj_close** contain index values in points. The **currency** field shows the currency in which the index is calculated.

## Pagination &amp; Limits 

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- To keep the order consistent across pages, pass **sort_by**, for example, by **date**.

## Related APIs 

- [](https://developers.finimpulse.com/v1/search/)[Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Global Market Index Search API](https://developers.finimpulse.com/v1/market/index/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Statistics API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/statistics/general/)
- [Stock Financial Metrics &amp; Dividends API](https://developers.finimpulse.com/v1/metrics/)
- [ETF &amp; Mutual Fund Annual Returns API](https://developers.finimpulse.com/v1/statistics/annual-returns/)
- [Corporate Earnings &amp; IPO Calendar API](https://developers.finimpulse.com/v1/events/tickers/)
- [Macroeconomic Release Calendar API](https://developers.finimpulse.com/v1/market/calendars/)

## Build with this API 

- [Build Historical Price Charts Using Historical Prices API](https://finimpulse.com/rest-api-use-cases/historical-prices-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
