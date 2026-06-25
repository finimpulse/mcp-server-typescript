export interface SummaryLiteResponse {
	// Identity & Classification
	symbol: string;
	logo: string | null;
	display_name: string | null;
	quote_type: string;
	full_time_employees: number | null;

	// Address & Contact
	city: string | null;
	country: string | null;
	website: string | null;

	// Sector & Industry Classification
	sector: string | null;
	industry: string | null;

	// Price Data
	current_price: number | null;
	current_price_usd: number | null;
	regular_market_price_usd: number | null;
	pre_market_price_usd: number | null;
	post_market_price_usd: number | null;
	fifty_two_week_low: number | null;
	fifty_two_week_high: number | null;

	// Dividends & Distributions
	dividend_rate: number | null;
	dividend_yield: number | null;

	// Market & Risk Metrics
	average_volume: number | null;
	average_volume_10days: number | null;
	market_cap: number | null;
	beta: number | null;

	// Valuation Measures - Internal Snapshot (Stocks)
	valuation_measures_pe_ratio: number | null;
	valuation_measures_forward_pe_ratio: number | null;
	valuation_measures_pb_ratio: number | null;
	valuation_measures_ps_ratio: number | null;
}
