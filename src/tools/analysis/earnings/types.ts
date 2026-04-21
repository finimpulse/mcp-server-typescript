// Shared fields present in every earnings record
interface EarningsItemBase {
	type: string;
	date: string;
	date_type: string;
}

export interface EarningsEpsActualItem extends EarningsItemBase {
	methodology: string;
	actual: number | null;
	estimate: number | null;
	surprise: number | null;
	surprise_pct: number | null;
}

export interface EarningsRevenueItem extends EarningsItemBase {
	methodology: string;
	revenue: number | null;
	earnings: number | null;
}

export interface EarningsEstimateItem extends EarningsItemBase {
	analysts: number | null;
	avg: number | null;
	low: number | null;
	high: number | null;
	year_ago_eps: number | null;
	year_ago_revenue: number | null;
	growth: number | null;
}

export interface EarningsEpsTrendItem extends EarningsItemBase {
	current: number | null;
	seven_days_ago: number | null;
	thirty_days_ago: number | null;
	sixty_days_ago: number | null;
	ninety_days_ago: number | null;
}

export interface EarningsEpsRevisionsItem extends EarningsItemBase {
	up_last7days: number | null;
	up_last30days: number | null;
	down_last7days: number | null;
	down_last30days: number | null;
}

export interface EarningsGrowthItem extends EarningsItemBase {
	growth: number | null;
	growth_benchmark: number | null;
	symbol_benchmark: string | null;
}

export type EarningsItem =
	| EarningsEpsActualItem
	| EarningsRevenueItem
	| EarningsEstimateItem
	| EarningsEpsTrendItem
	| EarningsEpsRevisionsItem
	| EarningsGrowthItem;

export interface AnalysisEarningsResponse {
	// Meta
	symbol: string;
	target_price: number | null;
	target_average_price: number | null;
	target_low_price: number | null;
	target_high_price: number | null;
	// Pagination
	total_count: number;
	items_count: number;
	items: EarningsItem[];
}
