interface AnnualReturnItem {
	year: number;
	annual_value: number | null;
	annual_category_value: number | null;
	q1: number | null;
	q2: number | null;
	q3: number | null;
	q4: number | null;
}

export type StatisticsAnnualReturnsResponse = AnnualReturnItem[];
