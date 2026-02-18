interface InstitutionalHolderItem {
	name: string;
	position_direct: number | null;
	position_report_date: string | null;
	pct_held: number | null;
	value: number | null;
}

export interface HoldersInstitutionalResponse {
	total_count: number;
	items_count: number;
	items: InstitutionalHolderItem[];
}
