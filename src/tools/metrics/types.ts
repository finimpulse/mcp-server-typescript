interface MetricsItem {
	// Identification
	symbol: string;

	// Dividends & Yield
	dividend_rate: number | null;
	dividend_rate_usd: number | null;
	dividend_yield: number | null;
	trailing_annual_dividend_rate: number | null;
	trailing_annual_dividend_rate_usd: number | null;
	trailing_annual_dividend_yield: number | null;

	// Returns & Performance
	one_year_return: number | null;
	three_year_return: number | null;

	// Technical Indicators
	fifty_day_average_change_percent: number | null;
	two_hundred_day_average_change_percent: number | null;

	// Profitability & Margins
	free_cash_flow_margin: number | null;
	return_on_invested_capital: number | null;
	net_margin: number | null;
	return_on_equity: number | null;

	// Growth & Risk
	beta: number | null;
	debt_to_equity: number | null;
	revenue_stability: number | null;
	revenue_growth: number | null;
	eps_growth: number | null;
}

export type MetricsResponse = MetricsItem[];
