type UUID = string & { readonly __brand: 'UUID' };

export interface FinImpulseFullResponse<T> {
	task_id: UUID;
	status_code: number;
	status_message: string;
	cost: number;
	data: Record<string, any>
	result: T
}
