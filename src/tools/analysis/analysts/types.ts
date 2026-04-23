export interface AnalysisAnalystsItem {
	// Identity
	uuid: string;
	analyst: string;
	// Scoring
	direct_score: number;
	mean_move: number;
	price_score: number;
	overall_score: number;
	data_points: number;
	// Rating
	rating_current: string;
	rating_sentiment: number;
	price_score_current: number;
	// Date
	announcement_date: string;
}

export interface AnalysisAnalystsResponse {
	total_count: number;
	items_count: number;
	items: AnalysisAnalystsItem[];
}
