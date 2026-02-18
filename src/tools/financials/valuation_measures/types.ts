import {ValuationMeasuresItem, FinancialsGeneralResponse} from '../general/types.js';

export interface FinancialsValuationMeasuresResponse extends Omit<FinancialsGeneralResponse, 'items'> {
	items: ValuationMeasuresItem[];
}
