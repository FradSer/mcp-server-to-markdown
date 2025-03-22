# MCP Server To Markdown ![](https://img.shields.io/badge/A%20FRAD%20PRODUCT-WIP-yellow)

[![Twitter Follow](https://img.shields.io/twitter/follow/FradSer?style=social)](https://twitter.com/FradSer)

[English](README.md) | 简体中文

一个使用 Cloudflare AI 服务将各种文件格式转换为 Markdown 描述的 Model Context Protocol (MCP) 服务器。该服务器提供了标准化的文件转换和描述生成接口。

## 功能特点

- 与 Cloudflare AI 服务无缝集成
- 高效的 Markdown 描述生成
- 全面的文件格式支持
- 与 Cloudflare tomarkdown API 原生集成
- 易用的 MCP 接口
- 跨平台兼容性

## 支持的文件格式

| 类别 | 文件扩展名 |
|----------|----------------|
| 文档 | .pdf |
| 图片 | .jpeg, .jpg, .png, .webp, .svg |
| 网页内容 | .html |
| 数据 | .xml, .csv |
| 电子表格 | .xlsx, .xlsm, .xlsb, .xls, .et, .ods, .numbers |

## 系统要求

- Node.js 18 或更高版本
- 有效的 Cloudflare API Token
- 激活的 Cloudflare Account ID

## 安装

通过 npm 全局安装：

```bash
npm install -g mcp-server-to-markdown
```

## MCP 客户端配置

### Cursor 集成

1. 导航至 Cursor 设置
2. 从侧边栏选择 "MCP"
3. 选择 "Add new global MCP server"
4. 应用以下配置：
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

### Claude Desktop 设置

在 `claude_desktop_config.json` 中添加以下内容：

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

### ChatWise 配置

1. 启动 ChatWise
2. 访问设置
3. 选择工具部分
4. 点击 "+" 添加新工具
5. 使用以下参数配置：
   - Type: `stdio`
   - ID: `to-markdown`
   - Command: `mcp-server-to-markdown`
   - Args:
      ```
      CLOUDFLARE_API_TOKEN=your_api_token
      CLOUDFLARE_ACCOUNT_ID=your_account_id
      ```

## API 参考

### to-markdown 工具

将各种文件格式转换为 Markdown 描述。

**输入参数：**
- `filePaths`: Array<string> (必需) - 要处理的文件路径列表

**响应结构：**
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

## 开发指南

### 入门

1. 克隆并设置环境：
```bash
git clone <repository-url>
cd mcp-server-to-markdown
cp .env.example .env
```

2. 配置 Cloudflare 凭证：
```plaintext
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

3. 安装依赖并构建：
```bash
npm install
npm run build
```

### 项目结构

```
.
├── src/             # 源代码
├── dist/            # 编译输出
├── types.ts         # 类型定义
└── .env             # 环境配置
```

### 可用脚本

- `npm run build` - 构建 TypeScript 代码
- `npm run inspect` - 使用 MCP 检查器运行

## 使用示例

```typescript
const result = await toMarkdown({
  filePaths: [
    "/path/to/document.pdf",
    "/path/to/image.jpg"
  ]
});
```

## 许可证

MIT License

本项目由 [Frad LEE](https://twitter.com/FradSer) 维护