---
title: Historical Forex Rates API for Currency Pairs
created: 2026-11-17
updated: 2026-11-17
endpoint: POST v1/histories/currencies
auth: Bearer Token
---

# Historical Forex Rates API for Currency Pairs

Returns historical OHLC exchange rates for a currency pair.

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint returns historical forex exchange rates for currency pairs as open, high, low, close, and adjusted close values. You can set the date range and interval (from daily to yearly), filter and sort records, and page through long histories. It complements the [Historical Price Data API](https://developers.finimpulse.com/v1/histories/), which covers stocks, ETFs, mutual funds, and indices.

## Coverage

Asset TypesCurrency pairsCurrencies~150Currency Pairs~1,500Historical Depth1996 to present (varies by currency pair)IntervalsDaily, weekly, monthly, quarterly, semiannual, yearly

Coverage figures are approximate and may change over time.

## Data Freshness

Data is updated once a day with records for the previous trading day.

## Data Availability &amp; Limitations

- Some fields may be **null** if a specific value is not available for a given currency pair. This does not indicate an error.
- If no data is available for the requested currency pair, the response contains an empty items array, and all metadata fields are **null**.
- Intraday data is not available. The shortest supported interval is one day (1d).
- For less actively traded currency pairs, records may have gaps, fall on weekends, or contain a single quote (open, high, low, and close are equal).
- For intervals longer than one day, the most recent record covers the current period up to the latest available date.

## When to Use This Endpoint

- Build historical exchange rate charts for currency pairs.
- Convert amounts between currencies at the historical rate for a given date.
- Value multi-currency portfolios over time by converting asset prices into a single currency.
- Analyze currency volatility using high and low values for each interval.
- Backtest currency hedging strategies on historical forex data.

## Request Parameters

**POST** `v1/histories/currencies` 

- **currency_from**   
     `string` *(required)* — Base currency code (uppercase 3-letter code, e.g., GBP).  
     Not required when `search_after_token` is provided.
- **currency_to**   
     `string` *(required)* — Quote currency code (uppercase 3-letter code, e.g., EUR).  
     Not required when `search_after_token` is provided.
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
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD).  
     If omitted, records are returned from the earliest available date.
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD).  
     If omitted, records are returned up to the most recent available date.
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
     `array` *(optional)* — Optional sorting configuration for result items. Records can be sorted by `date` only. The sorting setup is defined as an object {selector, desc}: 
    - `selector` - Field used for sorting. The only supported value is `date`.
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     By default, records are sorted by `date` in descending order.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined). 
    - Default: 100
    - Maximum: 1000
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **search_after_token**   
     `string` *(optional)* — Token for pagination. Use the value returned in the previous response to fetch the next page. Pass `limit` with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/histories/currencies" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "currency_from": "EUR",
      "currency_to": "USD",
      "interval": "1mo",
      "start_date": "2024-01-01",
      "end_date": "2025-12-31",
      "filters": [
          [
              "close",
              ">",
              1.1
          ]
      ],
      "sort_by": [
          {
              "selector": "date",
              "desc": false
          }
      ],
      "limit": 10,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/histories/currencies";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""currency_from"": ""EUR"",
    ""currency_to"": ""USD"",
    ""interval"": ""1mo"",
    ""start_date"": ""2024-01-01"",
    ""end_date"": ""2025-12-31"",
    ""filters"": [
        [
            ""close"",
            "">"",
            1.1
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""date"",
            ""desc"": false
        }
    ],
    ""limit"": 10,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/histories/currencies",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "currency_from" => "EUR",
      "currency_to" => "USD",
      "interval" => "1mo",
      "start_date" => "2024-01-01",
      "end_date" => "2025-12-31",
      "filters" => [
        [
          "close",
          ">",
          1.1
        ]
      ],
      "sort_by" => [
        [
          "selector" => "date",
          "desc" => false
        ]
      ],
      "limit" => 10,
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

url = "https://api.finimpulse.com/v1/histories/currencies"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "currency_from": "EUR",
    "currency_to": "USD",
    "interval": "1mo",
    "start_date": "2024-01-01",
    "end_date": "2025-12-31",
    "filters": [
        [
            "close",
            ">",
            1.1
        ]
    ],
    "sort_by": [
        {
            "selector": "date",
            "desc": False
        }
    ],
    "limit": 10,
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
    "currency_from": "EUR",
    "currency_to": "USD",
    "interval": "1mo",
    "start_date": "2024-01-01",
    "end_date": "2025-12-31",
    "filters": [
        [
            "close",
            ">",
            1.1
        ]
    ],
    "sort_by": [
        {
            "selector": "date",
            "desc": false
        }
    ],
    "limit": 10,
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

const req = https.request('https://api.finimpulse.com/v1/histories/currencies', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains currency pair metadata, pagination fields, and a list of exchange rate records. Each item represents the exchange rates for one interval.

### Metadata


- **currency_from**   
     `string` — Base currency code.
- **currency_to**   
     `string` — Quote currency code.
- **full_exchange_name**   
     `string` — Exchange name (always CCY, short for “currency”).
- **exchange_timezone_name**   
     `string` — Exchange time zone name.
- **exchange_timezone_short_name**   
     `string` — Exchange time zone abbreviation.
- **exchange**   
     `string` — Exchange code (always CCY, short for “currency”).
- **short_name**   
     `string` — Currency pair short descriptive name.
- **long_name**   
     `string` — Currency pair full formal name.
- **quote_source_name**   
     `string` — Data source label for the quote.
- **time_offset**   
     `integer` — Exchange time offset in seconds.


### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **search_after_token**   
     `string` — Token for pagination.  
     Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of exchange rate records.


### Exchange Rate Record Fields

Exchange rates show how many units of `currency_to` equal one unit of `currency_from`. For example, close: 1.17 for EUR/USD means 1 EUR = 1.17 USD.


- **date**   
     `string` — Record date (YYYY-MM-DD).
- **open**   
     `number` — Open exchange rate for the interval.
- **high**   
     `number` — Highest exchange rate for the interval.
- **low**   
     `number` — Lowest exchange rate for the interval.
- **close**   
     `number` — Close exchange rate for the interval.
- **adj_close**   
     `number` — Adjusted close exchange rate for the interval.


### Example Response


```json
{
    "result": {
        "currency_from": "EUR",
        "currency_to": "USD",
        "full_exchange_name": "CCY",
        "exchange_timezone_name": "Europe/London",
        "exchange_timezone_short_name": "GMT",
        "exchange": "CCY",
        "short_name": "EUR/USD",
        "long_name": "EUR/USD",
        "quote_source_name": "Delayed Quote",
        "time_offset": 3600,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJjdXJyZW5jeV9mcm9tIjoiRVVSIiwiY3VycmVuY3lfdG8iOiJVU0QiLCJpbnRlcnZhbCI6IjFtbyIsInN0YXJ0X2RhdGUiOiIyMDI0LTAxLTAxIiwiZW5kX2RhdGUiOiIyMDI1LTEyLTMxIiwicXVlcnkiOnsiZmllbGQiOiJjbG9zZSIsInR5cGUiOiJndCIsInZhbHVlIjoxLjF9LCJvcmRlcl9ieSI6eyJvcmRlcl9maWVsZCI6ImRhdGUiLCJvcmRlcl90eXBlIjoiQXNjIiwibmV4dCI6bnVsbH0sImxpbWl0IjoxMCwib2Zmc2V0IjowLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsiZGF0ZSI6IjIwMjUtMDktMDEifSwiVG9rZW5SZWFsT2Zmc2V0IjoxMCwiVG90YWxDb3VudCI6MTN9fQ==",
        "total_count": 13,
        "items_count": 10,
        "items": [
            {
                "date": "2024-01-01",
                "open": 1.10558319,
                "high": 1.10533881,
                "low": 1.09419966,
                "close": 1.10387456,
                "adj_close": 1.10387456
            },
            {
                "date": "2024-08-01",
                "open": 1.10132158,
                "high": 1.12010932,
                "low": 1.09505033,
                "close": 1.10804546,
                "adj_close": 1.10804546
            },
            {
                "date": "2024-09-01",
                "open": 1.1044842,
                "high": 1.12123966,
                "low": 1.10027945,
                "close": 1.11698151,
                "adj_close": 1.11698151
            },
            {
                "date": "2024-10-01",
                "open": 1.11366022,
                "high": 1.11457872,
                "low": 1.09561431,
                "close": 1.10355783,
                "adj_close": 1.10355783
            },
            {
                "date": "2025-04-01",
                "open": 1.10437441,
                "high": 1.15465438,
                "low": 1.09647918,
                "close": 1.13892627,
                "adj_close": 1.13892627
            },
            {
                "date": "2025-05-01",
                "open": 1.13248992,
                "high": 1.14189148,
                "low": 1.10750556,
                "close": 1.13783765,
                "adj_close": 1.13783765
            },
            {
                "date": "2025-06-01",
                "open": 1.13533151,
                "high": 1.177163,
                "low": 1.13558936,
                "close": 1.17274535,
                "adj_close": 1.17274535
            },
            {
                "date": "2025-07-01",
                "open": 1.17871702,
                "high": 1.18302596,
                "low": 1.14065409,
                "close": 1.14293551,
                "adj_close": 1.14293551
            },
            {
                "date": "2025-08-01",
                "open": 1.14237404,
                "high": 1.17306185,
                "low": 1.1394583,
                "close": 1.16815603,
                "adj_close": 1.16815603
            },
            {
                "date": "2025-09-01",
                "open": 1.16918039,
                "high": 1.18729591,
                "low": 1.16098177,
                "close": 1.17314434,
                "adj_close": 1.17314434
            }
        ]
    }
}
```


## Pagination &amp; Limits 

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.

## Related APIs

- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Country Macroeconomic Indicators API](https://developers.finimpulse.com/v1/macro-economics/)
- [Macroeconomic Release Calendar API ](https://developers.finimpulse.com/v1/market/calendars/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
