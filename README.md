# MCP Markdown转换服务器

通过 Cloudflare AI 服务将文件转换为 Markdown 描述的 MCP 服务器。

## 功能特点

- 上传文件到 Cloudflare AI 服务
- 获取文件的 Markdown 描述
- 支持多种文件类型
- 使用 Cloudflare 的 tomarkdown API

## 可用工具

### to-markdown

这是一个将各种格式文件转换为 Markdown 描述的工具。

**支持的文件类型：**
- PDF 文件 (.pdf)
- 图片文件 (.jpeg, .jpg, .png, .webp, .svg)
- 网页文件 (.html)
- XML 文件 (.xml)
- 微软 Office 文件 (.xlsx, .xlsm, .xlsb, .xls, .et)
- 开放文档格式 (.ods)
- CSV 文件 (.csv)
- 苹果文档 (.numbers)

**参数说明：**
- `filePaths`：文件路径数组，需要提供文件的完整路径

**返回数据格式：**
```json
[
  {
    "filename": "文件名",
    "mimeType": "文件类型",
    "description": "生成的Markdown描述",
    "tokens": "使用的令牌数量"
  }
]
```

## 环境配置

1. 首先复制环境变量配置模板：

```bash
cp .env.example .env
```

2. 在 `.env` 文件中配置你的 Cloudflare 认证信息：

```
CLOUDFLARE_API_TOKEN=你的API令牌
CLOUDFLARE_ACCOUNT_ID=你的账户ID
```

## 安装步骤

```bash
npm install
```

## 构建和运行

```bash
# 构建项目
npm run build

# 运行服务
npm run inspect
```

## 使用说明

本服务提供了 `to-markdown` 工具，用于生成文件的 Markdown 描述。以下是使用示例：

```typescript
// 使用示例
const result = await toMarkdown({
  filePaths: [
    "/path/to/your/file.txt",
    "/path/to/another/file.jpg"
  ]
});
```

返回的数据格式如下：

```json
[
  {
    "filename": "示例文件.txt",
    "mimeType": "text/plain",
    "description": "生成的Markdown描述",
    "tokens": 123
  }
]
```

## 开发说明

本项目使用 TypeScript 开发，基于模型上下文协议（Model Context Protocol，MCP）SDK 构建。

## 开源协议

采用 MIT 协议开源