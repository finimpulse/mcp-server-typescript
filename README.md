# FinImpulse MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that provides structured financial market data to AI systems and development tools through the [FinImpulse API](https://finimpulse.com/api/).

It allows AI systems to access FinImpulse data — including stocks, ETFs, mutual funds, fundamentals, and market indicators — using a standardized MCP interface. The server acts as a bridge between the FinImpulse API and any MCP-compatible client, enabling LLMs and automation tools to retrieve financial data in a consistent format without building custom integrations.

> **Hosted server available.** You can connect any Streamable HTTP MCP client directly to `https://mcp.finimpulse.com/mcp` and authenticate via OAuth — no API token setup required. See [Quick Start](#quick-start) below.

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

You can use FinImpulse MCP in two ways:

- **Hosted (recommended):** no requirements other than a [FinImpulse account](https://app.finimpulse.com). Authentication is handled via OAuth in the browser — no manual API token management.
- **Local (stdio):** [Node.js](https://nodejs.org/) 18+ and a FinImpulse API token (obtain it in the [FinImpulse Dashboard](https://app.finimpulse.com/developer/settings)).

## Quick Start

There are two ways to connect: use the hosted server at `https://mcp.finimpulse.com/mcp` (Streamable HTTP + OAuth), or run the server locally via `npx`.

---

### Option 1 — Hosted server (OAuth)

The FinImpulse-hosted MCP endpoint is available at:

```
https://mcp.finimpulse.com/mcp
```

It uses the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) transport and OAuth 2.0 — when you first connect, your MCP client will open a browser window to authorize access against your FinImpulse account. The client then stores the access token and forwards it automatically on every request. No API token needs to be configured by hand.

#### Cursor

Open `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project-level) and add:

```json
{
  "mcpServers": {
    "finimpulse": {
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

#### VS Code (Copilot)

Open your VS Code `settings.json` and add:

```json
{
  "mcp": {
    "servers": {
      "finimpulse": {
        "url": "https://mcp.finimpulse.com/mcp"
      }
    }
  }
}
```

#### Claude Desktop

Claude Desktop does not yet speak Streamable HTTP natively. Bridge through `mcp-remote`, which handles the OAuth flow in your browser and forwards requests over stdio:

```json
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.finimpulse.com/mcp"]
    }
  }
}
```

#### ChatGPT

In the ChatGPT desktop app go to **Settings → Connectors → Add custom connector** and enter:

- URL: `https://mcp.finimpulse.com/mcp`
- Authentication: OAuth

#### Windsurf / Cline / other Streamable-HTTP clients

Any MCP client that supports the Streamable HTTP transport can use the URL directly:

```
https://mcp.finimpulse.com/mcp
```

For clients that only support stdio, use the `mcp-remote` bridge shown in the Claude Desktop example.

---

### Option 2 — Local (stdio via npx)

If you prefer to run the server in-process on your machine, use the npm package. You'll need a FinImpulse API token from the [FinImpulse Dashboard](https://app.finimpulse.com/developer/settings).

#### Claude Desktop

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

#### Claude Code

```bash
claude mcp add finimpulse -- npx -y finimpulse-mcp-server
```

Then set the `API_TOKEN` environment variable or pass it inline.

#### Cursor

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

#### Windsurf

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

#### VS Code (Copilot)

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

#### Gemini CLI

```bash
gemini mcp add finimpulse -- npx -y finimpulse-mcp-server
```

#### Cline

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

#### Any MCP-Compatible Client (stdio)

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

### Analyst Coverage & Ratings

| Tool | Description |
|------|-------------|
| `get_analysis_analysts` | Analyst coverage records per analyst: scores, ratings, sentiment, price targets, and announcement dates. |
| `get_analysis_earnings` | Earnings and estimate data: EPS actuals, earnings vs. revenue, EPS trends, revisions, and growth metrics. |
| `get_analysis_recommendations` | Analyst recommendation breakdown over time: Strong Buy, Buy, Hold, Sell, and Strong Sell counts per period. |
| `get_analysis_upgrades_downgrades` | Analyst rating action feed: upgrades, downgrades, reiterations, and price target changes with from/to grades. |

### Options

| Tool | Description |
|------|-------------|
| `get_options_expirations` | Available option expiration dates for an underlying symbol. |
| `get_options_chain` | Full option chain for a given expiration: calls and puts with pricing, bid/ask, volume, open interest, and implied volatility. |
| `get_options_contracts` | Single option contract snapshot: pricing, bid/ask, volume, open interest, implied volatility, moneyness, and Greeks. |

## Configuration

When using the **hosted** server (`https://mcp.finimpulse.com/mcp`) no environment variables are required — your MCP client handles OAuth automatically.

The variables below apply only when running the server **locally** (stdio via `npx` or your own deployment):

| Environment Variable | Required | Description |
|---------------------|----------|-------------|
| `API_TOKEN` | Yes (local stdio) | Your FinImpulse API token |

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
