---
title: Lightweight Search API for Stocks, ETFs, Mutual Funds &amp; Indices
created: 2026-06-18
updated: 2026-11-05
endpoint: POST v1/search-lite
auth: Bearer Token
---

# Lightweight Search API for Stocks, ETFs, Mutual Funds &amp; Indices

Returns a lightweight, cross-asset search result for stocks, ETFs, mutual funds, and indices. 

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint returns a focused set of core identification, current pricing, and key performance fields for stocks, ETFs (including sector ETFs, e.g., XLK, XLF), mutual funds, and indices. You can limit the returned fields using the **select_identifiers** parameter to reduce response size.

For a comprehensive field set that includes fundamentals, profitability, dividends, technical indicators, and more, use the [Search API](https://developers.finimpulse.com/v1/search/).

## Coverage

Asset TypesStocks, ETFs, mutual funds, indices Exchanges~108 ([download the full list](https://developers.finimpulse.com/wp-content/uploads/2026/11/exchanges.txt)) Market Regions~60 ([download the full list](https://developers.finimpulse.com/wp-content/uploads/2026/11/market_region_codes.txt)) Listings730,000+

Coverage figures are approximate and may change over time.

## Data Freshness

Price fields are delayed by up to one hour. Other fields are updated as their values change.

## Asset Type Compatibility

The endpoint supports stocks, ETFs, mutual funds, and indices. All asset types share a unified response structure.

The set of populated fields depends on the asset type: for example, **sector** and **industry** apply only to stocks; mutual funds do not return trading volume or pre-market and post-market prices. For indices, price, volume, 52-week range, and return fields are populated, while dividend, market cap, and classification fields return null.

## Data Availability &amp; Limitations

- Some fields may be **null** if a specific value is not available for a given asset. This does not indicate an error.
- By default, tickers without a company or fund name are excluded from results. To include them, set **show_tickers_without_company_name** to **true**.
- The same company or fund can appear multiple times if it trades on several exchanges or in several currencies.

## When to Use This Endpoint

- Power search bars and autocomplete across stocks, ETFs, mutual funds, and indices.
- Resolve company or fund names to ticker symbols before requesting detailed data from other endpoints.
- Populate watchlists and portfolio views with current prices, daily changes, and 52-week ranges.
- Build compact asset cards or tables with key identification and market data.
- Compare assets from different markets using USD-normalized prices and market cap.
- Reduce response size by requesting only the required fields through **select_identifiers**.

## Request Parameters

**POST** `v1/search-lite` 

- **search_text**   
     `string` *(optional)* — Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).
- **select_identifiers**   
     `array` *(optional)* — A list of field names to include in the response. 
    - When provided, each item in the response contains only the specified fields.
    - When not provided or set to *null*, the full field set is returned.
     
     `symbol` and `logo` are always returned regardless of the value passed. For the list of available field names, see the Response section below.
- **quote_types**   
     `array` *(optional)* — Controls which asset types are included in the search. **Available types:**
    - `stock`
    - `etf`
    - `mutualfund`
    - `index`
     
     All values are of type string. If none are provided, all supported asset types are returned. Note that sector ETFs are included when filtering by `etf`. The `sector` value is not supported in `quote_types` and returns an error.
- **symbols**   
     `array` *(optional)* — A list of ticker symbols to retrieve. When provided, the response returns only the specified tickers. **Important notes:**
    - If a symbol does not exist, it is excluded from the results.
    - Returns an empty result set if none of the specified symbols are found.
- **has_public_financial_reports**   
     `boolean` *(optional)* — Indicates whether the company provides public financial statements. 
    - `true` - the company has public financial reports available
    - `false` - the company does not have public financial reports
- **show_tickers_without_company_name**   
     `boolean` *(optional)* — Include tickers without a company/fund name. 
    - `true` - include tickers without the company/fund name
    - `false` - exclude tickers without a company/fund name
- **hide_tickers_with_company_name**   
     `boolean` *(optional)* — Exclude tickers with a company/fund name. 
    - `true` - exclude tickers with a company/fund name
    - `false` - include tickers with a company/fund name
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
    - `selector` - Field used for sorting (e.g., amount_usd).
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
curl --location "https://api.finimpulse.com/v1/search-lite" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "search_text": "NV",
      "select_identifiers": [
          "display_name",
          "quote_type",
          "exchange",
          "currency",
          "current_price",
          "amount_usd",
          "one_year_return"
      ],
      "quote_types": [
          "stock"
      ],
      "has_public_financial_reports": true,
      "show_tickers_without_company_name": true,
      "filters": [
          "amount_usd",
          ">",
          10000000000
      ],
      "sort_by": [
          {
              "selector": "amount_usd",
              "desc": true
          },
          {
              "selector": "symbol",
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
var url = "https://api.finimpulse.com/v1/search-lite";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""search_text"": ""NV"",
    ""select_identifiers"": [
        ""display_name"",
        ""quote_type"",
        ""exchange"",
        ""currency"",
        ""current_price"",
        ""amount_usd"",
        ""one_year_return""
    ],
    ""quote_types"": [
        ""stock""
    ],
    ""has_public_financial_reports"": true,
    ""show_tickers_without_company_name"": true,
    ""filters"": [
        ""amount_usd"",
        "">"",
        10000000000
    ],
    ""sort_by"": [
        {
            ""selector"": ""amount_usd"",
            ""desc"": true
        },
        {
            ""selector"": ""symbol"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/search-lite",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "search_text" => "NV",
      "select_identifiers" => [
        "display_name",
        "quote_type",
        "exchange",
        "currency",
        "current_price",
        "amount_usd",
        "one_year_return"
      ],
      "quote_types" => [
        "stock"
      ],
      "has_public_financial_reports" => true,
      "show_tickers_without_company_name" => true,
      "filters" => [
        "amount_usd",
        ">",
        10000000000
      ],
      "sort_by" => [
        [
          "selector" => "amount_usd",
          "desc" => true
        ],
        [
          "selector" => "symbol",
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

url = "https://api.finimpulse.com/v1/search-lite"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "search_text": "NV",
    "select_identifiers": [
        "display_name",
        "quote_type",
        "exchange",
        "currency",
        "current_price",
        "amount_usd",
        "one_year_return"
    ],
    "quote_types": [
        "stock"
    ],
    "has_public_financial_reports": True,
    "show_tickers_without_company_name": True,
    "filters": [
        "amount_usd",
        ">",
        10000000000
    ],
    "sort_by": [
        {
            "selector": "amount_usd",
            "desc": True
        },
        {
            "selector": "symbol",
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
    "search_text": "NV",
    "select_identifiers": [
        "display_name",
        "quote_type",
        "exchange",
        "currency",
        "current_price",
        "amount_usd",
        "one_year_return"
    ],
    "quote_types": [
        "stock"
    ],
    "has_public_financial_reports": true,
    "show_tickers_without_company_name": true,
    "filters": [
        "amount_usd",
        ">",
        10000000000
    ],
    "sort_by": [
        {
            "selector": "amount_usd",
            "desc": true
        },
        {
            "selector": "symbol",
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

const req = https.request('https://api.finimpulse.com/v1/search-lite', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response 

The response contains pagination metadata and a list of matched assets.

Note that the returned fields depend on whether **select_identifiers** is provided and which fields are specified. All available fields are listed below.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching assets.
- **search_after_token**   
     `string` — Token for pagination. Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items_count**   
     `integer` — Number of items returned.
- **items**   
     `array` — Array of assets. The same underlying company or fund can appear multiple times if it trades on numerous exchanges or currencies.


### Identification Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **logo**   
     `string` — URL of the company or fund logo image.
- **display_name**   
     `string` — Asset display name.
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full legal or formal name.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund, sector, index). **Note**: sector is returned for sector ETFs (XLK, XLF, XLV, XLY, XLP, XLC, XLI, XLE, XLB, XLRE, XLU). To filter them, use etf in `quote_types`.


### Asset Fundamentals


- **sector**   
     `string` — Sector classification.
- **industry**   
     `string` — Industry classification.


### Trading &amp; Exchange Info


- **currency**   
     `string` — Trading currency.
- **exchange**   
     `string` — Exchange code.


### Price Data


- **current_price**   
     `number` — Most recent traded price. May reflect a delay of up to one hour.
- **current_price_usd**   
     `number` — Most recent traded price, normalized to USD. May reflect a delay of up to one hour.
- **regular_market_price**   
     `number` — Active price during the regular trading session and at market close. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **regular_market_price_usd**   
     `number` — Active price during the regular trading session and at market close, normalized to USD. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **regular_market_price_change**   
     `number` — Absolute price change for the regular market session in local currency.
- **regular_market_price_change_usd**   
     `number` — Absolute price change for the regular market session, normalized to USD.
- **regular_market_price_change_percent**   
     `number` — Percentage price change for the regular market session.
- **pre_market_price_usd**   
     `number` — Active price during the pre-market session, normalized to USD. Outside pre-market hours, returns the last traded pre-market price. Returns *null* if no pre-market data is available.
- **post_market_price_usd**   
     `number` — Active price during the post-market session, normalized to USD. Outside post-market hours, returns the last traded post-market price. Returns *null* if no post-market data is available.
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.


### Other Market Data


- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.
- **amount**   
     `number` — Market cap in local currency.
- **amount_usd**   
     `number` — USD-normalized market cap.
- **dividend_yield**   
     `number` — Forward dividend yield.
- **one_year_return**   
     `number` — Total return over the past year.


### Example Response


```json
{
    "result": {
        "total_count": 179,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzZWFyY2hfdGV4dCI6Ik5WIiwiaXNfYXV0b2NvbXBsZXRlIjpmYWxzZSwicXVvdGVfdHlwZXMiOlszXSwiaGFzX3B1YmxpY19maW5hbmNpYWxfcmVwb3J0cyI6dHJ1ZSwic3ltYm9scyI6bnVsbCwic2VsZWN0X2lkZW50aWZpZXJzIjpbImRpc3BsYXlfbmFtZSIsInF1b3RlX3R5cGUiLCJleGNoYW5nZSIsImN1cnJlbmN5IiwiY3VycmVudF9wcmljZSIsImFtb3VudF91c2QiLCJvbmVfeWVhcl9yZXR1cm4iLCJzeW1ib2wiXSwicXVlcnkiOnsiZmllbGQiOiJhbW91bnRfdXNkIiwidHlwZSI6Imd0IiwidmFsdWUiOjEwMDAwMDAwMDAwfSwib3JkZXJfYnkiOnsib3JkZXJfZmllbGQiOiJhbW91bnRfdXNkIiwib3JkZXJfdHlwZSI6IkRlc2MiLCJuZXh0Ijp7Im9yZGVyX2ZpZWxkIjoic3ltYm9sIiwib3JkZXJfdHlwZSI6IkFzYyIsIm5leHQiOm51bGx9fSwibGltaXQiOjEwLCJvZmZzZXQiOm51bGwsInVpZCI6bnVsbH0sIlNlYXJjaEFmdGVyRGF0YSI6eyJWZXJzaW9uIjoxLCJTZWFyY2hBZnRlclZhbHVlcyI6eyJhbW91bnRfdXNkIjozMDI4NDA4MDc0MjQuMCwic3ltYm9sIjoiTlZTRUYiLCJyYW5rIjpudWxsfSwiVG9rZW5SZWFsT2Zmc2V0IjoxMCwiVG90YWxDb3VudCI6MTc5fX0=",
        "items_count": 10,
        "items": [
            {
                "symbol": "1NVDA.MI",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/0bf85aae-791f-a689-a2c1-ebbf84e7cc81",
                "exchange": "MIL",
                "currency": "EUR",
                "current_price": 208.7,
                "amount_usd": 5673171942536.962,
                "one_year_return": 28.875
            },
            {
                "symbol": "0R1I.IL",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/f9642c01-5bcd-8a22-fb57-d0f7c87c414e",
                "exchange": "IOB",
                "currency": "USD",
                "current_price": 203.27,
                "amount_usd": 5030485688320,
                "one_year_return": 0.158
            },
            {
                "symbol": "NVDA",
                "display_name": "NVIDIA",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/f77c41e6-f5cd-653b-1d73-b179528f1095",
                "exchange": "NMS",
                "currency": "USD",
                "current_price": 208.765,
                "amount_usd": 4941441662976,
                "one_year_return": 0.863
            },
            {
                "symbol": "0QB8.IL",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/29578d2a-162e-ce45-86e4-af4dd41455d3",
                "exchange": "IOB",
                "currency": "EUR",
                "current_price": 1391.4,
                "amount_usd": 624191106266.2152,
                "one_year_return": 49.028
            },
            {
                "symbol": "ASMLN.MX",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/a7f8efa8-c43f-f276-b905-c4499f923715",
                "exchange": "MEX",
                "currency": "MXN",
                "current_price": 30200,
                "amount_usd": 617417448237.2808,
                "one_year_return": 52.911
            },
            {
                "symbol": "ASMLA.XC",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/97e7c12d-a351-ce32-6d52-fcdb08fc08e8",
                "exchange": "CXE",
                "currency": "EUR",
                "current_price": 1411.4,
                "amount_usd": 616560513024.0197,
                "one_year_return": 51.292
            },
            {
                "symbol": "0M42.L",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/53462fbc-a88b-2768-dc33-6784dad45dc1",
                "exchange": "LSE",
                "currency": "USD",
                "current_price": 1600,
                "amount_usd": 612351541248,
                "one_year_return": 43.56
            },
            {
                "symbol": "ASML.VI",
                "display_name": null,
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/94f28daa-f77d-8709-c4dd-31b4c5d0593a",
                "exchange": "VIE",
                "currency": "EUR",
                "current_price": 1409,
                "amount_usd": 611361160396.7083,
                "one_year_return": 54.079
            },
            {
                "symbol": "NVS",
                "display_name": "Novartis",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/91c0046c-cd13-76ea-cfb3-a364804ae141",
                "exchange": "NYQ",
                "currency": "USD",
                "current_price": 160.34,
                "amount_usd": 303671771136,
                "one_year_return": 31.139
            },
            {
                "symbol": "NVSEF",
                "display_name": "Novartis",
                "quote_type": "stock",
                "logo": "https://cdn.finimpulse.com/71e28afd-a0b6-2c83-24ff-3408ca5ccc64",
                "exchange": "PNK",
                "currency": "USD",
                "current_price": 160.35,
                "amount_usd": 302840807424,
                "one_year_return": 25.46
            }
        ]
    }
}
```


## Units and Formats

- Prices and market cap are returned in the trading currency specified in **currency**. Fields with the **_usd** suffix are normalized to USD.
- **regular_market_price_change_percent**, **dividend_yield**, and **one_year_return** are expressed in percentage points (for example, 0.31 = 0.31%).

## Pagination &amp; Limits 

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- To keep the order consistent across pages, pass **sort_by**, for example, by **symbol**.

## Related APIs

- [Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Global Market Index Search API ](https://developers.finimpulse.com/v1/market/index/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary-lite/)
- [Company, ETF &amp; Mutual Fund Profile API](https://developers.finimpulse.com/v1/profile/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)

## Build with this API

- [Build Stock Screening Platforms Using Ticker Search API](https://finimpulse.com/rest-api-use-cases/ticker-search-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
