---
title: Annual Returns
created: 2025-12-19
updated: 2026-02-06
endpoint: POST v1/statistics/annual-returns
auth: Bearer Token
---

# Annual Returns

Returns historical annual total returns for an asset by calendar year.

The returned dataset depends on the asset type and the availability of historical performance data.

- **ETFs:** Annual total returns are available and returned as asset-level values. Category comparison values may be provided when applicable.
- **Mutual funds:** Annual returns may be available at the fund or category level, depending on data coverage and the fund's history.
- **Stocks:** This endpoint returns an empty result. Annual total return history is not provided for individual stocks.

An empty result indicates that annual return data does not exist for the requested asset; it is not a request error.

## When to Use This Endpoint
- Analyze long-term historical performance of ETFs and mutual funds.
- Compare asset annual returns against category averages where available.
- Identify the best and worst calendar years in an asset’s return history.
- Build performance tables and historical return breakdowns.

## Request Parameters
**POST** `v1/statistics/annual-returns` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/statistics/annual-returns" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "FARMX",
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/statistics/annual-returns";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""FARMX"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/statistics/annual-returns",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "FARMX",
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

url = "https://api.finimpulse.com/v1/statistics/annual-returns"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "FARMX",
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
    "symbol": "FARMX",
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

const req = https.request('https://api.finimpulse.com/v1/statistics/annual-returns', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response is an array, with each item representing a single calendar year and its corresponding return values.

- **year**   
     `integer` — Calendar year.
- **annual_value**   
     `number` — Total return of the asset for the given year.
- **annual_category_value**   
     `number` — Average return of the asset’s category for the same year, when available.
- **q1**   
     `number` — First quarter return.
- **q2**   
     `number` — Second quarter return.
- **q3**   
     `number` — Third quarter return.
- **q4**   
     `number` — Fourth quarter return.


### Example Response


```json
{
    "task_id": "a2b2c370-0844-467d-aa9c-efb4ce3e3539",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0008,
    "data": {
        "symbol": "FARMX",
        "tag": "just_tag"
    },
    "result": [
        {
            "year": 1970,
            "annual_value": null,
            "annual_category_value": -0.0236626,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1971,
            "annual_value": null,
            "annual_category_value": 0.0885142,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1972,
            "annual_value": null,
            "annual_category_value": 0.18780251,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1973,
            "annual_value": null,
            "annual_category_value": -0.0391198,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1974,
            "annual_value": null,
            "annual_category_value": -0.2815946,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1975,
            "annual_value": null,
            "annual_category_value": 0.17355369,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1976,
            "annual_value": null,
            "annual_category_value": 0.2118497,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1977,
            "annual_value": null,
            "annual_category_value": -0.0399922,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1978,
            "annual_value": null,
            "annual_category_value": 0.1206627,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1979,
            "annual_value": null,
            "annual_category_value": 0.5974765,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1980,
            "annual_value": null,
            "annual_category_value": 0.560886,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1981,
            "annual_value": null,
            "annual_category_value": -0.17448491,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1982,
            "annual_value": null,
            "annual_category_value": -0.1417235,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1983,
            "annual_value": null,
            "annual_category_value": 0.2360813,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1984,
            "annual_value": null,
            "annual_category_value": -0.1040572,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1985,
            "annual_value": null,
            "annual_category_value": 0.1562369,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1986,
            "annual_value": null,
            "annual_category_value": 0.0955509,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1987,
            "annual_value": null,
            "annual_category_value": 0.0917261,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1988,
            "annual_value": null,
            "annual_category_value": 0.09791569,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1989,
            "annual_value": null,
            "annual_category_value": 0.3033599,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1990,
            "annual_value": null,
            "annual_category_value": -0.08409259,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1991,
            "annual_value": null,
            "annual_category_value": 0.0426516,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1992,
            "annual_value": null,
            "annual_category_value": 0.0305446,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1993,
            "annual_value": null,
            "annual_category_value": 0.23331381,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1994,
            "annual_value": null,
            "annual_category_value": -0.018946,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1995,
            "annual_value": null,
            "annual_category_value": 0.2047805,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1996,
            "annual_value": null,
            "annual_category_value": 0.3284602,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1997,
            "annual_value": null,
            "annual_category_value": 0.0335362,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1998,
            "annual_value": null,
            "annual_category_value": -0.24868059,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 1999,
            "annual_value": null,
            "annual_category_value": 0.306414,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2000,
            "annual_value": null,
            "annual_category_value": 0.29493868,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2001,
            "annual_value": null,
            "annual_category_value": -0.1044372,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2002,
            "annual_value": null,
            "annual_category_value": -0.0080183,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2003,
            "annual_value": null,
            "annual_category_value": 0.3276374,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2004,
            "annual_value": null,
            "annual_category_value": 0.2746854,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2005,
            "annual_value": null,
            "annual_category_value": 0.38200063,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2006,
            "annual_value": null,
            "annual_category_value": 0.1053341,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2007,
            "annual_value": null,
            "annual_category_value": 0.37115318,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2008,
            "annual_value": null,
            "annual_category_value": -0.48793757,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2009,
            "annual_value": null,
            "annual_category_value": 0.4847942,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2010,
            "annual_value": null,
            "annual_category_value": 0.1806398,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2011,
            "annual_value": null,
            "annual_category_value": -0.1396783,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2012,
            "annual_value": null,
            "annual_category_value": 0.0433783,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2013,
            "annual_value": null,
            "annual_category_value": 0.0874915,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2014,
            "annual_value": null,
            "annual_category_value": -0.1248112,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2015,
            "annual_value": null,
            "annual_category_value": -0.2215839,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2016,
            "annual_value": null,
            "annual_category_value": 0.26691732,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2017,
            "annual_value": null,
            "annual_category_value": 0.1661441,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2018,
            "annual_value": null,
            "annual_category_value": -0.19010259,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2019,
            "annual_value": null,
            "annual_category_value": 0.14954549,
            "q1": null,
            "q2": null,
            "q3": null,
            "q4": null
        },
        {
            "year": 2020,
            "annual_value": null,
            "annual_category_value": 0.1636969,
            "q1": 0.14520569,
            "q2": 0.21470869,
            "q3": null,
            "q4": null
        },
        {
            "year": 2021,
            "annual_value": 0.2334238,
            "annual_category_value": null,
            "q1": 0.1943717,
            "q2": -0.0054795,
            "q3": -0.0287066,
            "q4": 0.0690761
        },
        {
            "year": 2022,
            "annual_value": 0.1369438,
            "annual_category_value": null,
            "q1": 0.1934794,
            "q2": -0.1742051,
            "q3": 0.0317784,
            "q4": 0.1180609
        },
        {
            "year": 2023,
            "annual_value": -0.1159814,
            "annual_category_value": null,
            "q1": -0.0266413,
            "q2": -0.0596285,
            "q3": -0.0520297,
            "q4": 0.0188127
        },
        {
            "year": 2024,
            "annual_value": -0.0484912,
            "annual_category_value": null,
            "q1": 0.0239913,
            "q2": -0.0761448,
            "q3": 0.0566255,
            "q4": -0.0480994
        },
        {
            "year": 2025,
            "annual_value": 0.0799892,
            "annual_category_value": null,
            "q1": 0.0363423,
            "q2": 0.0984163,
            "q3": -0.0415647,
            "q4": -0.01011109
        }
    ]
}
```


Quarterly values may be **null** when quarterly data is not available or not applicable.

## Notes
- Returns are expressed as decimal values (e.g., 0.25 represents a 25% return).
- **annual_value** and **annual_category_value** may be null depending on historical coverage and asset type.
- Calendar-year availability varies by asset's inception date and data source.
- Quarterly breakdowns are optional and may not be present for all assets or years.
