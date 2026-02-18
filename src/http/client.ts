import {FinImpulseFullResponse} from '../types/finimpulse.js';
import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {version} from '../utils/version.js';

const API_BASE = "https://api.finimpulse.com";
const USER_AGENT = `FinImpulse-MCP-TypeScript-SDK/${version}`;
const API_TOKEN = process.env.API_TOKEN ?? '';

console.error("API_TOKEN:", API_TOKEN ? "set" : "EMPTY");


export async function makeRequest<T>(url: string, method: string = 'POST', body?: any, forceFull: boolean = false): Promise<CallToolResult> {
	const headers: HeadersInit = {
		"User-Agent": USER_AGENT,
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: 'Bearer ' + API_TOKEN
	};
	
	// if(!defaultGlobalToolConfig.fullResponse && !forceFull){
	// 	url += '.ai';
	// }
	const bodyStr = body ? JSON.stringify(body) : undefined;
	console.error("BODY STRING:", bodyStr);
	try {
		const response = await fetch(API_BASE + url, {
			method,
			headers,
			body: bodyStr
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return validateAndFormatResponse<T>(await response.json() as FinImpulseFullResponse<T>)
	} catch (error) {
		console.error("Error making request:", error);
		return formatErrorResponse(error);
	}
}

function validateAndFormatResponse<T>(response: FinImpulseFullResponse<T>): CallToolResult{
	// console.error(JSON.stringify(response));
	// if (defaultGlobalToolConfig.fullResponse || this.supportOnlyFullResponse()) {
	// 	let data = response as DataForSEOFullResponse;
	// 	this.validateResponseFull(data);
	// 	let result = data.tasks[0].result;
	// 	return this.formatResponse(result);
	// }
	validateResponse(response);
	return formatResponse(response);
}
function validateResponse(response: FinImpulseFullResponse<any>): void {
	if (response.status_code / 100 !== 200) {
		throw new Error(`API Error: ${response.status_message} (Code: ${response.status_code})`);
	}
}

function formatResponse<T>(data: FinImpulseFullResponse<T>): CallToolResult {
	// const fieldConfig = FieldConfigurationManager.getInstance();
	// if (fieldConfig.hasConfiguration()) {
	// 	const toolName = this.getName();
	// 	if (fieldConfig.isToolConfigured(toolName)) {
	// 		const fields = fieldConfig.getFieldsForTool(toolName);
	// 		if (fields && fields.length > 0) {
	// 			data = filterFields(data, parseFieldPaths(fields));
	// 		}
	// 	}
	// }
	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(data, null, 2),
			},
		],
	};
}

function formatErrorResponse(error: unknown): CallToolResult {
	return {
		content: [
			{
				type: "text",
				text: `Error: ${formatError(error)}`,
			},
		],
	};
}

function formatError(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}
