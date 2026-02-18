export interface HoldingsGeneralResponse {
	symbol: string;

	// Asset Allocation
	cash_position: number | null;
	stock_position: number | null;
	bond_position: number | null;
	other_position: number | null;
	preferred_position: number | null;
	convertible_position: number | null;

	// Valuation Characteristics
	price_to_earnings: number | null;
	price_to_book_holding: number | null;
	price_to_sales: number | null;
	price_to_cashflow: number | null;

	// Market Size and Growth
	median_market_cap: number | null;
	three_year_earnings_growth: number | null;

	// Sector Allocation
	realestate: number | null;
	consumer_cyclical: number | null;
	basic_materials: number | null;
	consumer_defensive: number | null;
	technology: number | null;
	communication_services: number | null;
	financial_services: number | null;
	utilities: number | null;
	industrials: number | null;
	energy: number | null;
	healthcare: number | null;
}
