---
title: News
created: 2026-02-09
updated: 2026-03-09
endpoint: POST v1/news
auth: Bearer Token
---

# News

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
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported types are returned. **Example:** `"types": ["news"]`
- **start_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **limit**   
     `integer` *(optional)* — Maximum number of items to return (user-defined).
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
     
     **Example:** `"filters": [ [ "title", "<>", null ], "and", [ "content_type", "<>", null ] ]`
- **sort_by**   
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., pub_date).
    - `desc` - Sorting direction (true for descending, false for ascending).
     
     Sortings can be combined using `,`. **Example:** `"sort_by": [ { "selector": "pub_date", "desc": true } ]`
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/news" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "start_date": "2025-02-03",
      "end_date": "2026-02-03",
      "limit": 3,
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
    ""start_date"": ""2025-02-03"",
    ""end_date"": ""2026-02-03"",
    ""limit"": 3,
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
      "start_date" => "2025-02-03",
      "end_date" => "2026-02-03",
      "limit" => 3,
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
    "start_date": "2025-02-03",
    "end_date": "2026-02-03",
    "limit": 3,
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
    "start_date": "2025-02-03",
    "end_date": "2026-02-03",
    "limit": 3,
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

### Meta Fields


- **total_count**   
     `integer` — Total number of items matching filters.
- **items_count**   
     `integer` — Number of items returned.
- **search_after_token**   
     `string` — Token for pagination. Pass it in the next request to fetch the next page. **Format:** `"search_after_token": "token_here"`
- **items**   
     `array` — An array of news items.


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
     `string` — Internal content type categorization (e.g., STORY).
- **related_tickers**   
     `array` — List of related ticker symbols.
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
    "task_id": "541d39a3-0c81-4cb0-80bf-9c68bc11d495",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0,
    "data": {
        "symbol": "NVDA",
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
        "tag": "just tag",
        "start_date": "2025-02-03",
        "end_date": "2026-02-03",
        "sort_by": [
            {
                "selector": "pub_date",
                "desc": true
            }
        ],
        "types": [
            "news"
        ]
    },
    "result": {
        "total_count": 1159,
        "items_count": 3,
        "search_after_token": "eyJSZXF1ZXN0RGF0YSI6eyJzeW1ib2wiOiJOVkRBIiwidHlwZXMiOlsibmV3cyJdLCJzdGFydF9kYXRlIjoiMjAyNS0wMi0wM1QwMDowMDowMCIsImVuZF9kYXRlIjoiMjAyNi0wMi0wM1QwMDowMDowMCIsInF1ZXJ5Ijp7InR5cGUiOiJhbmQiLCJsZWZ0Ijp7InR5cGUiOiJub3QiLCJzdWJxdWVyeSI6eyJmaWVsZCI6InRpdGxlIiwidHlwZSI6ImVxIiwidmFsdWUiOm51bGx9fSwicmlnaHQiOnsidHlwZSI6Im5vdCIsInN1YnF1ZXJ5Ijp7ImZpZWxkIjoiY29udGVudF90eXBlIiwidHlwZSI6ImVxIiwidmFsdWUiOm51bGx9fX0sIm9yZGVyX2J5Ijp7Im9yZGVyX2ZpZWxkIjoicHViX2RhdGUiLCJvcmRlcl90eXBlIjoiRGVzYyIsIm5leHQiOm51bGx9LCJsaW1pdCI6Mywib2Zmc2V0IjowLCJ1aWQiOm51bGx9LCJTZWFyY2hBZnRlckRhdGEiOnsiVmVyc2lvbiI6MSwiU2VhcmNoQWZ0ZXJWYWx1ZXMiOnsicHViX2RhdGUiOiIyMDI2LTAyLTAyVDIzOjAxOjExKzAwOjAwIn0sIlRva2VuUmVhbE9mZnNldCI6MywiVG90YWxDb3VudCI6MTE1OX19",
        "items": [
            {
                "id": "25c9a5aa-205e-36c3-8f91-99cc1d7e7676",
                "type": "news",
                "title": "Oracle said it was ‘highly confident in OpenAI’s ability to raise funds and meet its commitments.’ Cue the stock fall",
                "description": "Oracle’s plan to raise $50 billion had shares rising. Then a tweet about its confidence in OpenAI triggered a selloff that spoke volumes.",
                "pub_date": "2026-02-02T23:39:13Z",
                "display_time": "2026-02-02T23:39:13Z",
                "canonical_url": "https://finance.yahoo.com/news/oracle-said-highly-confident-openai-233913053.html",
                "content_type": "STORY",
                "related_tickers": [
                    "0R1Z.L",
                    "NVDA01.BK",
                    "ORCD.XC",
                    "ORC.DE",
                    "NVD.HA",
                    "NVDA.SN",
                    "NVDG.F",
                    "NVD.DE",
                    "NVD.DU",
                    "NVDA03.BK",
                    "NVDD.XD",
                    "NVDC34.SA",
                    "NVD.HM",
                    "ORCLD.BA",
                    "NVDA06.BK",
                    "ORC.F",
                    "NVD.MU",
                    "NVDG.SG",
                    "NVDA.MX",
                    "NVDA.CL",
                    "ORCD.XD",
                    "NVD0.F",
                    "NVD.SG",
                    "NVDA80.BK",
                    "NVDAD.BA",
                    "ORC.HA",
                    "ORCLC.BA",
                    "ORCLCL.SN",
                    "ORC1.F",
                    "ORCL06.BK",
                    "ZNVD.NE",
                    "ORC.DU",
                    "NVDAC.BA",
                    "NVDA-USD.SW",
                    "NVDD.XC",
                    "ORCL34.SA",
                    "NVDA.VI",
                    "ORCL",
                    "ORAC.TO",
                    "ORCL.BA",
                    "0R1I.IL",
                    "NVDA",
                    "NVDG.DU",
                    "NVDA.SW",
                    "NVD.F",
                    "ORC.MU",
                    "ORCL19.BK",
                    "NVDACL.SN",
                    "ORC.HM",
                    "ORCL.VI",
                    "NVDG.HM",
                    "NVDA.BA",
                    "ORCL.MX",
                    "NVDA19.BK",
                    "1NVDA.MI",
                    "NVDA.WA"
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
                "pub_date": "2026-02-02T23:12:08Z",
                "display_time": "2026-02-02T23:12:08Z",
                "canonical_url": "https://www.fool.com/coverage/stock-market-today/2026/02/02/stock-market-today-feb-2-stocks-recover-and-micron-technology-soars-again/",
                "content_type": "STORY",
                "related_tickers": [
                    "DISCL.SN",
                    "MUC.BA",
                    "WDP.HA",
                    "NVDA01.BK",
                    "WDP.HM",
                    "SOBA.SG",
                    "L1MN34.SA",
                    "MTED.XD",
                    "MU.TO",
                    "ZMIC.NE",
                    "MTE1.F",
                    "ATT.VI",
                    "NVD.HA",
                    "NVDA.SN",
                    "DISNC.BA",
                    "SOBA.DU",
                    "WDP.MU",
                    "T-PA",
                    "CYTH.MU",
                    "US5502411037.SG",
                    "MTE.MU",
                    "0R2T.IL",
                    "NVDG.F",
                    "NVD.DE",
                    "MUD.BA",
                    "TD.BA",
                    "WDPD.XC",
                    "SOBAD.XD",
                    "T.BA",
                    "NVD.DU",
                    "CYTH.F",
                    "LUMN",
                    "NVDA03.BK",
                    "NVDD.XD",
                    "NVDC34.SA",
                    "NVD.HM",
                    "0QZ1.L",
                    "MU",
                    "MUTC34.SA",
                    "MTE.SG",
                    "NVDA06.BK",
                    "1T.MI",
                    "DIS.VI",
                    "NVD.MU",
                    "NVDG.SG",
                    "NVDA.MX",
                    "MTE.DU",
                    "NVDA.CL",
                    "DISB34.SA",
                    "ATTB34.SA",
                    "NVD0.F",
                    "NVD.SG",
                    "NVDA80.BK",
                    "NVDAD.BA",
                    "DIS.MX",
                    "MU.MX",
                    "MTE.HA",
                    "ZDIS.NE",
                    "0QZO.L",
                    "DIS.TO",
                    "1DIS.MI",
                    "ZNVD.NE",
                    "MU.SW",
                    "WDP0.F",
                    "NVDAC.BA",
                    "WDP0.DU",
                    "SOBA.DE",
                    "1CYTH.MI",
                    "DIS",
                    "NVDA-USD.SW",
                    "TC.BA",
                    "CYTH.DU",
                    "WDP3.F",
                    "NVDA19.BK",
                    "1NVDA.MI",
                    "NVDA.WA",
                    "LUMN.MX",
                    "MU.VI",
                    "SOBA.HA",
                    "WDP.F",
                    "NVDD.XC",
                    "WDPD.XD",
                    "NVDA.VI",
                    "MU.BA",
                    "DISNEY19.BK",
                    "SOBA.F",
                    "WDP0.MU",
                    "1MU.MI",
                    "MTE0.F",
                    "MTED.XC",
                    "NVDACL.SN",
                    "NVDG.HM",
                    "NVDA.BA",
                    "MTE.F",
                    "SOBA.HM",
                    "MTE.HM",
                    "NVDA",
                    "NVDG.DU",
                    "NVDA.SW",
                    "NVD.F",
                    "DISN.BA",
                    "T-PC",
                    "WDP.DU",
                    "WDP.DE",
                    "MTE.DE",
                    "0R1I.IL",
                    "CYTH.HM",
                    "DISND.BA",
                    "WDP.SG",
                    "SOBA.MU"
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
                "pub_date": "2026-02-02T23:01:11Z",
                "display_time": "2026-02-02T23:01:11Z",
                "canonical_url": "https://finance.yahoo.com/news/ford-xiaomi-deny-jv-talks-230111582.html",
                "content_type": "STORY",
                "related_tickers": [
                    "TSLA.BA",
                    "TL0.F",
                    "NVDA01.BK",
                    "TSLA.WA",
                    "NVD.HA",
                    "NVDA.SN",
                    "F.TO",
                    "TL0.DU",
                    "TL0.MU",
                    "TL0D.XC",
                    "NVDG.F",
                    "NVD.DE",
                    "FD.BA",
                    "XIACF",
                    "TL0.DE",
                    "TSLA.MX",
                    "FMC1.DE",
                    "TSLA80.BK",
                    "NVD.DU",
                    "TSLA",
                    "F.BA",
                    "NVDA03.BK",
                    "NVDD.XD",
                    "NVDC34.SA",
                    "NVD.HM",
                    "0R0X.L",
                    "3CPA.DU",
                    "NVDA06.BK",
                    "XIAOMI23.BK",
                    "F.MX",
                    "NVD.MU",
                    "NVDG.SG",
                    "1TSLA.MI",
                    "NVDA.MX",
                    "TSLACO.CL",
                    "TL01.F",
                    "NVDA.CL",
                    "3CPA.F",
                    "1810N.MX",
                    "3CP.DU",
                    "TSLAD.BA",
                    "FMC1.HA",
                    "FMC1.SG",
                    "TL00.F",
                    "TL0.HA",
                    "TL0.SG",
                    "TSLA34.SA",
                    "3CP.MU",
                    "F",
                    "3CPA.HM",
                    "ZNVD.NE",
                    "0P4F.L",
                    "NVDAC.BA",
                    "NVDA-USD.SW",
                    "3CPA.SG",
                    "FMC1.MU",
                    "NVDA19.BK",
                    "1NVDA.MI",
                    "81810.HK",
                    "NVDA.WA",
                    "TL0.HM",
                    "3CP.HA",
                    "NVDD.XC",
                    "3CPA.MU",
                    "XIAOMI01.BK",
                    "NVDA.VI",
                    "1810.HK",
                    "FORD.VI",
                    "HXXD.SI",
                    "TL01.DU",
                    "0R1I.IL",
                    "FDMO34.SA",
                    "TL01.MU",
                    "3CP.HM",
                    "FMC1D.XD",
                    "FMC1.HM",
                    "XIAOMI19.BK",
                    "NVDACL.SN",
                    "TSLA.VI",
                    "NVDG.HM",
                    "TSLA01.BK",
                    "NVDA.BA",
                    "3CP.SG",
                    "TSLACL.SN",
                    "FMC.F",
                    "NVDA",
                    "NVDG.DU",
                    "XIAOMI80.BK",
                    "ZTSL.NE",
                    "XIAOMI13.BK",
                    "3CP.F",
                    "NVDA.SW",
                    "NVD.F",
                    "TL0D.XD",
                    "XIACY",
                    "1F.MI",
                    "FMC1.DU",
                    "NVD0.F",
                    "NVD.SG",
                    "NVDA80.BK",
                    "NVDAD.BA",
                    "TSLA03.BK",
                    "TSLAC.BA",
                    "FMC1.F",
                    "3CP2.F"
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
