import {CashFlowItem, FinancialsGeneralResponse} from '../general/types.js';

export interface FinancialsCashFlowResponse extends Omit<FinancialsGeneralResponse, 'items'> {
	items: CashFlowItem[];
}
