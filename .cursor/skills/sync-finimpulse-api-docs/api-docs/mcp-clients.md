---
title: Supported MCP Clients &amp; Setup
created: 2026-04-22
updated: 2026-10-23
---

# Supported MCP Clients &amp; Setup

Configuration instructions for connecting the FinImpulse MCP Server to commonly used MCP-compatible AI clients and development environments. 

The Model Context Protocol (MCP) is a standardized interface for communication between AI clients and external data sources. FinImpulse implements this protocol to provide AI clients with access to financial market data.

The [FinImpulse MCP Server](https://developers.finimpulse.com/model-context-protocol/) is compatible with any MCP-supported AI client, including:

- [Claude Desktop](https://developers.finimpulse.com/mcp-clients/#claude-desktop)
- [Claude Code](https://developers.finimpulse.com/mcp-clients/#claude-code)
- [ChatGPT](https://developers.finimpulse.com/mcp-clients/#chatgpt)
- [Cursor](https://developers.finimpulse.com/mcp-clients/#cursor)
- [Windsurf](https://developers.finimpulse.com/mcp-clients/#windsurf)
- [VS Code (Copilot)](https://developers.finimpulse.com/mcp-clients/#vs-code-copilot)
- [Gemini CLI](https://developers.finimpulse.com/mcp-clients/#gemini-cli)
- [Cline](https://developers.finimpulse.com/mcp-clients/#cline)

Configuration instructions for all listed MCP clients are provided below, covering both the hosted endpoint (OAuth) and local server (stdio) connection methods.

> **Note:** Support for custom MCP servers is defined by each client. Depending on the client, adding a custom MCP server may require a specific subscription plan, account type, or permissions granted by a workspace administrator. MCP clients are updated regularly, and menu names or setup steps may change between versions. If an option appears under a different name, refer to the client’s official documentation for the current steps.

## Connection Methods 

Two connection methods are available. Select the option that best fits your environment.

### Option 1 — Hosted Server 

The FinImpulse-hosted MCP endpoint is available at **https://mcp.finimpulse.com/mcp.**

It uses the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) transport and **OAuth 2.0**. When connecting for the first time, the MCP client opens a browser window to authorize access against your [FinImpulse account](https://app.finimpulse.com/auth/login). The client then stores the access token and forwards it automatically on every subsequent request.

A FinImpulse account is the only prerequisite. No API token configuration is required.

### Option 2 — Local Server (stdio)

The server can be run locally via **npx**. This method requires Node.js 18 or higher and a valid FinImpulse API token (obtainable in the [FinImpulse Dashboard](https://app.finimpulse.com/developer/settings)). **Keep your API token secure.**

Once the prerequisites are met, follow the configuration instructions for your client in the sections below.

The full source code and additional setup references are available on [GitHub](https://github.com/finimpulse/mcp-server-typescript).

## Claude Desktop

Claude Desktop supports two connection methods: a hosted server via the mcp-remote bridge and a local server via stdio.

For both options, open Claude Desktop and navigate to **Settings → Developer**, then select **Edit Config** to open the configuration file. Alternatively, locate the file manually at the following path, depending on the operating system:

- **macOS**: ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows**: %APPDATA%\\Claude\\claude_desktop_config.json
- **Linux**: ~/.config/Claude/claude_desktop_config.json

As Claude Desktop does not support Streamable HTTP natively, to connect via the hosted endpoint, use the mcp-remote bridge. Add the following configuration to the file:

```
{
  "mcpServers": {
    "finimpulse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.finimpulse.com/mcp"]
    }
  }
}
```

To run the server locally, add the following configuration, replacing *your-api-token* with your FinImpulse API token:

```
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

## Claude Code

Claude Code supports two connection methods.

Install and configure Claude Code before proceeding. Refer to the [Anthropic documentation](https://docs.anthropic.com/en/docs/claude-code) for setup instructions.

To connect via the hosted endpoint, run:

```
claude mcp add --transport http finimpulse https://mcp.finimpulse.com/mcp
```

To run the server locally:

```
claude mcp add finimpulse -- npx -y finimpulse-mcp-server
```

Then set the *API_TOKEN* environment variable:

```
export API_TOKEN=your-api-token
```

To verify the connection, run:

```
claude mcp list
```

The FinImpulse server should appear in the list of configured MCP servers.

## ChatGPT

ChatGPT supports only the hosted endpoint connection method, available both on the web and in the desktop application.

To set it up, go to **Plugins → Add → Add custom MCP server** and enter the following:

- Name: FinImpulse
- Connection: Server URL, https://mcp.finimpulse.com/mcp
- Authentication: OAuth

To use FinImpulse in a chat, type @ and select it by the name specified during setup.

## Cursor

Cursor supports two connection methods. Ensure the latest version of Cursor is installed before proceeding.

To connect via the hosted endpoint, open the configuration file at *~/.cursor/mcp.json* (global) or *.cursor/mcp.json* (project-level) and add the following:

```
{
  "mcpServers": {
    "finimpulse": {
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

 To run the server locally, add the following configuration to the same file, replacing *your-api-token* with your FinImpulse API token:

```
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

## Windsurf

Windsurf supports two connection methods.

To connect via the hosted endpoint, open *~/.codeium/mcp_config.json* and add the following:

```
{
  "mcpServers": {
    "finimpulse": {
      "serverUrl": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

To run the server locally, open *~/.codeium/windsurf/mcp_config.json* and add the following, replacing *your-api-token* with your FinImpulse API token:

```
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

## VS Code (Copilot)

VS Code supports two connection methods.

To connect via the hosted endpoint, open *settings.json* and add the following:

```
{
  "mcp": {
    "servers": {
      "finimpulse": {
          "type": "http",
          "url": "https://mcp.finimpulse.com/mcp"
       } 
    }
  }
}
```

To run the server locally, add the following configuration to the same file, replacing *your-api-token* with your FinImpulse API token:

```
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

## Gemini CLI

Gemini CLI supports only the local server (stdio) connection method.

Install and configure Gemini CLI before proceeding. Refer to the [Google documentation](https://cloud.google.com/gemini/docs/codeassist/gemini-cli) for setup instructions.

Run the following command to add the FinImpulse MCP server:

```
gemini mcp add finimpulse -- npx -y finimpulse-mcp-server
```

Then set the API_TOKEN environment variable, replacing *your-api-token* with your FinImpulse API token:

```
export API_TOKEN=your-api-token
```

To verify the connection, run:

```
/mcp list
```

The FinImpulse server should appear in the list of configured MCP servers.

## Cline

Cline supports two connection methods.

Firstly, open Cline settings and navigate to **MCP Servers**.

To connect via the hosted endpoint, add a new server with the following configuration:

```
{
  "mcpServers": {
    "finimpulse": {
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

To run the server locally, add a new server with the following configuration, replacing *your-api-token* with your FinImpulse API token:

```
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

## Other MCP-Compatible Clients

Any client that supports the Streamable HTTP transport can connect via the hosted endpoint using the following URL:

```
https://mcp.finimpulse.com/mcp 
```

For clients that support stdio only, pass the API token as an environment variable and run:

```
API_TOKEN=your-api-token npx finimpulse-mcp-server
```

## Disclaimer

FinImpulse MCP Server provides access to financial data and analytics via a standardized interface. It does not generate investment recommendations and does not provide financial, investment, or trading advice.

Any outputs produced by AI systems built on top of this server are for informational and research purposes only. Users are solely responsible for evaluating any information generated by AI agents or applications built on top of FinImpulse MCP. Financial decisions should be based on independent analysis or consultation with a qualified financial professional.
