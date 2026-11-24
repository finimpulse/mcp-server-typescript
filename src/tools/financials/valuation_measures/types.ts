import {ValuationMeasuresItem, FinancialsResponse} from '../types.js';

export interface FinancialsValuationMeasuresResponse extends Omit<FinancialsResponse, 'items'> {
	items: ValuationMeasuresItem[];
}
