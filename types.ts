// Markdown Conversion Types
export interface MarkdownConversionRequest {
  files: {
    name: string;
    content: Buffer;
    mimeType?: string;
  }[];
}

export interface MarkdownConversionResult {
  name: string;
  mimeType: string;
  format: string;
  tokens: number;
  data: string;
}

export interface MarkdownConversionResponse {
  success: boolean;
  errors?: string[];
  results: MarkdownConversionResult[];
}

export interface ToMarkdownArgs {
  files: {
    name: string;
    content: string | Buffer;
    mimeType?: string;
  }[];
} 