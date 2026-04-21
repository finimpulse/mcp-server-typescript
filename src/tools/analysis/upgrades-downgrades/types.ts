export interface AnalysisUpgradesDowngradesItem {
	// Action metadata
	grade_date: string;
	firm: string;
	// Rating
	to_grade: string;
	from_grade: string;
	action: string;
	// Price target
	price_target_action: string;
	current_price_target: number | null;
	prior_price_target: number | null;
}

export interface AnalysisUpgradesDowngradesResponse {
	total_count: number;
	items_count: number;
	items: AnalysisUpgradesDowngradesItem[];
}
