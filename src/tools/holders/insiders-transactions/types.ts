interface InsiderTransactionItem {
	shares: number | null;
	value: number | null;
	transaction_text: string | null;
	filer_name: string | null;
	filer_relation: string | null;
	start_date: string | null;
	ownership: string | null;
}

export interface HoldersInsidersTransactionsResponse {
	total_count: number;
	items_count: number;
	items: InsiderTransactionItem[];
}
