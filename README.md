# MCP Server To Markdown ![](https://img.shields.io/badge/A%20FRAD%20PRODUCT-WIP-yellow)

[![Twitter Follow](https://img.shields.io/twitter/follow/FradSer?style=social)](https://twitter.com/FradSer)

English | [简体中文](README.zh-CN.md)

A powerful Model Context Protocol (MCP) server that leverages Cloudflare AI services to convert various file formats into Markdown descriptions. This server provides a standardized interface for seamless file conversion and description generation.

## Key Features

- Seamless integration with Cloudflare AI services
- Efficient Markdown description generation
- Comprehensive file format support
- Native Cloudflare tomarkdown API integration
- User-friendly MCP interface
- Cross-platform compatibility

## Supported File Formats

| Category | File Extensions |
|----------|----------------|
| Documents | .pdf |
| Images | .jpeg, .jpg, .png, .webp, .svg |
| Web Content | .html |
| Data | .xml, .csv |
| Spreadsheets | .xlsx, .xlsm, .xlsb, .xls, .et, .ods, .numbers |

## System Requirements

- Node.js 18 or later
- Valid Cloudflare API Token
- Active Cloudflare Account ID

## Installation

Install globally using npm:

```bash
npm install -g mcp-server-to-markdown
```

## MCP Client Configuration

### Cursor Integration

1. Navigate to Cursor settings
2. Select "MCP" from the sidebar
3. Choose "Add new global MCP server"
4. Apply the following configuration:
    ```json
    {
      "mcpServers": {
        "to-markdown": {
          "command": "mcp-server-to-markdown",
          "args": [
            "CLOUDFLARE_API_TOKEN": "your_api_token"
            "CLOUDFLARE_ACCOUNT_ID": "your_account_id"
          ]
        }
      }
    }
    ```

### Claude Desktop Setup

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "to-markdown": {
      "command": "mcp-server-to-markdown",
      "args": [
            "CLOUDFLARE_API_TOKEN": "your_api_token"
            "CLOUDFLARE_ACCOUNT_ID": "your_account_id"
          ]
    }
  }
}
```

### ChatWise Configuration

1. Launch ChatWise
2. Access Settings
3. Select Tools section
4. Click "+" to add new tool
5. Configure with these parameters:
   - Type: `stdio`
   - ID: `to-markdown`
   - Command: `mcp-server-to-markdown`
   - Args:
      ```
      CLOUDFLARE_API_TOKEN=your_api_token
      CLOUDFLARE_ACCOUNT_ID=your_account_id
      ```

## API Reference

### to-markdown Tool

Converts various file formats to Markdown descriptions.

**Input Parameters:**
- `filePaths`: Array<string> (required) - List of file paths to process

**Response Structure:**
```json
[
  {
    "filename": "example.pdf",
    "mimeType": "application/pdf",
    "description": "Generated Markdown description",
    "tokens": 123
  }
]
```

## Development Guide

### Getting Started

1. Clone and setup environment:
```bash
git clone <repository-url>
cd mcp-server-to-markdown
cp .env.example .env
```

2. Configure Cloudflare credentials:
```plaintext
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

3. Install dependencies and build:
```bash
npm install
npm run build
```

### Project Structure

```
.
├── src/             # Source code
├── dist/            # Compiled output
├── types.ts         # Type definitions
└── .env             # Environment configuration
```

### Available Scripts

- `npm run build` - Build TypeScript code
- `npm run inspect` - Run with MCP inspector

## Usage Example

```typescript
const result = await toMarkdown({
  filePaths: [
    "/path/to/document.pdf",
    "/path/to/image.jpg"
  ]
});
```

## License

MIT License

This project is maintained by [Frad LEE](https://twitter.com/FradSer)
