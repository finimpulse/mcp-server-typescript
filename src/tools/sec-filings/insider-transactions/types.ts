export interface SecFilingsInsiderTransactionsItem {
	// Filing and identification
	cik: string | null;
	symbol: string | null;
	accession_number: string | null;
	filing_date: string | null;
	primary_document_url: string | null;
	transaction_id: string | null;
	entry_index: number | null;

	// Insider information
	owner_cik: string | null;
	owner_name: string | null;
	owner_relationship: 'officer' | 'director' | 'ten_percent_owner' | 'other' | null;

	// Transaction details
	transaction_type: 'non_derivative_transaction' | 'derivative_transaction' | 'non_derivative_holding' | 'derivative_holding' | 'unknown' | null;
	security_title: string | null;
	transaction_form_type: string | null;
	transaction_date: string | null;
	deemed_execution_date: string | null;
	transaction_code: string | null;
	transaction_shares: number | null;
	transaction_price_per_share: number | null;
	transaction_total_value: number | null;
	transaction_acquired_disposed_code: 'A' | 'D' | null;
	transaction_timeliness: 'E' | 'L' | null;
	equity_swap_involved: boolean | null;

	// Derivative security details
	conversion_or_exercise_price: number | null;
	exercise_date: string | null;
	expiration_date: string | null;
	underlying_security_title: string | null;
	underlying_security_shares: number | null;
	underlying_security_value: number | null;

	// Ownership information
	shares_owned_following_transaction: number | null;
	value_owned_following_transaction: number | null;
	direct_or_indirect_ownership: 'D' | 'I' | null;
	nature_of_ownership: string | null;
	footnotes: string | null;
}

export interface SecFilingsInsiderTransactionsResponse {
	total_count: number;
	items_count: number;
	items: SecFilingsInsiderTransactionsItem[];
}
