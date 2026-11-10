export interface EventsTickersItem {
	// Common fields (all event types)
	type: 'earnings' | 'ipo' | string;
	symbol: string;
	company_short_name: string | null;
	start_date_time: string | null;

	// Earnings event details
	event_name?: string | null;
	start_date_time_type?: string | null;
	eps_estimate?: number | null;
	eps_actual?: number | null;
	eps_surprise_percent?: number | null;
	time_zone_short_name?: string | null;
	gmt_offset_milliseconds?: number | null;
	intraday_market_cap?: number | null;

	// IPO event details
	deal_type?: string | null;
	exchange_short_name?: string | null;
	currency_name?: string | null;
}

export interface EventsTickersResponse {
	total_count: number;
	items_count: number;
	items: EventsTickersItem[];
}
