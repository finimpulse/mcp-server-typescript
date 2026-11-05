---
title: Country Macroeconomic Indicators API
created: 2026-09-29
updated: 2026-11-05
endpoint: POST v1/macro-economics
auth: Bearer Token
---

# Country Macroeconomic Indicators API

Returns annual macroeconomic indicators by country, including GDP, inflation, employment, interest rates, trade, and government finances.

**Available via:** [REST API](https://developers.finimpulse.com/)

This endpoint provides country-level macroeconomic data from 1970 to the current year. Each record covers one country for one calendar year and contains 38 indicators grouped by category.

## Coverage

Countries50+, including all OECD and G20 countries, plus Bulgaria, Croatia, Peru, Romania, and Thailand Indicators38Historical Depth1970 to the current year (current-year values are forecasts). The start year varies by country ([download the list of countries with start years](https://finimpulse.com/wp-content/uploads/2026/09/macro_countries_start_years.txt)).FrequencyAnnual

## Data Freshness

Macroeconomic indicators are updated quarterly.

## Data Availability &amp; Limitations

- Data is annual. Quarterly and monthly values are not provided.
- Some fields may be null if a specific indicator is not available for a given country and year. It does not indicate an error.
- The earliest available year varies by country. See the [country list](https://finimpulse.com/wp-content/uploads/2026/09/macro_countries_start_years.txt) for each country's start year.
- Values for the current year are forecasts based on available data and may be revised.
- Historical values may be revised as data is updated.
- Values, units, and methodologies are provided as received from the original data sources. Methodologies may vary across indicators and countries. FinImpulse does not independently recalculate or verify these figures.

## When to Use This Endpoint

- Display macroeconomic indicators and historical charts on country profiles and dashboards.
- Add country-level economic context to stock, ETF, and mutual fund data.
- Build country screeners and rankings based on macroeconomic indicators.
- Supply macroeconomic inputs to financial models and portfolio allocation tools.
- Analyze country risk factors using government finance, trade, and currency data.

## Request Parameters

**POST** `v1/macro-economics` 

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
    - `selector` - Field used for sorting (e.g., year).
    - `desc` - Sorting direction (*true* for descending, *false* for ascending).
     
     Multiple sorting setups can be combined in the array.
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
curl --location "https://api.finimpulse.com/v1/macro-economics" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "filters": [
          [
              "year",
              "=",
              2026
          ],
          "and",
          [
              "country_iso3",
              "=",
              "CHE"
          ]
      ],
      "sort_by": [
          {
              "selector": "year",
              "desc": true
          }
      ],
      "limit": 1,
      "offset": 0
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/macro-economics";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""filters"": [
        [
            ""year"",
            ""="",
            2026
        ],
        ""and"",
        [
            ""country_iso3"",
            ""="",
            ""CHE""
        ]
    ],
    ""sort_by"": [
        {
            ""selector"": ""year"",
            ""desc"": true
        }
    ],
    ""limit"": 1,
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/macro-economics",
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
          "year",
          "=",
          2026
        ],
        "and",
        [
          "country_iso3",
          "=",
          "CHE"
        ]
      ],
      "sort_by" => [
        [
          "selector" => "year",
          "desc" => true
        ]
      ],
      "limit" => 1,
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

url = "https://api.finimpulse.com/v1/macro-economics"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "filters": [
        [
            "year",
            "=",
            2026
        ],
        "and",
        [
            "country_iso3",
            "=",
            "CHE"
        ]
    ],
    "sort_by": [
        {
            "selector": "year",
            "desc": True
        }
    ],
    "limit": 1,
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
            "year",
            "=",
            2026
        ],
        "and",
        [
            "country_iso3",
            "=",
            "CHE"
        ]
    ],
    "sort_by": [
        {
            "selector": "year",
            "desc": true
        }
    ],
    "limit": 1,
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

const req = https.request('https://api.finimpulse.com/v1/macro-economics', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response contains pagination fields and a list of macroeconomic records. Each item represents one country for one calendar year.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching records.
- **items_count**   
     `integer` — Number of records returned.
- **items**   
     `array` — Array of macroeconomic records.


### Identifiers


- **country_iso3**   
     `string` — Country identifier (ISO 3166-1 alpha-3 code, e.g., "CHE" for Switzerland).
- **year**   
     `integer` — Calendar year of the record.


### GDP &amp; Wealth


- **population**   
     `number` — Total population.
- **gdp_usd**   
     `number` — Nominal gross domestic product (GDP), normalized to USD.
- **gdp_per_capita_usd**   
     `number` — Real GDP per capita (constant prices), normalized to USD. `gdp_usd` / `population` is not expected to equal `gdp_per_capita_usd`. `gdp_usd` represents nominal GDP, while `gdp_per_capita_usd` is based on real GDP.
- **gdp_growth**   
     `number` — Year-over-year growth rate of nominal GDP.
- **gdp_per_capita_growth**   
     `number` — Year-over-year growth rate of real GDP per capita.


### Trade &amp; Balance


- **exports_usd**   
     `number` — Exports of goods and services, normalized to USD.
- **imports_usd**   
     `number` — Imports of goods and services, normalized to USD.
- **account_balance_usd**   
     `number` — Current account balance, normalized to USD.
- **account_balance_percent**   
     `number` — Current account balance as a percentage of GDP.
- **export_import_ratio**   
     `number` — Ratio of exports to imports.
- **account_balance_change**   
     `number` — Year-over-year relative change in the current account balance.


### Inflation &amp; Employment


- **unemployment_rate**   
     `number` — Unemployment rate as a percentage of the labor force.
- **inflation**   
     `number` — Annual inflation rate.
- **consumer_price_index**   
     `number` — Consumer Price Index (CPI).
- **deflator**   
     `number` — GDP deflator.
- **inflation_growth**   
     `number` — Year-over-year relative change in the inflation rate.


### Rates &amp; Currency


- **central_bank_interest_rate**   
     `number` — Central bank policy interest rate, annual average.
- **short_term_interest_rate**   
     `number` — Short-term market interest rate, annual average.
- **long_term_interest_rate**   
     `number` — Long-term market interest rate (e.g., 10-year government bond yield), annual average.
- **interest_rate_spread**   
     `number` — Difference between long-term and short-term interest rates, in percentage points.
- **exchange_rate_usd**   
     `number` — Official exchange rate (local currency per USD), annual average.
- **real_effective_exchange_rate**   
     `number` — Real effective exchange rate (REER) index.
- **exchange_rate_change**   
     `number` — Year-over-year relative change in the exchange rate.


### Government Finances


- **general_government_debt**   
     `number` — Gross general government debt, in local currency.
- **general_government_debt_to_gdp**   
     `number` — General government debt as a percentage of GDP.
- **general_government_debt_to_gdp_growth**   
     `number` — Year-over-year relative change in the debt-to-GDP ratio.
- **general_government_deficit**   
     `number` — General government budget balance (revenue minus expenditure), in local currency. 
    - Negative values indicate a deficit
    - Positive values indicate a surplus
- **general_government_deficit_to_gdp**   
     `number` — General government budget balance as a percentage of GDP. 
    - Negative values indicate a deficit
    - Positive values indicate a surplus
- **fiscal_balance_trend**   
     `number` — Year-over-year relative change in `general_government_deficit_to_gdp`.
- **general_government_revenue**   
     `number` — General government revenue, in local currency.
- **general_government_revenue_to_gdp**   
     `number` — General government revenue as a percentage of GDP.
- **general_government_tax_revenue_to_gdp**   
     `number` — Tax revenue as a percentage of GDP.
- **general_government_expenditure**   
     `number` — General government expenditure, in local currency.
- **general_government_expenditure_to_gdp**   
     `number` — General government expenditure as a percentage of GDP.


### Consumption &amp; Investment


- **household_consumption**   
     `number` — Household final consumption expenditure, in local currency.
- **government_consumption**   
     `number` — General government final consumption expenditure, in local currency.
- **gross_capital_formation**   
     `number` — Gross capital formation (total investment), in local currency.
- **gross_fixed_capital_formation**   
     `number` — Gross fixed capital formation (investment in fixed assets), in local currency.


### Example Response


```json
{
    "result": {
        "total_count": 1,
        "items_count": 1,
        "items": [
            {
                "country_iso3": "CHE",
                "year": 2026,
                "gdp_usd": 966355320340.284,
                "gdp_per_capita_usd": 86080.154106,
                "exports_usd": 904664631552.63,
                "imports_usd": 826937660755.981,
                "account_balance_usd": 47908911173.2118,
                "account_balance_percent": 4.232002,
                "deflator": 108.065291,
                "population": 9156561.053364,
                "unemployment_rate": 4.893447,
                "central_bank_interest_rate": 0.0625,
                "inflation": 0.660846,
                "consumer_price_index": 107.635787,
                "short_term_interest_rate": 0.021704,
                "long_term_interest_rate": 0.381666,
                "real_effective_exchange_rate": 103.878237,
                "exchange_rate_usd": 0.780372,
                "general_government_debt": 360642557949.615,
                "general_government_debt_to_gdp": 40.832447,
                "general_government_deficit": 3279238390.40076,
                "general_government_deficit_to_gdp": 0.371279,
                "general_government_revenue": 300533577290.674,
                "general_government_revenue_to_gdp": 34.026825,
                "general_government_expenditure": 297254338900.273,
                "general_government_expenditure_to_gdp": 33.655545,
                "general_government_tax_revenue_to_gdp": 27.703844,
                "household_consumption": 438413492133.993,
                "government_consumption": 105958051973.503,
                "gross_capital_formation": 278207337470.785,
                "gross_fixed_capital_formation": 230816714309.017,
                "gdp_growth": 0.01806,
                "gdp_per_capita_growth": 0.004418,
                "inflation_growth": 3.280118,
                "interest_rate_spread": 0.359962,
                "general_government_debt_to_gdp_growth": -0.014291,
                "fiscal_balance_trend": -0.31016,
                "export_import_ratio": 1.093993,
                "exchange_rate_change": -0.06109,
                "account_balance_change": -0.343597
            }
        ]
    }
}
```


## Units &amp; Formats

- Monetary fields with the **_usd** suffix are normalized to USD. Other monetary fields, such as **general_government_debt** and **household_consumption**, are expressed in the country's local currency.
- Fields ending in **_interest_rate** or **_to_gdp**, as well as **inflation**, **unemployment_rate**, and **account_balance_percent**, are expressed as percentages (e.g., 4.35 represents 4.35%).
- Fields ending in **_growth** or **_change**, as well as **fiscal_balance_trend**, are expressed as decimal values (e.g., 0.0614 represents 6.14%).
- Index fields (**consumer_price_index**, **deflator**, **real_effective_exchange_rate**) use base years that may vary by country and source. The base year is not provided in the API response. These fields are best used to track changes within the same country over time rather than for direct cross-country comparison.

## Pagination &amp; Limits

You can control how many records a response returns and page through large result sets using the limit and offset parameters.

- Use **limit** to set the number of records per request, from 1 to 1000. If **limit** is not specified, up to 100 records are returned.
- Use **offset** to skip records (0-based). For example, **limit**: 100 and **offset**: 100 return records 101–200.
- To retrieve all matching records, increase **offset** by the **limit** value until **offset** + **items_count** reaches **total_count**.
- To keep the order consistent across pages, pass **sort_by**, for example, by **country_iso3** and **year**.

## Related APIs

- [Macroeconomic Release Calendar API](https://developers.finimpulse.com/v1/market/calendars/)
- [Global Market Index Search API](https://developers.finimpulse.com/v1/market/index/)
- [Search API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/search/)
- [Historical Price Data API](https://developers.finimpulse.com/v1/histories/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
