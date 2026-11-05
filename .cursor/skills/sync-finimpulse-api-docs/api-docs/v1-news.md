---
title: Financial News API for Stocks, ETFs &amp; Mutual Funds
created: 2026-02-09
updated: 2026-11-03
endpoint: POST v1/news
auth: Bearer Token
---

# Financial News API for Stocks, ETFs &amp; Mutual Funds

Returns the latest news and press releases for financial assets.

This endpoint aggregates news and press releases for stocks, ETFs, and mutual funds. Each item includes:

- Headline
- Brief description
- Publication date
- List of related tickers
- Provider information

**/news** works consistently across all asset types.

## When to Use This Endpoint

- Power News sections for individual assets or aggregated portfolios.
- Track news that impacts multiple related tickers, such as sector-level or market-wide events.
- Support historical views, real-time dashboards, and alerting systems.
- Enable event-driven analysis by linking news data with price, volume, or performance metrics.

## Request Parameters

**POST** `v1/news` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **types**   
     `array` *(optional)* — News types to include. **Supported values:**
    - `news`
    - `press_release`
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported types are returned.
- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD).
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **filters**   
     `array` *(optional)* — Optional filter expressions. Each filter condition is defined as: `[field, operator, value]`. Conditions can be combined using logical operators `and`/`or`. **Supported operators:**
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
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., pub_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`.
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
          "news"
      ],
      "start_date": "2025-02-03",
      "end_date": "2026-02-03",
      "limit": 3,
      "offset": 0,
      "filters": [
          [
              "title",
              "<>",
              null
          ],
          "and",
          [
              "content_type",
              "<>",
              null
          ]
      ],
      "sort_by": [
          {
              "selector": "pub_date",
              "desc": true
          }
      ],
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
        ""news""
    ],
    ""start_date"": ""2025-02-03"",
    ""end_date"": ""2026-02-03"",
    ""limit"": 3,
    ""offset"": 0,
    ""filters"": [
        [
            ""title"",
            ""<>"",
            null
        ],
        ""and"",
        [
            ""content_type"",
            ""<>"",
            null
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""pub_date"",
            ""desc"": true
        }
    ],
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
        "news"
      ],
      "start_date" => "2025-02-03",
      "end_date" => "2026-02-03",
      "limit" => 3,
      "offset" => 0,
      "filters" => [
        [
          "title",
          "<>",
          null
        ],
        "and",
        [
          "content_type",
          "<>",
          null
        ]
      ],
      "sort_by" => [
        [
          "selector" => "pub_date",
          "desc" => true
        ]
      ],
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
        "news"
    ],
    "start_date": "2025-02-03",
    "end_date": "2026-02-03",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "title",
            "<>",
            None
        ],
        "and",
        [
            "content_type",
            "<>",
            None
        ]
    ],
    "sort_by": [
        {
            "selector": "pub_date",
            "desc": True
        }
    ],
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
        "news"
    ],
    "start_date": "2025-02-03",
    "end_date": "2026-02-03",
    "limit": 3,
    "offset": 0,
    "filters": [
        [
            "title",
            "<>",
            null
        ],
        "and",
        [
            "content_type",
            "<>",
            null
        ]
    ],
    "sort_by": [
        {
            "selector": "pub_date",
            "desc": true
        }
    ],
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

### Meta Fields


- **total_count**   
     `integer` — Total number of matching items.
- **items_count**   
     `integer` — Number of items returned.
- **search_after_token**   
     `string` — Token for pagination. Pass it in the next request to fetch the next page. **Format:** `"search_after_token": "token_here"`
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
     `string` — Brief description of the news content.
- **pub_date**   
     `string` — Original publication date/time.
- **display_time**   
     `string` — Display-friendly publication date/time.
- **canonical_url**   
     `string` — Direct link to the source.
- **content_type**   
     `string` — Content type categorization (e.g., STORY).
- **related_tickers**   
     `array` — Array of related ticker symbols.
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
        "total_count": 1157,
        "items_count": 3,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzeW1ib2wiOiJOVkRBIiwidHlwZXMiOlsibmV3cyJdLCJzdGFydF9kYXRlIjoiMjAyNS0wMi0wM1QwMDowMDowMCIsImVuZF9kYXRlIjoiMjAyNi0wMi0wM1QwMDowMDowMCIsInF1ZXJ5Ijp7InR5cGUiOiJhbmQiLCJsZWZ0Ijp7InR5cGUiOiJub3QiLCJzdWJxdWVyeSI6eyJmaWVsZCI6InRpdGxlIiwidHlwZSI6ImVxIiwidmFsdWUiOm51bGx9fSwicmlnaHQiOnsidHlwZSI6Im5vdCIsInN1YnF1ZXJ5Ijp7ImZpZWxkIjoiY29udGVudF90eXBlIiwidHlwZSI6ImVxIiwidmFsdWUiOm51bGx9fX0sIm9yZGVyX2J5Ijp7Im9yZGVyX2ZpZWxkIjoicHViX2RhdGUiLCJvcmRlcl90eXBlIjoiRGVzYyIsIm5leHQiOm51bGx9LCJsaW1pdCI6Mywib2Zmc2V0IjowLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsicHViX2RhdGUiOiIyMDI2LTAyLTAyVDIzOjAxOjExKzAwOjAwIn0sIlRva2VuUmVhbE9mZnNldCI6MywiVG90YWxDb3VudCI6MTE1N319",
        "items": [
            {
                "id": "25c9a5aa-205e-36c3-8f91-99cc1d7e7676",
                "type": "news",
                "title": "Oracle said it was ‘highly confident in OpenAI’s ability to raise funds and meet its commitments.’ Cue the stock fall",
                "description": "Oracle’s plan to raise $50 billion had shares rising. Then a tweet about its confidence in OpenAI triggered a selloff that spoke volumes.",
                "pub_date": "2026-02-02 23:39:13",
                "display_time": "2026-02-02 23:39:13",
                "canonical_url": "https://finance.yahoo.com/news/oracle-said-highly-confident-openai-233913053.html",
                "content_type": "STORY",
                "related_tickers": [
                    "ORCLC.BA",
                    "ORC.DU",
                    "NVDAC.BA",
                    "ORCL.MX",
                    "NVDA80.BK",
                    "NVD.DU",
                    "NVDG.F",
                    "NVDA-USD.SW",
                    "NVDG.HM",
                    "ORC.F",
                    "NVDA.BA",
                    "NVDA.MX",
                    "NVD.MU",
                    "ORCLCL.SN",
                    "ORCL06.BK",
                    "NVDAD.BA",
                    "ORC1.F",
                    "ORC.MU",
                    "ORC.DE",
                    "NVDD.XC",
                    "NVDA03.BK",
                    "ORC.HA",
                    "NVDA.WA",
                    "ORCL",
                    "NVDC34.SA",
                    "0R1I.IL",
                    "NVD.HA",
                    "NVDA.VI",
                    "ORCD.XC",
                    "ZNVD.NE",
                    "ORCL.BA",
                    "NVDA19.BK",
                    "NVD.F",
                    "0R1Z.L",
                    "NVDA06.BK",
                    "NVD.DE",
                    "NVDA01.BK",
                    "NVDA.SW",
                    "NVDA.SN",
                    "1NVDA.MI",
                    "ORCL34.SA",
                    "NVD0.F",
                    "NVD.SG",
                    "ORAC.TO",
                    "ORCL19.BK",
                    "NVDA",
                    "NVD.HM",
                    "ORC.HM",
                    "ORCL.VI",
                    "ORCD.XD",
                    "NVDACL.SN",
                    "NVDD.XD",
                    "NVDG.SG",
                    "ORCLD.BA",
                    "NVDG.DU"
                ],
                "provider_display_name": "Fortune",
                "provider_url": "http://fortune.com/",
                "is_hosted": true,
                "is_premium_news": false
            },
            {
                "id": "008b6e97-a6c5-355b-8769-d79419e464ee",
                "type": "news",
                "title": "Stock Market Today, Feb. 2: Stocks Recover and Micron Technology Soars Again",
                "description": "Today, Feb. 2, 2026, volatility continues in commodities while manufacturing data boosts markets.",
                "pub_date": "2026-02-02 23:12:08",
                "display_time": "2026-02-02 23:12:08",
                "canonical_url": "https://www.fool.com/coverage/stock-market-today/2026/02/02/stock-market-today-feb-2-stocks-recover-and-micron-technology-soars-again/",
                "content_type": "STORY",
                "related_tickers": [
                    "WDP0.MU",
                    "ZDIS.NE",
                    "1T.MI",
                    "NVDAC.BA",
                    "SOBA.SG",
                    "NVDA80.BK",
                    "CYTH.DU",
                    "ZMIC.NE",
                    "NVD.DU",
                    "MUC.BA",
                    "WDP.DU",
                    "NVDG.F",
                    "US5502411037.SG",
                    "SOBA.DE",
                    "NVDA-USD.SW",
                    "DIS.TO",
                    "0QZO.L",
                    "DISCL.SN",
                    "0QZ1.L",
                    "MU",
                    "WDPD.XD",
                    "NVDG.HM",
                    "MU.MX",
                    "NVDA.BA",
                    "CYTH.HM",
                    "CYTH.F",
                    "LUMN",
                    "1CYTH.MI",
                    "DIS",
                    "NVDA.MX",
                    "ATTB34.SA",
                    "MTE0.F",
                    "DIS.MX",
                    "DIS.VI",
                    "NVD.MU",
                    "NVDAD.BA",
                    "TC.BA",
                    "WDP0.DU",
                    "1MU.MI",
                    "SOBA.F",
                    "DISNEY19.BK",
                    "MTE.HA",
                    "NVDA.WA",
                    "NVDD.XC",
                    "WDP.HM",
                    "NVDA03.BK",
                    "MTE.DU",
                    "DISND.BA",
                    "MTE.HM",
                    "MTE.DE",
                    "NVD.HA",
                    "MU.BA",
                    "NVDC34.SA",
                    "MU.SW",
                    "WDP0.F",
                    "0R1I.IL",
                    "WDPD.XC",
                    "WDP.HA",
                    "1DIS.MI",
                    "WDP3.F",
                    "MTE.MU",
                    "T-PA",
                    "NVDA.VI",
                    "ZNVD.NE",
                    "NVDA19.BK",
                    "NVD.DE",
                    "NVD.F",
                    "DISNC.BA",
                    "MUTC34.SA",
                    "NVDA06.BK",
                    "MU.TO",
                    "WDP.F",
                    "NVDA01.BK",
                    "T.BA",
                    "MUD.BA",
                    "NVDA.SW",
                    "ATT.VI",
                    "LUMN.MX",
                    "CYTH.MU",
                    "NVDA.SN",
                    "1NVDA.MI",
                    "SOBA.HA",
                    "SOBA.DU",
                    "0R2T.IL",
                    "WDP.MU",
                    "MU.VI",
                    "TD.BA",
                    "MTED.XD",
                    "L1MN34.SA",
                    "MTE1.F",
                    "NVD0.F",
                    "NVD.SG",
                    "MTED.XC",
                    "WDP.SG",
                    "WDP.DE",
                    "NVDA",
                    "T-PC",
                    "NVD.HM",
                    "MTE.F",
                    "SOBA.HM",
                    "NVDACL.SN",
                    "DISB34.SA",
                    "NVDD.XD",
                    "NVDG.SG",
                    "MTE.SG",
                    "SOBAD.XD",
                    "DISN.BA",
                    "NVDG.DU"
                ],
                "provider_display_name": "Motley Fool",
                "provider_url": "http://www.fool.com/",
                "is_hosted": true,
                "is_premium_news": false
            },
            {
                "id": "f423d0be-a5c1-379a-afc7-582e1799ffaf",
                "type": "news",
                "title": "Ford, Xiaomi Deny JV Talks Even As Jim Farley Expressed Admiration For Chinese EVs While Flagging Them As Competitive Threat",
                "description": "Ford Motor Co. (NYSE:F) and Chinese tech giant Xiaomi (OTC:XIACF) have both denied reports of a potential collaboration to produce electric vehicles in the United States. Ford Reportedly Held Preliminary Talks With Xiaomi The Financial Times reported that Ford had preliminary discussions with Xiaomi about a joint venture, aiming to facilitate Chinese carmakers’ entry into the U.S. market. However, both companies have refuted these claims. A Ford spokesperson stated, "This story is completely fal",
                "pub_date": "2026-02-02 23:01:11",
                "display_time": "2026-02-02 23:01:11",
                "canonical_url": "https://finance.yahoo.com/news/ford-xiaomi-deny-jv-talks-230111582.html",
                "content_type": "STORY",
                "related_tickers": [
                    "FMC1.HA",
                    "TSLA",
                    "3CP.HM",
                    "NVDAC.BA",
                    "XIAOMI01.BK",
                    "NVDA80.BK",
                    "TSLA01.BK",
                    "NVD.DU",
                    "FMC1.SG",
                    "HXXD.SI",
                    "TSLA.VI",
                    "NVDG.F",
                    "TL00.F",
                    "NVDA-USD.SW",
                    "TSLAD.BA",
                    "TL01.DU",
                    "NVDG.HM",
                    "NVDA.BA",
                    "FMC1.F",
                    "3CP.MU",
                    "F.BA",
                    "1TSLA.MI",
                    "TSLACO.CL",
                    "F",
                    "FMC1.DE",
                    "TL0.SG",
                    "NVDA.MX",
                    "3CP2.F",
                    "XIAOMI23.BK",
                    "F.MX",
                    "NVD.MU",
                    "TSLA34.SA",
                    "NVDAD.BA",
                    "3CPA.SG",
                    "FDMO34.SA",
                    "FMC1.HM",
                    "FMC1D.XD",
                    "TL0.HA",
                    "81810.HK",
                    "TSLAC.BA",
                    "3CPA.HM",
                    "F.TO",
                    "NVDD.XC",
                    "TL0.F",
                    "NVDA03.BK",
                    "0P4F.L",
                    "NVDA.WA",
                    "1F.MI",
                    "TSLA.BA",
                    "3CP.HA",
                    "TL0.MU",
                    "XIAOMI13.BK",
                    "NVD.HA",
                    "FORD.VI",
                    "NVDC34.SA",
                    "0R1I.IL",
                    "3CPA.F",
                    "FMC1.DU",
                    "3CP.F",
                    "TL0.DE",
                    "TL01.F",
                    "NVDA.VI",
                    "3CPA.DU",
                    "ZNVD.NE",
                    "NVDA19.BK",
                    "NVD.DE",
                    "NVD.F",
                    "TSLA03.BK",
                    "FMC1.MU",
                    "NVDA06.BK",
                    "3CPA.MU",
                    "NVDA01.BK",
                    "TSLA.MX",
                    "NVDA.SW",
                    "1810.HK",
                    "TL0D.XC",
                    "NVDA.SN",
                    "1NVDA.MI",
                    "FD.BA",
                    "TSLA.WA",
                    "TL0.DU",
                    "TL0.HM",
                    "NVD0.F",
                    "NVD.SG",
                    "TL01.MU",
                    "XIAOMI19.BK",
                    "NVDA",
                    "NVD.HM",
                    "3CP.SG",
                    "3CP.DU",
                    "TL0D.XD",
                    "NVDACL.SN",
                    "TSLA80.BK",
                    "XIACY",
                    "1810N.MX",
                    "NVDD.XD",
                    "NVDG.SG",
                    "XIACF",
                    "0R0X.L",
                    "TSLACL.SN",
                    "FMC.F",
                    "NVDG.DU",
                    "XIAOMI80.BK",
                    "ZTSL.NE"
                ],
                "provider_display_name": "Benzinga",
                "provider_url": "http://www.benzinga.com/",
                "is_hosted": true,
                "is_premium_news": false
            }
        ]
    }
}
```
