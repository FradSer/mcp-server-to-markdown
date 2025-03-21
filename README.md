# mcp-server-to-markdown

通过 Cloudflare AI 服务将文件转换为 Markdown 描述的 MCP 服务器。

## 功能

- 上传文件到 Cloudflare AI 服务
- 获取文件的 Markdown 描述
- 支持多种文件类型（图片、文档等）

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

## 运行服务

```bash
npm start
```

## 使用方法

此服务提供 MCP 工具 `generateDescription`，可用于获取文件的描述：

```typescript
// 示例使用方法
const result = await generateDescription({
  filePaths: [
    "/path/to/your/file.png",
    "/path/to/another/file.jpg"
  ]
});
```

## 开发

```bash
# 构建项目
npm run build

# 启动开发环境
npm run dev
```

## 许可

MIT 