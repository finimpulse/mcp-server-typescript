---
title: Income Statement
created: 2026-01-23
updated: 2026-02-06
endpoint: POST v1/financials/income_statement
auth: Bearer Token
---

# Income Statement

Returns detailed Income Statement data for stocks and some funds, including revenue, expenses, and net income for the selected period. 

This endpoint helps analyze the company’s profitability and operational results over time.

## When to Use This Endpoint
- Populate the "Income Statement" section.
- Pull time-series data for financial modeling, charting, or benchmarking.

## Request Parameters
**POST** `v1/financials/income_statement` 

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
curl --location "https://api.finimpulse.com/v1/financials/income_statement" \
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
var url = "https://api.finimpulse.com/v1/financials/income_statement";

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

url = "https://api.finimpulse.com/v1/financials/income_statement"
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

const req = https.request('https://api.finimpulse.com/v1/financials/income_statement', options, (res) => {
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
     `string` — Asset type (expected - stock).
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
     `array` — Array of statement records. It is a unified list where each element represents one report snapshot for a requested `interval` and `date`. Note that many fields can be *null* depending on the reporting format, company structure, or source limitations.


### Total Revenue


- **total_revenue**   
     `number` — Total revenue for the period.
- **operating_revenue**   
     `number` — Revenue from core operations.
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
     `number` — Insurance costs and claims-related expenses.
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
     `number` — SG&amp;A expenses.
- **selling_and_marketing_expense**   
     `number` — Selling and marketing expenses.
- **general_and_administrative_expense**   
     `number` — General and administrative expenses.
- **salaries_and_wages**   
     `number` — Salaries and wages.
- **other_gand_a**   
     `number` — Other G&amp;A expenses.
- **other_operating_expenses**   
     `number` — Other operating expenses.
- **impairment_of_capital_assets**   
     `number` — Impairment of assets.
- **other_special_charges**   
     `number` — Other special charges.
- **rent_expense_supplemental**   
     `number` — Rent expense supplemental.
- **provision_for_doubtful_accounts**   
     `number` — Provision for doubtful accounts.


### Operating Income


- **operating_income**   
     `number` — Operating income.
- **total_operating_income_as_reported**   
     `number` — Total operating income reported.
- **restructuring_and_mergern_acquisition**   
     `number` — Restructuring and M&amp;A expenses.


### Other Income &amp; Expense


- **other_income_expense**   
     `number` — Other income or expense.
- **other_non_operating_income_expenses**   
     `number` — Other non-operating income/expenses.
- **special_income_charges**   
     `number` — Special income/charges.
- **total_other_finance_cost**   
     `number` — Total other finance cost.
- **gain_on_sale_of_business**   
     `number` — Gain on sale of business.
- **gain_on_sale_of_ppe**   
     `number` — Gain on sale of PPE.
- **gain_on_sale_of_security**   
     `number` — Gain on sale of security.
- **securities_amortization**   
     `number` — Securities amortization.
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
     `number` — Net non-operating interest income/expense.
- **earnings_from_equity_interest**   
     `number` — Earnings from equity interest.
- **earnings_from_equity_interest_net_of_tax**   
     `number` — Earnings from equity interest net of tax.


### Tax Provision


- **tax_provision**   
     `number` — Tax provision.
- **other_taxes**   
     `number` — Other taxes.
- **tax_rate_for_calcs**   
     `number` — Tax rate for calculations.
- **tax_effect_of_unusual_items**   
     `number` — Tax effect of unusual items.


### Net Income Including Noncontrolling Interests


- **net_income_including_noncontrolling_interests**   
     `number` — Net income including non-controlling interests.
- **net_income_from_continuing_operation_net_minority_interest**   
     `number` — Net income from continuing operations excluding minority interests.
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
     `number` — Net income for common shareholders.
- **diluted_ni_availto_com_stockholders**   
     `number` — Diluted net income available to common shareholders.
- **otherunder_preferred_stock_dividend**   
     `number` — Other preferred stock adjustments.
- **preferred_stock_dividends**   
     `number` — Preferred stock dividends.


### Basic EPS


- **basic_eps**   
     `number` — Basic EPS.
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
     `number` — Continuing and discontinued basic EPS.
- **normalized_basic_eps**   
     `number` — Normalized basic EPS.
- **reported_normalized_basic_eps**   
     `number` — Normalized basic EPS as reported by the company.
- **tax_loss_carryforward_basic_eps**   
     `number` — Tax loss carryforward effect on basic EPS.


### Diluted EPS


- **diluted_eps**   
     `number` — Diluted EPS.
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
     `number` — Normalized diluted EPS as reported by the company.
- **tax_loss_carryforward_diluted_eps**   
     `number` — Tax loss carryforward effect on diluted EPS.


### EBITDA


- **ebitda**   
     `number` — Earnings before interest, taxes, depreciation, and amortization.
- **normalized_ebitda**   
     `number` — Normalized EBITDA.


### Total Unusual Items


- **total_unusual_items**   
     `number` — Total unusual items.
- **total_unusual_items_excluding_goodwill**   
     `number` — Unusual items excluding goodwill.
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
     `number` — Earnings before interest and taxes.
- **normalized_income**   
     `number` — Normalized income.
- **total_expenses**   
     `number` — Total expenses.


### Snapshot Info


- **type**   
     `string` — Report/snapshot type (income_statement expected).
- **interval**   
     `string` — Reporting frequencies (trailing/quarterly/annual).
- **date**   
     `string` — Reporting period end date.


### Example Response


```json
{
    "task_id": "0d9b20b3-9ba6-4502-b591-89ec47b2b8ca",
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
            "income_statement"
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
                "interval": "annual",
                "date": "2021-01-31"
            },
            {
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
                "type": "income_statement",
                "amortization": null,
                "amortization_of_intangibles_income_statement": null,
                "average_dilution_earnings": null,
                "basic_accounting_change": null,
                "basic_average_shares": 24405750000,
                "basic_continuous_operations": null,
                "basic_discontinuous_operations": null,
                "basic_eps": 4.06,
                "basic_eps_other_gains_losses": null,
                "basic_extraordinary": null,
                "continuing_and_discontinued_basic_eps": null,
                "continuing_and_discontinued_diluted_eps": null,
                "cost_of_revenue": 56049000000,
                "depletion_income_statement": null,
                "depreciation_amortization_depletion_income_statement": null,
                "depreciation_and_amortization_in_income_statement": null,
                "depreciation_income_statement": null,
                "diluted_accounting_change": null,
                "diluted_average_shares": 24582750000,
                "diluted_continuous_operations": null,
                "diluted_discontinuous_operations": null,
                "diluted_eps": 4.04,
                "diluted_eps_other_gains_losses": null,
                "diluted_extraordinary": null,
                "diluted_ni_availto_com_stockholders": 99198000000,
                "dividend_per_share": null,
                "ebit": 116516000000,
                "ebitda": 119090000000,
                "earnings_from_equity_interest": null,
                "earnings_from_equity_interest_net_of_tax": null,
                "excise_taxes": null,
                "gain_on_sale_of_business": null,
                "gain_on_sale_of_ppe": null,
                "gain_on_sale_of_security": null,
                "general_and_administrative_expense": null,
                "gross_profit": 131093000000,
                "impairment_of_capital_assets": null,
                "insurance_and_claims": null,
                "interest_expense": 247000000,
                "interest_expense_non_operating": 247000000,
                "interest_income": 2243000000,
                "interest_income_non_operating": 2243000000,
                "minority_interests": null,
                "net_income": 99198000000,
                "net_income_common_stockholders": 99198000000,
                "net_income_continuous_operations": 99198000000,
                "net_income_discontinuous_operations": null,
                "net_income_extraordinary": null,
                "net_income_from_continuing_and_discontinued_operation": 99198000000,
                "net_income_from_continuing_operation_net_minority_interest": 99198000000,
                "net_income_from_tax_loss_carryforward": null,
                "net_income_including_noncontrolling_interests": 99198000000,
                "net_interest_income": 1996000000,
                "net_non_operating_interest_income_expense": 1996000000,
                "normalized_basic_eps": null,
                "normalized_diluted_eps": null,
                "normalized_ebitda": 119090000000,
                "normalized_income": 99198000000,
                "operating_expense": 20971000000,
                "operating_income": 110122000000,
                "operating_revenue": 187142000000,
                "other_gand_a": null,
                "other_income_expense": 4151000000,
                "other_non_operating_income_expenses": 4151000000,
                "other_operating_expenses": null,
                "other_special_charges": null,
                "other_taxes": null,
                "otherunder_preferred_stock_dividend": null,
                "preferred_stock_dividends": null,
                "pretax_income": 116269000000,
                "provision_for_doubtful_accounts": null,
                "reconciled_cost_of_revenue": 56049000000,
                "reconciled_depreciation": 2574000000,
                "rent_and_landing_fees": null,
                "rent_expense_supplemental": null,
                "reported_normalized_basic_eps": null,
                "reported_normalized_diluted_eps": null,
                "research_and_development": 16699000000,
                "restructuring_and_mergern_acquisition": null,
                "salaries_and_wages": null,
                "securities_amortization": null,
                "selling_and_marketing_expense": null,
                "selling_general_and_administration": 4272000000,
                "special_income_charges": null,
                "tax_effect_of_unusual_items": 0,
                "tax_loss_carryforward_basic_eps": null,
                "tax_loss_carryforward_diluted_eps": null,
                "tax_provision": 17071000000,
                "tax_rate_for_calcs": 0.146823,
                "total_expenses": 77020000000,
                "total_operating_income_as_reported": 110122000000,
                "total_other_finance_cost": null,
                "total_revenue": 187142000000,
                "total_unusual_items": 0,
                "total_unusual_items_excluding_goodwill": 0,
                "write_off": null,
                "interval": "trailing",
                "date": "2026-01-30"
            }
        ]
    }
}
```
