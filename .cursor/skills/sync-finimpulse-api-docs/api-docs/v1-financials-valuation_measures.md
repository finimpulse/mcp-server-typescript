---
title: Valuation Measures
created: 2026-01-23
updated: 2026-02-06
endpoint: POST v1/financials/valuation_measures
auth: Bearer Token
---

# Valuation Measures

Provides key Valuation Measures for stocks and some funds, including P/E, EV/EBITDA, P/B, etc.

This endpoint helps assess a company’s market value relative to its fundamentals and is essential for comparative analysis.

## When to Use This Endpoint
- Populate the "Valuation Measures" section of the Financials views.
- Pull valuation metrics aligned to the same date grid as financial statements for apples-to-apples analysis.

## Request Parameters
**POST** `v1/financials/valuation_measures` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **intervals**   
     `array` *(optional)* — Reporting frequencies to return. **Supported values:**
    - `annual`
    - `quarterly`
    - `trailing`
     
     All parameters are of type **string** and are **optional**. If none are provided, all supported intervals are returned. Note that interval availability depends on coverage. If data is missing for a period, values may be **null**. **Example:** `"intervals": [ "trailing", "quarterly", "annual" ]`
- **start_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **end_date**   
     `string` *(optional)* — Date range filter (YYYY-MM-DD).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/financials/valuation_measures" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "start_date": "2020-08-11",
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
    ""start_date"": ""2020-08-11"",
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
      "start_date" => "2020-08-11",
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
    "start_date": "2020-08-11",
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
    "start_date": "2020-08-11",
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


The system covers data from **September 30, 2021**, subject to data availability per company.

## Response
The response is a single object containing metadata and an ***items*** array of records.

### Metadata Fields


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **display_name**   
     `string` — Preferred display name (if available).
- **short_name**   
     `string` — Short descriptive name.
- **long_name**   
     `string` — Full legal or formal name (company/fund).
- **quote_type**   
     `string` — Asset type.
- **quote_source_name**   
     `string` — Data source label for the quote (e.g., real-time vs delayed).
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
     `integer` — Total number of items that match filters.
- **items_count**   
     `integer` — Number of items in the response.
- **items**   
     `array` — Array of valuation records. It is a unified list where each element represents one measure snapshot for a requested `interval` and `date`. Note that many fields can be *null* depending on the reporting format, company structure, or source limitations.


### Market Cap


- **market_cap**   
     `number` — Market Capitalization.
- **enterprise_value**   
     `number` — Enterprise Value.
- **enterprises_value_ebitda_ratio**   
     `number` — Enterprise Value to EBITDA.
- **enterprises_value_revenue_ratio**   
     `number` — Enterprise Value to Revenue.


### P/E Ratio


- **pe_ratio**   
     `number` — Price-to-Earnings ratio.
- **forward_pe_ratio**   
     `number` — Forward Price-to-Earnings ratio.
- **peg_ratio**   
     `number` — PEG ratio.


### Other


- **pb_ratio**   
     `number` — Price-to-Book ratio.
- **ps_ratio**   
     `number` — Price-to-Sales ratio.


### Snapshot Info


- **type**   
     `string` — Report/snapshot type (valuation_measures expected).
- **interval**   
     `string` — Reporting frequencies (trailing/quarterly/annual).
- **date**   
     `string` — Reporting period end date.


### Example Response


```json
{
    "task_id": "581bcfaa-ef8c-4cc0-ae0d-553d43d70c84",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0032,
    "data": {
        "symbol": "NVDA",
        "start_date": "2020-08-11",
        "end_date": "2026-08-11",
        "tag": "just_tag",
        "intervals": [
            "trailing",
            "quarterly",
            "annual"
        ],
        "types": [
            "valuation_measures"
        ]
    },
    "result": {
        "symbol": "NVDA",
        "quote_type": "stock",
        "currency": "USD",
        "full_exchange_name": "NasdaqGS",
        "display_name": "NVIDIA",
        "market_region": "US_OT",
        "exchange_timezone_name": "America/New_York",
        "exchange_timezone_short_name": "EST",
        "exchange": "NMS",
        "short_name": "NVIDIA Corporation",
        "long_name": "NVIDIA Corporation",
        "quote_source_name": "Nasdaq Real Time Price",
        "time_offset": -14400,
        "total_count": 12,
        "items_count": 12,
        "items": [
            {
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
                "interval": "annual",
                "date": "2021-01-31"
            },
            {
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
                "type": "valuation_measures",
                "enterprise_value": 4595287650000,
                "enterprises_value_ebitda_ratio": 38.5867,
                "enterprises_value_revenue_ratio": 24.5551,
                "forward_pe_ratio": 24.9377,
                "market_cap": 4645414650000,
                "pb_ratio": 39.070916,
                "pe_ratio": 47.309406,
                "peg_ratio": 0.7215,
                "ps_ratio": 25.106609,
                "interval": "trailing",
                "date": "2026-01-30"
            }
        ]
    }
}
```
