---
title: Financial News API for Stocks, ETFs, Mutual Funds &amp; Indices
created: 2026-02-09
updated: 2026-11-06
endpoint: POST v1/news
auth: Bearer Token
---

# Financial News API for Stocks, ETFs, Mutual Funds &amp; Indices

Returns news articles and press releases for one asset symbol. 

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint retrieves news articles and press releases related to a single stock, ETF, mutual fund, or index, with headlines, short descriptions, publication dates, and links to the original sources.

## Coverage

Asset TypesStocks, ETFs, mutual funds, indicesMarket Regions~58Listings115,000+News Items 15 million+ Historical Depth2025 to present

Coverage figures are approximate and may change over time.

## Data Freshness

News is added as it is published and may appear with a delay of up to 3 days.

## Data Availability &amp; Limitations

- Some fields may be **null** if a specific value is not available for a given news item. This does not indicate an error.
- If no news matches the request, the API returns status code 40400 (Not Found). This is expected behavior and does not indicate an error.

## When to Use This Endpoint

- Add news feeds to stock, ETF, fund, and index pages in financial data and research apps.
- Build portfolio news digests that combine headlines for every holding.
- Display official company announcements separately from media coverage using press releases.
- Link news to price movements in event-driven analysis and backtesting tools.
- Provide AI assistants and research copilots with recent headlines for a specific asset.

## Request Parameters

**POST** `v1/news` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol). Not required when `search_after_token` is provided.
- **types**   
     `array` *(optional)* — News types to include. **Supported values:**
    - `news`
    - `press_release`
     
     If no values are provided, all supported types are returned.
- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD). If omitted, news from the earliest available date is returned.
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD). If omitted, news up to the most recent available date is returned.
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
    - `selector` - Field used for sorting (e.g., pub_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
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
curl --location "https://api.finimpulse.com/v1/news" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "types": [
          "news",
          "press_release"
      ],
      "start_date": "2026-09-01",
      "end_date": "2026-09-30",
      "filters": [
          "title",
          "contains",
          "Buyback"
      ],
      "sort_by": [
          {
              "selector": "pub_date",
              "desc": true
          }
      ],
      "limit": 2,
      "offset": 0,
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/news";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""types"": [
        ""news"",
        ""press_release""
    ],
    ""start_date"": ""2026-09-01"",
    ""end_date"": ""2026-09-30"",
    ""filters"": [
        ""title"",
        ""contains"",
        ""Buyback""
    ],
    ""sort_by"": [
        {
            ""selector"": ""pub_date"",
            ""desc"": true
        }
    ],
    ""limit"": 2,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/news",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "types" => [
        "news",
        "press_release"
      ],
      "start_date" => "2026-09-01",
      "end_date" => "2026-09-30",
      "filters" => [
        "title",
        "contains",
        "Buyback"
      ],
      "sort_by" => [
        [
          "selector" => "pub_date",
          "desc" => true
        ]
      ],
      "limit" => 2,
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

url = "https://api.finimpulse.com/v1/news"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "types": [
        "news",
        "press_release"
    ],
    "start_date": "2026-09-01",
    "end_date": "2026-09-30",
    "filters": [
        "title",
        "contains",
        "Buyback"
    ],
    "sort_by": [
        {
            "selector": "pub_date",
            "desc": True
        }
    ],
    "limit": 2,
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
    "types": [
        "news",
        "press_release"
    ],
    "start_date": "2026-09-01",
    "end_date": "2026-09-30",
    "filters": [
        "title",
        "contains",
        "Buyback"
    ],
    "sort_by": [
        {
            "selector": "pub_date",
            "desc": true
        }
    ],
    "limit": 2,
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

const req = https.request('https://api.finimpulse.com/v1/news', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of news items.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching items.
- **items_count**   
     `integer` — Number of items returned.
- **search_after_token**   
     `string` — Token for pagination. Pass it as the `search_after_token` request parameter, together with `limit`, to fetch the next page. Returns *null* if there are no more pages.
- **items**   
     `array` — Array of news items.


### News Item Fields


- **id**   
     `string` — Unique identifier for the news item.
- **type**   
     `string` — News type (news, press_release).
- **title**   
     `string` — Headline of the news.
- **description**   
     `string` — Brief description of the news content. May contain HTML markup and may be truncated.
- **pub_date**   
     `string` — Publication date and time in UTC (YYYY-MM-DD HH:MM:SS).
- **display_time**   
     `string` — Display date and time in UTC (YYYY-MM-DD HH:MM:SS).
- **canonical_url**   
     `string` — Direct link to the source.
- **content_type**   
     `string` — Content type (e.g., STORY, VIDEO).
- **related_tickers**   
     `array` — Array of related ticker symbols (up to 20). The requested symbol is listed first, and the other symbols may differ between identical requests.
- **provider_display_name**   
     `string` — Display-friendly name of the news provider.
- **provider_url**   
     `string` — Link to the news provider website.
- **is_hosted**   
     `boolean` — Indicates whether the content is hosted by the provider.
- **is_premium_news**   
     `boolean` — Indicates if the news is premium.


### Example Response


```json
{
    "result": {
        "total_count": 3,
        "items_count": 2,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzeW1ib2wiOiJOVkRBIiwidHlwZXMiOlsibmV3cyIsInByZXNzX3JlbGVhc2UiXSwic3RhcnRfZGF0ZSI6IjIwMjYtMDktMDFUMDA6MDA6MDAiLCJlbmRfZGF0ZSI6IjIwMjYtMDktMzBUMDA6MDA6MDAiLCJxdWVyeSI6eyJmaWVsZCI6InRpdGxlIiwidHlwZSI6Imxpa2UiLCJ2YWx1ZSI6IiVCdXliYWNrJSJ9LCJvcmRlcl9ieSI6eyJvcmRlcl9maWVsZCI6InB1Yl9kYXRlIiwib3JkZXJfdHlwZSI6IkRlc2MiLCJuZXh0IjpudWxsfSwibGltaXQiOjIsIm9mZnNldCI6MCwidWlkIjpudWxsfSwiU2VhcmNoQWZ0ZXJEYXRhIjp7IlZlcnNpb24iOjEsIlNlYXJjaEFmdGVyVmFsdWVzIjp7InB1Yl9kYXRlIjoiMjAyNi0wOS0xNlQwMjowNzowMSswMDowMCJ9LCJUb2tlblJlYWxPZmZzZXQiOjIsIlRvdGFsQ291bnQiOjN9fQ==",
        "items": [
            {
                "id": "b27bf070-bf49-3ee6-b8d7-c3481625ef72",
                "type": "news",
                "title": "Sandisk Unveiled an $14 Billion Buyback and Warren Buffett Has Something to Say About It",
                "description": "Sandisk announced a $14 billion share buyback during its fiscal fourth-quarter earnings.",
                "pub_date": "2026-09-18 04:20:00",
                "display_time": "2026-09-18 04:20:00",
                "canonical_url": "https://www.fool.com/investing/2026/09/18/sandisk-unveiled-an-14-billion-buyback-and-warren/",
                "content_type": "STORY",
                "related_tickers": [
                    "NVDA",
                    "WDC",
                    "WDC.HA",
                    "SNDK80.BK",
                    "NVD.DU",
                    "BW90.F",
                    "BW9.DU",
                    "BW9.F",
                    "NVDA80.BK",
                    "1WDCM.XD",
                    "SNDK.BA",
                    "NVDG.F",
                    "NVD.HA",
                    "SNDK.VI",
                    "0QZF.L",
                    "SNDK.NE",
                    "NVDA03.BK",
                    "NVDA.SN",
                    "NVDD.XC",
                    "BW9.HM"
                ],
                "provider_display_name": "Motley Fool",
                "provider_url": "http://www.fool.com/",
                "is_hosted": true,
                "is_premium_news": false
            },
            {
                "id": "dfec23a0-3c8a-3955-867a-d784a1686c99",
                "type": "news",
                "title": "Nvidia Spent $26 Billion on Buybacks and Dividends in a Single Quarter. Its Board Is Betting Today's Profits Last 3 More Years.",
                "description": "Buybacks and dividends this big only pay off if today's profits hold. The board is betting they will.",
                "pub_date": "2026-09-16 02:07:01",
                "display_time": "2026-09-16 02:07:01",
                "canonical_url": "https://www.fool.com/investing/2026/09/15/nvidia-spent-usd26-billion-on-buybacks-and-dividends-in-a-single-quarter-its-board-is-betting-today-s-profits-last-3-more-years/",
                "content_type": "STORY",
                "related_tickers": [
                    "NVDA",
                    "NVD.DU",
                    "1NVDAM.XD",
                    "NVDA80.BK",
                    "NVDG.F",
                    "NVDG.HM",
                    "NVDA.MX",
                    "NVDA.SN",
                    "NVDD.XC",
                    "NVDC34.SA",
                    "NVDG.MU",
                    "ZNVD.NE",
                    "NVD.DE",
                    "NVDACO.CL",
                    "NVDAC.BA",
                    "NVDA.BA",
                    "NVDA.TO",
                    "NVDA.SW",
                    "NVDA-USD.SW",
                    "NVDA06.BK"
                ],
                "provider_display_name": "Motley Fool",
                "provider_url": "http://www.fool.com/",
                "is_hosted": true,
                "is_premium_news": false
            }
        ]
    }
}
```


## Pagination &amp; Limits 

You can control how many news items a response returns and page through large result sets using the **limit** and **offset** parameters or the **search_after_token** value.

- Use **limit** to set the number of news items per request, from 1 to 1000. If **limit** is not specified, up to 100 news items are returned.
- Use **offset** to skip news items (0-based). For example, **limit**: 100 and **offset**: 100 return news items 101–200.
- To retrieve all matching news items, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- Alternatively, pass the **search_after_token** value from the previous response in the next request to fetch the following page. Pass **limit** with each request, because the token does not store the page size. Other request parameters do not need to be repeated.
- To keep the order consistent across pages, pass **sort_by**, for example, by **pub_date**.

## Related APIs

- [Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Company, ETF &amp; Mutual Fund Profile API](https://developers.finimpulse.com/v1/profile/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)
- [SEC Filing Events API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/sec-filings/events/)
- [Corporate Earnings &amp; IPO Calendar API](https://developers.finimpulse.com/v1/events/tickers/)
- [Analyst Upgrades, Downgrades &amp; Price Target Changes API](https://developers.finimpulse.com/v1/analysis/upgrades-downgrades/)

## Build with this API

- [Build Financial News Feeds Using Market News API](https://finimpulse.com/rest-api-use-cases/market-news-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
