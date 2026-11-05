---
title: Stock Cash Flow Statement API
created: 2026-01-23
updated: 2026-11-03
endpoint: POST v1/financials/cash_flow
auth: Bearer Token
---

# Stock Cash Flow Statement API

Returns detailed Cash Flow Statement data, including operating, investing, and financing cash flows.

This endpoint provides operating, investing, and financing cash flow data for the selected reporting periods.

Financial statements data covers over 85,000 tickers. Coverage starts from **September 30, 2021**, subject to availability per company. The full list of covered symbols is available for download [here](https://developers.finimpulse.com/wp-content/uploads/2026/06/tickers_with_financials.csv).

## When to Use This Endpoint
- Populate the "Cash Flow" section of the Financials tabs or analytics tools.
- Retrieve multi-interval reporting series (trailing, quarterly, annual) for liquidity analysis, forecasting, or visualization.

## Request Parameters
**POST** `v1/financials/cash_flow` 

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
curl --location "https://api.finimpulse.com/v1/financials/cash_flow" \
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
var url = "https://api.finimpulse.com/v1/financials/cash_flow";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/financials/cash_flow",
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

url = "https://api.finimpulse.com/v1/financials/cash_flow"
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

const req = https.request('https://api.finimpulse.com/v1/financials/cash_flow', options, (res) => {
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
     `string` — Snapshot type (cash_flow expected).
- **report_key**   
     `string` — Unique identifier of the report this item belongs to. Format: `interval|date`.
- **interval**   
     `string` — Reporting frequency (trailing/quarterly/annual).
- **date**   
     `string` — End date of the reporting period.


### Operating Cash Flow


- **operating_cash_flow**   
     `number` — Operating cash flow.
- **cash_flow_from_continuing_operating_activities**   
     `number` — Cash flow from continuing operating activities.
- **cash_flowsfromusedin_operating_activities_direct**   
     `number` — Cash flows from (used in) operating activities, direct method.
- **net_income_from_continuing_operations**   
     `number` — Net income from continuing operations.
- **operating_gains_losses**   
     `number` — Operating gains and losses.
- **pension_and_employee_benefit_expense**   
     `number` — Pension and employee benefit expense.
- **gain_loss_on_sale_of_ppe**   
     `number` — Gain or loss on sale of property, plant, and equipment (PPE).
- **net_foreign_currency_exchange_gain_loss**   
     `number` — Net foreign currency exchange gain or loss.
- **gain_loss_on_sale_of_business**   
     `number` — Gain or loss on sale of a business.
- **gain_loss_on_investment_securities**   
     `number` — Gain or loss on investment securities.
- **unrealized_gain_loss_on_investment_securities**   
     `number` — Unrealized gain or loss on investment securities.
- **depreciation_and_amortization**   
     `number` — Depreciation and amortization.
- **depreciation_amortization_depletion**   
     `number` — Depreciation, amortization, and depletion.
- **depreciation**   
     `number` — Depreciation.
- **amortization_cash_flow**   
     `number` — Amortization.
- **amortization_of_intangibles**   
     `number` — Amortization of intangibles.
- **amortization_of_securities**   
     `number` — Amortization of securities.
- **depletion**   
     `number` — Depletion.
- **deferred_income_tax**   
     `number` — Deferred income tax.
- **deferred_tax**   
     `number` — Deferred tax.
- **asset_impairment_charge**   
     `number` — Asset impairment charge.
- **stock_based_compensation**   
     `number` — Stock-based compensation.
- **provisionand_write_offof_assets**   
     `number` — Provision and write-off of assets.
- **other_non_cash_items**   
     `number` — Other non-cash items.
- **earnings_losses_from_equity_investments**   
     `number` — Earnings or losses from equity investments.
- **change_in_working_capital**   
     `number` — Change in working capital.
- **change_in_receivables**   
     `number` — Change in receivables.
- **changes_in_account_receivables**   
     `number` — Changes in accounts receivable.
- **change_in_inventory**   
     `number` — Change in inventory.
- **change_in_prepaid_assets**   
     `number` — Change in prepaid assets.
- **change_in_payables_and_accrued_expense**   
     `number` — Change in payables and accrued expenses.
- **change_in_payable**   
     `number` — Change in payables.
- **change_in_account_payable**   
     `number` — Change in accounts payable.
- **change_in_dividend_payable**   
     `number` — Change in dividend payable.
- **change_in_income_tax_payable**   
     `number` — Change in income tax payable.
- **change_in_interest_payable**   
     `number` — Change in interest payable.
- **change_in_tax_payable**   
     `number` — Change in tax payable.
- **change_in_accrued_expense**   
     `number` — Change in accrued expenses.
- **change_in_other_current_assets**   
     `number` — Change in other current assets.
- **change_in_other_current_liabilities**   
     `number` — Change in other current liabilities.
- **change_in_other_working_capital**   
     `number` — Change in other working capital.
- **other_cash_receiptsfrom_operating_activities**   
     `number` — Other cash receipts from operating activities.
- **other_cash_paymentsfrom_operating_activities**   
     `number` — Other cash payments from operating activities.
- **receiptsfrom_customers**   
     `number` — Cash receipts from customers.
- **receiptsfrom_government_grants**   
     `number` — Cash receipts from government grants.
- **classesof_cash_receiptsfrom_operating_activities**   
     `number` — Classes of cash receipts from operating activities.
- **classesof_cash_payments**   
     `number` — Classes of cash payments.


### Investing Cash Flow


- **investing_cash_flow**   
     `number` — Investing cash flow.
- **cash_flow_from_continuing_investing_activities**   
     `number` — Cash flow from continuing investing activities.
- **net_ppe_purchase_and_sale**   
     `number` — Net cash from property, plant, and equipment (PPE).
- **purchase_of_ppe**   
     `number` — Cash paid to purchase property, plant, and equipment (PPE).
- **sale_of_ppe**   
     `number` — Cash received from the sale of property, plant, and equipment (PPE).
- **net_intangibles_purchase_and_sale**   
     `number` — Net cash from purchase and sale of intangibles.
- **purchase_of_intangibles**   
     `number` — Cash paid to purchase intangibles.
- **sale_of_intangibles**   
     `number` — Cash received from the sale of intangibles.
- **net_investment_properties_purchase_and_sale**   
     `number` — Net cash from purchase and sale of investment properties.
- **purchase_of_investment_properties**   
     `number` — Cash paid to purchase investment properties.
- **sale_of_investment_properties**   
     `number` — Cash received from the sale of investment properties.
- **net_business_purchase_and_sale**   
     `number` — Net cash from purchase and sale of businesses.
- **purchase_of_business**   
     `number` — Cash paid to purchase a business.
- **sale_of_business**   
     `number` — Cash received from the sale of a business.
- **net_investment_purchase_and_sale**   
     `number` — Net cash from purchase and sale of investments.
- **purchase_of_investment**   
     `number` — Cash paid to purchase investments.
- **sale_of_investment**   
     `number` — Cash received from sale of investments.
- **net_other_investing_changes**   
     `number` — Net cash from other investing activities.
- **dividends_received_cfi**   
     `number` — Dividends received, cash flow from investing (CFI).
- **interest_received_cfi**   
     `number` — Interest received, cash flow from investing (CFI).


### Financing Cash Flow


- **financing_cash_flow**   
     `number` — Financing cash flow.
- **cash_flow_from_continuing_financing_activities**   
     `number` — Cash flow from continuing financing activities.
- **net_issuance_payments_of_debt**   
     `number` — Net cash from issuance and repayment of debt.
- **net_long_term_debt_issuance**   
     `number` — Net cash from long-term debt issuance.
- **long_term_debt_issuance**   
     `number` — Cash received from issuing long-term debt.
- **long_term_debt_payments**   
     `number` — Cash used to repay long-term debt.
- **net_short_term_debt_issuance**   
     `number` — Net cash from short-term debt issuance.
- **short_term_debt_issuance**   
     `number` — Cash received from issuing short-term debt.
- **short_term_debt_payments**   
     `number` — Cash used to repay short-term debt.
- **net_common_stock_issuance**   
     `number` — Net cash from common stock issuance.
- **common_stock_issuance**   
     `number` — Cash received from issuing common stock.
- **common_stock_payments**   
     `number` — Cash used to buy back common stock.
- **net_preferred_stock_issuance**   
     `number` — Net cash from preferred stock issuance.
- **preferred_stock_issuance**   
     `number` — Cash received from issuing preferred stock.
- **preferred_stock_payments**   
     `number` — Cash used to repay preferred stock.
- **proceeds_from_stock_option_exercised**   
     `number` — Cash received from stock option exercises.
- **cash_dividends_paid**   
     `number` — Total cash dividends paid.
- **common_stock_dividend_paid**   
     `number` — Cash dividends paid on common stock.
- **preferred_stock_dividend_paid**   
     `number` — Cash dividends paid on preferred stock.
- **net_other_financing_charges**   
     `number` — Other net financing charges.
- **interest_paid_cff**   
     `number` — Interest paid, cash flow from financing (CFF).
- **repurchase_of_capital_stock**   
     `number` — Cash used to repurchase capital stock.
- **issuance_of_capital_stock**   
     `number` — Cash received from issuing capital stock.


### End Cash Position


- **end_cash_position**   
     `number` — Cash position at the end of the period.
- **changes_in_cash**   
     `number` — Changes in cash during the period.
- **effect_of_exchange_rate_changes**   
     `number` — Effect of exchange rate changes on cash.
- **beginning_cash_position**   
     `number` — Cash position at the beginning of the period.
- **other_cash_adjustment_inside_changein_cash**   
     `number` — Other cash adjustments included in the change in cash.
- **other_cash_adjustment_outside_changein_cash**   
     `number` — Other cash adjustments excluded from the change in cash.


### Income Tax Paid Supplemental Data


- **income_tax_paid_supplemental_data**   
     `number` — Income tax paid, supplemental disclosure.
- **taxes_refund_paid**   
     `number` — Tax refunds received.
- **taxes_refund_paid_direct**   
     `number` — Tax refunds received, direct method.
- **excess_tax_benefit_from_stock_based_compensation**   
     `number` — Excess tax benefit from stock-based compensation.


### Interest Paid Supplemental Data


- **interest_paid_supplemental_data**   
     `number` — Interest paid, supplemental disclosure.
- **interest_paid_direct**   
     `number` — Interest paid, direct method.
- **interest_received_direct**   
     `number` — Interest received, direct method.


### Cash Flow From Discontinued Operation


- **cash_flow_from_discontinued_operation**   
     `number` — Cash flow from discontinued operations.
- **cash_from_discontinued_operating_activities**   
     `number` — Cash received from discontinued operating activities.
- **cash_from_discontinued_investing_activities**   
     `number` — Cash received from discontinued investing activities.
- **cash_from_discontinued_financing_activities**   
     `number` — Cash received from discontinued financing activities.


### Other


- **interest_paid_cfo**   
     `number` — Interest paid, cash flow from operations (CFO).
- **interest_received_cfo**   
     `number` — Interest received, cash flow from operations (CFO).
- **dividends_paid_direct**   
     `number` — Dividends paid, direct method.
- **dividends_received_direct**   
     `number` — Dividends received, direct method.
- **dividend_paid_cfo**   
     `number` — Dividend paid, cash flow from operations (CFO).
- **dividend_received_cfo**   
     `number` — Dividend received, cash flow from operations (CFO).
- **capital_expenditure**   
     `number` — Capital expenditure.
- **capital_expenditure_reported**   
     `number` — Capital expenditure, as reported.
- **issuance_of_debt**   
     `number` — Cash received from issuing debt.
- **repayment_of_debt**   
     `number` — Cash used to repay debt.
- **free_cash_flow**   
     `number` — Free cash flow (FCF).
- **adjusted_geography_segment_data**   
     `number` — Adjusted data by geographic segment.
- **domestic_sales**   
     `number` — Domestic sales.
- **foreign_sales**   
     `number` — Foreign sales.
- **paymentsto_suppliersfor_goodsand_services**   
     `number` — Cash payments to suppliers for goods and services.
- **paymentson_behalfof_employees**   
     `number` — Cash payments on behalf of employees.


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
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": 563000000,
                "amortization_of_intangibles": 563000000,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 847000000,
                "capital_expenditure": -976000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -399000000,
                "cash_flow_from_continuing_financing_activities": 1865000000,
                "cash_flow_from_continuing_investing_activities": -9830000000,
                "cash_flow_from_continuing_operating_activities": 9108000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 568000000,
                "change_in_accrued_expense": 581000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -774000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 192000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 568000000,
                "change_in_payables_and_accrued_expense": 1149000000,
                "change_in_prepaid_assets": -1715000000,
                "change_in_receivables": -2215000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -3363000000,
                "changes_in_account_receivables": -2215000000,
                "changes_in_cash": 1143000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -399000000,
                "common_stock_issuance": null,
                "common_stock_payments": 0,
                "deferred_income_tax": -406000000,
                "deferred_tax": -406000000,
                "depletion": null,
                "depreciation": 611000000,
                "depreciation_amortization_depletion": 1174000000,
                "depreciation_and_amortization": 1174000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 1990000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": 1865000000,
                "foreign_sales": null,
                "free_cash_flow": 8132000000,
                "gain_loss_on_investment_securities": -100000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 396000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": 246000000,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -9830000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": 4977000000,
                "long_term_debt_issuance": 4977000000,
                "long_term_debt_payments": -1000000000,
                "net_business_purchase_and_sale": -263000000,
                "net_common_stock_issuance": 0,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 9752000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -8591000000,
                "net_issuance_payments_of_debt": 3977000000,
                "net_long_term_debt_issuance": 3977000000,
                "net_other_financing_charges": -1994000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -976000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 9108000000,
                "operating_gains_losses": -100000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": 47000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 281000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -263000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -24811000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -976000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": -1000000000,
                "repurchase_of_capital_stock": 0,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 16220000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 2004000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "annual",
                "date": "2022-01-31"
            },
            {
                "report_key": "annual|2023-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": 699000000,
                "amortization_of_intangibles": 699000000,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 1990000000,
                "capital_expenditure": -1833000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -398000000,
                "cash_flow_from_continuing_financing_activities": -11617000000,
                "cash_flow_from_continuing_investing_activities": 7375000000,
                "cash_flow_from_continuing_operating_activities": 5640000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": -551000000,
                "change_in_accrued_expense": 1341000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -2554000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 252000000,
                "change_in_other_working_capital": null,
                "change_in_payable": -551000000,
                "change_in_payables_and_accrued_expense": 790000000,
                "change_in_prepaid_assets": -1517000000,
                "change_in_receivables": 822000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -2207000000,
                "changes_in_account_receivables": 822000000,
                "changes_in_cash": 1399000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -398000000,
                "common_stock_issuance": null,
                "common_stock_payments": -10039000000,
                "deferred_income_tax": -2164000000,
                "deferred_tax": -2164000000,
                "depletion": null,
                "depreciation": 844000000,
                "depreciation_amortization_depletion": 1543000000,
                "depreciation_and_amortization": 1543000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 3389000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -11617000000,
                "foreign_sales": null,
                "free_cash_flow": 3808000000,
                "gain_loss_on_investment_securities": 45000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 1404000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": 254000000,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": 7375000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": 0,
                "long_term_debt_issuance": 0,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -49000000,
                "net_common_stock_issuance": -10039000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 4368000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": 9257000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -1535000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1833000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 5641000000,
                "operating_gains_losses": 45000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": 1347000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 355000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -49000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -11982000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1833000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -10039000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 21239000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 2709000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "annual",
                "date": "2023-01-31"
            },
            {
                "report_key": "annual|2024-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": 614000000,
                "amortization_of_intangibles": 614000000,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 3389000000,
                "capital_expenditure": -1069000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -395000000,
                "cash_flow_from_continuing_financing_activities": -13633000000,
                "cash_flow_from_continuing_investing_activities": -10566000000,
                "cash_flow_from_continuing_operating_activities": 28090000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 1531000000,
                "change_in_accrued_expense": 2025000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -98000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 514000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 1531000000,
                "change_in_payables_and_accrued_expense": 3556000000,
                "change_in_prepaid_assets": -1522000000,
                "change_in_receivables": -6172000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -3722000000,
                "changes_in_account_receivables": -6172000000,
                "changes_in_cash": 3891000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -395000000,
                "common_stock_issuance": null,
                "common_stock_payments": -9533000000,
                "deferred_income_tax": -2489000000,
                "deferred_tax": -2489000000,
                "depletion": null,
                "depreciation": 894000000,
                "depreciation_amortization_depletion": 1508000000,
                "depreciation_and_amortization": 1508000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 7280000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -13633000000,
                "foreign_sales": null,
                "free_cash_flow": 27021000000,
                "gain_loss_on_investment_securities": -238000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 6549000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": 252000000,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -10566000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": 0,
                "long_term_debt_issuance": 0,
                "long_term_debt_payments": -1250000000,
                "net_business_purchase_and_sale": -83000000,
                "net_common_stock_issuance": -9533000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 29760000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -9290000000,
                "net_issuance_payments_of_debt": -1250000000,
                "net_long_term_debt_issuance": -1250000000,
                "net_other_financing_charges": -2858000000,
                "net_other_investing_changes": -124000000,
                "net_ppe_purchase_and_sale": -1069000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 28090000000,
                "operating_gains_losses": -238000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -278000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 403000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -83000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -19073000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1069000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": -1250000000,
                "repurchase_of_capital_stock": -9533000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 9783000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 3549000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "annual",
                "date": "2024-01-31"
            },
            {
                "report_key": "annual|2025-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 7280000000,
                "capital_expenditure": -3236000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -834000000,
                "cash_flow_from_continuing_financing_activities": -42359000000,
                "cash_flow_from_continuing_investing_activities": -20421000000,
                "cash_flow_from_continuing_operating_activities": 64089000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 3357000000,
                "change_in_accrued_expense": 4278000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -4781000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 1221000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 3357000000,
                "change_in_payables_and_accrued_expense": 7635000000,
                "change_in_prepaid_assets": -395000000,
                "change_in_receivables": -13063000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -9383000000,
                "changes_in_account_receivables": -13063000000,
                "changes_in_cash": 1309000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -834000000,
                "common_stock_issuance": null,
                "common_stock_payments": -33706000000,
                "deferred_income_tax": -4477000000,
                "deferred_tax": -4477000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 1864000000,
                "depreciation_and_amortization": 1864000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 8589000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -42359000000,
                "foreign_sales": null,
                "free_cash_flow": 60853000000,
                "gain_loss_on_investment_securities": -1030000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 15118000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": 246000000,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -20421000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": -1250000000,
                "net_business_purchase_and_sale": -1007000000,
                "net_common_stock_issuance": -33706000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 72880000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -16200000000,
                "net_issuance_payments_of_debt": -1250000000,
                "net_long_term_debt_issuance": -1250000000,
                "net_other_financing_charges": -7059000000,
                "net_other_investing_changes": 22000000,
                "net_ppe_purchase_and_sale": -3236000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 64089000000,
                "operating_gains_losses": -1030000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -502000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 490000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -1007000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -28061000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -3236000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": -1250000000,
                "repurchase_of_capital_stock": -33706000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 11861000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 4737000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "annual",
                "date": "2025-01-31"
            },
            {
                "report_key": "annual|2026-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 8589000000,
                "capital_expenditure": -6042000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -974000000,
                "cash_flow_from_continuing_financing_activities": -48474000000,
                "cash_flow_from_continuing_investing_activities": -52228000000,
                "cash_flow_from_continuing_operating_activities": 102718000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 3096000000,
                "change_in_accrued_expense": 5257000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -11324000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 1844000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 3096000000,
                "change_in_payables_and_accrued_expense": 8353000000,
                "change_in_prepaid_assets": 577000000,
                "change_in_receivables": -15399000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -15949000000,
                "changes_in_account_receivables": -15399000000,
                "changes_in_cash": 2016000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -974000000,
                "common_stock_issuance": null,
                "common_stock_payments": -40086000000,
                "deferred_income_tax": -1424000000,
                "deferred_tax": -1424000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 2843000000,
                "depreciation_and_amortization": 2843000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 10605000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -48474000000,
                "foreign_sales": null,
                "free_cash_flow": 96676000000,
                "gain_loss_on_investment_securities": -8918000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 20288000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -52228000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -14535000000,
                "net_common_stock_issuance": -40086000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 120067000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -31651000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -8058000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -6042000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 102718000000,
                "operating_gains_losses": -8918000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -287000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 644000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -14535000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -58118000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -6042000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -40086000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 26467000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 6386000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "annual",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2024-07-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": null,
                "capital_expenditure": null,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": null,
                "cash_flow_from_continuing_financing_activities": null,
                "cash_flow_from_continuing_investing_activities": null,
                "cash_flow_from_continuing_operating_activities": null,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": null,
                "change_in_accrued_expense": null,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": null,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": null,
                "change_in_other_working_capital": null,
                "change_in_payable": null,
                "change_in_payables_and_accrued_expense": null,
                "change_in_prepaid_assets": null,
                "change_in_receivables": null,
                "change_in_tax_payable": null,
                "change_in_working_capital": null,
                "changes_in_account_receivables": null,
                "changes_in_cash": null,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": null,
                "common_stock_issuance": null,
                "common_stock_payments": null,
                "deferred_income_tax": null,
                "deferred_tax": null,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": null,
                "depreciation_and_amortization": null,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": null,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": null,
                "foreign_sales": null,
                "free_cash_flow": null,
                "gain_loss_on_investment_securities": null,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": null,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": null,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": null,
                "net_business_purchase_and_sale": null,
                "net_common_stock_issuance": null,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": null,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": null,
                "net_issuance_payments_of_debt": null,
                "net_long_term_debt_issuance": null,
                "net_other_financing_charges": null,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": null,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": null,
                "operating_gains_losses": null,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": null,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": null,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": null,
                "purchase_of_intangibles": null,
                "purchase_of_investment": null,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": null,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": null,
                "repurchase_of_capital_stock": null,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": null,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": null,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2024-07-31"
            },
            {
                "report_key": "quarterly|2024-10-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 8571000000,
                "capital_expenditure": -813000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -245000000,
                "cash_flow_from_continuing_financing_activities": -12745000000,
                "cash_flow_from_continuing_investing_activities": -4346000000,
                "cash_flow_from_continuing_operating_activities": 17627000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 1689000000,
                "change_in_accrued_expense": 604000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -977000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 265000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 1689000000,
                "change_in_payables_and_accrued_expense": 2293000000,
                "change_in_prepaid_assets": -714000000,
                "change_in_receivables": -3561000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -2694000000,
                "changes_in_account_receivables": -3561000000,
                "changes_in_cash": 536000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -245000000,
                "common_stock_issuance": null,
                "common_stock_payments": -10997000000,
                "deferred_income_tax": -603000000,
                "deferred_tax": -603000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 478000000,
                "depreciation_and_amortization": 478000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 9107000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -12745000000,
                "foreign_sales": null,
                "free_cash_flow": 16814000000,
                "gain_loss_on_investment_securities": -38000000,
                "gain_loss_on_sale_of_business": -38000000,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 3540000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -4346000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -148000000,
                "net_common_stock_issuance": -10997000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 19309000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -3385000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -1707000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -813000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 17627000000,
                "operating_gains_losses": -38000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -77000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 204000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -148000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -4992000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -813000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -10997000000,
                "sale_of_business": 66000000,
                "sale_of_intangibles": null,
                "sale_of_investment": 1607000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1252000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2024-10-31"
            },
            {
                "report_key": "quarterly|2025-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 9107000000,
                "capital_expenditure": -1077000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -245000000,
                "cash_flow_from_continuing_financing_activities": -9949000000,
                "cash_flow_from_continuing_investing_activities": -7198000000,
                "cash_flow_from_continuing_operating_activities": 16629000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 867000000,
                "change_in_accrued_expense": 360000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -2424000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 372000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 867000000,
                "change_in_payables_and_accrued_expense": 1227000000,
                "change_in_prepaid_assets": 331000000,
                "change_in_receivables": -5369000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -5863000000,
                "changes_in_account_receivables": -5369000000,
                "changes_in_cash": -518000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -245000000,
                "common_stock_issuance": null,
                "common_stock_payments": -7811000000,
                "deferred_income_tax": -598000000,
                "deferred_tax": -598000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 543000000,
                "depreciation_and_amortization": 543000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 8589000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -9949000000,
                "foreign_sales": null,
                "free_cash_flow": 15552000000,
                "gain_loss_on_investment_securities": -728000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 4129000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -7198000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -542000000,
                "net_common_stock_issuance": -7811000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 22091000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -5601000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -1894000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1077000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 16629000000,
                "operating_gains_losses": -728000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -137000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 1000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -542000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -7488000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1077000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -7811000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 1887000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1321000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2025-01-31"
            },
            {
                "report_key": "quarterly|2025-04-30",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 8589000000,
                "capital_expenditure": -1227000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -244000000,
                "cash_flow_from_continuing_financing_activities": -15553000000,
                "cash_flow_from_continuing_investing_activities": -5216000000,
                "cash_flow_from_continuing_operating_activities": 27414000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 941000000,
                "change_in_accrued_expense": 7128000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -1258000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 350000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 941000000,
                "change_in_payables_and_accrued_expense": 8069000000,
                "change_in_prepaid_assets": 560000000,
                "change_in_receivables": 933000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": 8654000000,
                "changes_in_account_receivables": 933000000,
                "changes_in_cash": 6645000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -244000000,
                "common_stock_issuance": null,
                "common_stock_payments": -14095000000,
                "deferred_income_tax": -2177000000,
                "deferred_tax": -2177000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 611000000,
                "depreciation_and_amortization": 611000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 15234000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -15553000000,
                "foreign_sales": null,
                "free_cash_flow": 26187000000,
                "gain_loss_on_investment_securities": 175000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": null,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -5216000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": null,
                "net_business_purchase_and_sale": -383000000,
                "net_common_stock_issuance": -14095000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 18775000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -3606000000,
                "net_issuance_payments_of_debt": null,
                "net_long_term_debt_issuance": null,
                "net_other_financing_charges": -1584000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1227000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 27414000000,
                "operating_gains_losses": 175000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -98000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 370000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -383000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -7195000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1227000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": null,
                "repurchase_of_capital_stock": -14095000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 3589000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1474000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2025-04-30"
            },
            {
                "report_key": "quarterly|2025-07-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 15234000000,
                "capital_expenditure": -1895000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -244000000,
                "cash_flow_from_continuing_financing_activities": -11833000000,
                "cash_flow_from_continuing_investing_activities": -7127000000,
                "cash_flow_from_continuing_operating_activities": 15365000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 1314000000,
                "change_in_accrued_expense": -4053000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -3622000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 629000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 1314000000,
                "change_in_payables_and_accrued_expense": -2739000000,
                "change_in_prepaid_assets": 386000000,
                "change_in_receivables": -5676000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -11022000000,
                "changes_in_account_receivables": -5676000000,
                "changes_in_cash": -3595000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -244000000,
                "common_stock_issuance": null,
                "common_stock_payments": -9720000000,
                "deferred_income_tax": 17000000,
                "deferred_tax": 17000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 669000000,
                "depreciation_and_amortization": 669000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 11639000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -11833000000,
                "foreign_sales": null,
                "free_cash_flow": 13470000000,
                "gain_loss_on_investment_securities": -2248000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": null,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -7127000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": null,
                "net_business_purchase_and_sale": -294000000,
                "net_common_stock_issuance": -9720000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 26422000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -4938000000,
                "net_issuance_payments_of_debt": null,
                "net_long_term_debt_issuance": null,
                "net_other_financing_charges": -1869000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1895000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 15365000000,
                "operating_gains_losses": -2248000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -98000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 0,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -294000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -8158000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1895000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": null,
                "repurchase_of_capital_stock": -9720000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 3220000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1625000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2025-07-31"
            },
            {
                "report_key": "quarterly|2025-10-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 11639000000,
                "capital_expenditure": -1636000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -244000000,
                "cash_flow_from_continuing_financing_activities": -14880000000,
                "cash_flow_from_continuing_investing_activities": -9024000000,
                "cash_flow_from_continuing_operating_activities": 23751000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": -223000000,
                "change_in_accrued_expense": 1129000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -4823000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 332000000,
                "change_in_other_working_capital": null,
                "change_in_payable": -223000000,
                "change_in_payables_and_accrued_expense": 906000000,
                "change_in_prepaid_assets": -89000000,
                "change_in_receivables": -5582000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -9256000000,
                "changes_in_account_receivables": -5582000000,
                "changes_in_cash": -153000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -244000000,
                "common_stock_issuance": null,
                "common_stock_payments": -12456000000,
                "deferred_income_tax": 125000000,
                "deferred_tax": 125000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 751000000,
                "depreciation_and_amortization": 751000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 11486000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -14880000000,
                "foreign_sales": null,
                "free_cash_flow": 22115000000,
                "gain_loss_on_investment_securities": -1353000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 4858000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -9024000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -693000000,
                "net_common_stock_issuance": -12456000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 31910000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -6695000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -2453000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1636000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 23751000000,
                "operating_gains_losses": -1353000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -80000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 273000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -693000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -9425000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1636000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -12456000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 2730000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1654000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2025-10-31"
            },
            {
                "report_key": "quarterly|2026-01-31",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 11486000000,
                "capital_expenditure": -1284000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -242000000,
                "cash_flow_from_continuing_financing_activities": -6208000000,
                "cash_flow_from_continuing_investing_activities": -30861000000,
                "cash_flow_from_continuing_operating_activities": 36188000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 1064000000,
                "change_in_accrued_expense": 1053000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -1621000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 533000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 1064000000,
                "change_in_payables_and_accrued_expense": 2117000000,
                "change_in_prepaid_assets": -280000000,
                "change_in_receivables": -5074000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -4325000000,
                "changes_in_account_receivables": -5074000000,
                "changes_in_cash": -881000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -242000000,
                "common_stock_issuance": null,
                "common_stock_payments": -3815000000,
                "deferred_income_tax": 611000000,
                "deferred_tax": 611000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 812000000,
                "depreciation_and_amortization": 812000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 10605000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -6208000000,
                "foreign_sales": null,
                "free_cash_flow": 34904000000,
                "gain_loss_on_investment_securities": -5492000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": 6979000000,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -30861000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": 0,
                "net_business_purchase_and_sale": -13165000000,
                "net_common_stock_issuance": -3815000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 42960000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -16412000000,
                "net_issuance_payments_of_debt": 0,
                "net_long_term_debt_issuance": 0,
                "net_other_financing_charges": -2152000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1284000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 36188000000,
                "operating_gains_losses": -5492000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -11000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 1000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -13165000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -33340000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1284000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": 0,
                "repurchase_of_capital_stock": -3815000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 16928000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1633000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2026-01-31"
            },
            {
                "report_key": "quarterly|2026-04-30",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 10605000000,
                "capital_expenditure": -1757000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -243000000,
                "cash_flow_from_continuing_financing_activities": -21283000000,
                "cash_flow_from_continuing_investing_activities": -26429000000,
                "cash_flow_from_continuing_operating_activities": 50344000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 2210000000,
                "change_in_accrued_expense": 7763000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -4420000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 1217000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 2210000000,
                "change_in_payables_and_accrued_expense": 9973000000,
                "change_in_prepaid_assets": -983000000,
                "change_in_receivables": -2243000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": 3544000000,
                "changes_in_account_receivables": -2243000000,
                "changes_in_cash": 2632000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -243000000,
                "common_stock_issuance": null,
                "common_stock_payments": -19312000000,
                "deferred_income_tax": 1584000000,
                "deferred_tax": 1584000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 997000000,
                "depreciation_and_amortization": 997000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 13237000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -21283000000,
                "foreign_sales": null,
                "free_cash_flow": 48587000000,
                "gain_loss_on_investment_securities": -15936000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": null,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -26429000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": null,
                "net_business_purchase_and_sale": -87000000,
                "net_common_stock_issuance": -19312000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 58321000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -24585000000,
                "net_issuance_payments_of_debt": null,
                "net_long_term_debt_issuance": null,
                "net_other_financing_charges": -2243000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -1757000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 50344000000,
                "operating_gains_losses": -15936000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -94000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 515000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -87000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -26582000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -1757000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": null,
                "repurchase_of_capital_stock": -19312000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 1997000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 1928000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "quarterly",
                "date": "2026-04-30"
            },
            {
                "report_key": "trailing|2026-06-19",
                "type": "cash_flow",
                "adjusted_geography_segment_data": null,
                "amortization_cash_flow": null,
                "amortization_of_intangibles": null,
                "amortization_of_securities": null,
                "asset_impairment_charge": null,
                "beginning_cash_position": 15234000000,
                "capital_expenditure": -6572000000,
                "capital_expenditure_reported": null,
                "cash_dividends_paid": -973000000,
                "cash_flow_from_continuing_financing_activities": -54204000000,
                "cash_flow_from_continuing_investing_activities": -73441000000,
                "cash_flow_from_continuing_operating_activities": 125648000000,
                "cash_flow_from_discontinued_operation": null,
                "cash_flowsfromusedin_operating_activities_direct": null,
                "cash_from_discontinued_financing_activities": null,
                "cash_from_discontinued_investing_activities": null,
                "cash_from_discontinued_operating_activities": null,
                "change_in_account_payable": 4365000000,
                "change_in_accrued_expense": 5892000000,
                "change_in_dividend_payable": null,
                "change_in_income_tax_payable": null,
                "change_in_interest_payable": null,
                "change_in_inventory": -14486000000,
                "change_in_other_current_assets": null,
                "change_in_other_current_liabilities": 2711000000,
                "change_in_other_working_capital": null,
                "change_in_payable": 4365000000,
                "change_in_payables_and_accrued_expense": 10257000000,
                "change_in_prepaid_assets": -966000000,
                "change_in_receivables": -18575000000,
                "change_in_tax_payable": null,
                "change_in_working_capital": -21059000000,
                "changes_in_account_receivables": -18575000000,
                "changes_in_cash": -1997000000,
                "classesof_cash_payments": null,
                "classesof_cash_receiptsfrom_operating_activities": null,
                "common_stock_dividend_paid": -973000000,
                "common_stock_issuance": null,
                "common_stock_payments": -45303000000,
                "deferred_income_tax": 2337000000,
                "deferred_tax": 2337000000,
                "depletion": null,
                "depreciation": null,
                "depreciation_amortization_depletion": 3229000000,
                "depreciation_and_amortization": 3229000000,
                "dividend_paid_cfo": null,
                "dividend_received_cfo": null,
                "dividends_paid_direct": null,
                "dividends_received_cfi": null,
                "dividends_received_direct": null,
                "domestic_sales": null,
                "earnings_losses_from_equity_investments": null,
                "effect_of_exchange_rate_changes": null,
                "end_cash_position": 13237000000,
                "excess_tax_benefit_from_stock_based_compensation": null,
                "financing_cash_flow": -54204000000,
                "foreign_sales": null,
                "free_cash_flow": 119076000000,
                "gain_loss_on_investment_securities": -25029000000,
                "gain_loss_on_sale_of_business": null,
                "gain_loss_on_sale_of_ppe": null,
                "income_tax_paid_supplemental_data": null,
                "interest_paid_cff": null,
                "interest_paid_cfo": null,
                "interest_paid_direct": null,
                "interest_paid_supplemental_data": null,
                "interest_received_cfi": null,
                "interest_received_cfo": null,
                "interest_received_direct": null,
                "investing_cash_flow": -73441000000,
                "issuance_of_capital_stock": null,
                "issuance_of_debt": null,
                "long_term_debt_issuance": null,
                "long_term_debt_payments": null,
                "net_business_purchase_and_sale": -14239000000,
                "net_common_stock_issuance": -45303000000,
                "net_foreign_currency_exchange_gain_loss": null,
                "net_income_from_continuing_operations": 159613000000,
                "net_intangibles_purchase_and_sale": null,
                "net_investment_properties_purchase_and_sale": null,
                "net_investment_purchase_and_sale": -52630000000,
                "net_issuance_payments_of_debt": null,
                "net_long_term_debt_issuance": null,
                "net_other_financing_charges": -8717000000,
                "net_other_investing_changes": null,
                "net_ppe_purchase_and_sale": -6572000000,
                "net_preferred_stock_issuance": null,
                "net_short_term_debt_issuance": null,
                "operating_cash_flow": 125648000000,
                "operating_gains_losses": -25029000000,
                "other_cash_adjustment_inside_changein_cash": null,
                "other_cash_adjustment_outside_changein_cash": null,
                "other_cash_paymentsfrom_operating_activities": null,
                "other_cash_receiptsfrom_operating_activities": null,
                "other_non_cash_items": -283000000,
                "paymentson_behalfof_employees": null,
                "paymentsto_suppliersfor_goodsand_services": null,
                "pension_and_employee_benefit_expense": null,
                "preferred_stock_dividend_paid": null,
                "preferred_stock_issuance": null,
                "preferred_stock_payments": null,
                "proceeds_from_stock_option_exercised": 789000000,
                "provisionand_write_offof_assets": null,
                "purchase_of_business": -14239000000,
                "purchase_of_intangibles": null,
                "purchase_of_investment": -77505000000,
                "purchase_of_investment_properties": null,
                "purchase_of_ppe": -6572000000,
                "receiptsfrom_customers": null,
                "receiptsfrom_government_grants": null,
                "repayment_of_debt": null,
                "repurchase_of_capital_stock": -45303000000,
                "sale_of_business": null,
                "sale_of_intangibles": null,
                "sale_of_investment": 24875000000,
                "sale_of_investment_properties": null,
                "sale_of_ppe": null,
                "short_term_debt_issuance": null,
                "short_term_debt_payments": null,
                "stock_based_compensation": 6840000000,
                "taxes_refund_paid": null,
                "taxes_refund_paid_direct": null,
                "unrealized_gain_loss_on_investment_securities": null,
                "interval": "trailing",
                "date": "2026-06-19"
            }
        ]
    }
}
```
