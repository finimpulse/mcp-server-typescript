export interface OptionsContractGreeks {
	delta: number | null;
	gamma: number | null;
	theta: number | null;
	vega: number | null;
	rho: number | null;
}

export interface OptionsContractResponse {
	// Identity
	symbol: string;
	underlying_price: number | null;
	expiration_date: string;
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
	// Greeks
	greeks: OptionsContractGreeks | null;
}
