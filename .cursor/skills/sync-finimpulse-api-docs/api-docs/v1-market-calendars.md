---
title: Macroeconomic Release Calendar API
created: 2026-09-29
updated: 2026-11-05
endpoint: POST v1/market/calendars
auth: Bearer Token
---

# Macroeconomic Release Calendar API

Returns scheduled macroeconomic events, indicators, and data releases for countries globally (e.g., Unemployment Rate, CPI, Retail Sales).

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint provides scheduled macroeconomic data releases for 71 countries and the euro area, covering recent releases and upcoming events for approximately the next 30 days. Each record covers one indicator release for one country and contains the release date and time, the reference period, and the actual, prior, and originally reported values.

## Coverage

**Countries**Global coverage across supported countries and markets.**Events**Scheduled macroeconomic releases, including indicators such as unemployment, CPI, retail sales, GDP, interest rates, and other country-level economic data.**Future** **Availability**Upcoming events are generally available for approximately the next 30 days. The maximum future date currently available may vary by source and indicator.

## Data Freshness

Data is updated weekly. Newly published values may appear in **after_release_actual** with a delay of up to one week after the release.

## Data Availability &amp; Limitations

- The endpoint provides scheduled macroeconomic releases by country and indicator.
- Upcoming events are generally available for approximately the next 30 days.
- Future events may have **null** values for **after_release_actual** until the data is published.
- After an event occurs, its record remains available through the endpoint. The **after_release_actual** value may continue to be populated or updated for approximately one month after the event.
- Event availability varies by country, indicator, and source.
- Release dates and times may change when updated by the source.
- Macroeconomic event data is refreshed weekly.

## When to Use This Endpoint

- Build comprehensive global economic event calendars.
- Track the exact release dates and times for crucial macroeconomic indicators.
- Compare newly released economic data against prior or originally reported numbers to analyze market impact.
- Filter upcoming events by specific dates or countries.

## Request Parameters

**POST** `v1/market/calendars` 

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
     
     Multiple sorting setups can be combined in the array. By default, results are sorted by `start_date_time` in descending order, then by `economic_release` in alphabetical order.
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
curl --location "https://api.finimpulse.com/v1/market/calendars" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "filters": [
          [
              "country_code_iso3",
              "=",
              "JPN"
          ],
          "and",
          [
              "start_date_time",
              ">=",
              "2026-09-28"
          ]
      ],
      "sort_by": [
          {
              "selector": "start_date_time",
              "desc": false
          },
          {
              "selector": "economic_release",
              "desc": false
          }
      ],
      "limit": 10,
      "offset": 0
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/market/calendars";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""filters"": [
        [
            ""country_code_iso3"",
            ""="",
            ""JPN""
        ],
        ""and"",
        [
            ""start_date_time"",
            "">="",
            ""2026-09-28""
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""start_date_time"",
            ""desc"": false
        },
        {
            ""selector"": ""economic_release"",
            ""desc"": false
        }
    ],
    ""limit"": 10,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/market/calendars",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "filters" => [
        [
          "country_code_iso3",
          "=",
          "JPN"
        ],
        "and",
        [
          "start_date_time",
          ">=",
          "2026-09-28"
        ]
      ],
      "sort_by" => [
        [
          "selector" => "start_date_time",
          "desc" => false
        ],
        [
          "selector" => "economic_release",
          "desc" => false
        ]
      ],
      "limit" => 10,
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

url = "https://api.finimpulse.com/v1/market/calendars"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "filters": [
        [
            "country_code_iso3",
            "=",
            "JPN"
        ],
        "and",
        [
            "start_date_time",
            ">=",
            "2026-09-28"
        ]
    ],
    "sort_by": [
        {
            "selector": "start_date_time",
            "desc": False
        },
        {
            "selector": "economic_release",
            "desc": False
        }
    ],
    "limit": 10,
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
    "filters": [
        [
            "country_code_iso3",
            "=",
            "JPN"
        ],
        "and",
        [
            "start_date_time",
            ">=",
            "2026-09-28"
        ]
    ],
    "sort_by": [
        {
            "selector": "start_date_time",
            "desc": false
        },
        {
            "selector": "economic_release",
            "desc": false
        }
    ],
    "limit": 10,
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

const req = https.request('https://api.finimpulse.com/v1/market/calendars', options, (res) => {
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
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of economic event records.


### Event Details


- **economic_release**   
     `string` — The name of the economic metric or event being reported (e.g., "All Household Spending MM", "Unemployment Rate").
- **country_code_iso3**   
     `string` — The 3-letter ISO 3166-1 alpha-3 code of the country releasing the data (e.g., "JPN" for Japan, "USA" for the United States).
- **start_date_time**   
     `string` — The scheduled UTC date and time of the data release in ISO 8601 format (e.g., "2026-08-06T23:30:00Z").
- **period**   
     `string` — The specific reference period the released data applies to (e.g., "Jun", "Q2").


### Release Metrics


- **after_release_actual**   
     `number` — The actual value reported for the current release. May be null for future events until the value is published.
- **prior_release_actual**   
     `number` — The value reported for the previous release period.
- **originally_reported_actual**   
     `number` — The previously reported value before subsequent revisions.


### Example Response


```json
{
    "result": {
        "total_count": 84,
        "items_count": 10,
        "items": [
            {
                "economic_release": "IP Forecast 1 Mth Ahead",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-29T23:50:00Z",
                "period": "Sep",
                "after_release_actual": 3.2,
                "prior_release_actual": 6.4,
                "originally_reported_actual": null
            },
            {
                "economic_release": "IP Forecast 2 Mth Ahead*",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-29T23:50:00Z",
                "period": "Oct",
                "after_release_actual": 3.1,
                "prior_release_actual": -4.2,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Industrial O/P Prelim MM SA",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-29T23:50:00Z",
                "period": "Aug",
                "after_release_actual": -1.7,
                "prior_release_actual": -0.2,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Retail Sales YY",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-29T23:50:00Z",
                "period": "Aug",
                "after_release_actual": 2.7,
                "prior_release_actual": 4,
                "originally_reported_actual": 3.7
            },
            {
                "economic_release": "Foreign Reserves",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T00:00:00Z",
                "period": "Sep",
                "after_release_actual": null,
                "prior_release_actual": 1207.5,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Construction Orders YY*",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T05:00:00Z",
                "period": "Aug",
                "after_release_actual": -3.6,
                "prior_release_actual": -13.4,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Housing Starts YY*",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T05:00:00Z",
                "period": "Aug",
                "after_release_actual": 6.1,
                "prior_release_actual": 8.2,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Foreign Bond Investment",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T23:50:00Z",
                "period": null,
                "after_release_actual": null,
                "prior_release_actual": 1082.9,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Foreign Invest JP Stock",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T23:50:00Z",
                "period": null,
                "after_release_actual": null,
                "prior_release_actual": -1522.8,
                "originally_reported_actual": null
            },
            {
                "economic_release": "Tankan All Big Capex Est",
                "country_code_iso3": "JPN",
                "start_date_time": "2026-09-30T23:50:00Z",
                "period": "Q3",
                "after_release_actual": 11.3,
                "prior_release_actual": 11.5,
                "originally_reported_actual": null
            }
        ]
    }
}
```


## Units &amp; Values

The API does not provide a separate unit or scale field for calendar events. Values in **after_release_actual**, **prior_release_actual**, and **originally_reported_actual** may represent percentages, index points, currency amounts, or other units depending on the economic release. The scale of currency amounts (for example, millions or billions) is also not specified and may differ between releases.

Use **economic_release** to identify the indicator being reported and interpret the value according to that indicator's standard unit.

## Pagination &amp; Limits

You can control how many records a response returns and page through large result sets using the **limit** and **offset** parameters.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: **100** return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- To keep the order consistent across pages, pass **sort_by**, for example, by **start_date_time**, **economic_release**, and **country_code_iso3**.

## Related APIs

- [Country Macroeconomic Indicators API](https://developers.finimpulse.com/v1/macro-economics/)
- [Corporate Earnings &amp; IPO Calendar API](https://developers.finimpulse.com/v1/events/tickers/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
