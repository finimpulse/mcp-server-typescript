import {BalanceSheetItem, FinancialsResponse} from '../types.js';

export interface FinancialsBalanceSheetResponse extends Omit<FinancialsResponse, 'items'> {
	items: BalanceSheetItem[];
}
