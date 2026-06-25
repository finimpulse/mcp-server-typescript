---
title: Profile
created: 2026-01-13
updated: 2026-02-06
endpoint: POST v1/profile
auth: Bearer Token
---

# Profile

Returns a profile and descriptive metadata for an asset, including identity, classification, governance fields, and fund-specific attributes where applicable.

This endpoint acts as a unified profile snapshot. It combines company identity (for stocks), descriptive fund profile (for ETFs and mutual funds), and standardized governance placeholders where available.

## Asset Type Compatibility
The set of returned profile fields varies by asset class.

- **Stocks:** Returns a complete company profile, including headquarters, website, sector/industry classification, business summary, employee count, key officers, investor relations website, and governance risk scores.
- **ETFs:** Returns a fund profile including fund description, style box, size/style classification, assets under management, yield, YTD return (when available), and fees/turnover fields. Company-specific fields (such as sector/industry, officers, and employee count) are generally not applicable.
- **Mutual funds:** Returns a fund profile including fund description, style box, size/style classification, net assets, yield, last distribution values, Morningstar rating (when available), and detailed fee fields including category-relative comparisons.

## When to Use This Endpoint
- Retrieve identity and descriptive metadata for an asset.
- Populate the **Profile** tab (company/fund overview, description, classification).
- Display fund characteristics, including net assets, yield, style box, and fees.
- Display governance risk indicators and officer list for equities where available.

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
### Pagination Fields


- **total_count**   
     `integer` — Total number of matching items.
- **items**   
     `array` — Array of profile records (typically a single item for the requested symbol).


### General Information

General identification and taxonomy fields.


- **symbol**   
     `string` — Asset symbol.
- **quote_type**   
     `string` — Asset type classification (stock, ETF, mutual fund).
- **currency**   
     `string` — Trading currency for the asset profile record.


### Address and Contact Details

Location and contact information (primarily for stocks). For funds, these fields may be *null*.


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

Company classification fields (primarily for stocks). For ETFs and mutual funds, these fields are typically *null*.


- **industry**   
     `string` — Industry name.
- **industry_key**   
     `string` — Normalized industry key.
- **industry_disp**   
     `string` — Display-friendly industry label.
- **sector**   
     `string` — Sector name.
- **sector_key**   
     `string` — Normalized sector key.
- **sector_disp**   
     `string` — Display-friendly sector label.


### Business/Fund Description


- **long_business_summary**   
     `string` — Company or fund long description/investment objective summary.


### Company Size &amp; People

Fields that describe organization size and key executives (stocks). Returned as *empty/null* for funds.


- **full_time_employees**   
     `integer` — Number of full-time employees (stocks).
- **company_officers**   
     `array` — Array of company officer records (stocks). For ETFs and mutual funds is typically returned as an empty array. 
    - **name**   
         `string` — Officer name.
    - **age**   
         `integer` — Officer age.
    - **title**   
         `string` — Officer title/role.
    - **year_born**   
         `integer` — Birth year.
    - **fiscal_year**   
         `integer` — Fiscal year for compensation record.
    - **total_pay**   
         `integer` — Total compensation for the fiscal year.
    - **exercised_value**   
         `number` — Exercised option value (if available in source).


### Governance Dates &amp; Links

Governance, compensation, timestamps, and investor relations link. Some assets return placeholder epoch dates (e.g., 1900-01-01) when governance datasets are not available.


- **governance_epoch_date**   
     `string` — Governance dataset reference date.
- **compensation_as_of_epoch_date**   
     `string` — Compensation dataset reference date.
- **ir_website**   
     `string` — Investor relations website (stocks).


### Governance Risk Indicators

Governance risk scores, when available (primarily for stocks). For funds, these are commonly *null*.


- **governance_audit_risk**   
     `integer` — Audit risk score.
- **governance_board_risk**   
     `integer` — Board risk score.
- **governance_compensation_risk**   
     `integer` — Compensation risk score.
- **governance_shareholder_rights_risk**   
     `integer` — Shareholder rights risk score.
- **governance_overall_risk**   
     `integer` — Overall governance risk score.


### Fund Style &amp; Classification


- **style_box_url**   
     `string` — Style box image URL.
- **company_size**   
     `string` — Size classification (e.g., large, medium).
- **investment_valuation_style**   
     `string` — Style classification (e.g., value, blend).


### Fund Size &amp; Distribution

Fund-level size and distribution metrics. Availability varies by fund type.


- **net_assets**   
     `integer` — Net assets/assets under management.
- **ytd_return**   
     `number` — Year-to-date return (when available).
- **yield**   
     `number` — Yield (fund distribution yield when available).
- **last_dividend**   
     `number` — Last dividend/distribution amount.
- **last_cap_gain**   
     `number` — Last capital gains distribution amount (if applicable).
- **morning_star_rating**   
     `integer` — Morningstar rating (if available).


### Fees &amp; Expenses (Funds)


- **fees_annual_report_expense_ratio**   
     `number` — Annual report expense ratio.
- **fees_annual_holdings_turnover**   
     `number` — Annual holdings turnover.
- **fees_total_net_assets**   
     `number` — Total net assets used in the fee dataset context.
- **fees_net_exp_ratio**   
     `number` — Net expense ratio.
- **fees_gross_exp_ratio**   
     `number` — Gross expense ratio.
- **fees_twelve_b_one**   
     `number` — 12b-1 fee.
- **fees_front_end_sales_load**   
     `number` — Front-end sales load.
- **fees_deferred_sales_load**   
     `number` — Deferred sales load.
- **fees_expense_projection_3yr**   
     `number` — Expense projection (3 years).
- **fees_expense_projection_5yr**   
     `number` — Expense projection (5 years).
- **fees_expense_projection_10yr**   
     `number` — Expense projection (10 years).
- **fees_annual_report_expense_ratio_cat**   
     `number` — Category annual report expense ratio.
- **fees_annual_holdings_turnover_cat**   
     `number` — Category annual holdings turnover.
- **fees_total_net_assets_cat**   
     `number` — Category total net assets reference.
- **fees_net_exp_ratio_cat**   
     `number` — Category net expense ratio.
- **fees_gross_exp_ratio_cat**   
     `number` — Category gross expense ratio.
- **fees_twelve_b_one_cat**   
     `number` — Category 12b-1 fee.
- **fees_front_end_sales_load_cat**   
     `number` — Category front-end sales load.
- **fees_deferred_sales_load_cat**   
     `number` — Category deferred sales load.
- **fees_expense_projection_3yr_cat**   
     `number` — Category expense projection (3 years).
- **fees_expense_projection_5yr_cat**   
     `number` — Category expense projection (5 years).
- **fees_expense_projection_10yr_cat**   
     `number` — Category expense projection (10 years).


### Example Response


```json
{
    "task_id": "46c212e6-ff5d-4f30-9d29-cd4acdeded52",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0004,
    "data": {
        "symbol": "NVDA",
        "tag": "just tag"
    },
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


## Notes
- Fields that are not relevant for a given asset type are returned as *null*.
- Field-level definitions and calculation rules are available in the [**Glossary**](https://finimpulse.com/glossary/).
