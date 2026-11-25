import {FinImpulseFullResponse} from '../types/finimpulse.js';
import {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import {version} from '../utils/version.js';


export class ApiClient {

	private API_BASE = 'https://api.finimpulse.com';
	
	private USER_AGENT = `FinImpulse-MCP-TypeScript-SDK/${version}`;
	private TOKEN_SETTINGS_URL = 'https://app.finimpulse.com/developer/settings';
	constructor(private readonly token: string) {}
	
	async request<T>(url: string, method: string = 'POST', body?: any, forceFull: boolean = false): Promise<CallToolResult> {
		const headers: HeadersInit = {
			"User-Agent": this.USER_AGENT,
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: 'Bearer ' + this.token
		};
		// if(!defaultGlobalToolConfig.fullResponse && !forceFull){
		// 	url += '.ai';
		// }
		const bodyStr = body ? JSON.stringify(body) : undefined;
		try {
			const response = await fetch(this.API_BASE + url, {
				method,
				headers,
				body: bodyStr
			});
			if (response.status === 401) {
				return this.formatUnauthorizedResponse();
			}
			if (!response.ok) {
				return this.formatHttpErrorResponse(response.status, await this.readErrorBody(response));
			}
			return this.validateAndFormatResponse<T>(await response.json() as FinImpulseFullResponse<T>)
		} catch (error) {
			console.error("Error making request:", error);
			return this.formatErrorResponse(error);
		}
	}
	
	private validateAndFormatResponse<T>(response: FinImpulseFullResponse<T>): CallToolResult{
		// console.error(JSON.stringify(response));
		// if (defaultGlobalToolConfig.fullResponse || this.supportOnlyFullResponse()) {
		// 	let data = response as DataForSEOFullResponse;
		// 	this.validateResponseFull(data);
		// 	let result = data.tasks[0].result;
		// 	return this.formatResponse(result);
		// }
		this.validateResponse(response);
		return this.formatResponse(response);
	}
	private validateResponse(response: FinImpulseFullResponse<any>): void {
		if (response.status_code / 100 !== 200) {
			throw new Error(`API Error: ${response.status_message} (Code: ${response.status_code})`);
		}
	}
	
	private formatResponse<T>(data: FinImpulseFullResponse<T>): CallToolResult {
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
	
	private async readErrorBody(response: Response): Promise<Partial<FinImpulseFullResponse<unknown>> | null> {
		try {
			return await response.json() as Partial<FinImpulseFullResponse<unknown>>;
		} catch {
			return null;
		}
	}

	private formatHttpErrorResponse(httpStatus: number, body: Partial<FinImpulseFullResponse<unknown>> | null): CallToolResult {
		const code = body?.status_code ? ` (Code: ${body.status_code})` : '';
		const message = body?.status_message ? `: ${body.status_message}` : '.';
		return {
			isError: true,
			content: [
				{
					type: "text",
					text: `Error: FinImpulse API returned HTTP ${httpStatus}${code}${message}`,
				},
			],
		};
	}

	private formatErrorResponse(error: unknown): CallToolResult {
		return {
			isError: true,
			content: [
				{
					type: "text",
					text: `Error: ${this.formatError(error)}`,
				},
			],
		};
	}
	
	private formatUnauthorizedResponse(): CallToolResult {
		const message = this.token
			? 'FinImpulse API rejected the API token (401 Unauthorized). The token is invalid or revoked.'
			: 'FinImpulse API token is missing (401 Unauthorized).';
		return {
			isError: true,
			content: [
				{
					type: "text",
					text: `Error: ${message} For a local server, set a valid API_TOKEN environment variable in the MCP client config and restart the server. Get a token at ${this.TOKEN_SETTINGS_URL}. For the hosted server (https://mcp.finimpulse.com/mcp), reconnect it to sign in again.`,
				},
			],
		};
	}
	
	formatError(error: unknown): string {
		return error instanceof Error ? error.message : 'Unknown error';
	}
}
