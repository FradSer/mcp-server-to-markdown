#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

dotenv.config();

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
  throw new Error("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables are required");
}

// Cloudflare API configuration
const CLOUDFLARE_API = {
  BASE_URL: 'https://api.cloudflare.com/client/v4',
  TO_MARKDOWN: (accountId: string) => `/accounts/${accountId}/ai/tomarkdown`
};

// Debug logger
const log = (message: string): void => {
  console.error(`[DEBUG] ${message}`);
};

// Response type from Cloudflare API
interface CloudflareResponse {
  result: Array<{
    name: string;
    mimeType: string;
    format: string;
    tokens: number;
    data: string;
  }>;
  success: boolean;
  errors: any[];
  messages: any[];
}

class ToMarkdownServer {
  private server: McpServer;
  private requestCounter: number = 0;

  constructor() {
    this.server = new McpServer({
      name: "mcp-server-to-markdown",
      version: "1.0.0",
      description: "Generate markdown descriptions for files using Cloudflare AI"
    });
    
    log("Cloudflare Markdown Server initialized");
  }

  private registerTools(): void {
    this.server.tool(
      "to-markdown",
      "Generate markdown description for files",
      {
        filePaths: z.array(z.string())
          .describe("Array of absolute file paths to generate descriptions for")
      },
      async ({ filePaths }) => {
        const requestId = `req-${++this.requestCounter}`;
        log(`[${requestId}] Processing request for ${filePaths.length} files`);
        
        try {
          // Validate files exist
          for (const filePath of filePaths) {
            if (!fs.existsSync(filePath)) {
              throw new Error(`File not found: ${filePath}`);
            }
            log(`[${requestId}] Validated file exists: ${filePath}`);
          }
          
          // Build API endpoint URL
          const apiEndpoint = `${CLOUDFLARE_API.BASE_URL}${CLOUDFLARE_API.TO_MARKDOWN(CLOUDFLARE_ACCOUNT_ID as string)}`;
          
          // Construct curl command
          let curlCommand = `curl -s -X POST "${apiEndpoint}" -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"`;
          
          // Add each file to the curl command
          filePaths.forEach(filePath => {
            curlCommand += ` -F "files=@${filePath}"`;
          });
          
          log(`[${requestId}] Executing request to Cloudflare API`);
          
          const { stdout, stderr } = await execAsync(curlCommand);
          
          if (stderr) {
            log(`[${requestId}] Warning - stderr output: ${stderr}`);
          }
          
          // Parse and validate response
          try {
            const response = JSON.parse(stdout) as CloudflareResponse;
            
            if (!response.success) {
              const errorMessages = response.errors?.map(e => e.message).join(', ') || 'Unknown error';
              throw new Error(`Cloudflare API error: ${errorMessages}`);
            }
            
            // Format successful response
            const results = response.result.map(item => ({
              filename: item.name,
              mimeType: item.mimeType,
              description: item.data,
              tokens: item.tokens
            }));
            
            log(`[${requestId}] Successfully generated descriptions for ${results.length} files`);
            
            return {
              content: [{
                type: "text" as const,
                text: JSON.stringify(results, null, 2)
              }]
            };
          } catch (parseError) {
            log(`[${requestId}] Failed to parse API response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
            throw new Error(`Failed to parse Cloudflare API response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
          }
        } catch (error) {
          log(`[${requestId}] Error: ${error instanceof Error ? error.message : String(error)}`);
          
          return {
            content: [{
              type: "text" as const,
              text: `Error generating descriptions: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );
    
    log("Tools registered successfully");
  }

  async start(): Promise<void> {
    try {
      // Register tools
      this.registerTools();
      
      // Create transport and connect
      const transport = new StdioServerTransport();
      
      transport.onerror = (error) => {
        log(`Transport error: ${error.message}`);
      };
      
      log("Starting Cloudflare Markdown Server...");
      await this.server.connect(transport);
      log("Cloudflare Markdown Server running");
    } catch (error) {
      log(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  }
}

// Initialize and start server
(async () => {
  try {
    const server = new ToMarkdownServer();
    await server.start();
  } catch (error) {
    log(`Startup error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
})(); 