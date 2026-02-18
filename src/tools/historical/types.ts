interface HistoricalPriceItem {
	type: 'historical_price';
	open: number;
	high: number;
	low: number;
	close: number;
	adj_close: number;
	volume: number;
	date: string;
}

interface DividendItem {
	type: 'dividends';
	amount: number;
	date: string;
}

interface SplitItem {
	type: 'splits';
	numerator: number;
	denominator: number;
	date: string;
}

type HistoryItem = HistoricalPriceItem | DividendItem | SplitItem;

export interface HistoriesResponse {
	symbol: string;
	quote_type: string;
	currency: string;
	time_offset: number;
	exchange_timezone_name: string;
	full_exchange_name: string;
	display_name: string;
	market_region: string;
	total_count: number;
	search_after_token: string | null;
	items_count: number;
	items: HistoryItem[];
}
