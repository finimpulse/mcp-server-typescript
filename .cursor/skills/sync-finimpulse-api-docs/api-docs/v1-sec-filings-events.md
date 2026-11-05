---
title: SEC Filing Events API for Stocks, ETFs &amp; Mutual Funds
created: 2026-08-04
updated: 2026-11-05
endpoint: POST v1/sec-filings/events
auth: Bearer Token
---

# SEC Filing Events API for Stocks, ETFs &amp; Mutual Funds

Returns filing events for an asset, including filing dates, form types, document metadata, and source URLs. 

This endpoint provides SEC filing event data for stocks, ETFs, and mutual funds. The response contains pagination fields and a list of filing event records, including accession numbers, form types, and document metadata for each filing.

Data is refreshed every 7 days and covers 8,000 tickers. The full list of covered symbols is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/08/tickers_with_events.csv).

## When to Use This Endpoint 

- Feed a company's filing history section on an asset profile page.
- Monitor for new material event filings (e.g., 8-K) to trigger real-time alerts.
- Track filing frequency or form-type patterns as an input to a company monitoring model.
- Cross-check reported financial statement dates against corresponding filing dates for data validation.
- Build a compliance calendar showing recent regulatory filings for a portfolio of companies.
- Archive or index source filing documents for a document search or research tool.

## Request Parameters

**POST** `v1/sec-filings/events` 

- **symbol**   
     `string` *(optional)* — Asset identifier (ticker symbol).
- **cik**   
     `string` *(optional)* — Central Index Key (CIK).
- **start_filing_date**   
     `string` *(optional)* — Start of the filing date range filter (YYYY-MM-DD). Minimum supported date is 1990-01-01.
- **end_filing_date**   
     `string` *(optional)* — End of the filing date range filter (YYYY-MM-DD). Minimum supported date is 1990-01-01.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined).
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based).
- **filters**   
     `array` *(optional)* — Optional filter expressions. Supported on all fields except `file_url`. Each filter condition is defined as `[field, operator, value]`. Conditions can be combined using the logical operators `and`, `or`, and `not`. **Supported operators:** *Any field type (numbers, strings, booleans, dates):*
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
     `array` *(optional)* — Optional sorting configuration for result items. Each sorting setup is defined as `[selector, desc]`: 
    - `selector` - Metric used for sorting (e.g., cik).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Sortings can be combined using `,`. Note that results are sorted by `filing_date` in descending order by default.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/sec-filings/events" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "MASK",
      "cik": "0001993097",
      "start_filing_date": "2026-01-17",
      "end_filing_date": "2026-07-17",
      "limit": 5,
      "offset": 0,
      "filters": [
          [
              "report_date",
              "<>",
              null
          ]
      ],
      "sort_by": [
          {
              "selector": "cik",
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
var url = "https://api.finimpulse.com/v1/sec-filings/events";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""MASK"",
    ""cik"": ""0001993097"",
    ""start_filing_date"": ""2026-01-17"",
    ""end_filing_date"": ""2026-07-17"",
    ""limit"": 5,
    ""offset"": 0,
    ""filters"": [
        [
            ""report_date"",
            ""<>"",
            null
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""cik"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/sec-filings/events",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "MASK",
      "cik" => "0001993097",
      "start_filing_date" => "2026-01-17",
      "end_filing_date" => "2026-07-17",
      "limit" => 5,
      "offset" => 0,
      "filters" => [
        [
          "report_date",
          "<>",
          null
        ]
      ],
      "sort_by" => [
        [
          "selector" => "cik",
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

url = "https://api.finimpulse.com/v1/sec-filings/events"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "MASK",
    "cik": "0001993097",
    "start_filing_date": "2026-01-17",
    "end_filing_date": "2026-07-17",
    "limit": 5,
    "offset": 0,
    "filters": [
        [
            "report_date",
            "<>",
            None
        ]
    ],
    "sort_by": [
        {
            "selector": "cik",
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
    "symbol": "MASK",
    "cik": "0001993097",
    "start_filing_date": "2026-01-17",
    "end_filing_date": "2026-07-17",
    "limit": 5,
    "offset": 0,
    "filters": [
        [
            "report_date",
            "<>",
            null
        ]
    ],
    "sort_by": [
        {
            "selector": "cik",
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

const req = https.request('https://api.finimpulse.com/v1/sec-filings/events', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of filing event records. Each item represents one SEC filing event for an asset. If data for a field is not available, it returns **null**.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of filing event records.


### Filing Event Fields


- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **cik**   
     `string` — Central Index Key (CIK).
- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **accession_number**   
     `string` — Unique SEC accession number.
- **filing_date**   
     `string` — Date the filing was submitted to the SEC (YYYY-MM-DD).
- **report_date**   
     `string` — End date of the reporting period covered by the filing (YYYY-MM-DD).
- **acceptance_date_time**   
     `string` — Timestamp when the filing was accepted by the SEC (ISO 8601).
- **act**   
     `string` — Securities act under which the filing was made (e.g., "33", "34").
- **form**   
     `string` — SEC form type (e.g., "10-K", "8-K", "F-1").
- **file_number**   
     `string` — SEC file number associated with the filing.
- **film_number**   
     `string` — SEC film number associated with the filing.
- **items**   
     `string` — Item codes disclosed in the filing.
- **core_type**   
     `string` — Core filing type classification.
- **size**   
     `integer` — Size of the filing, in bytes.
- **primary_document**   
     `string` — Primary document file name.
- **primary_doc_description**   
     `string` — Description of the primary document.
- **file_url**   
     `string` — Direct link to the filing document.


### Example Response


```json
{
    "result": {
        "total_count": 15,
        "items_count": 5,
        "items": [
            {
                "quote_type": "stock",
                "cik": "0001993097",
                "symbol": "MASK",
                "accession_number": "0001185185-26-002090",
                "filing_date": "2026-05-22",
                "report_date": "2026-05-22",
                "acceptance_date_time": "2026-05-22T19:45:21Z",
                "act": "34",
                "form": "6-K",
                "file_number": "001-42466",
                "film_number": "261013430",
                "items": null,
                "core_type": "6-K",
                "size": 15260,
                "primary_document": "mask6k052226.htm",
                "primary_doc_description": "FORM 6-K",
                "file_url": "https://www.sec.gov/Archives/edgar/data/1993097/000118518526002090/mask6k052226.htm"
            },
            {
                "quote_type": "stock",
                "cik": "0001993097",
                "symbol": "MASK",
                "accession_number": "0001185185-26-002136",
                "filing_date": "2026-05-27",
                "report_date": "2025-12-31",
                "acceptance_date_time": "2026-05-27T20:21:12Z",
                "act": "34",
                "form": "6-K",
                "file_number": "001-42466",
                "film_number": "261026468",
                "items": null,
                "core_type": "XBRL",
                "size": 7735482,
                "primary_document": "mask6k052626.htm",
                "primary_doc_description": "FORM 6-K",
                "file_url": "https://www.sec.gov/Archives/edgar/data/1993097/000118518526002136/mask6k052626.htm"
            },
            {
                "quote_type": "stock",
                "cik": "0001993097",
                "symbol": "MASK",
                "accession_number": "0001185185-26-002620",
                "filing_date": "2026-06-23",
                "report_date": "2026-06-23",
                "acceptance_date_time": "2026-06-23T20:20:21Z",
                "act": "34",
                "form": "6-K",
                "file_number": "001-42466",
                "film_number": "261111277",
                "items": null,
                "core_type": "6-K",
                "size": 817434,
                "primary_document": "mask6k062326.htm",
                "primary_doc_description": "FORM 6-K",
                "file_url": "https://www.sec.gov/Archives/edgar/data/1993097/000118518526002620/mask6k062326.htm"
            },
            {
                "quote_type": "stock",
                "cik": "0001993097",
                "symbol": "MASK",
                "accession_number": "0002118245-26-000001",
                "filing_date": "2026-03-17",
                "report_date": "2026-03-17",
                "acceptance_date_time": "2026-03-17T13:06:16Z",
                "act": null,
                "form": "3",
                "file_number": null,
                "film_number": null,
                "items": null,
                "core_type": "3",
                "size": 3135,
                "primary_document": "xslF345X02/primary_doc.xml",
                "primary_doc_description": "PRIMARY DOCUMENT",
                "file_url": "https://www.sec.gov/Archives/edgar/data/1993097/000211824526000001/xslF345X02/primary_doc.xml"
            },
            {
                "quote_type": "stock",
                "cik": "0001993097",
                "symbol": "MASK",
                "accession_number": "0001992881-26-000001",
                "filing_date": "2026-03-17",
                "report_date": "2026-03-17",
                "acceptance_date_time": "2026-03-17T12:45:31Z",
                "act": null,
                "form": "3",
                "file_number": null,
                "film_number": null,
                "items": null,
                "core_type": "3",
                "size": 3749,
                "primary_document": "xslF345X02/primary_doc.xml",
                "primary_doc_description": "PRIMARY DOCUMENT",
                "file_url": "https://www.sec.gov/Archives/edgar/data/1993097/000199288126000001/xslF345X02/primary_doc.xml"
            }
        ]
    }
}
```
