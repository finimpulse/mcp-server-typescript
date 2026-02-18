interface InsiderItem {
	name: string;
	relation: string;
	transaction_description: string;
	latest_trans_date: string | null;
	position_direct: number | null;
	position_report_date: string | null;
}

export interface HoldersInsidersResponse {
	total_count: number;
	items_count: number;
	items: InsiderItem[];
}
