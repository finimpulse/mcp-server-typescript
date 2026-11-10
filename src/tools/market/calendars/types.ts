export interface MarketCalendarsItem {
	// Event details
	economic_release: string;
	country_code_iso3: string;
	start_date_time: string;
	period: string | null;

	// Release metrics (units depend on the economic release)
	after_release_actual: number | null;
	prior_release_actual: number | null;
	originally_reported_actual: number | null;
}

export interface MarketCalendarsResponse {
	total_count: number;
	items_count: number;
	items: MarketCalendarsItem[];
}
