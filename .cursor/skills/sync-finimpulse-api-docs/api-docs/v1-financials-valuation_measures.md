---
title: Historical Stock Valuation Metrics API
created: 2026-01-23
updated: 2026-11-03
endpoint: POST v1/financials/valuation_measures
auth: Bearer Token
---

# Historical Stock Valuation Metrics API

Provides key Valuation Measures for stocks and some funds, including P/E, EV/EBITDA, P/B, etc.

This endpoint returns company valuation multiples derived from market price and financial statement data.

Financial statements data covers over 85,000 tickers. Coverage starts from **September 30, 2021**, subject to availability per company. The full list of covered symbols is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/06/tickers_with_financials.csv).

## When to Use This Endpoint
- Populate the “Valuation Measures” section of the Financials views.
- Pull valuation metrics aligned to the same date grid as financial statements.
- Compare valuation multiples across reporting periods (trailing, quarterly, annual).

## Request Parameters
**POST** `v1/financials/valuation_measures` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **intervals**   
     `array` *(required)* — Reporting frequencies to return. **Supported values:**
    - `annual`
    - `quarterly`
    - `trailing`
     
     Note that interval availability depends on coverage. If data is missing for a period, values may be **null**.
- **start_date**   
     `string` *(optional)* — Start of the date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — End of the date range filter (YYYY-MM-DD).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/financials/valuation_measures" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "intervals": [
          "trailing",
          "quarterly",
          "annual"
      ],
      "start_date": "2021-10-01",
      "end_date": "2026-08-11",
      "tag": "just_tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/financials/valuation_measures";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""intervals"": [
        ""trailing"",
        ""quarterly"",
        ""annual""
    ],
    ""start_date"": ""2021-10-01"",
    ""end_date"": ""2026-08-11"",
    ""tag"": ""just_tag""
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/financials/valuation_measures",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "intervals" => [
        "trailing",
        "quarterly",
        "annual"
      ],
      "start_date" => "2021-10-01",
      "end_date" => "2026-08-11",
      "tag" => "just_tag"
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

url = "https://api.finimpulse.com/v1/financials/valuation_measures"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "intervals": [
        "trailing",
        "quarterly",
        "annual"
    ],
    "start_date": "2021-10-01",
    "end_date": "2026-08-11",
    "tag": "just_tag"
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
    "intervals": [
        "trailing",
        "quarterly",
        "annual"
    ],
    "start_date": "2021-10-01",
    "end_date": "2026-08-11",
    "tag": "just_tag"
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request('https://api.finimpulse.com/v1/financials/valuation_measures', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response is a single object containing metadata and an ***items*** array of statement snapshots for a given interval and date.

### Metadata Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **display_name**   
     `string` — Asset display name.
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full legal or formal name.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **quote_source_name**   
     `string` — Data source label for the quote.
- **currency**   
     `string` — Trading currency.
- **full_exchange_name**   
     `string` — Exchange name.
- **exchange**   
     `string` — Exchange code.
- **exchange_timezone_name**   
     `string` — Exchange time zone name.
- **exchange_timezone_short_name**   
     `string` — Exchange time zone abbreviation.
- **time_offset**   
     `integer` — Exchange time offset in seconds.
- **market_region**   
     `string` — Market/country code.
- **total_count**   
     `integer` — Total number of matching items.
- **items_count**   
     `integer` — Number of items returned.
- **reports_count**   
     `integer` — Total number of unique reports in the response.
- **report_keys**   
     `array` — Array of unique report identifiers returned in the response. Each key follows the format `interval|date`. All items sharing the same key belong to the same report.
- **items**   
     `array` — Array of valuation records. It is a unified list where each element represents one measure snapshot for a requested `interval` and `date`. Note that many fields can be *null* depending on the reporting format, company structure, or data limitations.


### Snapshot Info


- **type**   
     `string` — Snapshot type (valuation_measures expected).
- **report_key**   
     `string` — Unique identifier of the report this item belongs to. Format: `interval|date`.
- **interval**   
     `string` — Reporting frequency (trailing/quarterly/annual).
- **date**   
     `string` — End date of the reporting period.


### Market Cap


- **market_cap**   
     `number` — Market Capitalization.
- **enterprise_value**   
     `number` — Enterprise value (EV).
- **enterprises_value_ebitda_ratio**   
     `number` — Enterprise value-to-EBITDA (EV/EBITDA) ratio.
- **enterprises_value_revenue_ratio**   
     `number` — Enterprise value-to-revenue (EV/Revenue) ratio.


### Price-to-Earnings (P/E)


- **pe_ratio**   
     `number` — Price-to-Earnings (P/E) ratio.
- **forward_pe_ratio**   
     `number` — Forward Price-to-Earnings (P/E) ratio.
- **peg_ratio**   
     `number` — Price/earnings-to-growth (PEG) ratio.


### Other


- **pb_ratio**   
     `number` — Price-to-book (P/B) ratio
- **ps_ratio**   
     `number` — Price-to-sales (P/S) ratio


### Example Response


```json
{
    "result": {
        "symbol": "NVDA",
        "quote_type": "stock",
        "currency": "USD",
        "full_exchange_name": "NasdaqGS",
        "display_name": "NVIDIA",
        "market_region": "US_OT",
        "exchange_timezone_name": "America/New_York",
        "exchange_timezone_short_name": "EDT",
        "exchange": "NMS",
        "short_name": "NVIDIA Corporation",
        "long_name": "NVIDIA Corporation",
        "quote_source_name": "BOATS Real Time Price",
        "time_offset": -14400,
        "total_count": 14,
        "items_count": 14,
        "reports_count": 14,
        "report_keys": [
            "annual|2022-01-31",
            "annual|2023-01-31",
            "annual|2024-01-31",
            "annual|2025-01-31",
            "annual|2026-01-31",
            "quarterly|2024-07-31",
            "quarterly|2024-10-31",
            "quarterly|2025-01-31",
            "quarterly|2025-04-30",
            "quarterly|2025-07-31",
            "quarterly|2025-10-31",
            "quarterly|2026-01-31",
            "quarterly|2026-04-30",
            "trailing|2026-06-19"
        ],
        "items": [
            {
                "report_key": "annual|2022-01-31",
                "type": "valuation_measures",
                "enterprise_value": 606148160000,
                "enterprises_value_ebitda_ratio": 61.0606,
                "enterprises_value_revenue_ratio": 24.9711,
                "forward_pe_ratio": 47.619,
                "market_cap": 613619160000,
                "pb_ratio": 25.784484,
                "pe_ratio": 75.457627,
                "peg_ratio": 2.6099,
                "ps_ratio": 25.551223,
                "interval": "annual",
                "date": "2022-01-31"
            },
            {
                "report_key": "annual|2023-01-31",
                "type": "valuation_measures",
                "enterprise_value": 480387420000,
                "enterprises_value_ebitda_ratio": 64.5335,
                "enterprises_value_revenue_ratio": 16.8168,
                "forward_pe_ratio": 45.4545,
                "market_cap": 481782420000,
                "pb_ratio": 22.568228,
                "pe_ratio": 83.13617,
                "peg_ratio": 4.644,
                "ps_ratio": 17.260556,
                "interval": "annual",
                "date": "2023-01-31"
            },
            {
                "report_key": "annual|2024-01-31",
                "type": "valuation_measures",
                "enterprise_value": 1508771280000,
                "enterprises_value_ebitda_ratio": 66.1626,
                "enterprises_value_revenue_ratio": 33.6254,
                "forward_pe_ratio": 30.3951,
                "market_cap": 1516025280000,
                "pb_ratio": 45.574185,
                "pe_ratio": 81.170185,
                "peg_ratio": 0.6034,
                "ps_ratio": 34.140149,
                "interval": "annual",
                "date": "2024-01-31"
            },
            {
                "report_key": "annual|2025-01-31",
                "type": "valuation_measures",
                "enterprise_value": 2910691390000,
                "enterprises_value_ebitda_ratio": 38.8756,
                "enterprises_value_revenue_ratio": 25.6972,
                "forward_pe_ratio": 28.0899,
                "market_cap": 2938953390000,
                "pb_ratio": 44.597845,
                "pe_ratio": 47.40229,
                "peg_ratio": 0.8605,
                "ps_ratio": 26.355582,
                "interval": "annual",
                "date": "2025-01-31"
            },
            {
                "report_key": "annual|2026-01-31",
                "type": "valuation_measures",
                "enterprise_value": 4595096520000,
                "enterprises_value_ebitda_ratio": 38.5851,
                "enterprises_value_revenue_ratio": 24.5541,
                "forward_pe_ratio": 24.9377,
                "market_cap": 4645223520000,
                "pb_ratio": 39.069308,
                "pe_ratio": 47.309406,
                "peg_ratio": 0.7215,
                "ps_ratio": 25.106609,
                "interval": "annual",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2024-07-31",
                "type": "valuation_measures",
                "enterprise_value": null,
                "enterprises_value_ebitda_ratio": null,
                "enterprises_value_revenue_ratio": null,
                "forward_pe_ratio": null,
                "market_cap": null,
                "pb_ratio": null,
                "pe_ratio": null,
                "peg_ratio": null,
                "ps_ratio": null,
                "interval": "quarterly",
                "date": "2024-07-31"
            },
            {
                "report_key": "quarterly|2024-10-31",
                "type": "valuation_measures",
                "enterprise_value": 3228897080000,
                "enterprises_value_ebitda_ratio": 51.2735,
                "enterprises_value_revenue_ratio": 33.5271,
                "forward_pe_ratio": 33.8983,
                "market_cap": 3253682080000,
                "pb_ratio": 55.946525,
                "pe_ratio": 62.240975,
                "peg_ratio": 1.0258,
                "ps_ratio": 34.325546,
                "interval": "quarterly",
                "date": "2024-10-31"
            },
            {
                "report_key": "quarterly|2025-01-31",
                "type": "valuation_measures",
                "enterprise_value": 2910691390000,
                "enterprises_value_ebitda_ratio": 38.8756,
                "enterprises_value_revenue_ratio": 25.6972,
                "forward_pe_ratio": 28.0899,
                "market_cap": 2938953390000,
                "pb_ratio": 44.597845,
                "pe_ratio": 47.40229,
                "peg_ratio": 0.8605,
                "ps_ratio": 26.355582,
                "interval": "quarterly",
                "date": "2025-01-31"
            },
            {
                "report_key": "quarterly|2025-04-30",
                "type": "valuation_measures",
                "enterprise_value": 2623352715519,
                "enterprises_value_ebitda_ratio": 30.4556,
                "enterprises_value_revenue_ratio": 20.1028,
                "forward_pe_ratio": 24.8139,
                "market_cap": 2656292715519,
                "pb_ratio": 33.485354,
                "pe_ratio": 37.047619,
                "peg_ratio": 1.5333,
                "ps_ratio": 20.702788,
                "interval": "quarterly",
                "date": "2025-04-30"
            },
            {
                "report_key": "quarterly|2025-07-31",
                "type": "valuation_measures",
                "enterprise_value": 4288194890000,
                "enterprises_value_ebitda_ratio": 47.1396,
                "enterprises_value_revenue_ratio": 28.8738,
                "forward_pe_ratio": 39.8406,
                "market_cap": 4330600890000,
                "pb_ratio": 51.651311,
                "pe_ratio": 57.377419,
                "peg_ratio": 1.7245,
                "ps_ratio": 29.623143,
                "interval": "quarterly",
                "date": "2025-07-31"
            },
            {
                "report_key": "quarterly|2025-10-31",
                "type": "valuation_measures",
                "enterprise_value": 4878126450000,
                "enterprises_value_ebitda_ratio": 47.27,
                "enterprises_value_revenue_ratio": 29.5254,
                "forward_pe_ratio": 31.5457,
                "market_cap": 4921519450000,
                "pb_ratio": 49.150807,
                "pe_ratio": 57.689459,
                "peg_ratio": 0.9155,
                "ps_ratio": 30.216992,
                "interval": "quarterly",
                "date": "2025-10-31"
            },
            {
                "report_key": "quarterly|2026-01-31",
                "type": "valuation_measures",
                "enterprise_value": 4595096520000,
                "enterprises_value_ebitda_ratio": 38.5851,
                "enterprises_value_revenue_ratio": 24.5541,
                "forward_pe_ratio": 24.9377,
                "market_cap": 4645223520000,
                "pb_ratio": 39.069308,
                "pe_ratio": 47.309406,
                "peg_ratio": 0.7215,
                "ps_ratio": 25.106609,
                "interval": "quarterly",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2026-04-30",
                "type": "valuation_measures",
                "enterprise_value": 4782174219153,
                "enterprises_value_ebitda_ratio": 33.0827,
                "enterprises_value_revenue_ratio": 22.1461,
                "forward_pe_ratio": 24.57,
                "market_cap": 4833690219153,
                "pb_ratio": 30.730485,
                "pe_ratio": 40.728571,
                "peg_ratio": 0.6334,
                "ps_ratio": 22.65585,
                "interval": "quarterly",
                "date": "2026-04-30"
            },
            {
                "report_key": "trailing|2026-06-19",
                "type": "valuation_measures",
                "enterprise_value": 5034898490000,
                "enterprises_value_ebitda_ratio": 26.0916,
                "enterprises_value_revenue_ratio": 19.8622,
                "forward_pe_ratio": 24.0385,
                "market_cap": 5103122490000,
                "pb_ratio": 26.1064,
                "pe_ratio": 32.264931,
                "peg_ratio": 0.6484,
                "ps_ratio": 20.32919,
                "interval": "trailing",
                "date": "2026-06-19"
            }
        ]
    }
}
```
