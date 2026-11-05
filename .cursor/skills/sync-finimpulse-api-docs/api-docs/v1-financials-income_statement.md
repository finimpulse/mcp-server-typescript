---
title: Stock Income Statement API
created: 2026-01-23
updated: 2026-11-03
endpoint: POST v1/financials/income_statement
auth: Bearer Token
---

# Stock Income Statement API

Returns detailed Income Statement data for stocks and some funds, including revenue, expenses, and net income for the selected period. 

This endpoint covers line-item revenue, expense, and net income data for the selected reporting periods.

Financial statements data covers over 85,000 tickers. Coverage starts from **September 30, 2021**, subject to availability per company. The full list of covered symbols is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/06/tickers_with_financials.csv).

## When to Use This Endpoint
- Populate the “Income Statement” section of the Financials views.
- Retrieve multi-interval reporting series (trailing, quarterly, annual) for financial modeling, charting, or benchmarking.

## Request Parameters
**POST** `v1/financials/income_statement` 

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
curl --location "https://api.finimpulse.com/v1/financials/income_statement" \
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
var url = "https://api.finimpulse.com/v1/financials/income_statement";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/financials/income_statement",
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

url = "https://api.finimpulse.com/v1/financials/income_statement"
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

const req = https.request('https://api.finimpulse.com/v1/financials/income_statement', options, (res) => {
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
     `array` — Array of statement records. It is a unified list where each element represents one report snapshot for a requested `interval` and `date`. Note that many fields can be *null* depending on the reporting format, company structure, or data limitations.


### Snapshot Info


- **type**   
     `string` — Snapshot type (income_statement expected).
- **report_key**   
     `string` — Unique identifier of the report this item belongs to. Format: `interval|date`.
- **interval**   
     `string` — Reporting frequency (trailing/quarterly/annual).
- **date**   
     `string` — End date of the reporting period.


### Total Revenue


- **total_revenue**   
     `number` — Total revenue for the period.
- **operating_revenue**   
     `number` — Operating revenue for the period.
- **excise_taxes**   
     `number` — Excise taxes.


### Cost of Revenue


- **cost_of_revenue**   
     `number` — Cost of revenue.
- **depreciation_amortization_depletion_income_statement**   
     `number` — Depreciation, amortization, depletion.
- **depreciation_and_amortization_in_income_statement**   
     `number` — Depreciation and amortization.
- **depreciation_income_statement**   
     `number` — Depreciation.
- **amortization_of_intangibles_income_statement**   
     `number` — Amortization of intangibles.
- **depletion_income_statement**   
     `number` — Depletion.
- **amortization**   
     `number` — Amortization.
- **reconciled_depreciation**   
     `number` — Reconciled depreciation.
- **insurance_and_claims**   
     `number` — Insurance and claims expense.
- **rent_and_landing_fees**   
     `number` — Rent and landing fees.
- **reconciled_cost_of_revenue**   
     `number` — Adjusted cost of revenue.


### Operating Expense


- **operating_expense**   
     `number` — Total operating expenses.
- **research_and_development**   
     `number` — Research and development expenses.
- **selling_general_and_administration**   
     `number` — Selling, general, and administrative (SG&amp;A) expenses.
- **selling_and_marketing_expense**   
     `number` — Selling and marketing expenses.
- **general_and_administrative_expense**   
     `number` — General and administrative expenses.
- **salaries_and_wages**   
     `number` — Salaries and wages expense.
- **other_gand_a**   
     `number` — Other general and administrative (G&amp;A) expenses.
- **other_operating_expenses**   
     `number` — Other operating expenses.
- **impairment_of_capital_assets**   
     `number` — Impairment of assets.
- **other_special_charges**   
     `number` — Other special charges.
- **rent_expense_supplemental**   
     `number` — Supplemental rent expense.
- **provision_for_doubtful_accounts**   
     `number` — Provision for doubtful accounts.


### Operating Income


- **operating_income**   
     `number` — Operating income.
- **total_operating_income_as_reported**   
     `number` — Total operating income, as reported.
- **restructuring_and_mergern_acquisition**   
     `number` — Restructuring and merger &amp; acquisition (M&amp;A) expenses.


### Other Income &amp; Expense


- **other_income_expense**   
     `number` — Other income or expense.
- **other_non_operating_income_expenses**   
     `number` — Other non-operating income or expense.
- **special_income_charges**   
     `number` — Special income or charges.
- **total_other_finance_cost**   
     `number` — Total other finance cost.
- **gain_on_sale_of_business**   
     `number` — Gain on sale of a business.
- **gain_on_sale_of_ppe**   
     `number` — Gain on sale of property, plant, and equipment (PPE).
- **gain_on_sale_of_security**   
     `number` — Gain on sale of securities.
- **securities_amortization**   
     `number` — Amortization of securities.
- **interest_income**   
     `number` — Interest income.
- **interest_income_non_operating**   
     `number` — Non-operating interest income.
- **interest_expense**   
     `number` — Interest expense.
- **interest_expense_non_operating**   
     `number` — Non-operating interest expense.
- **net_interest_income**   
     `number` — Net interest income.
- **net_non_operating_interest_income_expense**   
     `number` — Net non-operating interest income or expense.
- **earnings_from_equity_interest**   
     `number` — Earnings from equity interest.
- **earnings_from_equity_interest_net_of_tax**   
     `number` — Earnings from equity interest, net of tax.


### Tax Provision


- **tax_provision**   
     `number` — Tax provision.
- **other_taxes**   
     `number` — Other taxes.
- **tax_rate_for_calcs**   
     `number` — Tax rate used for calculations.
- **tax_effect_of_unusual_items**   
     `number` — Tax effect of unusual items.


### Net Income Including Noncontrolling Interests


- **net_income_including_noncontrolling_interests**   
     `number` — Net income including non-controlling interests.
- **net_income_from_continuing_operation_net_minority_interest**   
     `number` — Net income from continuing operations, net of minority interest.
- **net_income_from_tax_loss_carryforward**   
     `number` — Net income impact from tax loss carryforwards.
- **net_income_discontinuous_operations**   
     `number` — Net income from discontinued operations.
- **net_income_continuous_operations**   
     `number` — Net income from continuing operations.
- **net_income_from_continuing_and_discontinued_operation**   
     `number` — Net income from continuing and discontinued operations.
- **net_income_extraordinary**   
     `number` — Net income from extraordinary items.
- **minority_interests**   
     `number` — Minority interests.
- **net_income**   
     `number` — Net income for the period.
- **net_income_common_stockholders**   
     `number` — Net income available to common shareholders.
- **diluted_ni_availto_com_stockholders**   
     `number` — Diluted net income available to common shareholders.
- **otherunder_preferred_stock_dividend**   
     `number` — Other adjustments to preferred stock dividends.
- **preferred_stock_dividends**   
     `number` — Preferred stock dividends.


### Basic Earnings Per Share (EPS)


- **basic_eps**   
     `number` — Basic earnings per share (EPS).
- **basic_average_shares**   
     `integer` — Basic average shares.
- **basic_continuous_operations**   
     `number` — Basic EPS from continuing operations.
- **basic_discontinuous_operations**   
     `number` — Basic EPS from discontinued operations.
- **basic_extraordinary**   
     `number` — Basic EPS from extraordinary items.
- **basic_accounting_change**   
     `number` — Basic EPS from accounting changes.
- **basic_eps_other_gains_losses**   
     `number` — Basic EPS excluding other gains and losses.
- **continuing_and_discontinued_basic_eps**   
     `number` — Basic EPS from continuing and discontinued operations.
- **normalized_basic_eps**   
     `number` — Normalized basic EPS.
- **reported_normalized_basic_eps**   
     `number` — Normalized basic EPS, as reported.
- **tax_loss_carryforward_basic_eps**   
     `number` — Tax loss carryforward effect on basic EPS.


### Diluted Earnings Per Share (EPS)


- **diluted_eps**   
     `number` — Diluted earnings per share (EPS).
- **average_dilution_earnings**   
     `number` — Average dilution earnings.
- **diluted_average_shares**   
     `integer` — Diluted average shares.
- **diluted_continuous_operations**   
     `number` — Diluted EPS from continuing operations.
- **diluted_discontinuous_operations**   
     `number` — Diluted EPS from discontinued operations.
- **diluted_extraordinary**   
     `number` — Diluted EPS from extraordinary items.
- **diluted_accounting_change**   
     `number` — Diluted EPS from accounting changes.
- **diluted_eps_other_gains_losses**   
     `number` — Diluted EPS excluding other gains and losses.
- **continuing_and_discontinued_diluted_eps**   
     `number` — Continuing and discontinued diluted EPS.
- **normalized_diluted_eps**   
     `number` — Normalized diluted EPS.
- **reported_normalized_diluted_eps**   
     `number` — Normalized diluted EPS, as reported.
- **tax_loss_carryforward_diluted_eps**   
     `number` — Tax loss carryforward effect on diluted EPS.


### Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)


- **ebitda**   
     `number` — Earnings before interest, taxes, depreciation, and amortization (EBITDA).
- **normalized_ebitda**   
     `number` — Normalized EBITDA.


### Total Unusual Items


- **total_unusual_items**   
     `number` — Total unusual items.
- **total_unusual_items_excluding_goodwill**   
     `number` — Total unusual items, excluding goodwill.
- **write_off**   
     `number` — Write-offs of assets or expenses.


### Other


- **gross_profit**   
     `number` — Gross profit.
- **pretax_income**   
     `number` — Pretax income.
- **dividend_per_share**   
     `number` — Dividends paid per share during the period.
- **ebit**   
     `number` — Earnings before interest and taxes (EBIT).
- **normalized_income**   
     `number` — Normalized income.
- **total_expenses**   
     `number` — Total expenses.


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
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24960000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 0.391,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 9439000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 25350000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 0.385,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 9752000000,
                "dividend_per_share": null,
                "ebit": 10177000000,
                "ebitda": 11351000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 17475000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 236000000,
                "interest_expense_non_operating": 236000000,
                "interest_income": 29000000,
                "interest_income_non_operating": 29000000,
                "minority_interests": null,
                "net_income": 9752000000,
                "net_income_common_stockholders": 9752000000,
                "net_income_continuous_operations": 9752000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 9752000000,
                "net_income_from_continuing_operation_net_minority_interest": 9752000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 9752000000,
                "net_interest_income": -207000000,
                "net_non_operating_interest_income_expense": -207000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 11351000000,
                "normalized_income": 9752000000,
                "operating_expense": 7434000000,
                "operating_income": 10041000000,
                "operating_revenue": 26914000000,
                "other_gand_a": null,
                "other_income_expense": 107000000,
                "other_non_operating_income_expenses": 107000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 9941000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 9439000000,
                "reconciled_depreciation": 1174000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 5268000000,
                "restructuring_and_mergern_acquisition": 0,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 2166000000,
                "special_income_charges": 0,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 189000000,
                "tax_rate_for_calcs": 0.019,
                "total_expenses": 16873000000,
                "total_operating_income_as_reported": 10041000000,
                "total_other_finance_cost": null,
                "total_revenue": 26914000000,
                "total_unusual_items": 0,
                "total_unusual_items_excluding_goodwill": 0,
                "write_off": null,
                "interval": "annual",
                "date": "2022-01-31"
            },
            {
                "report_key": "annual|2023-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24870000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 0.176,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 11618000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 25070000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 0.174,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 4368000000,
                "dividend_per_share": null,
                "ebit": 4443000000,
                "ebitda": 5986000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 15356000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 262000000,
                "interest_expense_non_operating": 262000000,
                "interest_income": 267000000,
                "interest_income_non_operating": 267000000,
                "minority_interests": null,
                "net_income": 4368000000,
                "net_income_common_stockholders": 4368000000,
                "net_income_continuous_operations": 4368000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 4368000000,
                "net_income_from_continuing_operation_net_minority_interest": 4368000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 4368000000,
                "net_interest_income": 5000000,
                "net_non_operating_interest_income_expense": 5000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 7339000000,
                "normalized_income": 5436870000,
                "operating_expense": 9779000000,
                "operating_income": 5577000000,
                "operating_revenue": 26974000000,
                "other_gand_a": null,
                "other_income_expense": -1401000000,
                "other_non_operating_income_expenses": -48000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 4181000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 11618000000,
                "reconciled_depreciation": 1543000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 7339000000,
                "restructuring_and_mergern_acquisition": 1353000000,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 2440000000,
                "special_income_charges": -1353000000,
                "tax_effect_of_unusual_items": -284130000,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": -187000000,
                "tax_rate_for_calcs": 0.21,
                "total_expenses": 21397000000,
                "total_operating_income_as_reported": 4224000000,
                "total_other_finance_cost": null,
                "total_revenue": 26974000000,
                "total_unusual_items": -1353000000,
                "total_unusual_items_excluding_goodwill": -1353000000,
                "write_off": null,
                "interval": "annual",
                "date": "2023-01-31"
            },
            {
                "report_key": "annual|2024-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24690000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 1.21,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 16621000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24940000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 1.19,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 29760000000,
                "dividend_per_share": null,
                "ebit": 34075000000,
                "ebitda": 35583000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 44301000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 257000000,
                "interest_expense_non_operating": 257000000,
                "interest_income": 866000000,
                "interest_income_non_operating": 866000000,
                "minority_interests": null,
                "net_income": 29760000000,
                "net_income_common_stockholders": 29760000000,
                "net_income_continuous_operations": 29760000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 29760000000,
                "net_income_from_continuing_operation_net_minority_interest": 29760000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 29760000000,
                "net_interest_income": 609000000,
                "net_non_operating_interest_income_expense": 609000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 35583000000,
                "normalized_income": 29760000000,
                "operating_expense": 11329000000,
                "operating_income": 32972000000,
                "operating_revenue": 60922000000,
                "other_gand_a": null,
                "other_income_expense": 237000000,
                "other_non_operating_income_expenses": 237000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 33818000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 16621000000,
                "reconciled_depreciation": 1508000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 8675000000,
                "restructuring_and_mergern_acquisition": 0,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 2654000000,
                "special_income_charges": 0,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 4058000000,
                "tax_rate_for_calcs": 0.12,
                "total_expenses": 27950000000,
                "total_operating_income_as_reported": 32972000000,
                "total_other_finance_cost": null,
                "total_revenue": 60922000000,
                "total_unusual_items": 0,
                "total_unusual_items_excluding_goodwill": 0,
                "write_off": null,
                "interval": "annual",
                "date": "2024-01-31"
            },
            {
                "report_key": "annual|2025-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24555000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 2.97,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 32639000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24804000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 2.94,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 72880000000,
                "dividend_per_share": null,
                "ebit": 84273000000,
                "ebitda": 86137000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 97858000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 247000000,
                "interest_expense_non_operating": 247000000,
                "interest_income": 1786000000,
                "interest_income_non_operating": 1786000000,
                "minority_interests": null,
                "net_income": 72880000000,
                "net_income_common_stockholders": 72880000000,
                "net_income_continuous_operations": 72880000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 72880000000,
                "net_income_from_continuing_operation_net_minority_interest": 72880000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 72880000000,
                "net_interest_income": 1539000000,
                "net_non_operating_interest_income_expense": 1539000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 86137000000,
                "normalized_income": 72880000000,
                "operating_expense": 16405000000,
                "operating_income": 81453000000,
                "operating_revenue": 130497000000,
                "other_gand_a": null,
                "other_income_expense": 1034000000,
                "other_non_operating_income_expenses": 1034000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 84026000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 32639000000,
                "reconciled_depreciation": 1864000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 12914000000,
                "restructuring_and_mergern_acquisition": 0,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 3491000000,
                "special_income_charges": 0,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 11146000000,
                "tax_rate_for_calcs": 0.133,
                "total_expenses": 49044000000,
                "total_operating_income_as_reported": 81453000000,
                "total_other_finance_cost": null,
                "total_revenue": 130497000000,
                "total_unusual_items": 0,
                "total_unusual_items_excluding_goodwill": 0,
                "write_off": null,
                "interval": "annual",
                "date": "2025-01-31"
            },
            {
                "report_key": "annual|2026-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24359000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 4.93,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 62475000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24514000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 4.9,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 120067000000,
                "dividend_per_share": null,
                "ebit": 141709000000,
                "ebitda": 144552000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 153463000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 259000000,
                "interest_expense_non_operating": 259000000,
                "interest_income": 2300000000,
                "interest_income_non_operating": 2300000000,
                "minority_interests": null,
                "net_income": 120067000000,
                "net_income_common_stockholders": 120067000000,
                "net_income_continuous_operations": 120067000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 120067000000,
                "net_income_from_continuing_operation_net_minority_interest": 120067000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 120067000000,
                "net_interest_income": 2041000000,
                "net_non_operating_interest_income_expense": 2041000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 144552000000,
                "normalized_income": 120067000000,
                "operating_expense": 23076000000,
                "operating_income": 130387000000,
                "operating_revenue": 215938000000,
                "other_gand_a": null,
                "other_income_expense": 9022000000,
                "other_non_operating_income_expenses": 9022000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 141450000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 62475000000,
                "reconciled_depreciation": 2843000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 18497000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 4579000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 21383000000,
                "tax_rate_for_calcs": 0.15117,
                "total_expenses": 85551000000,
                "total_operating_income_as_reported": 130387000000,
                "total_other_finance_cost": null,
                "total_revenue": 215938000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "annual",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2024-07-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": null,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": null,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": null,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": null,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": null,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": null,
                "dividend_per_share": null,
                "ebit": null,
                "ebitda": null,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": null,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": null,
                "interest_expense_non_operating": null,
                "interest_income": null,
                "interest_income_non_operating": null,
                "minority_interests": null,
                "net_income": null,
                "net_income_common_stockholders": null,
                "net_income_continuous_operations": null,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": null,
                "net_income_from_continuing_operation_net_minority_interest": null,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": null,
                "net_interest_income": null,
                "net_non_operating_interest_income_expense": null,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": null,
                "normalized_income": null,
                "operating_expense": null,
                "operating_income": null,
                "operating_revenue": null,
                "other_gand_a": null,
                "other_income_expense": null,
                "other_non_operating_income_expenses": null,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": null,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": null,
                "reconciled_depreciation": null,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": null,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": null,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": null,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": null,
                "tax_rate_for_calcs": null,
                "total_expenses": null,
                "total_operating_income_as_reported": null,
                "total_other_finance_cost": null,
                "total_revenue": null,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2024-07-31"
            },
            {
                "report_key": "quarterly|2024-10-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24533000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 0.79,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 8926000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24774000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 0.78,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 19309000000,
                "dividend_per_share": null,
                "ebit": 22377000000,
                "ebitda": 22855000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 26156000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 61000000,
                "interest_expense_non_operating": 61000000,
                "interest_income": 472000000,
                "interest_income_non_operating": 472000000,
                "minority_interests": null,
                "net_income": 19309000000,
                "net_income_common_stockholders": 19309000000,
                "net_income_continuous_operations": 19309000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 19309000000,
                "net_income_from_continuing_operation_net_minority_interest": 19309000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 19309000000,
                "net_interest_income": 411000000,
                "net_non_operating_interest_income_expense": 411000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 22855000000,
                "normalized_income": 19309000000,
                "operating_expense": 4287000000,
                "operating_income": 21869000000,
                "operating_revenue": 35082000000,
                "other_gand_a": null,
                "other_income_expense": 36000000,
                "other_non_operating_income_expenses": 36000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 22316000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 8926000000,
                "reconciled_depreciation": 478000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 3390000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 897000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 3007000000,
                "tax_rate_for_calcs": 0.134746,
                "total_expenses": 13213000000,
                "total_operating_income_as_reported": 21869000000,
                "total_other_finance_cost": null,
                "total_revenue": 35082000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2024-10-31"
            },
            {
                "report_key": "quarterly|2025-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24489000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 0.9,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 10608000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24706000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 0.89,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 22091000000,
                "dividend_per_share": null,
                "ebit": 25278000000,
                "ebitda": 25821000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 28723000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 61000000,
                "interest_expense_non_operating": 61000000,
                "interest_income": 511000000,
                "interest_income_non_operating": 511000000,
                "minority_interests": null,
                "net_income": 22091000000,
                "net_income_common_stockholders": 22091000000,
                "net_income_continuous_operations": 22091000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 22091000000,
                "net_income_from_continuing_operation_net_minority_interest": 22091000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 22091000000,
                "net_interest_income": 450000000,
                "net_non_operating_interest_income_expense": 450000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 25821000000,
                "normalized_income": 22091000000,
                "operating_expense": 4689000000,
                "operating_income": 24034000000,
                "operating_revenue": 39331000000,
                "other_gand_a": null,
                "other_income_expense": 733000000,
                "other_non_operating_income_expenses": 733000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 25217000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 10608000000,
                "reconciled_depreciation": 543000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 3714000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 975000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 3126000000,
                "tax_rate_for_calcs": 0.123964,
                "total_expenses": 15297000000,
                "total_operating_income_as_reported": 24034000000,
                "total_other_finance_cost": null,
                "total_revenue": 39331000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2025-01-31"
            },
            {
                "report_key": "quarterly|2025-04-30",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24441000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 0.77,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 17394000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24611000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 0.76,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 18775000000,
                "dividend_per_share": null,
                "ebit": 21973000000,
                "ebitda": 22584000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 26668000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 63000000,
                "interest_expense_non_operating": 63000000,
                "interest_income": 515000000,
                "interest_income_non_operating": 515000000,
                "minority_interests": null,
                "net_income": 18775000000,
                "net_income_common_stockholders": 18775000000,
                "net_income_continuous_operations": 18775000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 18775000000,
                "net_income_from_continuing_operation_net_minority_interest": 18775000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 18775000000,
                "net_interest_income": 452000000,
                "net_non_operating_interest_income_expense": 452000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 22584000000,
                "normalized_income": 18775000000,
                "operating_expense": 5030000000,
                "operating_income": 21638000000,
                "operating_revenue": 44062000000,
                "other_gand_a": null,
                "other_income_expense": -180000000,
                "other_non_operating_income_expenses": -180000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 21910000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 17394000000,
                "reconciled_depreciation": 611000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 3989000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 1041000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 3135000000,
                "tax_rate_for_calcs": 0.143,
                "total_expenses": 22424000000,
                "total_operating_income_as_reported": 21638000000,
                "total_other_finance_cost": null,
                "total_revenue": 44062000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2025-04-30"
            },
            {
                "report_key": "quarterly|2025-07-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24366000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 1.08,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 12890000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24532000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 1.08,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 26422000000,
                "dividend_per_share": null,
                "ebit": 31268000000,
                "ebitda": 31937000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 33853000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 62000000,
                "interest_expense_non_operating": 62000000,
                "interest_income": 592000000,
                "interest_income_non_operating": 592000000,
                "minority_interests": null,
                "net_income": 26422000000,
                "net_income_common_stockholders": 26422000000,
                "net_income_continuous_operations": 26422000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 26422000000,
                "net_income_from_continuing_operation_net_minority_interest": 26422000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 26422000000,
                "net_interest_income": 530000000,
                "net_non_operating_interest_income_expense": 530000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 31937000000,
                "normalized_income": 26422000000,
                "operating_expense": 5413000000,
                "operating_income": 28440000000,
                "operating_revenue": 46743000000,
                "other_gand_a": null,
                "other_income_expense": 2236000000,
                "other_non_operating_income_expenses": 2236000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 31206000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 12890000000,
                "reconciled_depreciation": 669000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 4291000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 1122000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 4784000000,
                "tax_rate_for_calcs": 0.153,
                "total_expenses": 18303000000,
                "total_operating_income_as_reported": 28440000000,
                "total_other_finance_cost": null,
                "total_revenue": 46743000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2025-07-31"
            },
            {
                "report_key": "quarterly|2025-10-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24327000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 1.31,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 15157000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24483000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 1.3,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 31910000000,
                "dividend_per_share": null,
                "ebit": 37997000000,
                "ebitda": 38748000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 41849000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 61000000,
                "interest_expense_non_operating": 61000000,
                "interest_income": 624000000,
                "interest_income_non_operating": 624000000,
                "minority_interests": null,
                "net_income": 31910000000,
                "net_income_common_stockholders": 31910000000,
                "net_income_continuous_operations": 31910000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 31910000000,
                "net_income_from_continuing_operation_net_minority_interest": 31910000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 31910000000,
                "net_interest_income": 563000000,
                "net_non_operating_interest_income_expense": 563000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 38748000000,
                "normalized_income": 31910000000,
                "operating_expense": 5839000000,
                "operating_income": 36010000000,
                "operating_revenue": 57006000000,
                "other_gand_a": null,
                "other_income_expense": 1363000000,
                "other_non_operating_income_expenses": 1363000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 37936000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 15157000000,
                "reconciled_depreciation": 751000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 4705000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 1134000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 6026000000,
                "tax_rate_for_calcs": 0.158846,
                "total_expenses": 20996000000,
                "total_operating_income_as_reported": 36010000000,
                "total_other_finance_cost": null,
                "total_revenue": 57006000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2025-10-31"
            },
            {
                "report_key": "quarterly|2026-01-31",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24304000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 1.77,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 17034000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24432000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 1.76,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 42960000000,
                "dividend_per_share": null,
                "ebit": 50471000000,
                "ebitda": 51283000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 51093000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 73000000,
                "interest_expense_non_operating": 73000000,
                "interest_income": 568000000,
                "interest_income_non_operating": 568000000,
                "minority_interests": null,
                "net_income": 42960000000,
                "net_income_common_stockholders": 42960000000,
                "net_income_continuous_operations": 42960000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 42960000000,
                "net_income_from_continuing_operation_net_minority_interest": 42960000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 42960000000,
                "net_interest_income": 495000000,
                "net_non_operating_interest_income_expense": 495000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 51283000000,
                "normalized_income": 42960000000,
                "operating_expense": 6794000000,
                "operating_income": 44299000000,
                "operating_revenue": 68127000000,
                "other_gand_a": null,
                "other_income_expense": 5604000000,
                "other_non_operating_income_expenses": 5604000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 50398000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 17034000000,
                "reconciled_depreciation": 812000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 5512000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 1282000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 7438000000,
                "tax_rate_for_calcs": 0.147585,
                "total_expenses": 23828000000,
                "total_operating_income_as_reported": 44299000000,
                "total_other_finance_cost": null,
                "total_revenue": 68127000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2026-04-30",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24286000000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 2.4,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 20458000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24391000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 2.39,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 58321000000,
                "dividend_per_share": null,
                "ebit": 70005000000,
                "ebitda": 71002000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 61157000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 102000000,
                "interest_expense_non_operating": 102000000,
                "interest_income": 540000000,
                "interest_income_non_operating": 540000000,
                "minority_interests": null,
                "net_income": 58321000000,
                "net_income_common_stockholders": 58321000000,
                "net_income_continuous_operations": 58321000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 58321000000,
                "net_income_from_continuing_operation_net_minority_interest": 58321000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 58321000000,
                "net_interest_income": 438000000,
                "net_non_operating_interest_income_expense": 438000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 71002000000,
                "normalized_income": 58321000000,
                "operating_expense": 7621000000,
                "operating_income": 53536000000,
                "operating_revenue": 81615000000,
                "other_gand_a": null,
                "other_income_expense": 15929000000,
                "other_non_operating_income_expenses": 15929000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 69903000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 20458000000,
                "reconciled_depreciation": 997000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 6321000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 1300000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 11582000000,
                "tax_rate_for_calcs": 0.165687,
                "total_expenses": 28079000000,
                "total_operating_income_as_reported": 53536000000,
                "total_other_finance_cost": null,
                "total_revenue": 81615000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "quarterly",
                "date": "2026-04-30"
            },
            {
                "report_key": "trailing|2026-06-19",
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24320250000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 6.56,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 65539000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24459000000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 6.53,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 159613000000,
                "dividend_per_share": null,
                "ebit": 189741000000,
                "ebitda": 192970000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 187952000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 298000000,
                "interest_expense_non_operating": 298000000,
                "interest_income": 2325000000,
                "interest_income_non_operating": 2325000000,
                "minority_interests": null,
                "net_income": 159613000000,
                "net_income_common_stockholders": 159613000000,
                "net_income_continuous_operations": 159613000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 159613000000,
                "net_income_from_continuing_operation_net_minority_interest": 159613000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 159613000000,
                "net_interest_income": 2027000000,
                "net_non_operating_interest_income_expense": 2027000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 192970000000,
                "normalized_income": 159613000000,
                "operating_expense": 25667000000,
                "operating_income": 162285000000,
                "operating_revenue": 253491000000,
                "other_gand_a": null,
                "other_income_expense": 25131000000,
                "other_non_operating_income_expenses": 25131000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 189443000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 65539000000,
                "reconciled_depreciation": 3229000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 20829000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 4838000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 29830000000,
                "tax_rate_for_calcs": 0.157462,
                "total_expenses": 91206000000,
                "total_operating_income_as_reported": 162285000000,
                "total_other_finance_cost": null,
                "total_revenue": 253491000000,
                "total_unusual_items": null,
                "total_unusual_items_excluding_goodwill": null,
                "write_off": null,
                "interval": "trailing",
                "date": "2026-06-19"
            }
        ]
    }
}
```
