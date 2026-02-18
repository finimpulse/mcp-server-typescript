export interface StatisticsGeneralItem {
	// General Information
	symbol: string;
	quote_type: string;
	currency: string;
	update_time: string | null;
	price_hint: number | null;

	// Price and Market Data
	current_price: number | null;
	previous_close: number | null;
	open: number | null;
	day_low: number | null;
	day_high: number | null;
	regular_market_previous_close: number | null;
	regular_market_open: number | null;
	regular_market_day_low: number | null;
	regular_market_day_high: number | null;
	fifty_two_week_low: number | null;
	fifty_two_week_high: number | null;
	fifty_two_week_change: number | null;
	sand_p_fifty_two_week_change: number | null;
	all_time_low: number | null;
	all_time_high: number | null;
	fifty_day_average: number | null;
	two_hundred_day_average: number | null;

	// Trading Volume and Liquidity
	volume: number | null;
	regular_market_volume: number | null;
	average_volume: number | null;
	average_volume_10days: number | null;
	average_daily_volume_10_day: number | null;
	bid: number | null;
	ask: number | null;
	bid_size: number | null;
	ask_size: number | null;

	// Dividends
	dividend_rate: number | null;
	dividend_yield: number | null;
	ex_dividend_date: string | null;
	payout_ratio: number | null;
	trailing_annual_dividend_rate: number | null;
	trailing_annual_dividend_yield: number | null;
	five_year_avg_dividend_yield: number | null;
	last_dividend_value: number | null;
	last_dividend_date: string | null;

	// Valuation and Ratios
	market_cap: number | null;
	enterprise_value: number | null;
	trailing_pe: number | null;
	forward_pe: number | null;
	price_to_book: number | null;
	price_to_sales_trailing_12_months: number | null;
	enterprise_to_revenue: number | null;
	enterprise_to_ebitda: number | null;
	beta: number | null;
	book_value: number | null;
	profit_margins: number | null;
	forward_eps: number | null;
	trailing_eps: number | null;

	// Ownership and Trading Metrics (Stocks)
	shares_outstanding: number | null;
	float_shares: number | null;
	shares_short: number | null;
	shares_short_prior_month: number | null;
	shares_short_previous_month_date: string | null;
	shares_percent_shares_out: number | null;
	short_ratio: number | null;
	short_percent_of_float: number | null;
	held_percent_insiders: number | null;
	held_percent_institutions: number | null;
	date_short_interest: string | null;
	implied_shares_outstanding: number | null;

	// Financial Performance (Stocks)
	total_revenue: number | null;
	revenue_per_share: number | null;
	revenue_growth: number | null;
	net_income_to_common: number | null;
	earnings_growth: number | null;
	earnings_quarterly_growth: number | null;
	gross_profits: number | null;
	gross_margins: number | null;
	operating_margins: number | null;
	ebitda_margins: number | null;
	ebitda: number | null;
	free_cashflow: number | null;
	operating_cashflow: number | null;
	return_on_assets: number | null;
	return_on_equity: number | null;
	last_fiscal_year_end: string | null;
	next_fiscal_year_end: string | null;
	most_recent_quarter: string | null;

	// Balance Sheet and Liquidity (Stocks)
	total_cash: number | null;
	total_cash_per_share: number | null;
	total_debt: number | null;
	debt_to_equity: number | null;
	current_ratio: number | null;
	quick_ratio: number | null;

	// Trailing Performance (Funds and ETFs)
	trailing_ytd: number | null;
	trailing_one_month: number | null;
	trailing_three_month: number | null;
	trailing_one_year: number | null;
	trailing_three_year: number | null;
	trailing_five_year: number | null;
	trailing_ten_year: number | null;
	trailing_last_bull_mkt: number | null;
	trailing_last_bear_mkt: number | null;

	// Category-Relative Performance (Funds and ETFs)
	trailing_category_ytd: number | null;
	trailing_category_one_month: number | null;
	trailing_category_three_month: number | null;
	trailing_category_one_year: number | null;
	trailing_category_three_year: number | null;
	trailing_category_five_year: number | null;
	trailing_category_ten_year: number | null;
	trailing_category_last_bull_mkt: number | null;
	trailing_category_last_bear_mkt: number | null;

	// Load-Adjusted Returns and Rankings (Mutual Funds)
	load_adjusted_one_year: number | null;
	load_adjusted_three_year: number | null;
	load_adjusted_five_year: number | null;
	load_adjusted_ten_year: number | null;
	rank_ytd: number | null;
	rank_one_month: number | null;
	rank_three_month: number | null;
	rank_one_year: number | null;
	rank_three_year: number | null;
	rank_five_year: number | null;
	num_years_up: number | null;
	num_years_down: number | null;
	best_one_yr_total_return: number | null;

	// Risk Indicators
	audit_risk: number | null;
	board_risk: number | null;
	compensation_risk: number | null;
	share_holder_rights_risk: number | null;
	overall_risk: number | null;

	// Asset Classification (Funds and ETFs)
	category: string | null;
	fund_family: string | null;
	legal_type: string | null;

	// Analyst Data and Corporate Actions (Stocks)
	last_split_factor: string | null;
	last_split_date: string | null;
	target_high_price: number | null;
	target_low_price: number | null;
	target_mean_price: number | null;
	target_median_price: number | null;
	recommendation_mean: number | null;
	recommendation_key: string | null;
	number_of_analyst_opinions: number | null;
}

export type StatisticsGeneralResponse = StatisticsGeneralItem[];
