interface SearchLiteItem {
	// Identification Fields
	symbol: string;
	logo: string | null;
	display_name: string | null;
	short_name: string | null;
	long_name: string | null;
	quote_type: string;

	// Asset Fundamentals
	sector: string | null;
	industry: string | null;

	// Trading & Exchange Info
	currency: string | null;
	exchange: string | null;

	// Price Data
	current_price: number | null;
	current_price_usd: number | null;
	regular_market_price: number | null;
	regular_market_price_usd: number | null;
	regular_market_price_change: number | null;
	regular_market_price_change_usd: number | null;
	regular_market_price_change_percent: number | null;
	pre_market_price_usd: number | null;
	post_market_price_usd: number | null;
	fifty_two_week_low: number | null;
	fifty_two_week_high: number | null;

	// Other Market Data
	regular_market_volume: number | null;
	amount: number | null;
	amount_usd: number | null;
	dividend_yield: number | null;
	one_year_return: number | null;
}

export interface SearchLiteResponse {
	total_count: number;
	search_after_token: string;
	items_count: number;
	items: SearchLiteItem[];
}
