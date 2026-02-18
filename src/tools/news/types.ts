interface NewsItem {
	id: string;
	type: string;
	title: string;
	description: string;
	pub_date: string;
	display_time: string;
	canonical_url: string;
	content_type: string;
	related_tickers: string[];
	provider_display_name: string;
	provider_url: string;
	is_hosted: boolean;
	is_premium_news: boolean;
}

export interface NewsResponse {
	total_count: number;
	items_count: number;
	search_after_token: string | null;
	items: NewsItem[];
}
