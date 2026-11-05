---
title: Company, ETF &amp; Mutual Fund Profile API
created: 2026-01-13
updated: 2026-11-05
endpoint: POST v1/profile
auth: Bearer Token
---

# Company, ETF &amp; Mutual Fund Profile API

Returns company or fund profile data for one asset symbol, including description, classification, key officers, and fund fees. 

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint retrieves descriptive profile data for a single stock, ETF, or mutual fund, including contact details, sector and industry, business or fund description, key officers and governance scores for companies, and style, size, and fee details for funds.

## Coverage 

Asset TypesStocks, ETFs, mutual fundsMarket Regions~54Listings~360,000

Coverage figures are approximate and may change over time.

## Data Freshness

Data is returned as a snapshot. The time of the latest update is indicated by **update_time** and varies between assets.

## Asset Type Compatibility

This endpoint uses one response schema for stocks, ETFs, and mutual funds. Available data depends on the asset type:

- **Stocks**: address and contact details, sector and industry, business summary, employee count, key officers with compensation, and governance risk scores where available.
- **ETFs**: fund description, style box and size/style classification, net assets, YTD return, yield, expense ratio, and holdings turnover.
- **Mutual funds**: fund description, style box and size/style classification, net assets, YTD return, yield, last distributions, Morningstar rating, and expense ratios.

## Data Availability &amp; Limitations

Some fields may return **null**, an **empty string**, or an **empty array** if a specific value is not available for a given asset. This does not indicate an error. Some numeric fields may also return 0 when no value is available (e.g., **fees_expense_projection_3yr**).

## When to Use This Endpoint

- Build company profile pages for investment research platforms and brokerage apps.
- Add leadership and executive overviews to equity research tools.
- Power fund research and fund comparison tools for investors and financial advisors.
- Enrich portfolio trackers and watchlists with company and fund background information.
- Provide context for AI assistants and research copilots answering questions about specific assets.

## Request Parameters
**POST** `v1/profile` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/profile" \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer <API_TOKEN>" \
  -d '{
      "symbol": "NVDA",
      "tag": "just tag"
  }'
```


```clike
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

var client = new HttpClient();
var url = "https://api.finimpulse.com/v1/profile";

client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "<API_TOKEN>");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var json = @"{
    ""symbol"": ""NVDA"",
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
  CURLOPT_URL => "https://api.finimpulse.com/v1/profile",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer <API_TOKEN>"
  ],
  CURLOPT_POSTFIELDS => json_encode(
[
      "symbol" => "NVDA",
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

url = "https://api.finimpulse.com/v1/profile"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_TOKEN>"
}
data = {
    "symbol": "NVDA",
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

const req = https.request('https://api.finimpulse.com/v1/profile', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response returns an items array with a single profile record for the requested symbol.

### Pagination Fields


- **total_count**   
     `integer` — Total number of matching items.
- **items**   
     `array` — Array of profile records. Typically a single item for the requested symbol.


### General Information


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **currency**   
     `string` — Trading currency.


### Address and Contact Details


- **address_1**   
     `string` — Address line 1 (or primary address string when provided as a single line).
- **city**   
     `string` — City.
- **state**   
     `string` — State or region.
- **zip**   
     `string` — Postal code.
- **country**   
     `string` — Country.
- **phone**   
     `string` — Primary phone number.
- **website**   
     `string` — Official website URL.


### Sector and Industry


- **industry**   
     `string` — Industry classification.
- **industry_key**   
     `string` — Normalized industry key.
- **industry_disp**   
     `string` — Display-friendly industry label.
- **sector**   
     `string` — Sector classification.
- **sector_key**   
     `string` — Normalized sector key.
- **sector_disp**   
     `string` — Display-friendly sector label.


### Business/Fund Description


- **long_business_summary**   
     `string` — Long-form company description (stocks) or investment objective summary (funds).


### Company Size &amp; People


- **full_time_employees**   
     `integer` — Number of full-time employees.
- **company_officers**   
     `array` — Array of company officer records. 
    - **name**   
         `string` — Officer name.
    - **age**   
         `integer` — Officer age.
    - **title**   
         `string` — Officer role.
    - **year_born**   
         `integer` — Birth year.
    - **fiscal_year**   
         `integer` — Fiscal year for record.
    - **total_pay**   
         `integer` — Total compensation for the fiscal year.
    - **exercised_value**   
         `number` — Exercised value.


### Governance Dates &amp; Links


- **governance_epoch_date**   
     `string` — Governance dataset reference date.
- **compensation_as_of_epoch_date**   
     `string` — Compensation dataset reference date.
- **ir_website**   
     `string` — Investor relations website URL.


### Governance Risk Indicators


- **governance_audit_risk**   
     `integer` — Governance audit risk score.
- **governance_board_risk**   
     `integer` — Governance board risk score.
- **governance_compensation_risk**   
     `integer` — Governance compensation risk score.
- **governance_shareholder_rights_risk**   
     `integer` — Governance shareholder rights risk score.
- **governance_overall_risk**   
     `integer` — Overall governance risk score.


### Fund Style &amp; Classification


- **style_box_url**   
     `string` — Style box image URL.
- **company_size**   
     `string` — Size classification (e.g., large, medium).
- **investment_valuation_style**   
     `string` — Investment valuation style classification (e.g., value, blend).


### Fund Size &amp; Distribution


- **net_assets**   
     `integer` — Total net assets under management.
- **ytd_return**   
     `number` — Year-to-date (YTD) return.
- **yield**   
     `number` — Fund distribution yield.
- **last_dividend**   
     `number` — Last dividend amount.
- **last_cap_gain**   
     `number` — Last capital gains distribution amount.
- **morning_star_rating**   
     `integer` — Morningstar rating.


### Fees &amp; Expenses


- **fees_annual_report_expense_ratio**   
     `number` — Annual report expense ratio.
- **fees_annual_holdings_turnover**   
     `number` — Annual holdings turnover.
- **fees_total_net_assets**   
     `number` — Total net assets.
- **fees_net_exp_ratio**   
     `number` — Net expense ratio.
- **fees_gross_exp_ratio**   
     `number` — Gross expense ratio.
- **fees_twelve_b_one**   
     `number` — 12b-1 distribution fee.
- **fees_front_end_sales_load**   
     `number` — Front-end sales load.
- **fees_deferred_sales_load**   
     `number` — Deferred sales load.
- **fees_expense_projection_3yr**   
     `number` — Projected cumulative expenses over 3 years.
- **fees_expense_projection_5yr**   
     `number` — Projected cumulative expenses over 5 years.
- **fees_expense_projection_10yr**   
     `number` — Projected cumulative expenses over 10 years.
- **fees_annual_report_expense_ratio_cat**   
     `number` — Category average annual report expense ratio.
- **fees_annual_holdings_turnover_cat**   
     `number` — Category average annual holdings turnover.
- **fees_total_net_assets_cat**   
     `number` — Category average total net assets.
- **fees_net_exp_ratio_cat**   
     `number` — Category average net expense ratio.
- **fees_gross_exp_ratio_cat**   
     `number` — Category average gross expense ratio.
- **fees_twelve_b_one_cat**   
     `number` — Category average 12b-1 distribution fee.
- **fees_front_end_sales_load_cat**   
     `number` — Category average front-end sales load.
- **fees_deferred_sales_load_cat**   
     `number` — Category average deferred sales load.
- **fees_expense_projection_3yr_cat**   
     `number` — Category average projected cumulative expenses over 3 years.
- **fees_expense_projection_5yr_cat**   
     `number` — Category average projected cumulative expenses over 5 years.
- **fees_expense_projection_10yr_cat**   
     `number` — Category average projected cumulative expenses over 10 years.


### Metadata


- **update_time**   
     `string` — Timestamp of the most recent data update (ISO 8601).


### Example Response


```json
{
    "result": {
        "total_count": 1,
        "items": [
            {
                "symbol": "NVDA",
                "quote_type": "stock",
                "currency": "USD",
                "address_1": "2788 San Tomas Expressway",
                "city": "Santa Clara",
                "state": "CA",
                "zip": "95051",
                "country": "United States",
                "phone": "408 486 2000",
                "website": "https://www.nvidia.com",
                "industry": "Semiconductors",
                "industry_key": "semiconductors",
                "industry_disp": "Semiconductors",
                "sector": "Technology",
                "sector_key": "technology",
                "sector_disp": "Technology",
                "long_business_summary": "NVIDIA Corporation, a computing infrastructure company, provides graphics and compute and networking solutions in the United States, Singapore, Taiwan, China, Hong Kong, and internationally. The Compute & Networking segment includes its Data Centre accelerated computing platforms and artificial intelligence solutions and software; networking; automotive platforms and autonomous and electric vehicle solutions; Jetson for robotics and other embedded platforms; and DGX Cloud computing services. The Graphics segment offers GeForce GPUs for gaming and PCs, the GeForce NOW game streaming service and related infrastructure, and solutions for gaming platforms; Quadro/NVIDIA RTX GPUs for enterprise workstation graphics; virtual GPU or vGPU software for cloud-based visual and virtual computing; automotive platforms for infotainment systems; and Omniverse software for building and operating industrial AI and digital twin applications. It also customized agentic solutions designed in collaboration with NVIDIA to accelerate enterprise AI adoption. The company's products are used in gaming, professional visualization, data center, and automotive markets. It sells its products to original equipment manufacturers, original device manufacturers, system integrators and distributors, independent software vendors, cloud service providers, consumer internet companies, add-in board manufacturers, distributors, automotive manufacturers and tier-1 automotive suppliers, and other ecosystem participants. The company has a strategic partnership with Siemens Aktiengesellschaft to develop industrial and physical AI solutions for AI-driven innovation to every industry and industrial workflow. NVIDIA Corporation was incorporated in 1993 and is headquartered in Santa Clara, California.",
                "full_time_employees": 36000,
                "company_officers": [
                    {
                        "name": "Mr. Jen-Hsun  Huang",
                        "age": 62,
                        "title": "Co-Founder, CEO, President & Director",
                        "year_born": 1963,
                        "fiscal_year": 2025,
                        "total_pay": 11054945,
                        "exercised_value": 0
                    },
                    {
                        "name": "Ms. Colette M. Kress",
                        "age": 58,
                        "title": "Executive VP & CFO",
                        "year_born": 1967,
                        "fiscal_year": 2025,
                        "total_pay": 1512641,
                        "exercised_value": 0
                    },
                    {
                        "name": "Ms. Debora  Shoquist",
                        "age": 70,
                        "title": "Executive Vice President of Operations",
                        "year_born": 1955,
                        "fiscal_year": 2025,
                        "total_pay": 1379071,
                        "exercised_value": 0
                    },
                    {
                        "name": "Mr. Timothy S. Teter J.D.",
                        "age": 58,
                        "title": "Executive VP, General Counsel & Secretary",
                        "year_born": 1967,
                        "fiscal_year": 2025,
                        "total_pay": 1362989,
                        "exercised_value": 0
                    },
                    {
                        "name": "Mr. Ajay K. Puri",
                        "age": 70,
                        "title": "Executive Vice President of Worldwide Field Operations",
                        "year_born": 1955,
                        "fiscal_year": 2025,
                        "total_pay": 2313851,
                        "exercised_value": 0
                    },
                    {
                        "name": "Mr. Chris A. Malachowsky",
                        "age": null,
                        "title": "Co-Founder",
                        "year_born": null,
                        "fiscal_year": 2025,
                        "total_pay": 320000,
                        "exercised_value": 0
                    },
                    {
                        "name": "Mr. Donald F. Robertson Jr.",
                        "age": 56,
                        "title": "VP & Chief Accounting Officer",
                        "year_born": 1969,
                        "fiscal_year": 2025,
                        "total_pay": null,
                        "exercised_value": 0
                    },
                    {
                        "name": "Prof. William J. Dally Ph.D.",
                        "age": 64,
                        "title": "Chief Scientist & Senior VP of Research",
                        "year_born": 1961,
                        "fiscal_year": 2025,
                        "total_pay": null,
                        "exercised_value": 0
                    },
                    {
                        "name": "Mr. Toshiya  Hari",
                        "age": null,
                        "title": "Vice President of Investor Relations & Strategic Finance",
                        "year_born": null,
                        "fiscal_year": 2025,
                        "total_pay": null,
                        "exercised_value": 0
                    },
                    {
                        "name": "Ms. Mylene  Mangalindan",
                        "age": null,
                        "title": "VP of Corporate Communications",
                        "year_born": null,
                        "fiscal_year": 2025,
                        "total_pay": null,
                        "exercised_value": 0
                    }
                ],
                "governance_epoch_date": "2026-02-01T00:00:00Z",
                "compensation_as_of_epoch_date": "2025-12-31T00:00:00Z",
                "ir_website": "http://phx.corporate-ir.net/phoenix.zhtml?c=116466&p=irol-IRHome",
                "governance_audit_risk": 5,
                "governance_board_risk": 9,
                "governance_compensation_risk": 4,
                "governance_shareholder_rights_risk": 8,
                "governance_overall_risk": 8,
                "style_box_url": "",
                "company_size": null,
                "investment_valuation_style": null,
                "net_assets": null,
                "ytd_return": null,
                "yield": null,
                "last_dividend": 0.01,
                "last_cap_gain": null,
                "morning_star_rating": null,
                "fees_annual_report_expense_ratio": null,
                "fees_annual_holdings_turnover": null,
                "fees_total_net_assets": null,
                "fees_net_exp_ratio": null,
                "fees_gross_exp_ratio": null,
                "fees_twelve_b_one": null,
                "fees_front_end_sales_load": null,
                "fees_deferred_sales_load": null,
                "fees_expense_projection_3yr": null,
                "fees_expense_projection_5yr": null,
                "fees_expense_projection_10yr": null,
                "fees_annual_report_expense_ratio_cat": null,
                "fees_annual_holdings_turnover_cat": null,
                "fees_total_net_assets_cat": null,
                "fees_net_exp_ratio_cat": null,
                "fees_gross_exp_ratio_cat": null,
                "fees_twelve_b_one_cat": null,
                "fees_front_end_sales_load_cat": null,
                "fees_deferred_sales_load_cat": null,
                "fees_expense_projection_3yr_cat": null,
                "fees_expense_projection_5yr_cat": null,
                "fees_expense_projection_10yr_cat": null,
                "update_time": "2026-02-03T14:02:10Z"
            }
        ]
    }
}
```


## Units and Formats

Percent-like fields are returned as decimal values (e.g., 0.0095 represents 0.95%), including **ytd_return**, yield, expense ratios, holdings turnover, and sales loads.

## Related APIs

- [Summary Data API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary/)
- [Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary-lite/)
- [Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Company Insider Roster &amp; Activity API](https://developers.finimpulse.com/v1/holders/insiders/)
- [Institutional &amp; Insider Ownership API for Stocks](https://developers.finimpulse.com/v1/holders/general/)
- [ETF &amp; Mutual Fund Holdings Overview API](https://developers.finimpulse.com/v1/holdings/general/)
- [ETF &amp; Mutual Fund Annual Returns API](https://developers.finimpulse.com/v1/statistics/annual-returns/)
- [Financial News API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/news/)

## Build with this API

- [Build Rich Company Pages Using Company Profile API](https://finimpulse.com/rest-api-use-cases/company-profile-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
