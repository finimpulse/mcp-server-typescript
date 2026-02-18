import {IncomeStatementItem, FinancialsGeneralResponse} from '../general/types.js';

export interface FinancialsIncomeStatementResponse extends Omit<FinancialsGeneralResponse, 'items'> {
	items: IncomeStatementItem[];
}
