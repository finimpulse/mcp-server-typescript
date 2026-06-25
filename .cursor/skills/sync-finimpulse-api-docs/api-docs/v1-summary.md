---
title: Summary
created: 2026-01-15
updated: 2026-02-06
endpoint: POST v1/summary
auth: Bearer Token
---

# Summary

Returns a unified snapshot of identity, profile, market data, fundamentals, ownership, analyst coverage, and fund metrics for a single asset symbol.

The */v1/summary* endpoint is the most comprehensive single-call snapshot in FinImpulse. It aggregates a broad set of fields used across Summary, Profile, Statistics &amp; Risk, and fund performance views. Use it when you need fast, accurate, high-coverage data for a ticker without orchestrating multiple endpoints.

## Asset Type Compatibility
The returned field set varies by asset class.

- **Stocks —** Returns a company snapshot: profile and classification, real-time/regular-market pricing, dividends, valuation multiples, share statistics, ownership, analyst targets, and high-level financial highlights.
- **ETFs —** Returns a fund snapshot: description/objective, NAV/yield/AUM, trailing return series, category fields, and portfolio exposure breakdown (sector weights). Company-specific fields are generally not applicable.
- **Mutual funds —** Returns a fund snapshot: description/objective, fees and Morningstar fields (when available), trailing returns and category comparisons, and portfolio exposure breakdown. Real-time trading fields can be unavailable.

This endpoint uses a unified schema across stocks, ETFs, and mutual funds. Fields that are not relevant for a given asset type are returned as null (or empty strings in some legacy feed cases).

## **When to Use This Endpoint**
- Retrieve a full ticker summary in a single call (fast entry into dashboards, widgets, and AI flows).
- Populate the Asset Summary view (header, price block, key ratios, profile excerpt, and highlights).
- Provide quick, accurate data for ticker autocomplete and post-selection details (after /search).
- Support cross-asset comparisons where available (e.g., USD-normalized amounts, fund returns, and standard ratios).
- Feed downstream analytics pipelines that need a broad snapshot without multiple joins.

## Request Parameters
**POST** `v1/summary` 

- **symbol**   
     `string` *(required)* — Asset identifier (ticker symbol).
- **tag**   
     `string` *(optional)* — User-defined identifier for the task (max 255 characters). It is returned in the response data object, allowing you to match results with the corresponding request. It does not affect API processing or filtering logic.


### Example Request


```bash
curl --location "https://api.finimpulse.com/v1/summary" \
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
var url = "https://api.finimpulse.com/v1/summary";

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
  CURLOPT_URL => "https://api.finimpulse.com/v1/summary",
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

url = "https://api.finimpulse.com/v1/summary"
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

const req = https.request('https://api.finimpulse.com/v1/summary', options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(body), null, 2)));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
```


## Response
The response returns a single summary object for the requested symbol. Below, its fields are grouped by functional area.

Because the ***/summary*** is unified across asset types, **empty/null** values do not indicate an error. They reflect asset-specific applicability and/or upstream coverage for that dataset.

### Identity &amp; Classification

Core identification and classification data for the asset.


- **symbol**   
     `string` — Asset symbol (ticker).
- **quote_type**   
     `string` — Asset type classification returned by the provider (e.g., equity, etf, mutualfund).
- **currency**   
     `string` — Trading currency for the asset.
- **financial_currency**   
     `string` — Reporting currency used for financial statement metrics (stock).
- **category**   
     `string` — Fund category label (provider taxonomy).
- **fund_category_name**   
     `string` — Fund category name used for trailing/category comparisons.
- **fund_family**   
     `string` — Fund family/sponsor name.
- **legal_type**   
     `string` — Legal structure/type (e.g., Exchange Traded Fund).


### Address &amp; Contact

Location and contact information. Primarily applicable to stocks.


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
- **ir_website**   
     `string` — Investor relations website URL (stocks).


### Sector &amp; Industry Classification

Industry taxonomy and sector classification used for grouping, filtering, and analytics. Mainly applicable to stocks.


- **sector**   
     `string` — Sector name.
- **sector_key**   
     `string` — Normalized sector key.
- **sector_disp**   
     `string` — Display-friendly sector label.
- **industry**   
     `string` — Industry name.
- **industry_key**   
     `string` — Normalized industry key.
- **industry_disp**   
     `string` — Display-friendly industry label.


### Description &amp; Organization


- **long_business_summary**   
     `string` — Long-form company description (stocks) or investment objective summary (funds).
- **full_time_employees**   
     `integer` — Number of full-time employees.
- **founded_date**   
     `string` — Date used as inception/founding metadata in the upstream feed.
- **fund_inception_date**   
     `string` — Fund inception date (ETFs and mutual funds).


### Governance &amp; Risk Indicators

These fields are primarily applicable to stocks.


- **audit_risk**   
     `integer` — Audit risk score.
- **board_risk**   
     `integer` — Board risk score.
- **compensation_risk**   
     `integer` — Compensation risk score.
- **share_holder_rights_risk**   
     `integer` — Shareholder rights risk score.
- **overall_risk**   
     `integer` — Overall governance risk score.
- **governance_epoch_date**   
     `string` — Governance dataset reference date.
- **compensation_as_of_epoch_date**   
     `string` — Compensation dataset reference date.


### Market Price &amp; Trading


- **previous_close**   
     `number` — Previous close price.
- **open**   
     `number` — Market open price (stock and ETF).
- **day_low**   
     `number` — Day low price (stock and ETF).
- **day_high**   
     `number` — Day high price (stock and ETF).
- **regular_market_previous_close**   
     `number` — Previous close for the regular market session.
- **regular_market_open**   
     `number` — Regular session open price (stock and ETF).
- **regular_market_day_low**   
     `number` — Regular session low price (stock and ETF).
- **regular_market_day_high**   
     `number` — Regular session high price (stock and ETF).
- **volume**   
     `integer` — Trading volume (stock and ETF).
- **regular_market_volume**   
     `integer` — Trading volume for the regular market session (stock and ETF).
- **average_volume**   
     `integer` — Average volume (provider-defined window).
- **average_volume_10days**   
     `integer` — Average volume over the last 10 trading days.
- **average_daily_volume_10_day**   
     `integer` — Alias of average_volume_10days in some feeds.
- **bid**   
     `number` — Current bid price (stock and ETF).
- **ask**   
     `number` — Current ask price (stock and ETF).
- **bid_size**   
     `integer` — Bid size (shares/units) where available (stock and ETF).
- **ask_size**   
     `integer` — Ask size (shares/units) where available (stock and ETF).
- **price_hint**   
     `integer` — Provider price precision hint (decimal places).
- **current_price**   
     `number` — Current price for a stock (provider field; often regular market price).
- **nav_price**   
     `number` — Net asset value price (NAV) for an ETF when available.
- **yield**   
     `number` — Fund distribution yield (ETFs and mutual funds, when available).


### Price Ranges


- **fifty_two_week_low**   
     `number` — 52-week low price.
- **fifty_two_week_high**   
     `number` — 52-week high price.
- **all_time_low**   
     `number` — All-time low price (provider-defined based on available history).
- **all_time_high**   
     `number` — All-time high price (provider-defined based on available history).
- **fifty_day_average**   
     `number` — 50-day average price.
- **two_hundred_day_average**   
     `number` — 200-day average price.


### Dividends &amp; Distributions

Availability depends on asset type (primarily applicable to dividend-paying stocks and funds).


- **dividend_rate**   
     `number` — Forward annual dividend rate (provider estimate).
- **dividend_yield**   
     `number` — Forward dividend yield (as a fraction, not percent).
- **trailing_annual_dividend_rate**   
     `number` — Trailing annual dividend/distribution rate.
- **trailing_annual_dividend_yield**   
     `number` — Trailing annual dividend/distribution yield (fraction).
- **ex_dividend_date**   
     `string` — Ex-dividend date.
- **last_dividend_value**   
     `number` — Last dividend/distribution amount.
- **last_dividend_date**   
     `string` — Last dividend date.
- **five_year_avg_dividend_yield**   
     `number` — Five-year average dividend yield (provider).
- **payout_ratio**   
     `number` — Dividend payout ratio.


### Valuation &amp; Multiples

High-level valuation indicators, used to assess relative pricing and market expectations.


- **market_cap**   
     `number` — Market capitalization (stocks).
- **enterprise_value**   
     `number` — Enterprise value.
- **trailing_pe**   
     `number` — Trailing price-to-earnings ratio.
- **forward_pe**   
     `number` — Forward price-to-earnings ratio.
- **price_to_sales_trailing_12_months**   
     `number` — Price-to-sales (TTM).
- **book_value**   
     `number` — Book value per share.
- **price_to_book**   
     `number` — Price-to-book ratio (provider; for funds can be holdings weighted).
- **enterprise_to_revenue**   
     `number` — Enterprise value to revenue ratio.
- **enterprise_to_ebitda**   
     `number` — Enterprise value to EBITDA ratio.
- **default_methodology**   
     `string` — Methodology tag for some derived valuation fields (e.g., GAAP/nonGAAP).


### Shares &amp; Ownership


- **float_shares**   
     `integer` — Float shares.
- **shares_outstanding**   
     `integer` — Shares outstanding.
- **implied_shares_outstanding**   
     `integer` — Implied shares outstanding (provider derived).
- **shares_short**   
     `integer` — Shares sold short.
- **shares_short_prior_month**   
     `integer` — Shares short in the prior month.
- **shares_short_previous_month_date**   
     `string` — Reference date for shares_short_prior_month.
- **date_short_interest**   
     `string` — Short interest settlement/reference date.
- **shares_percent_shares_out**   
     `number` — Short shares as a fraction of shares outstanding.
- **short_ratio**   
     `number` — Short ratio (days to cover).
- **short_percent_of_float**   
     `number` — Short shares as a fraction of float shares.
- **held_percent_insiders**   
     `number` — Insider ownership fraction.
- **held_percent_institutions**   
     `number` — Institutional ownership fraction.
- **insiders_percent_held**   
     `number` — Alias/duplicate insider ownership fraction.
- **institutions_percent_held**   
     `number` — Alias/duplicate institutional ownership fraction.
- **institutions_float_percent_held**   
     `number` — Institutions' ownership as a fraction of float.
- **institutions_count**   
     `integer` — Number of institutional holders in the provider dataset.
- **beta**   
     `number` — Beta vs benchmark (provider).
- **beta_3_year**   
     `number` — 3-year beta for funds where available.
- **beta_5_year**   
     `number` — 5-year beta for funds where available.


### Corporate Actions


- **last_split_factor**   
     `string` — Last stock split factor (e.g., "10:1").
- **last_split_date**   
     `string` — Last stock split date as UNIX timestamp (seconds).


### Fiscal Dates &amp; Reporting Periods

Key fiscal timeline markers used to align financial metrics. These fields do not apply to funds.


- **last_fiscal_year_end**   
     `string` — Last fiscal year end date.
- **next_fiscal_year_end**   
     `string` — Next fiscal year end date.
- **most_recent_quarter**   
     `string` — Most recent quarter end date (MRQ).


### Earnings &amp; Growth (Stocks)


- **earnings_quarterly_growth**   
     `number` — Quarterly earnings growth (YoY) as a fraction.
- **earnings_growth**   
     `number` — Earnings growth (provider timeframe) as a fraction.
- **revenue_growth**   
     `number` — Revenue growth (provider timeframe) as a fraction.
- **net_income_to_common**   
     `number` — Net income available to common shareholders.
- **trailing_eps**   
     `number` — Trailing earnings per share (EPS).
- **forward_eps**   
     `number` — Forward EPS estimate (provider).


### Financial Highlights (Stocks)


- **total_cash**   
     `number` — Total cash and cash equivalents.
- **total_cash_per_share**   
     `number` — Cash and cash equivalents per share.
- **ebitda**   
     `number` — EBITDA.
- **total_debt**   
     `number` — Total debt.
- **quick_ratio**   
     `number` — Quick ratio.
- **current_ratio**   
     `number` — Current ratio.
- **total_revenue**   
     `number` — Total revenue (provider timeframe, typically TTM).
- **debt_to_equity**   
     `number` — Debt-to-equity ratio.
- **revenue_per_share**   
     `number` — Revenue per share.
- **return_on_assets**   
     `number` — Return on assets (ROA) as a fraction.
- **return_on_equity**   
     `number` — Return on equity (ROE) as a fraction.
- **gross_profits**   
     `number` — Gross profit.
- **free_cashflow**   
     `number` — Free cash flow.
- **operating_cashflow**   
     `number` — Operating cash flow.
- **profit_margins**   
     `number` — Profit margin as a fraction.
- **gross_margins**   
     `number` — Gross margin as a fraction.
- **ebitda_margins**   
     `number` — EBITDA margin as a fraction.
- **operating_margins**   
     `number` — Operating margin as a fraction.


### Analyst Coverage (Stocks)


- **target_high_price**   
     `number` — Analyst target high price.
- **target_low_price**   
     `number` — Analyst target low price.
- **target_mean_price**   
     `number` — Analyst target mean price.
- **target_median_price**   
     `number` — Analyst target median price.
- **recommendation_mean**   
     `number` — Mean recommendation score (provider scale). Lower is typically more bullish depending on provider scale.
- **recommendation_key**   
     `string` — Recommendation label (e.g., strong_buy), provider-defined taxonomy.
- **number_of_analyst_opinions**   
     `integer` — Number of analyst opinions included in recommendation/targets.


### Fund Size &amp; Fee-related Fields


- **total_assets**   
     `number` — Total net assets/AUM, where available.
- **annual_report_expense_ratio**   
     `number` — Annual report expense ratio (fund fee).
- **annual_holdings_turnover**   
     `number` — Annual holdings turnover (fraction).
- **last_cap_gain**   
     `number` — Last capital gains distribution amount, where available.
- **morning_star_overall_rating**   
     `integer` — Morningstar overall rating (stars), where available.
- **morning_star_risk_rating**   
     `integer` — Morningstar risk rating where available.


### Fund Performance - Trailing Returns


- **ytd_return**   
     `number` — Year-to-date return (provider).
- **ytd_return_pct**   
     `number` — Year-to-date return (alternate/percentage field in provider feed).
- **five_yr_avg_return_pct**   
     `number` — Five-year average return (provider).
- **one_year_total_return**   
     `number` — One-year total return (provider).
- **three_year_total_return**   
     `number` — Three-year total return (provider).
- **trailing_ytd**   
     `number` — Trailing YTD return.
- **trailing_one_month**   
     `number` — Trailing 1-month return.
- **trailing_three_month**   
     `number` — Trailing 3-month return.
- **trailing_one_year**   
     `number` — Trailing 1-year return.
- **trailing_three_year**   
     `number` — Trailing 3-year return.
- **trailing_five_year**   
     `number` — Trailing 5-year return.
- **trailing_ten_year**   
     `number` — Trailing 10-year return.
- **trailing_last_bull_mkt**   
     `number` — Return during last bull market period (provider-defined).
- **trailing_last_bear_mkt**   
     `number` — Return during last bear market period (provider-defined).
- **trailing_category_ytd**   
     `number` — Category trailing YTD return.
- **trailing_category_one_month**   
     `number` — Category trailing 1-month return.
- **trailing_category_three_month**   
     `number` — Category trailing 3-month return.
- **trailing_category_one_year**   
     `number` — Category trailing 1-year return.
- **trailing_category_three_year**   
     `number` — Category trailing 3-year return.
- **trailing_category_five_year**   
     `number` — Category trailing 5-year return.
- **trailing_category_ten_year**   
     `number` — Category trailing 10-year return.
- **trailing_category_last_bull_mkt**   
     `number` — Category return during last bull market (provider-defined).
- **trailing_category_last_bear_mkt**   
     `number` — Category return during last bear market (provider-defined).
- **load_adjusted_one_year**   
     `number` — Load-adjusted 1-year return (mutual funds).
- **load_adjusted_three_year**   
     `number` — Load-adjusted 3-year return (mutual funds).
- **load_adjusted_five_year**   
     `number` — Load-adjusted 5-year return (mutual funds).
- **load_adjusted_ten_year**   
     `number` — Load-adjusted 10-year return (mutual funds).


### Fund Ranks and Ratings


- **rank_ytd**   
     `integer` — Rank in category for YTD return (provider).
- **rank_one_month**   
     `integer` — Rank in category for 1-month return.
- **rank_three_month**   
     `integer` — Rank in category for 3-month return.
- **rank_one_year**   
     `integer` — Rank in category for 1-year return.
- **rank_three_year**   
     `integer` — Rank in category for 3-year return.
- **rank_five_year**   
     `integer` — Rank in category for 5-year return.
- **morning_star_return_rating**   
     `integer` — Morningstar return rating where available.
- **risk_rating**   
     `integer` — Fund risk rating where available (provider-defined scale).
- **num_years_up**   
     `integer` — Number of years with positive returns in the evaluated window.
- **num_years_down**   
     `integer` — Number of years with negative returns in the evaluated window.
- **best_one_yr_total_return**   
     `number` — Best 1-year total return in the evaluated period.
- **best_three_yr_total_return**   
     `number` — Best 3-year total return in the evaluated period.
- **worst_one_yr_total_return**   
     `number` — Worst 1-year total return in the evaluated period.
- **worst_three_yr_total_return**   
     `number` — Worst 3-year total return in the evaluated period.


### Fund Holdings - Exposure Breakdown


- **cash_position**   
     `number` — Portfolio allocation to cash.
- **stock_position**   
     `number` — Portfolio allocation to equities.
- **bond_position**   
     `number` — Portfolio allocation to bonds.
- **other_position**   
     `number` — Portfolio allocation to other asset classes.
- **preferred_position**   
     `number` — Portfolio allocation to preferred shares.
- **convertible_position**   
     `number` — Portfolio allocation to convertibles.
- **price_to_earnings**   
     `number` — Holdings-weighted P/E for the fund portfolio.
- **price_to_book_holding**   
     `number` — Holdings-weighted P/B for the fund portfolio.
- **price_to_sales**   
     `number` — Holdings-weighted P/S for the fund portfolio.
- **price_to_cashflow**   
     `number` — Holdings-weighted P/CF for the fund portfolio.
- **median_market_cap**   
     `number` — Median market cap of holdings (provider).
- **three_year_earnings_growth**   
     `number` — Holdings-weighted 3-year earnings growth (provider).
- **realestate**   
     `number` — Sector weight - Real Estate.
- **consumer_cyclical**   
     `number` — Sector weight - Consumer Cyclical.
- **basic_materials**   
     `number` — Sector weight - Basic Materials.
- **consumer_defensive**   
     `number` — Sector weight - Consumer Defensive.
- **technology**   
     `number` — Sector weight - Technology.
- **communication_services**   
     `number` — Sector weight - Communication Services.
- **financial_services**   
     `number` — Sector weight - Financial Services.
- **utilities**   
     `number` — Sector weight - Utilities.
- **industrials**   
     `number` — Sector weight - Industrials.
- **energy**   
     `number` — Sector weight - Energy.
- **healthcare**   
     `number` — Sector weight - Healthcare.


### Estimates &amp; Earnings Calendar (Stocks)


- **current_quarter_estimate**   
     `number` — Current quarter EPS estimate (provider).
- **current_quarter_estimate_date**   
     `string` — Quarter label for the estimate (e.g., “4Q”).
- **current_calendar_quarter**   
     `string` — Calendar quarter label (e.g., "4Q2025").
- **current_quarter_estimate_year**   
     `integer` — Year component for the estimate.
- **current_fiscal_quarter**   
     `string` — Fiscal quarter label (e.g., "4Q2026").
- **earnings_date**   
     `string` — Next earnings date/time.
- **is_earnings_date_estimate**   
     `boolean` — Indicates whether earnings_date is estimated.


### Market Performance Deltas (Stocks)


- **52_week_change**   
     `number` — 52-week price change (fraction).
- **sand_p_52_week_change**   
     `number` — S&amp;P 500 52-week change (fraction) used for comparison (provider field; not a benchmark series).


### Valuation Measures - Internal Snapshot (Stocks)


- **valuation_measures_enterprise_value**   
     `number` — Enterprise value from valuation measures dataset. May differ from enterprise_value due to dataset timing/methodology.
- **valuation_measures_enterprises_value_ebitda_ratio**   
     `number` — EV/EBITDA ratio from valuation measures dataset.
- **valuation_measures_enterprises_value_revenue_ratio**   
     `number` — EV/Revenue ratio from valuation measures dataset.
- **valuation_measures_forward_pe_ratio**   
     `number` — Forward P/E ratio from valuation measures dataset.
- **valuation_measures_market_cap**   
     `number` — Market cap from valuation measures dataset.
- **valuation_measures_pb_ratio**   
     `number` — Price-to-book ratio from valuation measures dataset.
- **valuation_measures_pe_ratio**   
     `number` — P/E ratio from valuation measures dataset.
- **valuation_measures_peg_ratio**   
     `number` — PEG ratio from valuation measures dataset.
- **valuation_measures_ps_ratio**   
     `number` — Price-to-sales ratio from valuation measures dataset.


### Metadata


- **insert_time**   
     `string` — Timestamp when this summary record was inserted/updated in FinImpulse storage.
- **period**   
     `string` — Provider period label used for some fund sub-blocks (often an empty string).
- **buy_info_count**   
     `integer` — Number of insider buy transactions in the provider window (stocks).
- **buy_info_shares**   
     `integer` — Total shares bought by insiders in the provider window (stocks).
- **buy_percent_insider_shares**   
     `number` — Insider buys as a fraction of insider shares (stocks).
- **sell_info_count**   
     `integer` — Number of insider sell transactions in the provider window (stocks).
- **sell_info_shares**   
     `integer` — Total shares sold by insiders in the provider window (stocks).
- **sell_percent_insider_shares**   
     `number` — Insider sells as a fraction of insider shares (stocks).
- **net_info_count**   
     `integer` — Total insider transactions count (buy + sell) in the provider window (stocks).
- **net_info_shares**   
     `integer` — Net insider shares (buys minus sells) in the provider window (stocks).
- **net_percent_insider_shares**   
     `number` — Net insider shares as a fraction of insider shares (stocks).
- **total_insider_shares**   
     `integer` — Total insider shares (provider; stocks).


### Example Response


```json
{
    "task_id": "603e849d-fc60-4337-91df-8e7b1fc7447d",
    "status_code": 20000,
    "status_message": "OK",
    "cost": 0.0023,
    "data": {
        "symbol": "NVDA",
        "tag": "just tag"
    },
    "result": {
        "symbol": "NVDA",
        "quote_type": "equity",
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
        "audit_risk": 5,
        "board_risk": 9,
        "compensation_risk": 4,
        "share_holder_rights_risk": 8,
        "overall_risk": 8,
        "governance_epoch_date": "2026-02-01T00:00:00Z",
        "compensation_as_of_epoch_date": "2025-12-31T00:00:00Z",
        "ir_website": "http://phx.corporate-ir.net/phoenix.zhtml?c=116466&p=irol-IRHome",
        "previous_close": 191.13,
        "open": 187.2,
        "day_low": 184.88,
        "day_high": 190.3,
        "regular_market_previous_close": 191.13,
        "regular_market_open": 187.2,
        "regular_market_day_low": 184.88,
        "regular_market_day_high": 190.3,
        "dividend_rate": 0.04,
        "dividend_yield": 0.0002,
        "ex_dividend_date": "2025-12-04T00:00:00Z",
        "payout_ratio": 0.0099,
        "five_year_avg_dividend_yield": 0.05,
        "trailing_pe": 45.829628,
        "volume": 160114156,
        "regular_market_volume": 160114156,
        "average_volume": 181422162,
        "average_volume_10days": 163937740,
        "average_daily_volume_10_day": 163937740,
        "bid": 185.52,
        "ask": 185.67,
        "bid_size": 500,
        "ask_size": 400,
        "market_cap": 4519046938624,
        "fifty_two_week_low": 86.62,
        "fifty_two_week_high": 212.19,
        "all_time_high": 212.19,
        "all_time_low": 0.033333,
        "price_to_sales_trailing_12_months": 24.14769,
        "fifty_day_average": 183.9022,
        "two_hundred_day_average": 168.1236,
        "trailing_annual_dividend_rate": 0.04,
        "trailing_annual_dividend_yield": 0.00020928,
        "nav_price": null,
        "yield": null,
        "price_hint": 2,
        "enterprise_value": 4460536922112,
        "forward_pe": 24.218866,
        "profit_margins": 0.53007,
        "float_shares": 23330673000,
        "shares_outstanding": 24305000000,
        "shares_short": 261838673,
        "shares_short_prior_month": 264294883,
        "shares_short_previous_month_date": "2025-12-15T00:00:00Z",
        "date_short_interest": "2026-01-15T00:00:00Z",
        "shares_percent_shares_out": 0.0108,
        "held_percent_insiders": 0.0433,
        "held_percent_institutions": 0.69654,
        "short_ratio": 1.64,
        "short_percent_of_float": 0.0112,
        "beta": 2.314,
        "implied_shares_outstanding": 24347000000,
        "category": "",
        "book_value": 4.892,
        "price_to_book": 37.941536,
        "fund_family": "",
        "legal_type": "",
        "last_fiscal_year_end": "2025-01-26T00:00:00Z",
        "next_fiscal_year_end": "2026-01-26T00:00:00Z",
        "most_recent_quarter": "2025-10-26T00:00:00Z",
        "earnings_quarterly_growth": 0.653,
        "net_income_to_common": 99198001152,
        "trailing_eps": 4.05,
        "forward_eps": 7.66386,
        "last_split_factor": "10:1",
        "last_split_date": "2024-06-10T00:00:00Z",
        "enterprise_to_revenue": 23.835,
        "enterprise_to_ebitda": 39.58,
        "52_week_change": 0.56434894,
        "sand_p_52_week_change": 0.15544534,
        "last_dividend_value": 0.01,
        "last_dividend_date": "2025-12-04T00:00:00Z",
        "morning_star_overall_rating": null,
        "morning_star_risk_rating": null,
        "annual_report_expense_ratio": null,
        "beta_3_year": null,
        "total_assets": null,
        "founded_date": "1999-01-22T14:30:00Z",
        "fund_inception_date": null,
        "last_cap_gain": null,
        "annual_holdings_turnover": null,
        "ytd_return": null,
        "beta_5_year": null,
        "current_price": 185.61,
        "target_high_price": 352,
        "target_low_price": 140,
        "target_mean_price": 253.62138,
        "target_median_price": 250,
        "recommendation_mean": 1.34375,
        "recommendation_key": "strong_buy",
        "number_of_analyst_opinions": 58,
        "total_cash": 60608000000,
        "total_cash_per_share": 2.494,
        "ebitda": 112696000512,
        "total_debt": 10821999616,
        "quick_ratio": 3.605,
        "current_ratio": 4.468,
        "total_revenue": 187141996544,
        "debt_to_equity": 9.102,
        "revenue_per_share": 7.668,
        "return_on_assets": 0.53528,
        "return_on_equity": 1.07359,
        "gross_profits": 131092996096,
        "free_cashflow": 53282873344,
        "operating_cashflow": 83158999040,
        "earnings_growth": 0.667,
        "revenue_growth": 0.625,
        "gross_margins": 0.7005,
        "ebitda_margins": 0.60220003,
        "operating_margins": 0.63168997,
        "fund_category_name": null,
        "trailing_ytd": null,
        "trailing_one_month": null,
        "trailing_three_month": null,
        "trailing_one_year": null,
        "trailing_three_year": null,
        "trailing_five_year": null,
        "trailing_ten_year": null,
        "trailing_last_bull_mkt": null,
        "trailing_last_bear_mkt": null,
        "trailing_category_ytd": null,
        "trailing_category_one_month": null,
        "trailing_category_three_month": null,
        "trailing_category_one_year": null,
        "trailing_category_three_year": null,
        "trailing_category_five_year": null,
        "trailing_category_ten_year": null,
        "trailing_category_last_bull_mkt": null,
        "trailing_category_last_bear_mkt": null,
        "load_adjusted_one_year": null,
        "load_adjusted_three_year": null,
        "load_adjusted_five_year": null,
        "load_adjusted_ten_year": null,
        "rank_ytd": null,
        "rank_one_month": null,
        "rank_three_month": null,
        "rank_one_year": null,
        "rank_three_year": null,
        "rank_five_year": null,
        "morning_star_return_rating": null,
        "ytd_return_pct": null,
        "five_yr_avg_return_pct": null,
        "num_years_up": null,
        "num_years_down": null,
        "best_one_yr_total_return": null,
        "best_three_yr_total_return": null,
        "worst_one_yr_total_return": null,
        "worst_three_yr_total_return": null,
        "one_year_total_return": null,
        "three_year_total_return": null,
        "risk_rating": null,
        "insiders_percent_held": 0.0433,
        "institutions_percent_held": 0.69654,
        "institutions_float_percent_held": 0.72807,
        "institutions_count": 7010,
        "period": "6m",
        "buy_info_count": 9,
        "buy_info_shares": 4415192,
        "buy_percent_insider_shares": 0.004,
        "sell_info_count": 43,
        "sell_info_shares": 7101141,
        "sell_percent_insider_shares": 0.00699999,
        "net_info_count": 52,
        "net_info_shares": -2685949,
        "net_percent_insider_shares": -0.003,
        "total_insider_shares": 1052189952,
        "cash_position": null,
        "stock_position": null,
        "bond_position": null,
        "other_position": null,
        "preferred_position": null,
        "convertible_position": null,
        "price_to_earnings": null,
        "price_to_book_holding": null,
        "price_to_sales": null,
        "price_to_cashflow": null,
        "median_market_cap": null,
        "three_year_earnings_growth": null,
        "realestate": null,
        "consumer_cyclical": null,
        "basic_materials": null,
        "consumer_defensive": null,
        "technology": null,
        "communication_services": null,
        "financial_services": null,
        "utilities": null,
        "industrials": null,
        "energy": null,
        "healthcare": null,
        "current_quarter_estimate": 1.52289,
        "current_quarter_estimate_date": "4Q",
        "current_calendar_quarter": "DatePeriod { Date = 10/01/2025, PeriodType = Quarter }",
        "current_quarter_estimate_year": 2025,
        "current_fiscal_quarter": "DatePeriod { Date = 10/01/2026, PeriodType = Quarter }",
        "earnings_date": "2026-02-25T21:00:00Z",
        "is_earnings_date_estimate": false,
        "financial_currency": "USD",
        "default_methodology": "nongaap",
        "valuation_measures_enterprise_value": 2910691390000,
        "valuation_measures_enterprises_value_ebitda_ratio": 38.8756,
        "valuation_measures_enterprises_value_revenue_ratio": 25.6972,
        "valuation_measures_forward_pe_ratio": 28.0899,
        "valuation_measures_market_cap": 2938953390000,
        "valuation_measures_pb_ratio": 44.597845,
        "valuation_measures_pe_ratio": 47.40229,
        "valuation_measures_peg_ratio": 0.8605,
        "valuation_measures_ps_ratio": 26.355582,
        "insert_time": "2026-02-03T14:02:10Z"
    }
}
```


## Notes 

- Some provider feeds return empty strings ('') instead of null for non-applicable text fields, especially for fund address/contact fields.
- Percent-like fields are generally returned as fractions (e.g., 0.02 = 2%).
- If you need guaranteed completeness for a specific functional block (e.g., full financial statements, full holdings, or events), use the dedicated endpoint for that block.
