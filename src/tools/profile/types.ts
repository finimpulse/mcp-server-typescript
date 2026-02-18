interface CompanyOfficer {
	name: string;
	age: number | null;
	title: string;
	year_born: number | null;
	fiscal_year: number | null;
	total_pay: number | null;
	exercised_value: number | null;
}

interface ProfileItem {
	symbol: string;
	quote_type: string;
	currency: string;
	address_1: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	country: string | null;
	phone: string | null;
	website: string | null;
	industry: string | null;
	industry_key: string | null;
	industry_disp: string | null;
	sector: string | null;
	sector_key: string | null;
	sector_disp: string | null;
	long_business_summary: string | null;
	full_time_employees: number | null;
	company_officers: CompanyOfficer[];
	governance_epoch_date: string | null;
	compensation_as_of_epoch_date: string | null;
	ir_website: string | null;
	governance_audit_risk: number | null;
	governance_board_risk: number | null;
	governance_compensation_risk: number | null;
	governance_shareholder_rights_risk: number | null;
	governance_overall_risk: number | null;
	style_box_url: string | null;
	company_size: string | null;
	investment_valuation_style: string | null;
	net_assets: number | null;
	ytd_return: number | null;
	yield: number | null;
	last_dividend: number | null;
	last_cap_gain: number | null;
	morning_star_rating: number | null;
	fees_annual_report_expense_ratio: number | null;
	fees_annual_holdings_turnover: number | null;
	fees_total_net_assets: number | null;
	fees_net_exp_ratio: number | null;
	fees_gross_exp_ratio: number | null;
	fees_twelve_b_one: number | null;
	fees_front_end_sales_load: number | null;
	fees_deferred_sales_load: number | null;
	fees_expense_projection_3yr: number | null;
	fees_expense_projection_5yr: number | null;
	fees_expense_projection_10yr: number | null;
	fees_annual_report_expense_ratio_cat: number | null;
	fees_annual_holdings_turnover_cat: number | null;
	fees_total_net_assets_cat: number | null;
	fees_net_exp_ratio_cat: number | null;
	fees_gross_exp_ratio_cat: number | null;
	fees_twelve_b_one_cat: number | null;
	fees_front_end_sales_load_cat: number | null;
	fees_deferred_sales_load_cat: number | null;
	fees_expense_projection_3yr_cat: number | null;
	fees_expense_projection_5yr_cat: number | null;
	fees_expense_projection_10yr_cat: number | null;
	update_time: string | null;
}

export interface ProfileResponse {
	total_count: number;
	items: ProfileItem[];
}
