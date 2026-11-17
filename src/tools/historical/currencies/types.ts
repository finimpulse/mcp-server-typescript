export interface HistoriesCurrenciesItem {
	date: string;
	open: number | null;
	high: number | null;
	low: number | null;
	close: number | null;
	adj_close: number | null;
}

export interface HistoriesCurrenciesResponse {
	// Currency pair metadata (null when no data is available for the pair)
	currency_from: string | null;
	currency_to: string | null;
	full_exchange_name: string | null;
	exchange_timezone_name: string | null;
	exchange_timezone_short_name: string | null;
	exchange: string | null;
	short_name: string | null;
	long_name: string | null;
	quote_source_name: string | null;
	time_offset: number | null;

	// Pagination
	search_after_token: string | null;
	total_count: number;
	items_count: number;
	items: HistoriesCurrenciesItem[];
}
