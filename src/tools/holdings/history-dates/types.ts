export interface HoldingsHistoryDatesItem {
	type: string;
	// Holdings reporting date (YYYY-MM-DD)
	history_date: string;
}

export interface HoldingsHistoryDatesResponse {
	total_count: number;
	items_count: number;
	items: HoldingsHistoryDatesItem[];
}
