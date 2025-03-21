# mcp-server-to-markdown

通过 Cloudflare AI 服务将文件转换为 Markdown 描述的 MCP 服务器。

## 功能

- 上传文件到 Cloudflare AI 服务
- 获取文件的 Markdown 描述
- 支持多种文件类型
- 使用 Cloudflare 的 tomarkdown API

## 环境设置

1. 复制环境变量模板：

```bash
cp .env.example .env
```

2. 在 `.env` 文件中填入你的 Cloudflare 凭证：

```
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

## 安装依赖

```bash
npm install
```

## 构建与运行

```bash
# 构建项目
npm run build

# 运行服务
npm run inspect
```

## 使用方法

此服务提供 MCP 工具 `to-markdown`，可用于获取文件的 Markdown 描述：

```typescript
// 示例使用方法
const result = await toMarkdown({
  filePaths: [
    "/path/to/your/file.txt",
    "/path/to/another/file.jpg"
  ]
});
```

响应结果格式：

```json
[
  {
    "filename": "file.txt",
    "mimeType": "text/plain",
    "description": "生成的Markdown描述",
    "tokens": 123
  }
]
```

## 开发

项目使用 TypeScript 开发，基于 Model Context Protocol (MCP) SDK。

## 许可

MIT