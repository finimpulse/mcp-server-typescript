---
title: Stock Financial Statements &amp; Valuation APIs
created: 2026-02-04
updated: 2026-10-29
---

# Stock Financial Statements &amp; Valuation APIs

Financial statements and valuation measures for equity across multiple reporting intervals.

**Available via:** [REST API](https://developers.finimpulse.com/) · [MCP](https://developers.finimpulse.com/model-context-protocol/)

The FinImpulse API provides four dedicated endpoints for financial statement data:

- [**Income Statement**](https://developers.finimpulse.com/v1/financials/income_statement/): Revenue, expenses, and profitability metrics.
- [**Balance Sheet**](https://developers.finimpulse.com/v1/financials/balance_sheet/): Assets, liabilities, and equity.
- [**Cash Flow Statement**](https://developers.finimpulse.com/v1/financials/cash_flow/): Operating, investing, and financing cash flows.
- [**Valuation History**](https://developers.finimpulse.com/v1/financials/valuation_measures/): P/E, EV/EBITDA, P/B, and other market valuation ratios.

All four endpoints return a fixed set of fields. The Income Statement, Balance Sheet, and Cash Flow Statement follow a single standardized template with a defined field hierarchy. For the full structure, see [Financial Statements Structure &amp; Templates](https://finimpulse.com/articles/financial-statements-structure-templates/) or download the template files: [Income Statement](https://finimpulse.com/wp-content/uploads/2026/10/income-statement-structure-template.xlsx), [Balance Sheet](https://finimpulse.com/wp-content/uploads/2026/10/balance-sheet-structure-template.xlsx), [Cash Flow Statement](https://finimpulse.com/wp-content/uploads/2026/10/cash-flow-statement-structure-template.xlsx)

## Coverage

Asset Types Stocks. Financial statement data is also available for some funds. Tickers85,000+ ([download the list of covered symbols](https://developers.finimpulse.com/wp-content/uploads/2026/06/tickers_with_financials.csv))Reporting IntervalsAnnual, quarterly, and trailingHistorical DepthAnnual: September 30, 2020 to the present.   
Quarterly: December 31, 2023 to the present.   
Trailing: most recent TTM only. Countries90+, including all OECD and G20 countries, plus Taiwan, Thailand, Hong Kong, Malaysia, and Singapore ([download the list of countries](https://developers.finimpulse.com/wp-content/uploads/2026/10/financials_per_country.txt))

## Data Availability &amp; Limitations

- Fiscal years vary by company and country. As a result, the first available report and the reporting period end dates may differ across companies.
- Some fields may be null if a specific figure is not available for a given asset or reporting period, as companies disclose different sets of financial figures. It does not indicate an error.

## Reporting Intervals

The endpoints support three reporting intervals: annual, quarterly, and trailing. The Balance Sheet endpoint supports annual and quarterly intervals only, as a balance sheet reflects a company’s position at a specific date.

Each report is identified by a **report_key** in the **interval\|date** format. For annual and quarterly reports, date is the end date of the reporting period. Reports with the same **report_key** cover the same reporting period across endpoints.

For a company whose fiscal year ends on January 31, the available reports may look like this:

- annual\|2026-01-31
- quarterly\|2025-04-30
- quarterly\|2025-07-31
- quarterly\|2025-10-31
- quarterly\|2026-01-31
- quarterly\|2026-04-30
- quarterly\|2026-07-31
- trailing\|2026-09-23

One annual report corresponds to four quarterly reports covering the same fiscal year. In this example, annual\|2026-01-31 covers the quarterly reports from 2025-04-30 to 2026-01-31.

The trailing interval returns TTM (Trailing Twelve Months) data — a rolling 12-month period used to assess the most recent financial performance of a company. In this example, trailing\|2026-09-23 covers the four most recent quarters, from 2025-10-31 to 2026-07-31.

## When to Use These Endpoints

- Populate Financials tabs (Income Statement, Balance Sheet, Cash Flow).
- Retrieve multi-interval reporting series (trailing, quarterly, annual) for modeling, charting, and tables.
- Pull valuation measures aligned to the same date grid as statements.

## Build with this API

- [Build Company Financials Using Financial Statements API](https://finimpulse.com/rest-api-use-cases/financial-statements-api/)

## Related Resources

- [Financial Statements Structure &amp; Templates](https://finimpulse.com/articles/financial-statements-structure-templates/)
- [API Sandbox](https://developers.finimpulse.com/sandbox/)
- [MCP Server](https://developers.finimpulse.com/model-context-protocol/)
- [Glossary](https://finimpulse.com/glossary/)
- [API Pricing](https://finimpulse.com/api/pricing/)
