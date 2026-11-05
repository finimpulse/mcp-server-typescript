---
title: Global Market Index Search API
created: 2026-09-29
updated: 2026-11-05
endpoint: POST v1/market/index
auth: Bearer Token
---

# Global Market Index Search API

Returns a search result for global market indices, such as the S&P 500, Dow Jones, and Nasdaq Composite, with closing prices and key performance metrics. 

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint allows searching across ~39,000 global market indices, including equity, volatility, currency, and U.S. Treasury yield indices, and returns core identification, closing price, and performance data.

It is possible to control which fields are included in the response through the **select_identifiers** parameter. This reduces response size and is useful when only a subset of data is needed.

## Coverage

Indices~39,000 Markets~50 ([download the full list](https://finimpulse.com/wp-content/uploads/2026/09/indices_markets.txt)) Exchanges and index data sources ~70 ([download the full list](https://finimpulse.com/wp-content/uploads/2026/09/indices_exchanges.txt)) 

Coverage figures are approximate and may change over time.

## Data Freshness

Index data is updated once every 24 hours. Note that each index is updated at its own time; the **update_time** field shows when a specific data record was last updated.

## Data Availability &amp; Limitations

- This endpoint returns the latest price data for each index, such as the close price, daily change, and 52-week range. Historical index prices are available through the [Historical Price Data API](https://developers.finimpulse.com/v1/histories/).
- Intraday, pre-market, and post-market prices are not available for indices.
- Some fields may be **null** if a specific value is not available for a given index. It does not indicate an error.
- Values are provided based on upstream source data. Index methodologies are defined by index providers and may vary across indices.

## When to Use This Endpoint

- Build global market overview dashboards and index trackers.
- Track broad market performance and volatility indicators such as VIX.
- Compare individual asset performance against benchmark indices.
- Retrieve daily index snapshots, including close price, price changes, normalized USD values, and 52-week ranges.

## Request Parameters

**POST** `v1/market/index` 

- **search_text**   
     `string` *(optional)* — Free-text query (e.g., “GSPC.INDX”, “S&amp;P 500”, partial symbol, partial name).
- **select_identifiers**   
     `array` *(optional)* — A list of field names to include in the response. 
    - When provided, each item in the response contains only the specified fields.
    - When not provided or set to *null*, the full field set is returned.
     
     `symbol` and `logo` are always returned regardless of the value passed. For the list of available field names, see the Response section below.
- **symbols**   
     `array` *(optional)* — A list of index symbols to retrieve (e.g., GSPC.INDX, DJI.INDX, 000001.SS). When provided, the response returns only the specified indices. **Important notes:**
    - If a symbol does not exist, it is excluded from the results.
    - Returns an empty result set if none of the specified symbols are found.
- **show_tickers_without_company_name**   
     `boolean` *(optional)* — Include indices without a name. 
    - `true` - include indices without a name
    - `false` - exclude indices without a name
- **hide_tickers_with_company_name**   
     `boolean` *(optional)* — Exclude indices with a name 
    - `true` - exclude indices with a name
    - `false` - include indices with a name
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
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as an object `{selector, desc}`: 
    - `selector` - Field used for sorting (e.g., regular_market_price_change_percent).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array.
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
curl --location "https://api.finimpulse.com/v1/market/index" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "search_text": "Dow Jones",
      "select_identifiers": [
          "short_name",
          "currency",
          "regular_market_price",
          "regular_market_price_change",
          "regular_market_price_change_percent",
          "regular_market_time"
      ],
      "symbols": [
          "GSPC.INDX",
          "IXIC.INDX",
          "DJI.INDX",
          "DJT.INDX",
          "DJU.INDX"
      ],
      "show_tickers_without_company_name": false,
      "hide_tickers_with_company_name": false,
      "filters": [
          "regular_market_price",
          ">",
          0
      ],
      "sort_by": [
          {
              "selector": "regular_market_price_change_percent",
              "desc": true
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
var url = "https://api.finimpulse.com/v1/market/index";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""search_text"": ""Dow Jones"",
    ""select_identifiers"": [
        ""short_name"",
        ""currency"",
        ""regular_market_price"",
        ""regular_market_price_change"",
        ""regular_market_price_change_percent"",
        ""regular_market_time""
    ],
    ""symbols"": [
        ""GSPC.INDX"",
        ""IXIC.INDX"",
        ""DJI.INDX"",
        ""DJT.INDX"",
        ""DJU.INDX""
    ],
    ""show_tickers_without_company_name"": false,
    ""hide_tickers_with_company_name"": false,
    ""filters"": [
        ""regular_market_price"",
        "">"",
        0
    ],
    ""sort_by"": [
        {
            ""selector"": ""regular_market_price_change_percent"",
            ""desc"": true
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/market/index",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "search_text" => "Dow Jones",
      "select_identifiers" => [
        "short_name",
        "currency",
        "regular_market_price",
        "regular_market_price_change",
        "regular_market_price_change_percent",
        "regular_market_time"
      ],
      "symbols" => [
        "GSPC.INDX",
        "IXIC.INDX",
        "DJI.INDX",
        "DJT.INDX",
        "DJU.INDX"
      ],
      "show_tickers_without_company_name" => false,
      "hide_tickers_with_company_name" => false,
      "filters" => [
        "regular_market_price",
        ">",
        0
      ],
      "sort_by" => [
        [
          "selector" => "regular_market_price_change_percent",
          "desc" => true
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

url = "https://api.finimpulse.com/v1/market/index"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "search_text": "Dow Jones",
    "select_identifiers": [
        "short_name",
        "currency",
        "regular_market_price",
        "regular_market_price_change",
        "regular_market_price_change_percent",
        "regular_market_time"
    ],
    "symbols": [
        "GSPC.INDX",
        "IXIC.INDX",
        "DJI.INDX",
        "DJT.INDX",
        "DJU.INDX"
    ],
    "show_tickers_without_company_name": False,
    "hide_tickers_with_company_name": False,
    "filters": [
        "regular_market_price",
        ">",
        0
    ],
    "sort_by": [
        {
            "selector": "regular_market_price_change_percent",
            "desc": True
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
    "search_text": "Dow Jones",
    "select_identifiers": [
        "short_name",
        "currency",
        "regular_market_price",
        "regular_market_price_change",
        "regular_market_price_change_percent",
        "regular_market_time"
    ],
    "symbols": [
        "GSPC.INDX",
        "IXIC.INDX",
        "DJI.INDX",
        "DJT.INDX",
        "DJU.INDX"
    ],
    "show_tickers_without_company_name": false,
    "hide_tickers_with_company_name": false,
    "filters": [
        "regular_market_price",
        ">",
        0
    ],
    "sort_by": [
        {
            "selector": "regular_market_price_change_percent",
            "desc": true
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

const req = https.request('https://api.finimpulse.com/v1/market/index', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination metadata and a list of matched indices.

Note that the returned fields depend on whether **select_identifiers** is provided and which fields are specified. The full field set is listed below.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching indices.
- **search_after_token**   
     `string` — Token for pagination. Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items_count**   
     `integer` — Number of indices returned.
- **items**   
     `array` — Array of indices. The same index may appear under different symbols (e.g., GSPC.INDX and SPX.INDX).


### Identification Fields


- **symbol**   
     `string` — Index identifier (symbol), e.g., GSPC.INDX, DJI.INDX. Some indices use other suffixes instead of .INDX, e.g., 000001.SS.
- **logo**   
     `string` — URL of the index logo image.
- **display_name**   
     `string` — Index display name.
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full formal name.
- **quote_type**   
     `string` — Asset class identifier (index).


### Market Info


- **exchange**   
     `string` — Exchange code.
- **currency**   
     `string` — Currency in which the index is calculated.


### Price Data


- **regular_market_price**   
     `number` — Closing price of the most recent regular trading session.
- **regular_market_price_usd**   
     `number` — Closing price of the most recent regular trading session, normalized to USD.
- **regular_market_price_change**   
     `number` — Absolute price change for the regular market session.
- **regular_market_price_change_usd**   
     `number` — Absolute price change for the regular market session, normalized to USD.
- **regular_market_price_change_percent**   
     `number` — Percentage price change for the regular market session.
- **regular_market_time**   
     `string` — Timestamp of the last regular market price (ISO 8601).
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.


### Other Market Data


- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.
- **one_year_return**   
     `number` — Total return over the past year.


### Metadata


- **update_time**   
     `string` — Timestamp of the most recent data update (ISO 8601).


### Example Response


```json
{
    "result": {
        "total_count": 3,
        "search_after_token": null,
        "items_count": 3,
        "items": [
            {
                "symbol": "DJU.INDX",
                "display_name": null,
                "short_name": "Dow Jones Utility Average",
                "long_name": "Dow Jones Utility Average",
                "quote_type": "index",
                "logo": "https://cdn.finimpulse.com/704a8f4d-c694-75f5-ffe0-9db6699bc888",
                "currency": "USD",
                "regular_market_volume": 89485019,
                "one_year_return": 0.625,
                "fifty_two_week_low": 998.69,
                "fifty_two_week_high": 1202.79,
                "dividend_yield": null,
                "sector": null,
                "industry": null,
                "amount": null,
                "amount_usd": null,
                "exchange": "DJI",
                "update_time": "2026-11-03T01:09:33Z",
                "current_price": 1118.52,
                "current_price_update_time": "2026-11-03T03:26:43Z",
                "regular_market_price": 1118.52,
                "regular_market_price_change": 7.0200195,
                "regular_market_price_change_usd": 7.0200195,
                "regular_market_price_change_percent": 0.6315807,
                "regular_market_time": "2026-11-02T21:50:57Z",
                "current_price_usd": 1118.52,
                "regular_market_price_usd": 1118.52,
                "pre_market_price_usd": null,
                "post_market_price_usd": null
            },
            {
                "symbol": "DJT.INDX",
                "display_name": null,
                "short_name": "Dow Jones Transportation Averag",
                "long_name": "Dow Jones Transportation Averag",
                "quote_type": "index",
                "logo": "https://cdn.finimpulse.com/29528ef5-41c7-5b8b-f84f-7b5e38d1f9f8",
                "currency": "USD",
                "regular_market_volume": 68344964,
                "one_year_return": 30.204,
                "fifty_two_week_low": 15519.22,
                "fifty_two_week_high": 24825.7,
                "dividend_yield": null,
                "sector": null,
                "industry": null,
                "amount": null,
                "amount_usd": null,
                "exchange": "DJI",
                "update_time": "2026-11-04T03:07:25Z",
                "current_price": 20599.68,
                "current_price_update_time": "2026-11-04T03:07:25Z",
                "regular_market_price": 20599.68,
                "regular_market_price_change": -43.240234,
                "regular_market_price_change_usd": -43.240234,
                "regular_market_price_change_percent": -0.20946762,
                "regular_market_time": "2026-11-03T21:34:57Z",
                "current_price_usd": 20599.68,
                "regular_market_price_usd": 20599.68,
                "pre_market_price_usd": null,
                "post_market_price_usd": null
            },
            {
                "symbol": "DJI.INDX",
                "display_name": null,
                "short_name": "Dow Jones Industrial Average",
                "long_name": "Dow Jones Industrial Average",
                "quote_type": "index",
                "logo": "https://cdn.finimpulse.com/c43bfd30-718e-1180-54bc-fe0376c27a8e",
                "currency": "USD",
                "regular_market_volume": 423189324,
                "one_year_return": 9.401,
                "fifty_two_week_low": 45057.28,
                "fifty_two_week_high": 54744.33,
                "dividend_yield": null,
                "sector": null,
                "industry": null,
                "amount": null,
                "amount_usd": null,
                "exchange": "DJI",
                "update_time": "2026-11-04T03:22:09Z",
                "current_price": 51786.72,
                "current_price_update_time": "2026-11-04T03:22:09Z",
                "regular_market_price": 51786.72,
                "regular_market_price_change": -197.26172,
                "regular_market_price_change_usd": -197.26172,
                "regular_market_price_change_percent": -0.37946635,
                "regular_market_time": "2026-11-03T21:34:56Z",
                "current_price_usd": 51786.72,
                "regular_market_price_usd": 51786.72,
                "pre_market_price_usd": null,
                "post_market_price_usd": null
            }
        ]
    }
}
```


## Units &amp; Formats

- **regular_market_price**, **regular_market_price_change**, **fifty_two_week_high**, and **fifty_two_week_low** are expressed in index points. For U.S. Treasury yield indices (IRX.INDX, FVX.INDX, TNX.INDX, TYX.INDX), these values are expressed in percent.
- Fields with the **_usd** suffix are normalized to USD using the same methodology as other FinImpulse market data.
- **regular_market_price_change_percent** and **one_year_return** are expressed as percentages (e.g., 4.35 represents 4.35%).

## Pagination &amp; Limits 

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- To keep the order consistent across pages, pass **sort_by**, for example, by **symbol**.

## Related APIs

- [Historical Price Data API](https://developers.finimpulse.com/v1/histories/)
- [Country Macroeconomic Indicators API ](https://developers.finimpulse.com/v1/macro-economics/)
- [Macroeconomic Release Calendar API](https://developers.finimpulse.com/v1/market/calendars/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
