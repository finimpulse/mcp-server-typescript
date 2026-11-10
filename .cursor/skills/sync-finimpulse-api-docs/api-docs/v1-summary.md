---
title: Summary Data API for Stocks, ETFs &amp; Mutual Funds
created: 2026-01-15
updated: 2026-11-09
endpoint: POST v1/summary
auth: Bearer Token
---

# Summary Data API for Stocks, ETFs &amp; Mutual Funds

Returns a combined snapshot of profile, market, fundamental, ownership, analyst, and fund data for one asset symbol.

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/) · [n8n](https://n8n.io/integrations/finimpulse/) · [Make](https://www.make.com/en/integrations/finimpulse)

This endpoint retrieves a comprehensive snapshot for a single stock, ETF, or mutual fund, including profile, pricing, valuation, financial highlights, ownership, analyst coverage, and fund performance and holdings.

For a focused field set covering core identification, pricing, and key fundamentals only, use the [Lightweight Summary API](https://developers.finimpulse.com/v1/summary-lite/).

## Coverage 

Asset TypesStocks, ETFs, mutual fundsMarket Regions~55Listings~650,000

Coverage figures are approximate and may change over time.

## Data Freshness

Data is returned as a snapshot. The time of the latest update is indicated by **insert_time** and varies between assets, so price and volume fields may not reflect current market data. For current prices, use the [Market Price API](https://developers.finimpulse.com/v1/market-price/).

## Asset Type Compatibility

This endpoint uses one response schema for stocks, ETFs, and mutual funds. Available data depends on the asset type:

- **Stocks:** company profile, pricing, dividends, valuation, share and ownership data, analyst coverage, and financial highlights.
- **ETFs:** fund profile, pricing and NAV, dividends, yield, total assets, trailing returns with category comparisons, and holdings breakdown.
- **Mutual funds:** fund profile, pricing, yield, total assets, fees, Morningstar ratings, trailing returns with category comparisons and ranks, and holdings breakdown.

## Data Availability &amp; Limitations

- Some fields may return **null** or an **empty string** if a specific value is not available for a given asset. This does not indicate an error. Some numeric fields may also return 0 when no value is available (e.g., **morning_star_return_rating**), while in other fields 0 is a valid value (e.g., **bond_position**).
- Fields prefixed with **valuation_measures_** come from a separate dataset and may differ from the corresponding main fields due to data timing or methodology (e.g., **valuation_measures_pe_ratio** and **trailing_pe**).
- For listings quoted in minor currency units (for example, pence on the London Stock Exchange), **price_to_book** and **trailing_annual_dividend_yield** may differ significantly from the actual values.
- This endpoint returns a general snapshot and does not include complete data for every block. For full financial statements, holdings, or events, use the dedicated endpoints.

## When to Use This Endpoint

- Build asset overview pages with profile, valuation, and analyst data for stocks, ETFs, and mutual funds.
- Display fund details such as total assets, trailing returns, sector allocation, and Morningstar ratings.
- Add sector, industry, and dividend data to watchlists and portfolio views.
- Feed a structured asset snapshot into AI assistants and analytics pipelines.

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
The response returns a single summary object for the requested symbol.

### Identity &amp; Classification


- **symbol**   
     `string` — Asset identifier (ticker symbol).
- **display_name**   
     `string` — Asset display name.
- **logo**   
     `string` — URL of the company or fund logo image.
- **quote_type**   
     `string` — Asset class identifier (stock, etf, mutualfund).
- **currency**   
     `string` — Trading currency.
- **financial_currency**   
     `string` — Reporting currency used for financial statement metrics.
- **category**   
     `string` — Fund category classification.
- **fund_category_name**   
     `string` — Fund category name.
- **fund_family**   
     `string` — Fund family.
- **legal_type**   
     `string` — Legal structure/type.


### Address &amp; Contact


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
     `string` — Investor relations website URL.


### Sector &amp; Industry Classification


- **sector**   
     `string` — Sector classification.
- **sector_key**   
     `string` — Normalized sector key.
- **sector_disp**   
     `string` — Display-friendly sector label.
- **industry**   
     `string` — Industry classification.
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
     `string` — Date of the first available price record (ISO 8601).
- **fund_inception_date**   
     `string` — Fund inception date.


### Governance &amp; Risk Indicators


- **audit_risk**   
     `integer` — Audit risk score.
- **board_risk**   
     `integer` — Board risk score.
- **compensation_risk**   
     `integer` — Compensation risk score.
- **share_holder_rights_risk**   
     `integer` — Shareholder rights risk score.
- **overall_risk**   
     `integer` — Overall risk score.
- **governance_epoch_date**   
     `string` — Governance dataset reference date.
- **compensation_as_of_epoch_date**   
     `string` — Compensation dataset reference date.


### Market Price &amp; Trading


- **previous_close**   
     `number` — Previous close price.
- **open**   
     `number` — Market open price.
- **day_low**   
     `number` — Intraday low price.
- **day_high**   
     `number` — Intraday high price.
- **regular_market_previous_close**   
     `number` — Closing price of the most recent completed regular session.
- **regular_market_open**   
     `number` — Price of the first trade of the current regular session.
- **regular_market_day_low**   
     `number` — Regular market intraday low.
- **regular_market_day_high**   
     `number` — Regular market intraday high.
- **volume**   
     `integer` — Trading volume.
- **regular_market_volume**   
     `integer` — Trading volume for the regular market session.
- **average_volume**   
     `integer` — Average trading volume.
- **average_volume_10days**   
     `integer` — Average volume over the last 10 trading days.
- **average_daily_volume_10_day**   
     `integer` — Average volume over the last 10 trading days (duplicate of `average_volume_10days`).
- **bid**   
     `number` — Bid price.
- **ask**   
     `number` — Ask price.
- **bid_size**   
     `integer` — Bid size (shares/units).
- **ask_size**   
     `integer` — Ask size (shares/units).
- **price_hint**   
     `integer` — Price precision hint (decimal places).
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
- **nav_price**   
     `number` — Net asset value price (NAV).
- **yield**   
     `number` — Fund distribution yield.


### Price Ranges


- **fifty_two_week_low**   
     `number` — Lowest price in the last 52 weeks.
- **fifty_two_week_high**   
     `number` — Highest price in the last 52 weeks.
- **all_time_low**   
     `number` — All-time low price.
- **all_time_high**   
     `number` — All-time high price.
- **fifty_day_average**   
     `number` — 50-day moving average.
- **two_hundred_day_average**   
     `number` — 200-day moving average.


### Dividends &amp; Distributions


- **dividend_rate**   
     `number` — Forward dividend rate.
- **dividend_yield**   
     `number` — Forward dividend yield.
- **trailing_annual_dividend_rate**   
     `number` — Trailing 12-month dividend rate.
- **trailing_annual_dividend_yield**   
     `number` — Trailing 12-month dividend yield.
- **ex_dividend_date**   
     `string` — Ex-dividend date.
- **last_dividend_value**   
     `number` — Last dividend amount.
- **last_dividend_date**   
     `string` — Ex-dividend date of the last dividend.
- **five_year_avg_dividend_yield**   
     `number` — Five-year average dividend yield.
- **payout_ratio**   
     `number` — Dividend payout ratio.


### Valuation &amp; Multiples


- **market_cap**   
     `number` — Market capitalization.
- **enterprise_value**   
     `number` — Enterprise value (EV).
- **trailing_pe**   
     `number` — Trailing Price-to-Earnings (P/E) ratio.
- **forward_pe**   
     `number` — Forward Price-to-Earnings (P/E) ratio.
- **price_to_sales_trailing_12_months**   
     `number` — Price-to-sales (P/S) ratio (TTM).
- **book_value**   
     `number` — Book value per share.
- **price_to_book**   
     `number` — Price-to-book (P/B) ratio.
- **enterprise_to_revenue**   
     `number` — Enterprise value-to-revenue (EV/Revenue) ratio.
- **enterprise_to_ebitda**   
     `number` — Enterprise value-to-EBITDA (EV/EBITDA) ratio.
- **default_methodology**   
     `string` — Methodology tag (e.g., GAAP/nonGAAP).


### Shares &amp; Ownership


- **float_shares**   
     `integer` — Float shares.
- **shares_outstanding**   
     `integer` — Shares outstanding.
- **implied_shares_outstanding**   
     `integer` — Implied shares outstanding.
- **shares_short**   
     `integer` — Shares sold short.
- **shares_short_prior_month**   
     `integer` — Shares sold short as of the prior month.
- **shares_short_previous_month_date**   
     `string` — Reference date for the prior month's short interest figure.
- **date_short_interest**   
     `string` — Reference date for the current short interest figure.
- **shares_percent_shares_out**   
     `number` — Short interest as a percentage of shares outstanding.
- **short_ratio**   
     `number` — Short interest ratio.
- **short_percent_of_float**   
     `number` — Short interest as a percentage of float shares.
- **held_percent_insiders**   
     `number` — Percentage of shares held by insiders.
- **held_percent_institutions**   
     `number` — Percentage of shares held by institutions.
- **insiders_percent_held**   
     `number` — Percentage of shares held by insiders (duplicate of `held_percent_insiders`).
- **institutions_percent_held**   
     `number` — Percentage of shares held by institutions (duplicate of `held_percent_institutions`).
- **institutions_float_percent_held**   
     `number` — Percentage of float shares held by institutions.
- **institutions_count**   
     `integer` — Number of institutional holders.
- **beta**   
     `number` — Beta.
- **beta_3_year**   
     `number` — 3-year beta.
- **beta_5_year**   
     `number` — 5-year beta.


### Insider Transactions


- **period**   
     `string` — Reporting period for the insider transaction fields.
- **buy_info_count**   
     `integer` — Number of insider buy transactions during `period`.
- **buy_info_shares**   
     `integer` — Total shares bought by insiders during `period`.
- **buy_percent_insider_shares**   
     `number` — Insider buys during `period`, as a fraction of total insider shares.
- **sell_info_count**   
     `integer` — Number of insider sell transactions during `period`.
- **sell_info_shares**   
     `integer` — Total shares sold by insiders during `period`.
- **sell_percent_insider_shares**   
     `number` — Insider sells during `period`, as a fraction of total insider shares.
- **net_info_count**   
     `integer` — Total insider transactions (buy + sell) during `period`.
- **net_info_shares**   
     `integer` — Net insider shares (buys - sells) during `period`.
- **net_percent_insider_shares**   
     `number` — Net insider shares during `period`, as a fraction of insider holdings.
- **total_insider_shares**   
     `integer` — Total insider shares held.


### Corporate Actions


- **last_split_factor**   
     `string` — Ratio of the last stock split (e.g. "4:1").
- **last_split_date**   
     `string` — Date of the last stock split.


### Fiscal Dates &amp; Reporting Periods


- **last_fiscal_year_end**   
     `string` — End date of the last fiscal year.
- **next_fiscal_year_end**   
     `string` — End date of the next fiscal year.
- **most_recent_quarter**   
     `string` — End date of the most recent quarter (MRQ).


### Earnings &amp; Growth


- **earnings_quarterly_growth**   
     `number` — Quarterly earnings growth (YoY).
- **earnings_growth**   
     `number` — Earnings growth.
- **revenue_growth**   
     `number` — Revenue growth.
- **net_income_to_common**   
     `number` — Net income available to common shareholders.
- **trailing_eps**   
     `number` — Trailing earnings per share (EPS).
- **forward_eps**   
     `number` — Forward earnings per share (EPS) estimate.


### Financial Highlights


- **total_cash**   
     `number` — Total cash and cash equivalents.
- **total_cash_per_share**   
     `number` — Cash and cash equivalents per share.
- **ebitda**   
     `number` — Earnings before interest, taxes, depreciation, and amortization (EBITDA).
- **total_debt**   
     `number` — Total debt.
- **quick_ratio**   
     `number` — Quick ratio.
- **current_ratio**   
     `number` — Current ratio.
- **total_revenue**   
     `number` — Total revenue for the period.
- **debt_to_equity**   
     `number` — Debt-to-Equity (D/E).
- **revenue_per_share**   
     `number` — Revenue per share.
- **return_on_assets**   
     `number` — Return on assets (ROA).
- **return_on_equity**   
     `number` — Return on equity (ROE).
- **gross_profits**   
     `number` — Gross profit.
- **free_cashflow**   
     `number` — Free cash flow (FCF).
- **operating_cashflow**   
     `number` — Operating cash flow (OCF).
- **profit_margins**   
     `number` — Profit margin.
- **gross_margins**   
     `number` — Gross margin.
- **ebitda_margins**   
     `number` — EBITDA margin.
- **operating_margins**   
     `number` — Operating margin.


### Analyst Coverage


- **target_high_price**   
     `number` — Analyst target high price.
- **target_low_price**   
     `number` — Analyst target low price.
- **target_mean_price**   
     `number` — Analyst target mean price.
- **target_median_price**   
     `number` — Analyst target median price.
- **recommendation_mean**   
     `number` — Average analyst recommendation score.
- **recommendation_key**   
     `string` — Recommendation label (e.g., strong_buy).
- **number_of_analyst_opinions**   
     `integer` — Number of analyst opinions.


### Fund Size &amp; Fee-related Fields


- **total_assets**   
     `number` — Total assets.
- **annual_report_expense_ratio**   
     `number` — Annual report expense ratio.
- **annual_holdings_turnover**   
     `number` — Annual holdings turnover.
- **last_cap_gain**   
     `number` — Last capital gains distribution amount.
- **morning_star_overall_rating**   
     `integer` — Morningstar overall rating (stars).
- **morning_star_risk_rating**   
     `integer` — Morningstar risk rating.


### Fund Performance - Trailing Returns


- **ytd_return**   
     `number` — Year-to-date (YTD) return.
- **ytd_return_pct**   
     `number` — Year-to-date (YTD) return.
- **five_yr_avg_return_pct**   
     `number` — Five-year average return.
- **one_year_total_return**   
     `number` — One-year total return.
- **three_year_total_return**   
     `number` — Three-year total return.
- **trailing_ytd**   
     `number` — Trailing year-to-date (YTD) return.
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
     `number` — Trailing return during the last bull market period.
- **trailing_last_bear_mkt**   
     `number` — Trailing return during the last bear market period.
- **trailing_category_ytd**   
     `number` — Category trailing year-to-date (YTD) return.
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
     `number` — Category trailing return during the last bull market.
- **trailing_category_last_bear_mkt**   
     `number` — Category trailing return during the last bear market.
- **load_adjusted_one_year**   
     `number` — Load-adjusted 1-year return.
- **load_adjusted_three_year**   
     `number` — Load-adjusted 3-year return.
- **load_adjusted_five_year**   
     `number` — Load-adjusted 5-year return.
- **load_adjusted_ten_year**   
     `number` — Load-adjusted 10-year return.


### Fund Ranks and Ratings


- **rank_ytd**   
     `integer` — Category rank, year-to-date (YTD).
- **rank_one_month**   
     `integer` — Category rank, 1-month.
- **rank_three_month**   
     `integer` — Category rank, 3-month.
- **rank_one_year**   
     `integer` — Category rank, 1-year.
- **rank_three_year**   
     `integer` — Category rank, 3-year.
- **rank_five_year**   
     `integer` — Category rank, 5-year.
- **morning_star_return_rating**   
     `integer` — Morningstar return rating.
- **risk_rating**   
     `integer` — Fund risk rating.
- **num_years_up**   
     `integer` — Number of years with a positive return.
- **num_years_down**   
     `integer` — Number of years with a negative return.
- **best_one_yr_total_return**   
     `number` — Best 1-year total return.
- **best_three_yr_total_return**   
     `number` — Best 3-year total return.
- **worst_one_yr_total_return**   
     `number` — Worst 1-year total return.
- **worst_three_yr_total_return**   
     `number` — Worst 3-year total return.


### Fund Holdings - Exposure Breakdown


- **cash_position**   
     `number` — Percentage of fund assets held in cash.
- **stock_position**   
     `number` — Percentage of fund assets held in stocks.
- **bond_position**   
     `number` — Percentage of fund assets held in bonds.
- **other_position**   
     `number` — Percentage of fund assets held in other instruments.
- **preferred_position**   
     `number` — Percentage of fund assets held in preferred stock.
- **convertible_position**   
     `number` — Percentage of fund assets held in convertible securities.
- **price_to_earnings**   
     `number` — Price-to-earnings (P/E) ratio.
- **price_to_book_holding**   
     `number` — Holdings-weighted price-to-book (P/B) ratio.
- **price_to_sales**   
     `number` — Price-to-sales (P/S) ratio
- **price_to_cashflow**   
     `number` — Price-to-cash flow (P/CF) ratio.
- **median_market_cap**   
     `number` — Median market capitalization of fund holdings. .
- **three_year_earnings_growth**   
     `number` — 3-year earnings growth.
- **realestate**   
     `number` — Percentage of fund assets in the real estate sector.
- **consumer_cyclical**   
     `number` — Percentage of fund assets in the consumer cyclical sector.
- **basic_materials**   
     `number` — Percentage of fund assets in the basic materials sector.
- **consumer_defensive**   
     `number` — Percentage of fund assets in the consumer defensive sector.
- **technology**   
     `number` — Percentage of fund assets in the technology sector.
- **communication_services**   
     `number` — Percentage of fund assets in the communication services sector.
- **financial_services**   
     `number` — Percentage of fund assets in the financial services sector.
- **utilities**   
     `number` — Percentage of fund assets in the utilities sector.
- **industrials**   
     `number` — Percentage of fund assets in the industrials sector.
- **energy**   
     `number` — Percentage of fund assets in the energy sector.
- **healthcare**   
     `number` — Percentage of fund assets in the healthcare sector.


### Estimates &amp; Earnings Calendar


- **current_quarter_estimate**   
     `number` — Consensus EPS estimate for the current quarter.
- **current_quarter_estimate_date**   
     `string` — Label of the quarter used for the estimate (e.g. "4Q").
- **current_calendar_quarter**   
     `string` — Current calendar quarter label (e.g. "4Q2025").
- **current_quarter_estimate_year**   
     `integer` — Year component of the current quarter estimate.
- **current_fiscal_quarter**   
     `string` — Current fiscal quarter label (e.g. "4Q2026").
- **earnings_date**   
     `string` — Earnings announcement date.
- **is_earnings_date_estimate**   
     `boolean` — Indicates whether `earnings_date` is estimated


### Market Performance Deltas


- **52_week_change**   
     `number` — 52-week price change.
- **sand_p_52_week_change**   
     `number` — S&amp;P 500 52-week price change.


### Valuation Measures


- **valuation_measures_enterprise_value**   
     `number` — Enterprise value (EV) from valuation measures dataset.
- **valuation_measures_enterprises_value_ebitda_ratio**   
     `number` — Enterprise value-to-EBITDA (EV/EBITDA) ratio from valuation measures dataset.
- **valuation_measures_enterprises_value_revenue_ratio**   
     `number` — Enterprise value-to-revenue (EV/Revenue) ratio from valuation measures dataset.
- **valuation_measures_forward_pe_ratio**   
     `number` — Forward price-to-earnings (P/E) ratio from valuation measures dataset.
- **valuation_measures_market_cap**   
     `number` — Market capitalization from valuation measures dataset.
- **valuation_measures_pb_ratio**   
     `number` — Price-to-book (P/B) ratio from valuation measures dataset.
- **valuation_measures_pe_ratio**   
     `number` — Price-to-earnings (P/E) ratio from valuation measures dataset.
- **valuation_measures_peg_ratio**   
     `number` — Price/earnings-to-growth (PEG) ratio from valuation measures dataset.
- **valuation_measures_ps_ratio**   
     `number` — Price-to-sales (P/S) ratio from valuation measures dataset.


### Metadata


- **insert_time**   
     `string` — Timestamp of the most recent data update (ISO 8601).


### Example Response


```json
{
    "result": {
        "symbol": "NVDA",
        "display_name": "NVIDIA",
        "quote_type": "stock",
        "logo": "https://cdn.finimpulse.com/f77c41e6-f5cd-653b-1d73-b179528f1095",
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
        "long_business_summary": "NVIDIA Corporation operates as a data center scale AI infrastructure company in the United States, Taiwan, China, Hong Kong, Europe, and internationally. It operates through Compute & Networking, and Graphics segments. The Compute & Networking segment provides data center accelerated computing and networking platforms and artificial intelligence solutions and software, and automotive platforms and autonomous and electric vehicle solutions, including software. The Graphics segment offers GeForce GPUs for gaming and PCs; Quadro/NVIDIA RTX GPUs for enterprise workstation graphics. The company's products are used in gaming, professional visualization, data center, and automotive markets. It sells its products to original equipment manufacturers, original device manufacturers, system integrators and distributors, independent software vendors, cloud service providers, add-in board manufacturers, distributors, automotive manufacturers and tier-1 automotive suppliers, and other ecosystem participants. It has a collaboration with Cisco to develop Ultra-Dense Small Form Factor Pluggable (USFP), a high-density optical module pluggable transceiver. It has a collaboration with ChipAgents to develop Build-A-Chip-Bench, a benchmark for AI agents carrying chip design tasks and The Company has a strategic alliance with MediaTek to build the next generations of AI computing platforms. NVIDIA Corporation was incorporated in 1993 and is headquartered in Santa Clara, California.",
        "full_time_employees": 42000,
        "audit_risk": 5,
        "board_risk": 10,
        "compensation_risk": 4,
        "share_holder_rights_risk": 6,
        "overall_risk": 8,
        "governance_epoch_date": "2026-10-01T00:00:00Z",
        "compensation_as_of_epoch_date": "2026-12-31T00:00:00Z",
        "ir_website": "http://phx.corporate-ir.net/phoenix.zhtml?c=116466&p=irol-IRHome",
        "previous_close": 213.66,
        "open": 208.88,
        "day_low": 200.9199,
        "day_high": 209.05,
        "regular_market_previous_close": 213.66,
        "regular_market_open": 208.88,
        "regular_market_day_low": 200.9199,
        "regular_market_day_high": 209.05,
        "dividend_rate": 1,
        "dividend_yield": 0.0049,
        "ex_dividend_date": "2026-09-10T00:00:00Z",
        "payout_ratio": 0.0354,
        "five_year_avg_dividend_yield": 0.03,
        "trailing_pe": 25.87105,
        "volume": 165923799,
        "regular_market_volume": 165923799,
        "average_volume": 114133204,
        "average_volume_10days": 98524360,
        "average_daily_volume_10_day": 98524360,
        "bid": 203.5,
        "ask": 205.03,
        "bid_size": 100,
        "ask_size": 200,
        "market_cap": 4879142617088,
        "fifty_two_week_low": 164.27,
        "fifty_two_week_high": 243.37,
        "all_time_high": 243.37,
        "all_time_low": 0.033333,
        "price_to_sales_trailing_12_months": 16.310003,
        "fifty_day_average": 221.7486,
        "two_hundred_day_average": 204.38455,
        "trailing_annual_dividend_rate": 0.28,
        "trailing_annual_dividend_yield": 0.00131049,
        "nav_price": null,
        "yield": null,
        "price_hint": 2,
        "enterprise_value": 4908214910976,
        "forward_pe": 12.858633,
        "profit_margins": 0.63663,
        "float_shares": 23133108000,
        "shares_outstanding": 24147000000,
        "shares_short": 301622687,
        "shares_short_prior_month": 294225803,
        "shares_short_previous_month_date": "2026-09-15T00:00:00Z",
        "date_short_interest": "2026-10-15T00:00:00Z",
        "shares_percent_shares_out": 0.0125,
        "held_percent_insiders": 0.04007,
        "held_percent_institutions": 0.71519995,
        "short_ratio": 2.84,
        "short_percent_of_float": 0.01299999,
        "beta": 2.216,
        "implied_shares_outstanding": 24147000000,
        "category": "",
        "book_value": 9.483,
        "price_to_book": 21.57967,
        "fund_family": "",
        "legal_type": "",
        "last_fiscal_year_end": "2026-01-25T00:00:00Z",
        "next_fiscal_year_end": "2027-01-25T00:00:00Z",
        "most_recent_quarter": "2026-07-26T00:00:00Z",
        "earnings_quarterly_growth": 1.259,
        "net_income_to_common": 192880001024,
        "trailing_eps": 7.91,
        "forward_eps": 15.9146,
        "last_split_factor": "10:1",
        "last_split_date": "2024-06-10T00:00:00Z",
        "enterprise_to_revenue": 16.2,
        "enterprise_to_ebitda": 24.387,
        "52_week_change": -0.01082754,
        "sand_p_52_week_change": 0.10626137,
        "last_dividend_value": 0.25,
        "last_dividend_date": "2026-09-10T00:00:00Z",
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
        "current_price": 207.31,
        "current_price_usd": 207.31,
        "regular_market_price_usd": 202.06,
        "pre_market_price_usd": 205.33,
        "post_market_price_usd": 203.85,
        "target_high_price": 515,
        "target_low_price": 180,
        "target_mean_price": 328.95346,
        "target_median_price": 315,
        "recommendation_mean": 1.29032,
        "recommendation_key": "strong_buy",
        "number_of_analyst_opinions": 58,
        "total_cash": 62469001216,
        "total_cash_per_share": 2.592,
        "ebitda": 201266003968,
        "total_debt": 38860001280,
        "quick_ratio": 2.918,
        "current_ratio": 4.589,
        "total_revenue": 302970011648,
        "debt_to_equity": 16.971,
        "revenue_per_share": 12.48,
        "return_on_assets": 0.53572,
        "return_on_equity": 1.17211,
        "gross_profits": 226241003520,
        "free_cashflow": 41809874944,
        "operating_cashflow": 134359998464,
        "earnings_growth": 1.278,
        "revenue_growth": 1.059,
        "gross_margins": 0.74674004,
        "ebitda_margins": 0.66431,
        "operating_margins": 0.66236997,
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
        "insiders_percent_held": 0.04007,
        "institutions_percent_held": 0.71519995,
        "institutions_float_percent_held": 0.74504995,
        "institutions_count": 7728,
        "period": "6m",
        "buy_info_count": 18,
        "buy_info_shares": 2613243,
        "buy_percent_insider_shares": 0.003,
        "sell_info_count": 9,
        "sell_info_shares": 6198325,
        "sell_percent_insider_shares": 0.006,
        "net_info_count": 27,
        "net_info_shares": -3585082,
        "net_percent_insider_shares": -0.004,
        "total_insider_shares": 965687040,
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
        "current_quarter_estimate": null,
        "current_quarter_estimate_date": "",
        "current_calendar_quarter": "",
        "current_quarter_estimate_year": null,
        "current_fiscal_quarter": "",
        "earnings_date": "2026-11-17T21:00:00Z",
        "is_earnings_date_estimate": false,
        "financial_currency": "USD",
        "default_methodology": "",
        "valuation_measures_enterprise_value": 5421271970000,
        "valuation_measures_enterprises_value_ebitda_ratio": 23.1783,
        "valuation_measures_enterprises_value_revenue_ratio": 17.8938,
        "valuation_measures_forward_pe_ratio": 24.8756,
        "valuation_measures_market_cap": 5445389970000,
        "valuation_measures_pb_ratio": 23.780657,
        "valuation_measures_pe_ratio": 28.509482,
        "valuation_measures_peg_ratio": 0.4791,
        "valuation_measures_ps_ratio": 18.159819,
        "insert_time": "2026-11-01T08:22:49Z"
    }
}
```


## Units and Formats

- Percent-like fields are returned as decimal values (e.g., 0.0614 represents 6.14%), except **five_year_avg_dividend_yield**, **debt_to_equity**, and **three_year_earnings_growth**, which are expressed as percentages (e.g., 6.55 represents 6.55%).
- For ETFs and mutual funds, **price_to_earnings**, **price_to_book**, **price_to_book_holding**, **price_to_sales**, and **price_to_cashflow** are returned as inverse values (e.g., 0.0413 corresponds to a P/E of approximately 24.2).
- For listings quoted in minor currency units (e.g., GBp), **market_cap** and **dividend_rate** are expressed in the major unit (e.g., GBP).

## Related APIs

- [Lightweight Summary API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/summary-lite/)
- [Market Price API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/market-price/)
- [Search API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/search/)
- [Company, ETF &amp; Mutual Fund Profile API](https://developers.finimpulse.com/v1/profile/)
- [Historical Price Data API for Stocks, ETFs, Mutual Funds &amp; Indices](https://developers.finimpulse.com/v1/histories/)
- [Financial News API for Stocks, ETFs &amp; Mutual Funds](https://developers.finimpulse.com/v1/news/)
- [Stock Financial Statements &amp; Valuation APIs](https://developers.finimpulse.com/financial-statements/)
- [Institutional &amp; Insider Ownership API for Stocks](https://developers.finimpulse.com/v1/holders/general/)
- [Analyst Coverage, Ratings &amp; Price Targets API](https://developers.finimpulse.com/v1/analysis/analysts/)
- [ETF &amp; Mutual Fund Holdings Overview API](https://developers.finimpulse.com/v1/holdings/general/)

## Build with this API

- [Build Asset Overview Pages Using Summary API](https://finimpulse.com/rest-api-use-cases/ticker-summary-api/)

## Related Resources

- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
