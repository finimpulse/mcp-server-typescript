export interface OptionsExpirationItem {
	type: string;
	expiration_date: string;
}

export interface OptionsExpirationsResponse {
	total_count: number;
	items_count: number;
	items: OptionsExpirationItem[];
}
