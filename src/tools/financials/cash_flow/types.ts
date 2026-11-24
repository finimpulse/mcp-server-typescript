import {CashFlowItem, FinancialsResponse} from '../types.js';

export interface FinancialsCashFlowResponse extends Omit<FinancialsResponse, 'items'> {
	items: CashFlowItem[];
}
