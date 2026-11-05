---
title: Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds
created: 2026-06-18
updated: 2026-11-03
endpoint: POST v1/summary-lite
auth: Bearer Token
---

# Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds

Returns a compact snapshot of profile, price, and key valuation data for one asset symbol.

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint retrieves a focused snapshot for a single stock, ETF, or mutual fund, including basic profile details, current price, the 52-week range, dividends, average volume, market capitalization, and key valuation ratios. You can limit the returned fields using the **select_identifiers** parameter to reduce response size.

For a broader field set that includes financial highlights, ownership, analyst coverage, and fund performance, use the [Summary Data API](https://developers.finimpulse.com/v1/summary/).

## Coverage 

Asset TypesStocks, ETFs, mutual fundsMarket Regions~55Listings~650,000

Coverage figures are approximate and may change over time.

## Data Freshness

Price fields (**current_price** and fields ending in **_usd**) and market_cap are delayed by up to one hour. Other fields are updated periodically, depending on the asset, and may not reflect current market data.

## Asset Type Compatibility

This endpoint uses one response schema for stocks, ETFs, and mutual funds. Available data depends on the asset type:

- **Stocks**: company profile, pricing, 52-week range, dividends, average volume, market capitalization, beta, and valuation ratios.
- **ETFs**: basic identification, pricing, 52-week range, and average volume.
- **Mutual funds**: basic identification, pricing, and 52-week range.

## Data Availability &amp; Limitations

Some fields may return **null** or an **empty string** if a specific value is not available for a given asset. This does not indicate an error.

## When to Use This Endpoint

- Populate asset detail views, widgets, or dashboards with sector, current price, market cap, and key valuation ratios.
- Show a quick asset preview, such as in search results or on hover, before the user opens the full asset page.
- Provide AI assistants with a compact asset profile for quick lookups.
- Reduce response size by requesting only the required fields through **select_identifiers**.

## Request Parameters

**POST** `v1/summary-lite` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **select_identifiers**   
     `array` *(optional)* — A list of field names to include in the response. 
    - When provided, each response contains only the specified fields.
    - When not provided or set to *null*, the full field set is returned.
     
     `symbol` and `logo` are always returned regardless of the value passed. For the list of available field names, see the Response section below.
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/summary-lite" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "select_identifiers": [
          "display_name",
          "sector",
          "current_price",
          "current_price_usd",
          "fifty_two_week_low",
          "fifty_two_week_high",
          "dividend_yield",
          "market_cap",
          "valuation_measures_pe_ratio"
      ],
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/summary-lite";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
    ""select_identifiers"": [
        ""display_name"",
        ""sector"",
        ""current_price"",
        ""current_price_usd"",
        ""fifty_two_week_low"",
        ""fifty_two_week_high"",
        ""dividend_yield"",
        ""market_cap"",
        ""valuation_measures_pe_ratio""
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/summary-lite",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
      "select_identifiers" => [
        "display_name",
        "sector",
        "current_price",
        "current_price_usd",
        "fifty_two_week_low",
        "fifty_two_week_high",
        "dividend_yield",
        "market_cap",
        "valuation_measures_pe_ratio"
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

url = "https://api.finimpulse.com/v1/summary-lite"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
    "select_identifiers": [
        "display_name",
        "sector",
        "current_price",
        "current_price_usd",
        "fifty_two_week_low",
        "fifty_two_week_high",
        "dividend_yield",
        "market_cap",
        "valuation_measures_pe_ratio"
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
    "select_identifiers": [
        "display_name",
        "sector",
        "current_price",
        "current_price_usd",
        "fifty_two_week_low",
        "fifty_two_week_high",
        "dividend_yield",
        "market_cap",
        "valuation_measures_pe_ratio"
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

const req = https.request('https://api.finimpulse.com/v1/summary-lite', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response

The response returns a single summary object for the requested symbol.

Note that the returned fields depend on whether **select_identifiers** is provided and which fields are specified. All available fields are listed below.

### Identity &amp; Classification


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **logo**   
     `string` — URL of the company or fund logo image.
- **display_name**   
     `string` — Asset display name.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **full_time_employees**   
     `integer` — Number of full-time employees.


### Address &amp; Contact


- **city**   
     `string` — City.
- **country**   
     `string` — Country.
- **website**   
     `string` — Official website URL.


### Sector &amp; Industry Classification


- **sector**   
     `string` — Sector classification.
- **industry**   
     `string` — Industry classification.


### Price Data


- **current_price**   
     `number` — Most recent traded price. May reflect a delay of up to one hour.
- **current_price_usd**   
     `number` — Most recent traded price, normalized to USD. May reflect a delay of up to one hour.
- **regular_market_price_usd**   
     `number` — Active price during the regular trading session and at market close, normalized to USD. For US-listed assets, returns the closing price during pre-market and post-market hours.
- **pre_market_price_usd**   
     `number` — Active price during the pre-market session, normalized to USD. Outside pre-market hours, returns the last traded pre-market price. Returns *null* if no pre-market data is available.
- **post_market_price_usd**   
     `number` — Active price during the post-market session, normalized to USD. Outside post-market hours, returns the last traded post-market price. Returns *null* if no post-market data is available.
- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.


### Dividends &amp; Distributions


- **dividend_rate**   
     `number` — Forward dividend rate.
- **dividend_yield**   
     `number` — Forward dividend yield.


### Market &amp; Risk Metrics


- **average_volume**   
     `integer` — Average trading volume.
- **average_volume_10days**   
     `integer` — Average volume over the last 10 trading days.
- **market_cap**   
     `number` — Market capitalization.
- **beta**   
     `number` — Beta.


### Valuation Measures


- **valuation_measures_pe_ratio**   
     `number` — Price-to-earnings (P/E) ratio from valuation measures dataset.
- **valuation_measures_forward_pe_ratio**   
     `number` — Forward price-to-earnings (P/E) ratio from valuation measures dataset.
- **valuation_measures_pb_ratio**   
     `number` — Price-to-book (P/B) ratio from valuation measures dataset.
- **valuation_measures_ps_ratio**   
     `number` — Price-to-sales (P/S) ratio from valuation measures dataset.


### Example Response


```json
{
    "result": {
        "symbol": "NVDA",
        "display_name": "NVIDIA",
        "quote_type": "equity",
        "logo": "https://cdn.finimpulse.com/f77c41e6-f5cd-653b-1d73-b179528f1095",
        "sector": "Technology",
        "industry": "Semiconductors",
        "country": "United States",
        "city": "Santa Clara",
        "website": "https://www.nvidia.com",
        "full_time_employees": 42000,
        "current_price": 198.45,
        "current_price_usd": 198.45,
        "regular_market_price_usd": 200.09,
        "pre_market_price_usd": null,
        "post_market_price_usd": 199.53,
        "fifty_two_week_low": 151.49,
        "fifty_two_week_high": 236.54,
        "dividend_rate": 1,
        "dividend_yield": 0.0052,
        "average_volume": 161454953,
        "average_volume_10days": 151372830,
        "market_cap": 4846379859968,
        "beta": 2.202,
        "valuation_measures_pe_ratio": 47.309406,
        "valuation_measures_forward_pe_ratio": 24.9377,
        "valuation_measures_pb_ratio": 39.069308,
        "valuation_measures_ps_ratio": 25.106609
    }
}
```


## Units and Formats

- **dividend_yield** is returned as a decimal value (e.g., 0.0049 represents 0.49%).
- For listings quoted in minor currency units (e.g., GBp), **market_cap** and **dividend_rate** are expressed in the major unit (e.g., GBP).

## Related APIs

- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Lightweight Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search-lite/)
- [Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Company, ETF &amp; Mutual Fund Profile API](https://developers.finimpulse.com/v1/profile/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)

## Build with this API

- [Build Asset Overview Pages Using Summary API](https://finimpulse.com/rest-api-use-cases/ticker-summary-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
