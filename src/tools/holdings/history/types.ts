export interface HoldingsHistoryItem {
	// Identity
	asset: string;
	name: string | null;
	isin: string | null; // Temporarily unavailable from 2026-09-10
	cusip: string | null; // Temporarily unavailable from 2026-09-10

	// Position
	shares: number | null;
	weight_pct: number | null;
	market_value: number | null;

	// Metadata (ISO 8601)
	updated_at: string | null;
}

export interface HoldingsHistoryResponse {
	total_count: number;
	items_count: number;
	items: HoldingsHistoryItem[];
}
