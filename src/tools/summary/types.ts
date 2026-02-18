export interface SummaryResponse {
	// Identity & Classification
	symbol: string;
	quote_type: string;
	currency: string;
	financial_currency: string | null;
	category: string | null;
	fund_category_name: string | null;
	fund_family: string | null;
	legal_type: string | null;
	
	// Address & Contact
	address_1: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	country: string | null;
	phone: string | null;
	website: string | null;
	ir_website: string | null;
	
	// Sector & Industry
	sector: string | null;
	sector_key: string | null;
	sector_disp: string | null;
	industry: string | null;
	industry_key: string | null;
	industry_disp: string | null;
	
	// Description & Organization
	long_business_summary: string | null;
	full_time_employees: number | null;
	founded_date: string | null;
	fund_inception_date: string | null;
	
	// Governance & Risk
	audit_risk: number | null;
	board_risk: number | null;
	compensation_risk: number | null;
	share_holder_rights_risk: number | null;
	overall_risk: number | null;
	governance_epoch_date: string | null;
	compensation_as_of_epoch_date: string | null;
	
	// Market Price & Trading
	previous_close: number | null;
	open: number | null;
	day_low: number | null;
	day_high: number | null;
	regular_market_previous_close: number | null;
	regular_market_open: number | null;
	regular_market_day_low: number | null;
	regular_market_day_high: number | null;
	volume: number | null;
	regular_market_volume: number | null;
	average_volume: number | null;
	average_volume_10days: number | null;
	average_daily_volume_10_day: number | null;
	bid: number | null;
	ask: number | null;
	bid_size: number | null;
	ask_size: number | null;
	price_hint: number | null;
	current_price: number | null;
	nav_price: number | null;
	yield: number | null;
	
	// Price Ranges
	fifty_two_week_low: number | null;
	fifty_two_week_high: number | null;
	all_time_low: number | null;
	all_time_high: number | null;
	fifty_day_average: number | null;
	two_hundred_day_average: number | null;
	
	// Dividends & Distributions
	dividend_rate: number | null;
	dividend_yield: number | null;
	trailing_annual_dividend_rate: number | null;
	trailing_annual_dividend_yield: number | null;
	ex_dividend_date: string | null;
	last_dividend_value: number | null;
	last_dividend_date: string | null;
	five_year_avg_dividend_yield: number | null;
	payout_ratio: number | null;
	
	// Valuation & Multiples
	market_cap: number | null;
	enterprise_value: number | null;
	trailing_pe: number | null;
	forward_pe: number | null;
	price_to_sales_trailing_12_months: number | null;
	book_value: number | null;
	price_to_book: number | null;
	enterprise_to_revenue: number | null;
	enterprise_to_ebitda: number | null;
	default_methodology: string | null;
	
	// Shares & Ownership
	float_shares: number | null;
	shares_outstanding: number | null;
	implied_shares_outstanding: number | null;
	shares_short: number | null;
	shares_short_prior_month: number | null;
	shares_short_previous_month_date: string | null;
	date_short_interest: string | null;
	shares_percent_shares_out: number | null;
	short_ratio: number | null;
	short_percent_of_float: number | null;
	held_percent_insiders: number | null;
	held_percent_institutions: number | null;
	insiders_percent_held: number | null;
	institutions_percent_held: number | null;
	institutions_float_percent_held: number | null;
	institutions_count: number | null;
	beta: number | null;
	beta_3_year: number | null;
	beta_5_year: number | null;
	
	// Corporate Actions
	last_split_factor: string | null;
	last_split_date: string | null;
	
	// Fiscal Dates
	last_fiscal_year_end: string | null;
	next_fiscal_year_end: string | null;
	most_recent_quarter: string | null;
	
	// Earnings & Growth
	earnings_quarterly_growth: number | null;
	earnings_growth: number | null;
	revenue_growth: number | null;
	net_income_to_common: number | null;
	trailing_eps: number | null;
	forward_eps: number | null;
	
	// Financial Highlights
	total_cash: number | null;
	total_cash_per_share: number | null;
	ebitda: number | null;
	total_debt: number | null;
	quick_ratio: number | null;
	current_ratio: number | null;
	total_revenue: number | null;
	debt_to_equity: number | null;
	revenue_per_share: number | null;
	return_on_assets: number | null;
	return_on_equity: number | null;
	gross_profits: number | null;
	free_cashflow: number | null;
	operating_cashflow: number | null;
	profit_margins: number | null;
	gross_margins: number | null;
	ebitda_margins: number | null;
	operating_margins: number | null;
	
	// Analyst Coverage
	target_high_price: number | null;
	target_low_price: number | null;
	target_mean_price: number | null;
	target_median_price: number | null;
	recommendation_mean: number | null;
	recommendation_key: string | null;
	number_of_analyst_opinions: number | null;
	
	// Fund Size & Fees
	total_assets: number | null;
	annual_report_expense_ratio: number | null;
	annual_holdings_turnover: number | null;
	last_cap_gain: number | null;
	morning_star_overall_rating: number | null;
	morning_star_risk_rating: number | null;
	
	// Fund Performance - Trailing Returns
	ytd_return: number | null;
	ytd_return_pct: number | null;
	five_yr_avg_return_pct: number | null;
	one_year_total_return: number | null;
	three_year_total_return: number | null;
	trailing_ytd: number | null;
	trailing_one_month: number | null;
	trailing_three_month: number | null;
	trailing_one_year: number | null;
	trailing_three_year: number | null;
	trailing_five_year: number | null;
	trailing_ten_year: number | null;
	trailing_last_bull_mkt: number | null;
	trailing_last_bear_mkt: number | null;
	trailing_category_ytd: number | null;
	trailing_category_one_month: number | null;
	trailing_category_three_month: number | null;
	trailing_category_one_year: number | null;
	trailing_category_three_year: number | null;
	trailing_category_five_year: number | null;
	trailing_category_ten_year: number | null;
	trailing_category_last_bull_mkt: number | null;
	trailing_category_last_bear_mkt: number | null;
	load_adjusted_one_year: number | null;
	load_adjusted_three_year: number | null;
	load_adjusted_five_year: number | null;
	load_adjusted_ten_year: number | null;
	
	// Fund Ranks & Ratings
	rank_ytd: number | null;
	rank_one_month: number | null;
	rank_three_month: number | null;
	rank_one_year: number | null;
	rank_three_year: number | null;
	rank_five_year: number | null;
	morning_star_return_rating: number | null;
	risk_rating: number | null;
	num_years_up: number | null;
	num_years_down: number | null;
	best_one_yr_total_return: number | null;
	best_three_yr_total_return: number | null;
	worst_one_yr_total_return: number | null;
	worst_three_yr_total_return: number | null;
	
	// Fund Holdings - Exposure
	cash_position: number | null;
	stock_position: number | null;
	bond_position: number | null;
	other_position: number | null;
	preferred_position: number | null;
	convertible_position: number | null;
	price_to_earnings: number | null;
	price_to_book_holding: number | null;
	price_to_sales: number | null;
	price_to_cashflow: number | null;
	median_market_cap: number | null;
	three_year_earnings_growth: number | null;
	realestate: number | null;
	consumer_cyclical: number | null;
	basic_materials: number | null;
	consumer_defensive: number | null;
	technology: number | null;
	communication_services: number | null;
	financial_services: number | null;
	utilities: number | null;
	industrials: number | null;
	energy: number | null;
	healthcare: number | null;
	
	// Estimates & Earnings Calendar
	current_quarter_estimate: number | null;
	current_quarter_estimate_date: string | null;
	current_calendar_quarter: string | null;
	current_quarter_estimate_year: number | null;
	current_fiscal_quarter: string | null;
	earnings_date: string | null;
	is_earnings_date_estimate: boolean | null;
	
	// Market Performance Deltas
	'52_week_change': number | null;
	sand_p_52_week_change: number | null;
	
	// Valuation Measures
	valuation_measures_enterprise_value: number | null;
	valuation_measures_enterprises_value_ebitda_ratio: number | null;
	valuation_measures_enterprises_value_revenue_ratio: number | null;
	valuation_measures_forward_pe_ratio: number | null;
	valuation_measures_market_cap: number | null;
	valuation_measures_pb_ratio: number | null;
	valuation_measures_pe_ratio: number | null;
	valuation_measures_peg_ratio: number | null;
	valuation_measures_ps_ratio: number | null;
	
	// Metadata
	insert_time: string | null;
	period: string | null;
	buy_info_count: number | null;
	buy_info_shares: number | null;
	buy_percent_insider_shares: number | null;
	sell_info_count: number | null;
	sell_info_shares: number | null;
	sell_percent_insider_shares: number | null;
	net_info_count: number | null;
	net_info_shares: number | null;
	net_percent_insider_shares: number | null;
	total_insider_shares: number | null;
}
