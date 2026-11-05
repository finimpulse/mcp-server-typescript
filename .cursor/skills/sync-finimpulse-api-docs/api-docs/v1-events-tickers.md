---
title: Corporate Earnings &amp; IPO Calendar API
created: 2026-09-29
updated: 2026-11-05
endpoint: POST v1/events/tickers
auth: Bearer Token
---

# Corporate Earnings &amp; IPO Calendar API

Returns upcoming and historical corporate events associated with specific ticker symbols, including earnings announcements and Initial Public Offerings (IPOs).

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint provides past and upcoming corporate earnings and IPO events. Each record contains the event type, ticker symbol, company name, and event date and time, along with type-specific details such as EPS estimates and actual results for earnings, or deal status and listing exchange for IPOs.

## Coverage

**Event Types**Earnings, IPO**Assets and Markets**Events are available for supported ticker symbols across FinImpulse market coverage.**Future Availability**Scheduled event coverage varies by event type and source. Earnings events are typically available up to approximately **14 months ahead**, while IPO events are typically available up to approximately **2-3 weeks ahead.**

## Data Freshness

Data is updated weekly. Newly reported values, such as **eps_actual**, may appear with a delay of up to one week after the event.

## Data Availability &amp; Limitations

- The endpoint supports two event types: **earnings** and **ipo**.
- Available response fields depend on the event type.
- Earnings events may contain **null** values for **eps_estimate**, **eps_actual**, or **eps_surprise_percent** when the corresponding data is not available.
- **event_name** is available for earnings events only.
- IPO events do not return **event_name**.
- IPO **filing_date** and **amended_date** are not returned because these values are not currently available from the underlying data.

## When to Use This Endpoint 

- Build dedicated Earnings or IPO calendars and dashboards.
- Track expected EPS (Earnings Per Share) estimates against actual reported numbers.
- Alert users to upcoming earnings calls or IPO pricing dates.
- Filter events by type, date, or ticker symbol.

## Request Parameters

**POST** `v1/events/tickers` 

- **event_types**   
     `array` *(optional)* — Types of corporate events to include. **Supported values:**
    - `earnings`
    - `ipo`
     
     Each value is a **string**. You can pass one or both of the supported values. If `event_types` is not specified, events of all types are returned.
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
    - `selector` - Field used for sorting (e.g., start_date_time).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array. By default, results are sorted by `start_date_time` in descending order, then by `symbol` in alphabetical order.
- **limit**   
     `integer` *(optional)* — Maximum number of matched items returned (user-defined). 
    - Default: 100
    - Maximum: 1000
- **offset**   
     `integer` *(optional)* — Pagination offset (0-based)
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/events/tickers" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "event_types": [
          "earnings",
          "ipo"
      ],
      "filters": [
          [
              "symbol",
              "=",
              "AAPL"
          ]
      ],
      "sort_by": [
          {
              "selector": "start_date_time",
              "desc": true
          }
      ],
      "limit": 5,
      "offset": 0
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/events/tickers";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""event_types"": [
        ""earnings"",
        ""ipo""
    ],
    ""filters"": [
        [
            ""symbol"",
            ""="",
            ""AAPL""
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""start_date_time"",
            ""desc"": true
        }
    ],
    ""limit"": 5,
    ""offset"": 0
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/events/tickers",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "event_types" => [
        "earnings",
        "ipo"
      ],
      "filters" => [
        [
          "symbol",
          "=",
          "AAPL"
        ]
      ],
      "sort_by" => [
        [
          "selector" => "start_date_time",
          "desc" => true
        ]
      ],
      "limit" => 5,
      "offset" => 0
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

url = "https://api.finimpulse.com/v1/events/tickers"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "event_types": [
        "earnings",
        "ipo"
    ],
    "filters": [
        [
            "symbol",
            "=",
            "AAPL"
        ]
    ],
    "sort_by": [
        {
            "selector": "start_date_time",
            "desc": True
        }
    ],
    "limit": 5,
    "offset": 0
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
    "event_types": [
        "earnings",
        "ipo"
    ],
    "filters": [
        [
            "symbol",
            "=",
            "AAPL"
        ]
    ],
    "sort_by": [
        {
            "selector": "start_date_time",
            "desc": true
        }
    ],
    "limit": 5,
    "offset": 0
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <API_TOKEN>',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request('https://api.finimpulse.com/v1/events/tickers', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching events in the database.
- **items_count**   
     `integer` — Number of events returned in the current response page.
- **items**   
     `array` — Array of polymorphic event objects. Note: The available fields in each object depend on its type.


### Common Fields (All Event Types)


- **type**   
     `string` — The type of the event (e.g., "earnings", "ipo"). Used to determine which specific fields to expect.
- **symbol**   
     `string` — The ticker symbol of the asset.
- **company_short_name**   
     `string` — A concise display name for the company.
- **start_date_time**   
     `string` — The scheduled UTC date and time of the event in ISO 8601 format (e.g., "2026-08-13T08:10:00Z").


### Earnings Event Details


- **event_name**   
     `string` — Name of the earnings event or reporting period, e.g. "H1 2026 Earnings Announcement" or "Q2 2027 Earnings Announcement".
- **start_date_time_type**   
     `string` — Code describing the scheduled timing of the earnings release: 
    - `BMO` - Before Market Open
    - `AMC` - After Market Close
    - `TNS` - Time Not Supplied
    - `TAS` - Source-specific timing code for which the source does not provide a descriptive label.
- **eps_estimate**   
     `number` — Estimated EPS before the earnings release.
- **eps_actual**   
     `number` — Actual reported EPS. May be null before results are published.
- **eps_surprise_percent**   
     `number` — Percentage difference between actual and estimated EPS. Values are returned as percentage points (e.g., 5.2 represents 5.2%).
- **time_zone_short_name**   
     `string` — Local time zone abbreviation associated with the event (e.g., "HKT" or "EST").
- **gmt_offset_milliseconds**   
     `integer` — Offset from GMT in milliseconds.
- **intraday_market_cap**   
     `number` — Market capitalization at the time represented by the event data, denominated in the ticker’s currency.


### IPO Event Details


- **deal_type**   
     `string` — Status or type of the IPO event, as provided by the source. Common values include `Expected`, `Priced`, and `Withdrawn`.
- **exchange_short_name**   
     `string` — Exchange where the asset is expected to list or has been listed (e.g., "Nasdaq" or "NYSE").
- **currency_name**   
     `string` — Currency associated with the IPO (e.g., "USD").
- **start_date_time**   
     `string` — IPO-related date provided by the source. Depending on the event, this may represent an expected listing date, pricing date, or another IPO milestone. The response does not explicitly identify which date type applies.


### Example Response


```json
{
    "result": {
        "total_count": 3,
        "items_count": 3,
        "items": [
            {
                "type": "earnings",
                "symbol": "AAPL",
                "company_short_name": "Apple Inc.",
                "start_date_time": "2026-11-02T20:00:00Z",
                "event_name": "Q4 2026 Earnings Announcement",
                "start_date_time_type": "AMC",
                "eps_estimate": 1.98,
                "eps_actual": null,
                "eps_surprise_percent": null,
                "time_zone_short_name": "EST",
                "gmt_offset_milliseconds": -18000000,
                "intraday_market_cap": 5020251835678.71
            },
            {
                "type": "earnings",
                "symbol": "AAPL",
                "company_short_name": "Apple Inc.",
                "start_date_time": "2026-10-29T20:00:00Z",
                "event_name": "Q4 2026 Earnings Announcement",
                "start_date_time_type": "AMC",
                "eps_estimate": 1.98,
                "eps_actual": null,
                "eps_surprise_percent": null,
                "time_zone_short_name": "EDT",
                "gmt_offset_milliseconds": -14400000,
                "intraday_market_cap": 4860153663263.55
            },
            {
                "type": "earnings",
                "symbol": "AAPL",
                "company_short_name": "Apple Inc.",
                "start_date_time": "2026-07-30T20:30:28Z",
                "event_name": null,
                "start_date_time_type": "TAS",
                "eps_estimate": 1.89,
                "eps_actual": 2.02,
                "eps_surprise_percent": 6.74,
                "time_zone_short_name": "EDT",
                "gmt_offset_milliseconds": -14400000,
                "intraday_market_cap": 4665759524151.61
            }
        ]
    }
}
```


## Pagination &amp; Limits

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: **100** return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- To keep the order consistent across pages, pass **sort_by**, for example, by **start_date_time** and **symbol**.

## Related APIs

- [Macroeconomic Release Calendar API](https://developers.finimpulse.com/v1/market/calendars/)
- [Historical Price Data API](https://developers.finimpulse.com/v1/histories/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
