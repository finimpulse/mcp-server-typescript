export interface AnalysisRecommendationsItem {
	// Date
	date: string;
	// Recommendation counts
	strong_buy: number;
	buy: number;
	hold: number;
	sell: number;
	strong_sell: number;
}

export interface AnalysisRecommendationsResponse {
	total_count: number;
	items_count: number;
	items: AnalysisRecommendationsItem[];
}
