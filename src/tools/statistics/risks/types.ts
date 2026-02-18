interface RiskItem {
	year: string;
	type: number | null;
	alpha: number | null;
	beta: number | null;
	mean_annual_return: number | null;
	r_squared: number | null;
	std_dev: number | null;
	sharpe_ratio: number | null;
	treynor_ratio: number | null;
}

export interface StatisticsRisksResponse {
	total_count: number;
	items_count: number;
	items: RiskItem[];
}
