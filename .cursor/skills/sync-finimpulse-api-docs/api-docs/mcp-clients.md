---
title: Supported MCP Clients &amp; Setup
created: 2026-04-22
updated: 2026-11-13
---

# Supported MCP Clients &amp; Setup

Configuration instructions for connecting the FinImpulse MCP Server to commonly used MCP-compatible AI clients and development environments. 

The Model Context Protocol (MCP) is a standardized interface for communication between AI clients and external data sources. FinImpulse implements this protocol to provide AI clients with access to financial market data.

The [FinImpulse MCP Server](https://developers.finimpulse.com/model-context-protocol/) is compatible with any MCP-supported AI client, including:

- [Claude Desktop](https://developers.finimpulse.com/mcp-clients/#claude-desktop)
- [Claude Code](https://developers.finimpulse.com/mcp-clients/#claude-code)
- [ChatGPT](https://developers.finimpulse.com/mcp-clients/#chatgpt)
- [Cursor](https://developers.finimpulse.com/mcp-clients/#cursor)
- [Devin Desktop (Windsurf)](https://developers.finimpulse.com/mcp-clients/#devin-desktop-windsurf)
- [VS Code (Copilot)](https://developers.finimpulse.com/mcp-clients/#vs-code-copilot)
- [Antigravity CLI](https://developers.finimpulse.com/mcp-clients/#antigravity-cli)
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

Claude Desktop supports two connection methods: the hosted endpoint through the mcp-remote bridge, and the local server directly over stdio.

For both options, open Claude Desktop and navigate to **Settings → Developer**, then select **Edit Config** to open the configuration file. Alternatively, locate the file manually at the following path, depending on the operating system:

- **macOS**: ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows**: %APPDATA%\\Claude\\claude_desktop_config.json
- **Linux**: ~/.config/Claude/claude_desktop_config.json

Since the configuration file supports only local (stdio) servers, use the mcp-remote bridge to connect via the hosted endpoint. Add the following configuration to the file:

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

After saving the configuration file, quit and restart Claude Desktop for the changes to take effect.

## Claude Code

Claude Code supports two connection methods. Install and configure Claude Code before proceeding. Refer to the [Anthropic documentation](https://code.claude.com/docs/en/overview) for setup instructions.

To connect via the hosted endpoint, run:

```
claude mcp add --transport http finimpulse https://mcp.finimpulse.com/mcp
```

To complete the authorization, run /mcp within Claude Code and follow the steps in the browser.

To run the server locally, use the following command, replacing *your-api-token* with your FinImpulse API token:

```
claude mcp add finimpulse -e API_TOKEN=your-api-token -- npx -y finimpulse-mcp-server 
```

To verify the connection, run:

```
claude mcp list
```

The FinImpulse server should appear in the list of configured MCP servers.

## ChatGPT

ChatGPT supports only the hosted endpoint connection method. To set it up in the ChatGPT web app, go to **Plugins → Add → Add custom MCP server** and enter the following:

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

To run the server locally, add the following configuration instead, replacing *your-api-token* with your FinImpulse API token:

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

## Devin Desktop (Windsurf)

Windsurf has been renamed to Devin Desktop. Devin Desktop supports two connection methods. For both options, open the configuration file at the following path, depending on the operating system:

- **macOS**: ~/.config/devin/mcp_config.json
- **Windows**: %APPDATA%\\devin\\mcp_config.json
- **Linux**: ~/.config/devin/mcp_config.json

To connect via the hosted endpoint, add the following configuration to the file:

```
{
  "mcpServers": {
    "finimpulse": {
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

To run the server locally, use the following configuration instead, replacing *your-api-token* with your FinImpulse API token:

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

VS Code supports two connection methods. For both options, open the *mcp.json* configuration file: run **MCP: Open User Configuration** from the **Command Palette** to make the server available in all workspaces, or create *.vscode/mcp.json* in the workspace folder to use it only in the current project.

To connect via the hosted endpoint, add the following configuration to the file:

```
{
  "servers": {
    "finimpulse": {
      "type": "http",
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

To run the server locally, use the following configuration instead, replacing *your-api-token* with your FinImpulse API token:

```
{
  "servers": {
    "finimpulse": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "finimpulse-mcp-server"],
      "env": {
        "API_TOKEN": "your-api-token"
      }
    }
  }
}
```

## Antigravity CLI

Antigravity CLI replaces Gemini CLI for individual Google accounts. Antigravity CLI supports two connection methods. Install and configure Antigravity CLI before proceeding. Refer to the [Antigravity documentation](https://antigravity.google/docs/getting-started?tab=cli) for setup instructions.

To connect via the hosted endpoint, run:

```
agy mcp add finimpulse https://mcp.finimpulse.com/mcp
```

To run the server locally, use the following command, replacing *your-api-token* with your FinImpulse API token:

```
agy mcp add -e API_TOKEN=your-api-token finimpulse -- npx -y finimpulse-mcp-server 
```

To verify the connection, run:

```
agy mcp list 
```

The FinImpulse server should appear in the list of configured MCP servers.

## Cline

Cline supports two connection methods. For both options, open the Cline panel, click the **MCP Servers** icon, go to the **Configure** tab, and select **Configure MCP Servers** to open the configuration file.

To connect via the hosted endpoint, add the following configuration to the file:

```
{
  "mcpServers": {
    "finimpulse": {
      "type": "streamableHttp",
      "url": "https://mcp.finimpulse.com/mcp"
    }
  }
}
```

To run the server locally, use the following configuration instead, replacing *your-api-token* with your FinImpulse API token:

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

Any client that supports the Streamable HTTP transport and OAuth 2.0 can connect via the hosted endpoint using the following URL:

```
https://mcp.finimpulse.com/mcp 
```

For clients that support stdio only, configure the client to launch the server with the following parameters, replacing *your-api-token* with your FinImpulse API token:

- Command: npx
- Arguments: -y finimpulse-mcp-server
- Environment variable: API_TOKEN=your-api-token

## Disclaimer

FinImpulse MCP Server provides access to financial data and analytics via a standardized interface. It does not generate investment recommendations and does not provide financial, investment, or trading advice.

Any outputs produced by AI systems built on top of this server are for informational and research purposes only. Users are solely responsible for evaluating any information generated by AI agents or applications built on top of FinImpulse MCP. Financial decisions should be based on independent analysis or consultation with a qualified financial professional.
