interface TopHoldingItem {
	holding_symbol: string | null;
	holding_name: string | null;
	holding_percent: number | null;
}

export interface HoldingsTopHoldingsResponse {
	total_count: number;
	items_count: number;
	items: TopHoldingItem[];
}
