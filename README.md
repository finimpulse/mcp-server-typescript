# FinImpulse MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that provides structured financial market data to AI systems and development tools through the [FinImpulse API](https://finimpulse.com).

It allows AI systems to access FinImpulse data — including stocks, ETFs, mutual funds, fundamentals, and market indicators — using a standardized MCP interface. The server acts as a bridge between the FinImpulse API and any MCP-compatible client, enabling LLMs and automation tools to retrieve financial data in a consistent format without building custom integrations.

## How It Works

```
AI Client (Claude / ChatGPT / Cursor / ...)
        ↓
   MCP Server
        ↓
  FinImpulse API
        ↓
  Financial Data
```

The MCP server translates tool calls from AI clients into FinImpulse API requests and returns structured responses that AI models can interpret. This architecture allows AI tools to access financial datasets without implementing direct API integrations.

## Key Features

- Structured financial market data via MCP
- Global coverage of stocks, ETFs, and mutual funds
- Standardized tools for AI agents and developer environments
- Compatible with major MCP clients and AI platforms

## Use Cases

- AI investment assistants
- Automated financial research workflows
- AI-assisted financial dashboards
- Trading assistants
- Portfolio analysis tools
- Developer environments retrieving market data

**Example prompt** — once connected, an AI system can retrieve financial data using natural language:

> Compare Microsoft and Google in terms of revenue growth and profitability.

## Requirements

- [Node.js](https://nodejs.org/) 18+
- A FinImpulse API token (obtain it in the [FinImpulse Dashboard](https://app.finimpulse.com/developer/settings))

## Quick Start

### Claude Desktop

Open `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

Add the server configuration:

```json
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "finimpulse-mcp-server"],
      "env": {
        "API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add finimpulse -- npx -y finimpulse-mcp-server
```

Then set the `API_TOKEN` environment variable or pass it inline.

### ChatGPT

ChatGPT supports MCP via its desktop app. Add the server in **Settings → MCP Servers** with the same `npx` command.

### Cursor

Open `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project-level) and add:

```json
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "finimpulse-mcp-server"],
      "env": {
        "API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Windsurf

Open `~/.codeium/windsurf/mcp_config.json` and add:

```json
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "finimpulse-mcp-server"],
      "env": {
        "API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### VS Code (Copilot)

Open your VS Code `settings.json` and add:

```json
{
  "mcp": {
    "servers": {
      "finimpulse": {
        "command": "npx",
        "args": ["-y", "finimpulse-mcp-server"],
        "env": {
          "API_TOKEN": "your-api-token"
        }
      }
    }
  }
}
```

### Gemini CLI

```bash
gemini mcp add finimpulse -- npx -y finimpulse-mcp-server
```

### Cline

Open Cline settings, go to **MCP Servers**, and add a new server with this config:

```json
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "finimpulse-mcp-server"],
      "env": {
        "API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Any MCP-Compatible Client (stdio)

```bash
API_TOKEN=your-api-token npx finimpulse-mcp-server
```

## Available Tools

### Search & Discovery

| Tool | Description |
|------|-------------|
| `get_search` | Cross-asset search for stocks, ETFs, and mutual funds. Powers ticker autocomplete and discovery flows. |

### Market Data

| Tool | Description |
|------|-------------|
| `get_summary` | Comprehensive single-call snapshot: identity, market data, fundamentals, ownership, analyst coverage, and fund metrics. |
| `get_histories` | Historical time-series: prices, dividends, splits, and capital gains with configurable date range and interval. |
| `get_profile` | Asset profile and descriptive metadata: identity, classification, governance, and fund-specific attributes. |
| `get_news` | Latest news and press releases with headlines, descriptions, related tickers, and provider info. |

### Statistics & Performance

| Tool | Description |
|------|-------------|
| `get_statistics_general` | Key statistics and performance indicators: valuation, dividends, risk, trailing returns. |
| `get_statistics_risks` | Risk-adjusted performance metrics (Alpha, Beta, Sharpe, Treynor, R-squared) across 3y/5y/10y horizons. |
| `get_statistics_annual_returns` | Historical annual total returns by calendar year with quarterly breakdowns. |

### Financial Statements

| Tool | Description |
|------|-------------|
| `get_financials_general` | Unified financial statements and valuation measures across reporting intervals. |
| `get_financials_income_statement` | Detailed Income Statement: revenue, expenses, net income (annual/quarterly/trailing). |
| `get_financials_balance_sheet` | Balance Sheet: financial position and capital structure snapshot. |
| `get_financials_cash_flow` | Cash Flow Statement: operating, investing, and financing cash flows. |
| `get_financials_valuation_measures` | Valuation Measures: P/E, EV/EBITDA, P/B, and related metrics. |

### Holders & Ownership

| Tool | Description |
|------|-------------|
| `get_holders_general` | High-level ownership snapshot: institutional and insider holdings percentages. |
| `get_holders_institutional` | Paginated list of institutional holders with position size, percent held, and value. |
| `get_holders_mutual_funds` | Mutual funds and ETFs that hold a given stock. |
| `get_holders_insiders` | Insider transaction records: actions, roles, and reported positions. |
| `get_holders_insiders_transactions` | Detailed insider transactions with share counts, values, and filer identity. |

### Fund Holdings

| Tool | Description |
|------|-------------|
| `get_holdings_general` | Portfolio composition and holdings-level aggregates: asset allocation, sector exposure. |
| `get_holdings_top_holdings` | Top holdings list with ticker, name, and weight as % of total net assets. |

## Configuration

| Environment Variable | Required | Description |
|---------------------|----------|-------------|
| `API_TOKEN` | Yes | Your FinImpulse API token |

## Development

```bash
git clone https://github.com/finimpulse/mcp-server-typescript.git
cd mcp-server-typescript
npm install
npm run build
```

Run locally:

```bash
API_TOKEN=your-api-token npm run cli
```

## Security

Keep your API token secure. Never expose API credentials in public repositories. Always store them using environment variables.

## Disclaimer

The AI-powered features and examples provided through FinImpulse MCP are intended for informational and research purposes only. Any insights, summaries, or suggestions generated by AI systems using FinImpulse data should be considered analytical tools, not financial, investment, or trading advice.

FinImpulse does not provide investment recommendations and does not guarantee the accuracy, completeness, or suitability of AI-generated outputs. Users are solely responsible for evaluating any information produced by AI agents or applications built on top of FinImpulse MCP. Financial decisions should always be made based on independent analysis or consultation with qualified financial professionals.

## Learn More

- [FinImpulse API Documentation](https://developers.finimpulse.com)
- [Model Context Protocol](https://modelcontextprotocol.io)

## License

ISC
