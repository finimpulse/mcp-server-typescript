export interface SecFilingsEventsItem {
	// Identity
	quote_type: string | null;
	cik: string | null;
	symbol: string | null;

	// Filing
	accession_number: string | null;
	filing_date: string | null;
	report_date: string | null;
	acceptance_date_time: string | null;
	act: string | null;
	form: string | null;
	file_number: string | null;
	film_number: string | null;
	items: string | null;
	core_type: string | null;

	// Document
	size: number | null;
	primary_document: string | null;
	primary_doc_description: string | null;
	file_url: string | null;
}

export interface SecFilingsEventsResponse {
	total_count: number;
	items_count: number;
	items: SecFilingsEventsItem[];
}
