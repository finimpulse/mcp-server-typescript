export interface MacroEconomicsItem {
	// Identifiers
	country_iso3: string;
	year: number;

	// GDP & Wealth
	population: number | null;
	gdp_usd: number | null;
	gdp_per_capita_usd: number | null;
	gdp_growth: number | null;
	gdp_per_capita_growth: number | null;

	// Trade & Balance
	exports_usd: number | null;
	imports_usd: number | null;
	account_balance_usd: number | null;
	account_balance_percent: number | null;
	export_import_ratio: number | null;
	account_balance_change: number | null;

	// Inflation & Employment
	unemployment_rate: number | null;
	inflation: number | null;
	consumer_price_index: number | null;
	deflator: number | null;
	inflation_growth: number | null;

	// Rates & Currency
	central_bank_interest_rate: number | null;
	short_term_interest_rate: number | null;
	long_term_interest_rate: number | null;
	interest_rate_spread: number | null;
	exchange_rate_usd: number | null;
	real_effective_exchange_rate: number | null;
	exchange_rate_change: number | null;

	// Government Finances
	general_government_debt: number | null;
	general_government_debt_to_gdp: number | null;
	general_government_debt_to_gdp_growth: number | null;
	general_government_deficit: number | null;
	general_government_deficit_to_gdp: number | null;
	fiscal_balance_trend: number | null;
	general_government_revenue: number | null;
	general_government_revenue_to_gdp: number | null;
	general_government_tax_revenue_to_gdp: number | null;
	general_government_expenditure: number | null;
	general_government_expenditure_to_gdp: number | null;

	// Consumption & Investment
	household_consumption: number | null;
	government_consumption: number | null;
	gross_capital_formation: number | null;
	gross_fixed_capital_formation: number | null;
}

export interface MacroEconomicsResponse {
	total_count: number;
	items_count: number;
	items: MacroEconomicsItem[];
}
