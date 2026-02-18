import {BalanceSheetItem, FinancialsGeneralResponse} from '../general/types.js';

export interface FinancialsBalanceSheetResponse extends Omit<FinancialsGeneralResponse, 'items'> {
	items: BalanceSheetItem[];
}
