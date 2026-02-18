export interface HoldersGeneralResponse {
	symbol: string;
	insiders_percent_held: number | null;
	institutions_percent_held: number | null;
	institutions_float_percent_held: number | null;
	institutions_count: number | null;
	buy_info_shares: number | null;
	sell_info_shares: number | null;
	net_info_shares: number | null;
	net_percent_insider_shares: number | null;
	total_insider_shares: number | null;
}
