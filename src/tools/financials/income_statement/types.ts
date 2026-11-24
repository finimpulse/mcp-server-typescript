import {IncomeStatementItem, FinancialsResponse} from '../types.js';

export interface FinancialsIncomeStatementResponse extends Omit<FinancialsResponse, 'items'> {
	items: IncomeStatementItem[];
}
