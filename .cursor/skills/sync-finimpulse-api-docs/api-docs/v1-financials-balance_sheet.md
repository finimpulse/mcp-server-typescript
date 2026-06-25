---
title: Balance Sheet
created: 2026-01-23
updated: 2026-02-06
endpoint: POST v1/financials/balance_sheet
auth: Bearer Token
---

# Balance Sheet

Returns comprehensive Balance Sheet data for stocks and some funds.

This endpoint provides a snapshot of a company’s financial position and capital structure.

## When to Use This Endpoint
- Populate the "Balance Sheet" section of the Financials views.
- Retrieve structured historical data for solvency analysis, ratios, and modeling.

## Request Parameters
**POST** `v1/financials/balance_sheet` 

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
curl --location "https://api.finimpulse.com/v1/financials/balance_sheet" \
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
var url = "https://api.finimpulse.com/v1/financials/balance_sheet";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/financials/balance_sheet",
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

url = "https://api.finimpulse.com/v1/financials/balance_sheet"
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

const req = https.request('https://api.finimpulse.com/v1/financials/balance_sheet', options, (res) => {
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


### Total Assets


- **total_assets**   
     `number` — Total assets.
- **current_assets**   
     `number` — Current assets.
- **cash_cash_equivalents_and_short_term_investments**   
     `number` — Cash, cash equivalents, and short-term investments.
- **cash_and_cash_equivalents**   
     `number` — Cash and cash equivalents.
- **cash_financial**   
     `number` — Cash held in financial institutions.
- **cash_equivalents**   
     `number` — Highly liquid cash equivalents.
- **restricted_cash**   
     `number` — Restricted cash.
- **other_short_term_investments**   
     `number` — Other short-term investments.
- **trading_securities**   
     `number` — Trading securities.
- **available_for_sale_securities**   
     `number` — Available-for-sale securities.
- **held_to_maturity_securities**   
     `number` — Held-to-maturity securities.
- **hedging_assets_current**   
     `number` — Current hedging assets.
- **receivables**   
     `number` — Receivables.
- **accounts_receivable**   
     `number` — Accounts receivable.
- **gross_accounts_receivable**   
     `number` — Gross accounts receivable.
- **allowance_for_doubtful_accounts_receivable**   
     `number` — Allowance for doubtful accounts receivable.
- **receivables_adjustments_allowances**   
     `number` — Adjustments and allowances for receivables.
- **accrued_interest_receivable**   
     `number` — Accrued interest receivable.
- **other_receivables**   
     `number` — Other receivables.
- **notes_receivable**   
     `number` — Notes receivable.
- **loans_receivable**   
     `number` — Loans receivable.
- **taxes_receivable**   
     `number` — Taxes receivable.
- **duefrom_related_parties_current**   
     `number` — Amounts due from related parties (current).
- **inventory**   
     `number` — Total inventory.
- **raw_materials**   
     `number` — Raw materials inventory.
- **finished_goods**   
     `number` — Finished goods inventory.
- **work_in_process**   
     `number` — Work in process inventory.
- **other_inventories**   
     `number` — Other inventories.
- **inventories_adjustments_allowances**   
     `number` — Inventory adjustments and allowances.
- **prepaid_assets**   
     `number` — Prepaid assets.
- **current_deferred_assets**   
     `number` — Current deferred assets.
- **current_deferred_taxes_assets**   
     `number` — Current deferred tax assets.
- **other_current_assets**   
     `number` — Other current assets.
- **assets_held_for_sale_current**   
     `number` — Current assets held for sale.
- **total_non_current_assets**   
     `number` — Total non-current assets.
- **net_ppe**   
     `number` — Net property, plant, and equipment.
- **gross_ppe**   
     `number` — Gross property, plant, and equipment.
- **accumulated_depreciation**   
     `number` — Accumulated depreciation.
- **buildings_and_improvements**   
     `number` — Buildings and improvements.
- **machinery_furniture_equipment**   
     `number` — Machinery, furniture, and equipment.
- **land_and_improvements**   
     `number` — Land and land improvements.
- **construction_in_progress**   
     `number` — Construction in progress.
- **investment_properties**   
     `number` — Investment properties.
- **properties**   
     `number` — Properties.
- **leases**   
     `number` — Lease-related assets.
- **other_properties**   
     `number` — Other properties.
- **goodwill_and_other_intangible_assets**   
     `number` — Goodwill and other intangible assets.
- **goodwill**   
     `number` — Goodwill.
- **other_intangible_assets**   
     `number` — Other intangible assets.
- **investments_and_advances**   
     `number` — Investments and advances.
- **investmentin_financial_assets**   
     `number` — Investments in financial assets.
- **other_investments**   
     `number` — Other investments.
- **investments_in_other_ventures_under_equity_method**   
     `number` — Equity-method investments in other ventures.
- **investmentsin_associatesat_cost**   
     `number` — Investments in associates at cost.
- **investmentsin_joint_venturesat_cost**   
     `number` — Investments in joint ventures at cost.
- **investmentsin_subsidiariesat_cost**   
     `number` — Investments in subsidiaries at cost.
- **long_term_equity_investment**   
     `number` — Long-term equity investments.
- **financial_assets**   
     `number` — Financial assets.
- **financial_assets_designatedas_fair_value_through_profitor_loss_total**   
     `number` — Financial assets designated at fair value through profit or loss.
- **non_current_accounts_receivable**   
     `number` — Non-current accounts receivable.
- **non_current_note_receivables**   
     `number` — Non-current notes receivable.
- **non_current_deferred_assets**   
     `number` — Non-current deferred assets.
- **non_current_deferred_taxes_assets**   
     `number` — Non-current deferred tax assets.
- **non_current_prepaid_assets**   
     `number` — Non-current prepaid assets.
- **other_non_current_assets**   
     `number` — Other non-current assets.
- **duefrom_related_parties_non_current**   
     `number` — Amounts due from related parties (non-current).


### Total Liabilities Net Minority Interest


- **total_liabilities_net_minority_interest**   
     `number` — Total liabilities net of minority interest.
- **current_liabilities**   
     `number` — Total current liabilities.
- **accounts_payable**   
     `number` — Accounts payable.
- **payables**   
     `number` — Total payables.
- **payables_and_accrued_expenses**   
     `number` — Payables and accrued expenses.
- **current_accrued_expenses**   
     `number` — Current accrued expenses.
- **income_tax_payable**   
     `number` — Income tax payable.
- **interest_payable**   
     `number` — Interest payable.
- **current_debt**   
     `number` — Current debt.
- **current_notes_payable**   
     `number` — Current notes payable.
- **commercial_paper**   
     `number` — Commercial paper.
- **line_of_credit**   
     `number` — Line of credit borrowings.
- **other_current_borrowings**   
     `number` — Other current borrowings.
- **current_capital_lease_obligation**   
     `number` — Current capital lease obligation.
- **current_debt_and_capital_lease_obligation**   
     `number` — Current debt and capital lease obligations.
- **current_deferred_liabilities**   
     `number` — Current deferred liabilities.
- **current_deferred_taxes_liabilities**   
     `number` — Current deferred tax liabilities.
- **current_deferred_revenue**   
     `number` — Current deferred revenue.
- **dividends_payable**   
     `number` — Dividends payable.
- **dueto_related_parties_current**   
     `number` — Amounts due to related parties (current).
- **pensionand_other_post_retirement_benefit_plans_current**   
     `number` — Current pension and post-retirement benefit obligations.
- **current_provisions**   
     `number` — Current provisions.
- **other_payable**   
     `number` — Other payables.
- **other_current_liabilities**   
     `number` — Other current liabilities.
- **total_tax_payable**   
     `number` — Total taxes payable.
- **total_non_current_liabilities_net_minority_interest**   
     `number` — Total non-current liabilities net of minority interest.
- **long_term_debt_and_capital_lease_obligation**   
     `number` — Long-term debt and capital lease obligations.
- **long_term_debt**   
     `number` — Long-term debt.
- **long_term_capital_lease_obligation**   
     `number` — Long-term capital lease obligation.
- **capital_lease_obligations**   
     `number` — Capital lease obligations.
- **long_term_provisions**   
     `number` — Long-term provisions.
- **non_current_deferred_liabilities**   
     `number` — Non-current deferred liabilities.
- **non_current_deferred_taxes_liabilities**   
     `number` — Non-current deferred tax liabilities.
- **non_current_deferred_revenue**   
     `number` — Non-current deferred revenue.
- **non_current_accrued_expenses**   
     `number` — Non-current accrued expenses.
- **tradeand_other_payables_non_current**   
     `number` — Trade and other payables (non-current).
- **derivative_product_liabilities**   
     `number` — Derivative product liabilities.
- **liabilities_heldfor_sale_non_current**   
     `number` — Non-current liabilities held for sale.
- **dueto_related_parties_non_current**   
     `number` — Amounts due to related parties (non-current).
- **non_current_pension_and_other_postretirement_benefit_plans**   
     `number` — Non-current pension and post-retirement benefit obligations.
- **minimum_pension_liabilities**   
     `number` — Minimum pension liabilities.
- **defined_pension_benefit**   
     `number` — Defined pension benefit obligations.
- **employee_benefits**   
     `number` — Employee benefit liabilities.
- **other_non_current_liabilities**   
     `number` — Other non-current liabilities.


### Total Equity Gross Minority Interest


- **total_equity_gross_minority_interest**   
     `number` — Total equity including minority interest.
- **stockholders_equity**   
     `number` — Total stockholders’ equity.
- **common_stock_equity**   
     `number` — Common stock equity.
- **common_stock**   
     `number` — Common stock.
- **capital_stock**   
     `number` — Capital stock.
- **other_capital_stock**   
     `number` — Other capital stock.
- **additional_paid_in_capital**   
     `number` — Additional paid-in capital.
- **share_issued**   
     `integer` — Total shares issued.
- **ordinary_shares_number**   
     `integer` — Number of ordinary shares outstanding.
- **preferred_stock_equity**   
     `number` — Preferred stock equity.
- **preferred_stock**   
     `number` — Preferred stock.
- **preferred_shares_number**   
     `integer` — Number of preferred shares outstanding.
- **retained_earnings**   
     `number` — Retained earnings.
- **treasury_stock**   
     `number` — Treasury stock.
- **treasury_shares_number**   
     `integer` — Number of treasury shares.
- **restricted_common_stock**   
     `number` — Restricted common stock.
- **net_tangible_assets**   
     `number` — Net tangible assets.
- **tangible_book_value**   
     `number` — Tangible book value.
- **other_equity_adjustments**   
     `number` — Other equity adjustments.
- **foreign_currency_translation_adjustments**   
     `number` — Foreign currency translation adjustments.
- **unrealized_gain_loss**   
     `number` — Unrealized gains and losses.
- **gains_losses_not_affecting_retained_earnings**   
     `number` — Gains and losses not affecting retained earnings.
- **fixed_assets_revaluation_reserve**   
     `number` — Fixed assets revaluation reserve.
- **other_equity_interest**   
     `number` — Other equity interests.
- **preferred_securities_outside_stock_equity**   
     `number` — Preferred securities outside stock equity.
- **general_partnership_capital**   
     `number` — General partnership capital.
- **limited_partnership_capital**   
     `number` — Limited partnership capital.
- **total_partnership_capital**   
     `number` — Total partnership capital.
- **minority_interest**   
     `number` — Minority interest.


### Other


- **total_debt**   
     `number` — Total debt.
- **total_capitalization**   
     `number` — Total capitalization.
- **working_capital**   
     `number` — Working capital.
- **net_debt**   
     `number` — Net debt.
- **invested_capital**   
     `number` — Invested capital.


### Snapshot Info


- **type**   
     `string` — Report/snapshot type (balance_sheet expected).
- **interval**   
     `string` — Reporting frequencies (trailing/quarterly/annual).
- **date**   
     `string` — Reporting period end date.


### Example Response


```json
{
    "task_id": "4bb5a417-b40d-4a33-b73f-8f71a16526ee",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.003,
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
            "balance_sheet"
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
        "total_count": 11,
        "items_count": 11,
        "items": [
            {
                "type": "balance_sheet",
                "accounts_payable": null,
                "accounts_receivable": null,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": null,
                "allowance_for_doubtful_accounts_receivable": -21000000,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": null,
                "buildings_and_improvements": null,
                "capital_lease_obligations": null,
                "capital_stock": null,
                "cash_and_cash_equivalents": null,
                "cash_cash_equivalents_and_short_term_investments": null,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": null,
                "common_stock_equity": null,
                "construction_in_progress": null,
                "current_accrued_expenses": null,
                "current_assets": null,
                "current_capital_lease_obligation": null,
                "current_debt": 999000000,
                "current_debt_and_capital_lease_obligation": null,
                "current_deferred_assets": null,
                "current_deferred_liabilities": null,
                "current_deferred_revenue": null,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": null,
                "current_notes_payable": null,
                "current_provisions": null,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": 33000000,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": null,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": null,
                "general_partnership_capital": null,
                "goodwill": null,
                "goodwill_and_other_intangible_assets": null,
                "gross_accounts_receivable": 2450000000,
                "gross_ppe": null,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": 74000000,
                "inventories_adjustments_allowances": null,
                "inventory": null,
                "invested_capital": null,
                "investment_properties": null,
                "investmentin_financial_assets": null,
                "investments_and_advances": null,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": 385000000,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": null,
                "long_term_debt": null,
                "long_term_debt_and_capital_lease_obligation": null,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": 6116000000,
                "net_ppe": null,
                "net_tangible_assets": null,
                "non_current_accounts_receivable": null,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": null,
                "non_current_deferred_liabilities": null,
                "non_current_deferred_revenue": null,
                "non_current_deferred_taxes_assets": null,
                "non_current_deferred_taxes_liabilities": null,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": null,
                "notes_receivable": null,
                "ordinary_shares_number": null,
                "other_capital_stock": null,
                "other_current_assets": null,
                "other_current_borrowings": 999000000,
                "other_current_liabilities": null,
                "other_equity_adjustments": null,
                "other_equity_interest": null,
                "other_intangible_assets": null,
                "other_inventories": null,
                "other_investments": 144000000,
                "other_non_current_assets": null,
                "other_non_current_liabilities": null,
                "other_payable": null,
                "other_properties": null,
                "other_receivables": null,
                "other_short_term_investments": null,
                "payables": null,
                "payables_and_accrued_expenses": null,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": null,
                "preferred_stock_equity": null,
                "prepaid_assets": 239000000,
                "properties": null,
                "raw_materials": null,
                "receivables": null,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": null,
                "share_issued": null,
                "stockholders_equity": null,
                "tangible_book_value": null,
                "taxes_receivable": null,
                "total_assets": null,
                "total_capitalization": null,
                "total_debt": null,
                "total_equity_gross_minority_interest": null,
                "total_liabilities_net_minority_interest": null,
                "total_non_current_assets": null,
                "total_non_current_liabilities_net_minority_interest": null,
                "total_partnership_capital": null,
                "total_tax_payable": null,
                "tradeand_other_payables_non_current": null,
                "trading_securities": null,
                "treasury_shares_number": 13800000000,
                "treasury_stock": 10756000000,
                "unrealized_gain_loss": null,
                "work_in_process": null,
                "working_capital": null,
                "interval": "annual",
                "date": "2021-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 1783000000,
                "accounts_receivable": 4650000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": -1903000000,
                "additional_paid_in_capital": 10385000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": null,
                "buildings_and_improvements": 874000000,
                "capital_lease_obligations": 885000000,
                "capital_stock": 3000000,
                "cash_and_cash_equivalents": 1990000000,
                "cash_cash_equivalents_and_short_term_investments": 21208000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 3000000,
                "common_stock_equity": 26612000000,
                "construction_in_progress": 737000000,
                "current_accrued_expenses": 1605000000,
                "current_assets": 28829000000,
                "current_capital_lease_obligation": 144000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 144000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 300000000,
                "current_deferred_revenue": 300000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 4335000000,
                "current_notes_payable": null,
                "current_provisions": null,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 1122000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": -11000000,
                "general_partnership_capital": null,
                "goodwill": 4349000000,
                "goodwill_and_other_intangible_assets": 6688000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 5510000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 2605000000,
                "invested_capital": 37558000000,
                "investment_properties": null,
                "investmentin_financial_assets": null,
                "investments_and_advances": 266000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": 218000000,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 741000000,
                "long_term_debt": 10946000000,
                "long_term_debt_and_capital_lease_obligation": 11687000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": 2852000000,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": 8956000000,
                "net_ppe": 3607000000,
                "net_tangible_assets": 19924000000,
                "non_current_accounts_receivable": null,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 1222000000,
                "non_current_deferred_liabilities": 447000000,
                "non_current_deferred_revenue": 202000000,
                "non_current_deferred_taxes_assets": 1222000000,
                "non_current_deferred_taxes_liabilities": 245000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 3509000000,
                "notes_receivable": null,
                "ordinary_shares_number": 25060000000,
                "other_capital_stock": null,
                "other_current_assets": 366000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 371000000,
                "other_equity_adjustments": -11000000,
                "other_equity_interest": null,
                "other_intangible_assets": 2339000000,
                "other_inventories": null,
                "other_investments": 266000000,
                "other_non_current_assets": 66000000,
                "other_non_current_liabilities": 49000000,
                "other_payable": null,
                "other_properties": 829000000,
                "other_receivables": null,
                "other_short_term_investments": 19218000000,
                "payables": 1915000000,
                "payables_and_accrued_expenses": 3520000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": 366000000,
                "properties": 0,
                "raw_materials": 791000000,
                "receivables": 4650000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 16235000000,
                "share_issued": 25060000000,
                "stockholders_equity": 26612000000,
                "tangible_book_value": 19924000000,
                "taxes_receivable": null,
                "total_assets": 44187000000,
                "total_capitalization": 37558000000,
                "total_debt": 11831000000,
                "total_equity_gross_minority_interest": 26612000000,
                "total_liabilities_net_minority_interest": 17575000000,
                "total_non_current_assets": 15358000000,
                "total_non_current_liabilities_net_minority_interest": 13240000000,
                "total_partnership_capital": null,
                "total_tax_payable": 132000000,
                "tradeand_other_payables_non_current": 1057000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": 0,
                "unrealized_gain_loss": null,
                "work_in_process": 692000000,
                "working_capital": 24494000000,
                "interval": "annual",
                "date": "2022-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 1193000000,
                "accounts_receivable": 3827000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": -2694000000,
                "additional_paid_in_capital": 11971000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": null,
                "buildings_and_improvements": 1598000000,
                "capital_lease_obligations": 1078000000,
                "capital_stock": 2000000,
                "cash_and_cash_equivalents": 3389000000,
                "cash_cash_equivalents_and_short_term_investments": 13296000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 2000000,
                "common_stock_equity": 22101000000,
                "construction_in_progress": 382000000,
                "current_accrued_expenses": 2946000000,
                "current_assets": 23073000000,
                "current_capital_lease_obligation": 176000000,
                "current_debt": 1250000000,
                "current_debt_and_capital_lease_obligation": 1426000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 354000000,
                "current_deferred_revenue": 354000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 6563000000,
                "current_notes_payable": null,
                "current_provisions": 108000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 2263000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": -43000000,
                "general_partnership_capital": null,
                "goodwill": 4372000000,
                "goodwill_and_other_intangible_assets": 6048000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 7539000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 5159000000,
                "invested_capital": 33054000000,
                "investment_properties": null,
                "investmentin_financial_assets": null,
                "investments_and_advances": 299000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": 218000000,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 902000000,
                "long_term_debt": 9703000000,
                "long_term_debt_and_capital_lease_obligation": 10605000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": 4303000000,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": 7564000000,
                "net_ppe": 4845000000,
                "net_tangible_assets": 16053000000,
                "non_current_accounts_receivable": null,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 3396000000,
                "non_current_deferred_liabilities": 465000000,
                "non_current_deferred_revenue": 218000000,
                "non_current_deferred_taxes_assets": 3396000000,
                "non_current_deferred_taxes_liabilities": 247000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 3376000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24661365720,
                "other_capital_stock": null,
                "other_current_assets": 791000000,
                "other_current_borrowings": 1250000000,
                "other_current_liabilities": 69000000,
                "other_equity_adjustments": -43000000,
                "other_equity_interest": null,
                "other_intangible_assets": 1676000000,
                "other_inventories": null,
                "other_investments": 299000000,
                "other_non_current_assets": 145000000,
                "other_non_current_liabilities": 63000000,
                "other_payable": null,
                "other_properties": 1038000000,
                "other_receivables": null,
                "other_short_term_investments": 9907000000,
                "payables": 1660000000,
                "payables_and_accrued_expenses": 4606000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": 0,
                "raw_materials": 2430000000,
                "receivables": 3827000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 10171000000,
                "share_issued": 24661365720,
                "stockholders_equity": 22101000000,
                "tangible_book_value": 16053000000,
                "taxes_receivable": null,
                "total_assets": 41182000000,
                "total_capitalization": 31804000000,
                "total_debt": 12031000000,
                "total_equity_gross_minority_interest": 22101000000,
                "total_liabilities_net_minority_interest": 19081000000,
                "total_non_current_assets": 18109000000,
                "total_non_current_liabilities_net_minority_interest": 12518000000,
                "total_partnership_capital": null,
                "total_tax_payable": 467000000,
                "tradeand_other_payables_non_current": 1385000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 466000000,
                "working_capital": 16510000000,
                "interval": "annual",
                "date": "2023-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 2699000000,
                "accounts_receivable": 9999000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": -3509000000,
                "additional_paid_in_capital": 13109000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 1321000000,
                "buildings_and_improvements": 1816000000,
                "capital_lease_obligations": 1347000000,
                "capital_stock": 25000000,
                "cash_and_cash_equivalents": 7280000000,
                "cash_cash_equivalents_and_short_term_investments": 25984000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 25000000,
                "common_stock_equity": 42978000000,
                "construction_in_progress": 189000000,
                "current_accrued_expenses": 4780000000,
                "current_assets": 44345000000,
                "current_capital_lease_obligation": 228000000,
                "current_debt": 1250000000,
                "current_debt_and_capital_lease_obligation": 1478000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 764000000,
                "current_deferred_revenue": 764000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 10631000000,
                "current_notes_payable": null,
                "current_provisions": 415000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 2058000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 27000000,
                "general_partnership_capital": null,
                "goodwill": 4430000000,
                "goodwill_and_other_intangible_assets": 5542000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 8769000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 5282000000,
                "invested_capital": 52687000000,
                "investment_properties": null,
                "investmentin_financial_assets": 1321000000,
                "investments_and_advances": 1321000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": 218000000,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1119000000,
                "long_term_debt": 8459000000,
                "long_term_debt_and_capital_lease_obligation": 9578000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": 5200000000,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": 2429000000,
                "net_ppe": 5260000000,
                "net_tangible_assets": 37436000000,
                "non_current_accounts_receivable": null,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 6081000000,
                "non_current_deferred_liabilities": 1035000000,
                "non_current_deferred_revenue": 573000000,
                "non_current_deferred_taxes_assets": 6081000000,
                "non_current_deferred_taxes_liabilities": 462000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2822000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24640000000,
                "other_capital_stock": null,
                "other_current_assets": 3080000000,
                "other_current_borrowings": 1250000000,
                "other_current_liabilities": 199000000,
                "other_equity_adjustments": 27000000,
                "other_equity_interest": null,
                "other_intangible_assets": 1112000000,
                "other_inventories": null,
                "other_investments": 1546000000,
                "other_non_current_assets": 357000000,
                "other_non_current_liabilities": 65000000,
                "other_payable": null,
                "other_properties": 1346000000,
                "other_receivables": null,
                "other_short_term_investments": 18704000000,
                "payables": 2995000000,
                "payables_and_accrued_expenses": 7775000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": 0,
                "raw_materials": 1719000000,
                "receivables": 9999000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 29817000000,
                "share_issued": 24640000000,
                "stockholders_equity": 42978000000,
                "tangible_book_value": 37436000000,
                "taxes_receivable": null,
                "total_assets": 65728000000,
                "total_capitalization": 51437000000,
                "total_debt": 11056000000,
                "total_equity_gross_minority_interest": 42978000000,
                "total_liabilities_net_minority_interest": 22750000000,
                "total_non_current_assets": 21383000000,
                "total_non_current_liabilities_net_minority_interest": 12119000000,
                "total_partnership_capital": null,
                "total_tax_payable": 296000000,
                "tradeand_other_payables_non_current": 1441000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 1505000000,
                "working_capital": 33714000000,
                "interval": "annual",
                "date": "2024-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 6310000000,
                "accounts_receivable": 23065000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": -4401000000,
                "additional_paid_in_capital": 11237000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 3387000000,
                "buildings_and_improvements": 2076000000,
                "capital_lease_obligations": 1807000000,
                "capital_stock": 24000000,
                "cash_and_cash_equivalents": 8589000000,
                "cash_cash_equivalents_and_short_term_investments": 43210000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 24000000,
                "common_stock_equity": 79327000000,
                "construction_in_progress": 529000000,
                "current_accrued_expenses": 8130000000,
                "current_assets": 80126000000,
                "current_capital_lease_obligation": 288000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 288000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 837000000,
                "current_deferred_revenue": 837000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 18047000000,
                "current_notes_payable": null,
                "current_provisions": 1373000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 3273000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 28000000,
                "general_partnership_capital": null,
                "goodwill": 5188000000,
                "goodwill_and_other_intangible_assets": 5995000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 12477000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 10080000000,
                "invested_capital": 87790000000,
                "investment_properties": null,
                "investmentin_financial_assets": 3387000000,
                "investments_and_advances": 3387000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": 511000000,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1519000000,
                "long_term_debt": 8463000000,
                "long_term_debt_and_capital_lease_obligation": 9982000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": 7568000000,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 8076000000,
                "net_tangible_assets": 73332000000,
                "non_current_accounts_receivable": 750000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 10979000000,
                "non_current_deferred_liabilities": 1862000000,
                "non_current_deferred_revenue": 976000000,
                "non_current_deferred_taxes_assets": 10979000000,
                "non_current_deferred_taxes_liabilities": 886000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2087000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24477000000,
                "other_capital_stock": null,
                "other_current_assets": 3771000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 228000000,
                "other_equity_adjustments": 28000000,
                "other_equity_interest": null,
                "other_intangible_assets": 807000000,
                "other_inventories": null,
                "other_investments": null,
                "other_non_current_assets": 201000000,
                "other_non_current_liabilities": 79000000,
                "other_payable": null,
                "other_properties": 1793000000,
                "other_receivables": null,
                "other_short_term_investments": 34621000000,
                "payables": 7191000000,
                "payables_and_accrued_expenses": 15321000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": 0,
                "raw_materials": 3408000000,
                "receivables": 23065000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 68038000000,
                "share_issued": 24477000000,
                "stockholders_equity": 79327000000,
                "tangible_book_value": 73332000000,
                "taxes_receivable": null,
                "total_assets": 111601000000,
                "total_capitalization": 87790000000,
                "total_debt": 10270000000,
                "total_equity_gross_minority_interest": 79327000000,
                "total_liabilities_net_minority_interest": 32274000000,
                "total_non_current_assets": 31475000000,
                "total_non_current_liabilities_net_minority_interest": 14227000000,
                "total_partnership_capital": null,
                "total_tax_payable": 881000000,
                "tradeand_other_payables_non_current": 2304000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 3399000000,
                "working_capital": 62079000000,
                "interval": "annual",
                "date": "2025-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": null,
                "accounts_receivable": null,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": null,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": null,
                "buildings_and_improvements": null,
                "capital_lease_obligations": null,
                "capital_stock": null,
                "cash_and_cash_equivalents": null,
                "cash_cash_equivalents_and_short_term_investments": null,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": null,
                "common_stock_equity": null,
                "construction_in_progress": null,
                "current_accrued_expenses": null,
                "current_assets": null,
                "current_capital_lease_obligation": 250000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": null,
                "current_deferred_assets": null,
                "current_deferred_liabilities": null,
                "current_deferred_revenue": null,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": null,
                "current_notes_payable": null,
                "current_provisions": null,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": null,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": null,
                "general_partnership_capital": null,
                "goodwill": null,
                "goodwill_and_other_intangible_assets": null,
                "gross_accounts_receivable": null,
                "gross_ppe": null,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": null,
                "invested_capital": null,
                "investment_properties": null,
                "investmentin_financial_assets": null,
                "investments_and_advances": null,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": null,
                "long_term_debt": null,
                "long_term_debt_and_capital_lease_obligation": null,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": null,
                "net_tangible_assets": null,
                "non_current_accounts_receivable": null,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": null,
                "non_current_deferred_liabilities": null,
                "non_current_deferred_revenue": null,
                "non_current_deferred_taxes_assets": null,
                "non_current_deferred_taxes_liabilities": null,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": null,
                "notes_receivable": null,
                "ordinary_shares_number": null,
                "other_capital_stock": null,
                "other_current_assets": null,
                "other_current_borrowings": null,
                "other_current_liabilities": null,
                "other_equity_adjustments": null,
                "other_equity_interest": null,
                "other_intangible_assets": null,
                "other_inventories": null,
                "other_investments": 1819000000,
                "other_non_current_assets": null,
                "other_non_current_liabilities": null,
                "other_payable": null,
                "other_properties": null,
                "other_receivables": null,
                "other_short_term_investments": null,
                "payables": null,
                "payables_and_accrued_expenses": null,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": null,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": null,
                "raw_materials": null,
                "receivables": null,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": null,
                "share_issued": null,
                "stockholders_equity": null,
                "tangible_book_value": null,
                "taxes_receivable": null,
                "total_assets": null,
                "total_capitalization": null,
                "total_debt": null,
                "total_equity_gross_minority_interest": null,
                "total_liabilities_net_minority_interest": null,
                "total_non_current_assets": null,
                "total_non_current_liabilities_net_minority_interest": null,
                "total_partnership_capital": null,
                "total_tax_payable": null,
                "tradeand_other_payables_non_current": null,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": null,
                "working_capital": null,
                "interval": "quarterly",
                "date": "2024-07-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 5353000000,
                "accounts_receivable": 17693000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": 11821000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": null,
                "buildings_and_improvements": null,
                "capital_lease_obligations": 1763000000,
                "capital_stock": 25000000,
                "cash_and_cash_equivalents": 9107000000,
                "cash_cash_equivalents_and_short_term_investments": 38487000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 25000000,
                "common_stock_equity": 65899000000,
                "construction_in_progress": null,
                "current_accrued_expenses": 7473000000,
                "current_assets": 67640000000,
                "current_capital_lease_obligation": 273000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 273000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 752000000,
                "current_deferred_revenue": 752000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 16479000000,
                "current_notes_payable": null,
                "current_provisions": 1107000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 2927000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 103000000,
                "general_partnership_capital": null,
                "goodwill": 4724000000,
                "goodwill_and_other_intangible_assets": 5562000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 7098000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 7654000000,
                "invested_capital": 74361000000,
                "investment_properties": null,
                "investmentin_financial_assets": null,
                "investments_and_advances": 2237000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1490000000,
                "long_term_debt": 8462000000,
                "long_term_debt_and_capital_lease_obligation": 9952000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 7098000000,
                "net_tangible_assets": 60337000000,
                "non_current_accounts_receivable": 568000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 10276000000,
                "non_current_deferred_liabilities": 1623000000,
                "non_current_deferred_revenue": 833000000,
                "non_current_deferred_taxes_assets": 10276000000,
                "non_current_deferred_taxes_liabilities": 790000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2387000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24508000000,
                "other_capital_stock": null,
                "other_current_assets": 3806000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 165000000,
                "other_equity_adjustments": 103000000,
                "other_equity_interest": null,
                "other_intangible_assets": 838000000,
                "other_inventories": null,
                "other_investments": 2237000000,
                "other_non_current_assets": 245000000,
                "other_non_current_liabilities": 115000000,
                "other_payable": null,
                "other_properties": 7098000000,
                "other_receivables": null,
                "other_short_term_investments": 29380000000,
                "payables": 6709000000,
                "payables_and_accrued_expenses": 14182000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": null,
                "raw_materials": 1846000000,
                "receivables": 17693000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 53950000000,
                "share_issued": 24508000000,
                "stockholders_equity": 65899000000,
                "tangible_book_value": 60337000000,
                "taxes_receivable": null,
                "total_assets": 96013000000,
                "total_capitalization": 74361000000,
                "total_debt": 10225000000,
                "total_equity_gross_minority_interest": 65899000000,
                "total_liabilities_net_minority_interest": 30114000000,
                "total_non_current_assets": 28373000000,
                "total_non_current_liabilities_net_minority_interest": 13635000000,
                "total_partnership_capital": null,
                "total_tax_payable": 1356000000,
                "tradeand_other_payables_non_current": 1945000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 2881000000,
                "working_capital": 51161000000,
                "interval": "quarterly",
                "date": "2024-10-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 6310000000,
                "accounts_receivable": 23065000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": -4401000000,
                "additional_paid_in_capital": 11237000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 3387000000,
                "buildings_and_improvements": 2076000000,
                "capital_lease_obligations": 1807000000,
                "capital_stock": 24000000,
                "cash_and_cash_equivalents": 8589000000,
                "cash_cash_equivalents_and_short_term_investments": 43210000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 24000000,
                "common_stock_equity": 79327000000,
                "construction_in_progress": 529000000,
                "current_accrued_expenses": 8130000000,
                "current_assets": 80126000000,
                "current_capital_lease_obligation": 288000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 288000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 837000000,
                "current_deferred_revenue": 837000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 18047000000,
                "current_notes_payable": null,
                "current_provisions": 1373000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 3273000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 28000000,
                "general_partnership_capital": null,
                "goodwill": 5188000000,
                "goodwill_and_other_intangible_assets": 5995000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 12477000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 10080000000,
                "invested_capital": 87790000000,
                "investment_properties": null,
                "investmentin_financial_assets": 3387000000,
                "investments_and_advances": 3387000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": 511000000,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1519000000,
                "long_term_debt": 8463000000,
                "long_term_debt_and_capital_lease_obligation": 9982000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": 7568000000,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 8076000000,
                "net_tangible_assets": 73332000000,
                "non_current_accounts_receivable": 750000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 10979000000,
                "non_current_deferred_liabilities": 1862000000,
                "non_current_deferred_revenue": 976000000,
                "non_current_deferred_taxes_assets": 10979000000,
                "non_current_deferred_taxes_liabilities": 886000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2087000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24477000000,
                "other_capital_stock": null,
                "other_current_assets": 3771000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 228000000,
                "other_equity_adjustments": 28000000,
                "other_equity_interest": null,
                "other_intangible_assets": 807000000,
                "other_inventories": null,
                "other_investments": null,
                "other_non_current_assets": 201000000,
                "other_non_current_liabilities": 79000000,
                "other_payable": null,
                "other_properties": 1793000000,
                "other_receivables": null,
                "other_short_term_investments": 34621000000,
                "payables": 7191000000,
                "payables_and_accrued_expenses": 15321000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": 0,
                "raw_materials": 3408000000,
                "receivables": 23065000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 68038000000,
                "share_issued": 24477000000,
                "stockholders_equity": 79327000000,
                "tangible_book_value": 73332000000,
                "taxes_receivable": null,
                "total_assets": 111601000000,
                "total_capitalization": 87790000000,
                "total_debt": 10270000000,
                "total_equity_gross_minority_interest": 79327000000,
                "total_liabilities_net_minority_interest": 32274000000,
                "total_non_current_assets": 31475000000,
                "total_non_current_liabilities_net_minority_interest": 14227000000,
                "total_partnership_capital": null,
                "total_tax_payable": 881000000,
                "tradeand_other_payables_non_current": 2304000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 3399000000,
                "working_capital": 62079000000,
                "interval": "quarterly",
                "date": "2025-01-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 7331000000,
                "accounts_receivable": 22132000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": 11475000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 3240000000,
                "buildings_and_improvements": null,
                "capital_lease_obligations": 1821000000,
                "capital_stock": 24000000,
                "cash_and_cash_equivalents": 15234000000,
                "cash_cash_equivalents_and_short_term_investments": 52691000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 24000000,
                "common_stock_equity": 83843000000,
                "construction_in_progress": null,
                "current_accrued_expenses": 9769000000,
                "current_assets": 89935000000,
                "current_capital_lease_obligation": 300000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 300000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 1074000000,
                "current_deferred_revenue": 1074000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 26542000000,
                "current_notes_payable": null,
                "current_provisions": 2168000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 3469000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 186000000,
                "general_partnership_capital": null,
                "goodwill": 5498000000,
                "goodwill_and_other_intangible_assets": 6267000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 8946000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 11333000000,
                "invested_capital": 92307000000,
                "investment_properties": null,
                "investmentin_financial_assets": 3240000000,
                "investments_and_advances": 3240000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1521000000,
                "long_term_debt": 8464000000,
                "long_term_debt_and_capital_lease_obligation": 9985000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 8946000000,
                "net_tangible_assets": 77576000000,
                "non_current_accounts_receivable": 895000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 13318000000,
                "non_current_deferred_liabilities": 2086000000,
                "non_current_deferred_revenue": 1004000000,
                "non_current_deferred_taxes_assets": 13318000000,
                "non_current_deferred_taxes_liabilities": 1082000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2413000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24387557065,
                "other_capital_stock": null,
                "other_current_assets": 2779000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 228000000,
                "other_equity_adjustments": 186000000,
                "other_equity_interest": null,
                "other_intangible_assets": 769000000,
                "other_inventories": null,
                "other_investments": null,
                "other_non_current_assets": 240000000,
                "other_non_current_liabilities": 177000000,
                "other_payable": null,
                "other_properties": 8946000000,
                "other_receivables": null,
                "other_short_term_investments": 37457000000,
                "payables": 13003000000,
                "payables_and_accrued_expenses": 22772000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": null,
                "raw_materials": 2525000000,
                "receivables": 22132000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": 1000000000,
                "restricted_common_stock": null,
                "retained_earnings": 72158000000,
                "share_issued": 24387557065,
                "stockholders_equity": 83843000000,
                "tangible_book_value": 77576000000,
                "taxes_receivable": null,
                "total_assets": 125254000000,
                "total_capitalization": 92307000000,
                "total_debt": 10285000000,
                "total_equity_gross_minority_interest": 83843000000,
                "total_liabilities_net_minority_interest": 41411000000,
                "total_non_current_assets": 35319000000,
                "total_non_current_liabilities_net_minority_interest": 14869000000,
                "total_partnership_capital": null,
                "total_tax_payable": 5672000000,
                "tradeand_other_payables_non_current": 2621000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 5339000000,
                "working_capital": 63393000000,
                "interval": "quarterly",
                "date": "2025-04-30"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 9064000000,
                "accounts_receivable": 27808000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": 11200000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 3799000000,
                "buildings_and_improvements": null,
                "capital_lease_obligations": 2132000000,
                "capital_stock": 24000000,
                "cash_and_cash_equivalents": 11639000000,
                "cash_cash_equivalents_and_short_term_investments": 53991000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 24000000,
                "common_stock_equity": 100131000000,
                "construction_in_progress": null,
                "current_accrued_expenses": 9555000000,
                "current_assets": 102219000000,
                "current_capital_lease_obligation": 301000000,
                "current_debt": null,
                "current_debt_and_capital_lease_obligation": 301000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 980000000,
                "current_deferred_revenue": 980000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 24257000000,
                "current_notes_payable": null,
                "current_provisions": 2245000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 8708000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 170000000,
                "general_partnership_capital": null,
                "goodwill": 5755000000,
                "goodwill_and_other_intangible_assets": 6510000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 11225000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 14962000000,
                "invested_capital": 108597000000,
                "investment_properties": null,
                "investmentin_financial_assets": 3799000000,
                "investments_and_advances": 3799000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 1831000000,
                "long_term_debt": 8466000000,
                "long_term_debt_and_capital_lease_obligation": 10297000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 11225000000,
                "net_tangible_assets": 93621000000,
                "non_current_accounts_receivable": 1042000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 13570000000,
                "non_current_deferred_liabilities": 2406000000,
                "non_current_deferred_revenue": 1055000000,
                "non_current_deferred_taxes_assets": 13570000000,
                "non_current_deferred_taxes_liabilities": 1351000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 2103000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24347000000,
                "other_capital_stock": null,
                "other_current_assets": 2658000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 202000000,
                "other_equity_adjustments": 170000000,
                "other_equity_interest": null,
                "other_intangible_assets": 755000000,
                "other_inventories": null,
                "other_investments": null,
                "other_non_current_assets": 272000000,
                "other_non_current_liabilities": 243000000,
                "other_payable": null,
                "other_properties": 11225000000,
                "other_receivables": null,
                "other_short_term_investments": 42352000000,
                "payables": 10974000000,
                "payables_and_accrued_expenses": 20529000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": null,
                "raw_materials": 1843000000,
                "receivables": 27808000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": 2800000000,
                "restricted_common_stock": null,
                "retained_earnings": 88737000000,
                "share_issued": 24347000000,
                "stockholders_equity": 100131000000,
                "tangible_book_value": 93621000000,
                "taxes_receivable": null,
                "total_assets": 140740000000,
                "total_capitalization": 108597000000,
                "total_debt": 10598000000,
                "total_equity_gross_minority_interest": 100131000000,
                "total_liabilities_net_minority_interest": 40609000000,
                "total_non_current_assets": 38521000000,
                "total_non_current_liabilities_net_minority_interest": 16352000000,
                "total_partnership_capital": null,
                "total_tax_payable": 1910000000,
                "tradeand_other_payables_non_current": 3406000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 4411000000,
                "working_capital": 77962000000,
                "interval": "quarterly",
                "date": "2025-07-31"
            },
            {
                "type": "balance_sheet",
                "accounts_payable": 8624000000,
                "accounts_receivable": 33391000000,
                "accrued_interest_receivable": null,
                "accumulated_depreciation": null,
                "additional_paid_in_capital": 10626000000,
                "allowance_for_doubtful_accounts_receivable": null,
                "assets_held_for_sale_current": null,
                "available_for_sale_securities": 8187000000,
                "buildings_and_improvements": null,
                "capital_lease_obligations": 2014000000,
                "capital_stock": 24000000,
                "cash_and_cash_equivalents": 11486000000,
                "cash_cash_equivalents_and_short_term_investments": 60608000000,
                "cash_equivalents": null,
                "cash_financial": null,
                "commercial_paper": null,
                "common_stock": 24000000,
                "common_stock_equity": 118897000000,
                "construction_in_progress": null,
                "current_accrued_expenses": 8386000000,
                "current_assets": 116492000000,
                "current_capital_lease_obligation": null,
                "current_debt": 999000000,
                "current_debt_and_capital_lease_obligation": 999000000,
                "current_deferred_assets": null,
                "current_deferred_liabilities": 1248000000,
                "current_deferred_revenue": 1248000000,
                "current_deferred_taxes_assets": null,
                "current_deferred_taxes_liabilities": null,
                "current_liabilities": 26075000000,
                "current_notes_payable": null,
                "current_provisions": 2707000000,
                "defined_pension_benefit": null,
                "derivative_product_liabilities": null,
                "dividends_payable": null,
                "duefrom_related_parties_current": null,
                "duefrom_related_parties_non_current": null,
                "dueto_related_parties_current": null,
                "dueto_related_parties_non_current": null,
                "employee_benefits": null,
                "financial_assets": null,
                "financial_assets_designatedas_fair_value_through_profitor_loss_total": null,
                "finished_goods": 6840000000,
                "fixed_assets_revaluation_reserve": null,
                "foreign_currency_translation_adjustments": null,
                "gains_losses_not_affecting_retained_earnings": 339000000,
                "general_partnership_capital": null,
                "goodwill": 6261000000,
                "goodwill_and_other_intangible_assets": 7197000000,
                "gross_accounts_receivable": null,
                "gross_ppe": 12061000000,
                "hedging_assets_current": null,
                "held_to_maturity_securities": null,
                "income_tax_payable": null,
                "interest_payable": null,
                "inventories_adjustments_allowances": null,
                "inventory": 19784000000,
                "invested_capital": 127364000000,
                "investment_properties": null,
                "investmentin_financial_assets": 8187000000,
                "investments_and_advances": 8187000000,
                "investments_in_other_ventures_under_equity_method": null,
                "investmentsin_associatesat_cost": null,
                "investmentsin_joint_venturesat_cost": null,
                "investmentsin_subsidiariesat_cost": null,
                "land_and_improvements": null,
                "leases": null,
                "liabilities_heldfor_sale_non_current": null,
                "limited_partnership_capital": null,
                "line_of_credit": null,
                "loans_receivable": null,
                "long_term_capital_lease_obligation": 2014000000,
                "long_term_debt": 7468000000,
                "long_term_debt_and_capital_lease_obligation": 9482000000,
                "long_term_equity_investment": null,
                "long_term_provisions": null,
                "machinery_furniture_equipment": null,
                "minimum_pension_liabilities": null,
                "minority_interest": null,
                "net_debt": null,
                "net_ppe": 12061000000,
                "net_tangible_assets": 111700000000,
                "non_current_accounts_receivable": 1369000000,
                "non_current_accrued_expenses": null,
                "non_current_deferred_assets": 13674000000,
                "non_current_deferred_liabilities": 2786000000,
                "non_current_deferred_revenue": 1165000000,
                "non_current_deferred_taxes_assets": 13674000000,
                "non_current_deferred_taxes_liabilities": 1621000000,
                "non_current_note_receivables": null,
                "non_current_pension_and_other_postretirement_benefit_plans": null,
                "non_current_prepaid_assets": 1536000000,
                "notes_receivable": null,
                "ordinary_shares_number": 24305000000,
                "other_capital_stock": null,
                "other_current_assets": 2709000000,
                "other_current_borrowings": null,
                "other_current_liabilities": 1196000000,
                "other_equity_adjustments": 339000000,
                "other_equity_interest": null,
                "other_intangible_assets": 936000000,
                "other_inventories": null,
                "other_investments": null,
                "other_non_current_assets": 632000000,
                "other_non_current_liabilities": 376000000,
                "other_payable": null,
                "other_properties": 12061000000,
                "other_receivables": null,
                "other_short_term_investments": 49122000000,
                "payables": 11539000000,
                "payables_and_accrued_expenses": 19925000000,
                "pensionand_other_post_retirement_benefit_plans_current": null,
                "preferred_securities_outside_stock_equity": null,
                "preferred_shares_number": null,
                "preferred_stock": 0,
                "preferred_stock_equity": null,
                "prepaid_assets": null,
                "properties": null,
                "raw_materials": 4209000000,
                "receivables": 33391000000,
                "receivables_adjustments_allowances": null,
                "restricted_cash": null,
                "restricted_common_stock": null,
                "retained_earnings": 107908000000,
                "share_issued": 24305000000,
                "stockholders_equity": 118897000000,
                "tangible_book_value": 111700000000,
                "taxes_receivable": null,
                "total_assets": 161148000000,
                "total_capitalization": 126365000000,
                "total_debt": 10481000000,
                "total_equity_gross_minority_interest": 118897000000,
                "total_liabilities_net_minority_interest": 42251000000,
                "total_non_current_assets": 44656000000,
                "total_non_current_liabilities_net_minority_interest": 16176000000,
                "total_partnership_capital": null,
                "total_tax_payable": 2915000000,
                "tradeand_other_payables_non_current": 3532000000,
                "trading_securities": null,
                "treasury_shares_number": null,
                "treasury_stock": null,
                "unrealized_gain_loss": null,
                "work_in_process": 8735000000,
                "working_capital": 90417000000,
                "interval": "quarterly",
                "date": "2025-10-31"
            }
        ]
    }
}
```
