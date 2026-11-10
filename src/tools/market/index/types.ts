export interface MarketIndexItem {
	// Identification Fields
	symbol: string;
	logo: string | null;
	display_name: string | null;
	short_name: string | null;
	long_name: string | null;
	quote_type: string | null;

	// Market Info
	exchange: string | null;
	currency: string | null;

	// Price Data
	regular_market_price: number | null;
	regular_market_price_usd: number | null;
	regular_market_price_change: number | null;
	regular_market_price_change_usd: number | null;
	regular_market_price_change_percent: number | null;
	regular_market_time: string | null;
	fifty_two_week_low: number | null;
	fifty_two_week_high: number | null;

	// Other Market Data
	regular_market_volume: number | null;
	one_year_return: number | null;

	// Metadata
	update_time: string | null;
}

export interface MarketIndexResponse {
	total_count: number;
	search_after_token: string | null;
	items_count: number;
	items: MarketIndexItem[];
}
