export interface OptionsChainContractItem {
	// Identity
	contract_name: string;
	option_type: string;
	strike: number;
	currency: string;
	// Pricing
	last_price: number | null;
	change: number | null;
	percent_change: number | null;
	bid: number | null;
	ask: number | null;
	// Liquidity
	volume: number | null;
	open_interest: number | null;
	// Contract metadata
	contract_size: string;
	last_trade_date: string | null;
	implied_volatility: number | null;
	in_the_money: boolean;
}

export interface OptionsChainResponse {
	// Meta
	symbol: string;
	underlying_price: number | null;
	expiration_date: string;
	// Pagination
	total_count: number;
	items_count: number;
	items: OptionsChainContractItem[];
}
