export interface MarketPriceResponse {
	// Identification Fields
	symbol: string;
	name: string | null;
	quote_type: string;
	currency: string | null;
	market_cap: number | null;

	// Market Info
	market_state: string | null;
	usd_rate: number | null;

	// Current Price
	current_price: number | null;
	current_price_usd: number | null;
	current_price_change: number | null;
	current_price_change_percent: number | null;
	current_price_update_time: string | null;

	// Regular Market
	regular_market_price: number | null;
	regular_market_price_change: number | null;
	regular_market_price_change_percent: number | null;
	regular_market_time: string | null;
	regular_market_open: number | null;
	regular_market_previous_close: number | null;
	regular_market_volume: number | null;

	// Pre-Market (US-listed assets only)
	pre_market_price: number | null;
	pre_market_price_change: number | null;
	pre_market_price_change_percent: number | null;
	pre_market_time: string | null;

	// Post-Market (US-listed assets only)
	post_market_price: number | null;
	post_market_price_change: number | null;
	post_market_price_change_percent: number | null;
	post_market_time: string | null;
}
