interface SearchItem {
	symbol: string;
	display_name: string;
	short_name: string;
	long_name: string;
	quote_type: string;
	quote_source_name: string | null;
	fifty_day_average: number;
	fifty_day_average_change: number;
	fifty_day_average_change_percent: number;
	two_hundred_day_average: number;
	two_hundred_day_average_change: number;
	two_hundred_day_average_change_percent: number;
	average_daily_volume_3_month: number;
	average_daily_volume_10_day: number;
	one_year_return: number;
	three_year_return: number;
	currency: string;
	regular_market_price: number;
	regular_market_price_usd: number;
	regular_market_change: number;
	regular_market_change_usd: number;
	regular_market_change_percent: number;
	regular_market_time: string;
	regular_market_volume: number;
	full_exchange_name: string;
	exchange: string;
	exchange_timezone_name: string;
	exchange_timezone_short_name: string;
	fifty_two_week_low_change: number;
	fifty_two_week_low_change_percent: number;
	fifty_two_week_high_change: number;
	fifty_two_week_high_change_percent: number;
	fifty_two_week_low: number;
	fifty_two_week_high: number;
	trailing_annual_dividend_rate: number;
	trailing_annual_dividend_yield: number;
	dividend_rate: number;
	dividend_yield: number;
	time_offset: number;
	market_region: string;
	sector: string;
	industry: string;
	amount: number;
	amount_usd: number;
	update_time: string;
	usd_rate: number | null;
	founded_date: string | null;
	fund_inception_date: string | null;
}

export interface SearchResponse {
	total_count: number;
	search_after_token: string;
	items_count: number;
	items: SearchItem[];
}
