---
title: Continue 使用教程：开源 AI 编程助手完整指南
software: Continue
softwareSlug: continue
difficulty: intermediate
category: AI 编程
order: 15
description: "从安装到高级用法，手把手教你用 Continue 提升编码效率。"
---

## 软件简介

Continue 是一款完全开源（Apache 2.0 协议）的 AI 编程助手，由 Continue Dev 团队开发维护。与 GitHub Copilot、Cursor 等商业产品不同，Continue 的最大特点是**自由**：你可以选择任意的 LLM 后端，包括 OpenAI、Anthropic Claude、Google Gemini，或者通过 Ollama、LM Studio、vLLM 等工具运行本地模型，数据完全由你掌控。

Continue 提供两种工作模式：
- **Tab 自动补全**：在编码时自动推测并补全后续代码
- **侧边栏对话**：像 ChatGPT 一样在 IDE 侧边栏中对话，但对话上下文直接关联你的代码

Continue 支持 VS Code 和 JetBrains 系列 IDE（IntelliJ IDEA、PyCharm、WebStorm、GoLand 等），是开发者在 AI 编程工具方面实现"数据主权"的最佳选择之一。

## 安装方式

### VS Code 安装

1. 打开 VS Code
2. 点击左侧活动栏的"扩展"图标（或按 `Ctrl+Shift+X`）
3. 在搜索框输入 **"Continue"**
4. 找到由 **Continue Dev** 发布的扩展，点击"安装"
5. 安装完成后，VS Code 右侧会出现 Continue 图标

或者直接在 VS Code 中按 `Ctrl+P` 打开快速命令面板，粘贴以下命令后回车：

```
ext install continue.continue
```

### JetBrains 安装

1. 打开你的 JetBrains IDE（IntelliJ IDEA、PyCharm 等）
2. 进入 **File > Settings > Plugins**（Windows/Linux）或 **IntelliJ IDEA > Preferences > Plugins**（macOS）
3. 在 Marketplace 搜索 **"Continue"**
4. 点击安装
5. 重启 IDE 完成安装

安装完成后，在 IDE 右侧会出现 Continue 面板。也可以从 **Tools > Continue** 菜单打开。

## 配置 AI 模型

Continue 的核心优势在于支持多种 AI 模型后端，你可以在安装后自由选择。点击 Continue 面板底部的齿轮图标进入设置。

### 配置方式一：通过 IDE 设置界面

在 VS Code 中：按 `Ctrl+Shift+P`，搜索 "Continue: Open config"。
在 JetBrains 中：点击 Continue 面板的设置按钮。

配置文件为 `~/.continue/config.json`（全局）或项目根目录下的 `.continuerc.json`（项目级）。

### 使用云端模型

**OpenAI（GPT-4/GPT-4o）：**

```json
{
  "models": [
    {
      "title": "GPT-4o",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "sk-your-api-key-here"
    }
  ]
}
```

**Anthropic（Claude 3.5 Sonnet / Claude 4）：**

```json
{
  "models": [
    {
      "title": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "model": "claude-3-5-sonnet-20240620",
      "apiKey": "sk-ant-your-api-key-here"
    }
  ]
}
```

> **获取 API Key**：OpenAI 在 [platform.openai.com/api-keys](https://platform.openai.com/api-keys) 获取，Anthropic 在 [console.anthropic.com](https://console.anthropic.com) 获取。

### 使用本地模型（Ollama）

**第一步：安装 Ollama**

从 [ollama.com](https://ollama.com) 下载安装，然后拉取模型：

```bash
# 拉取推荐编程模型
ollama pull codestral:latest       # Mistral 开发的编程模型
ollama pull deepseek-coder:6.7b    # DeepSeek 编程模型
ollama pull llama3.1:8b            # Meta 通用模型
```

**第二步：配置 Continue**

```json
{
  "models": [
    {
      "title": "CodeStral",
      "provider": "ollama",
      "model": "codestral"
    },
    {
      "title": "DeepSeek Coder",
      "provider": "ollama",
      "model": "deepseek-coder:6.7b"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Starcoder2",
    "provider": "ollama",
    "model": "starcoder2:3b"
  }
}
```

### 使用其他后端

- **LM Studio**：在本地运行模型，配置 provider 为 `"lmstudio"`
- **vLLM**：适用于自建推理服务端，配置 provider 为 `"vllm"`
- **Azure OpenAI**：企业用户，配置 provider 为 `"azure"`
- **Google Gemini**：配置 provider 为 `"google"`

## 聊天界面使用

按 `Ctrl+Shift+I`（VS Code）或 `Alt+C`（JetBrains）打开 Continue 侧边栏聊天面板。

### 基本对话

在聊天输入框中直接输入问题，Continue 会基于当前打开的文件提供上下文相关的回答。例如：

- "这段代码有什么问题？"
- "帮我写一个二分查找函数"
- "解释一下这个 React 组件的渲染逻辑"
- "给我写单元测试用例"

### @-mentions 上下文引用

Continue 支持 `@` 符号引用各种上下文源，让你的问题更精准：

| 引用 | 用法 | 说明 |
|------|------|------|
| `@file` | `@file src/index.ts` | 引用指定文件内容 |
| `@web` | `@web React hooks documentation` | 搜索网络相关内容 |
| `@terminal` | `@terminal` | 引用终端输出（错误信息） |
| `@codebase` | `@codebase 实现用户认证` | 自动搜索整个代码库 |
| `@folder` | `@folder src/components` | 引用整个文件夹内容 |
| `@diff` | `@diff` | 引用当前未暂存的代码变更 |

**实用场景示例：**

```
@web Node.js stream API @file src/processor.ts
帮我根据 Node.js 官方文档的 stream API，重构这个文件的处理器逻辑。
```

```
@terminal
终端报了这个错误，帮我分析原因并给出解决方案。
```

```
@codebase where is the user authentication logic
```

### 代码应用

当 Continue 生成代码后，你会看到：

- **插入到光标处**：将代码块插入到当前光标位置
- **替换选中内容**：如果你选中了代码，可以替换它
- **复制**：复制代码到剪贴板
- **差异对比**：查看生成代码与原代码的差异

## Tab 自动补全配置

Tab 自动补全是 Continue 在编码时的实时建议功能。

### 启用自动补全

在 Continue 配置中添加 `tabAutocompleteModel` 字段：

```json
{
  "tabAutocompleteModel": {
    "title": "DeepSeek Coder",
    "provider": "ollama",
    "model": "deepseek-coder:1.3b"
  }
}
```

**推荐的补全模型：**

| 模型 | 大小 | 硬件要求 | 效果 |
|------|------|---------|------|
| deepseek-coder:1.3b | ~0.8GB | 2GB 内存 | 基础补全，速度快 |
| deepseek-coder:6.7b | ~3.8GB | 6GB 内存 | 推荐，效果较好 |
| starcoder2:3b | ~1.7GB | 4GB 内存 | 轻量级选择 |
| codestral | ~12GB | 16GB 内存 | 最佳效果 |

### 使用技巧

- 输入代码时稍作停顿（约 500ms），Continue 会自动推测后续代码
- 灰色文本为补全建议，按 **Tab** 接受，按 **Esc** 拒绝
- 可以只接受部分补全：按 `Ctrl+Right` 逐词接受
- 连续多次 Tab 可以快速完成一个完整的函数或代码块

### 自定义补全触发模式

```json
{
  "tabAutocompleteSettings": {
    "debounceMs": 500,
    "maxSuffixPercentage": 0.3,
    "useFileSuffix": false
  }
}
```

- `debounceMs`：输入停顿后触发补全的延迟（毫秒）
- `maxSuffixPercentage`：补全可超过当前行尾的比例上限
- `useFileSuffix`：是否使用文件后缀名作为补全参考

## 自定义斜杠命令

通过 Slash Commands，你可以预设常用操作，一键执行。

在配置文件的 `slashCommands` 数组中添加自定义命令：

```json
{
  "slashCommands": [
    {
      "name": "review",
      "description": "审查当前代码的潜在问题",
      "prompt": "请审查以下代码，找出：1) 安全漏洞 2) 性能问题 3) 代码异味。给出具体修改建议和代码示例。"
    },
    {
      "name": "test",
      "description": "为当前代码生成单元测试",
      "prompt": "为以下代码编写全面的单元测试，使用 Jest 框架。包括：正常用例、边界情况、错误处理。"
    },
    {
      "name": "docstring",
      "description": "为当前函数生成注释",
      "prompt": "为以下代码添加详细的 JSDoc/Python docstring 注释，包括参数说明、返回值说明、使用示例。"
    },
    {
      "name": "refactor",
      "description": "重构代码以提高可读性和性能",
      "prompt": "重构以下代码，提高可读性和性能。保持功能不变，遵守语言最佳实践。"
    },
    {
      "name": "explain",
      "description": "用通俗语言解释代码逻辑",
      "prompt": "用简单的语言解释这段代码做了什么、为什么这样做，以及可能的风险。"
    }
  ]
}
```

在聊天输入框中输入 `/` 即可弹出 Slash Commands 列表，选择即可执行。

## Rules 配置

Continue 的 Rules 功能类似于 Cursor 的 `.cursorrules`，用于为 AI 设定全局的编程规范和偏好。

### 全局 Rules（适用于所有项目）

在 Continue 配置文件（`~/.continue/config.json`）中添加 `rules` 字段：

```json
{
  "rules": [
    "使用 TypeScript 严格模式，避免使用 any",
    "React 组件使用函数式组件 + Hooks，不使用 Class 组件",
    "CSS 使用 Tailwind CSS，不使用其他 CSS 框架",
    "所有函数必须有 JSDoc 注释",
    "错误处理使用 try-catch，不忽略任何异常",
    "使用 Prettier 代码格式化，单引号、尾逗号、行宽 100",
    "使用 pnpm 作为包管理器",
    "组件文件名使用 PascalCase，工具函数文件使用 camelCase"
  ]
}
```

### 项目级 Rules

在项目根目录创建 `.continuerc.json` 文件：

```json
{
  "rules": [
    "本项目使用 Vue 3 Composition API + TypeScript",
    "状态管理使用 Pinia，不使用 Vuex",
    "API 请求统一使用 axios 封装在 src/api/ 目录下",
    "页面组件放在 src/pages/ 目录，公共组件放在 src/components/"
  ]
}
```

Rules 会附加到每次对话和补全的上下文中，持续影响 AI 的输出风格和质量。

## MCP Tools 配置

Continue 支持 MCP（Model Context Protocol），允许 AI 直接调用外部工具。MCP 是 Anthropic 提出的开放协议，让 AI 模型能够安全地与外部系统和数据交互。

### 内置 MCP 工具

Continue 自带以下 MCP 工具：

- **阅读文件**：读取项目中的文件内容
- **写入文件**：创建或修改文件
- **终端命令**：在项目目录中执行命令
- **搜索**：在代码库中搜索文本

### 添加自定义 MCP 工具

在配置文件中添加 `mcpTools` 字段：

```json
{
  "mcpTools": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-github-tools"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-postgres-tools", "postgresql://user:pass@localhost:5432/mydb"]
    }
  }
}
```

支持的 MCP 服务器包括：
- **文件系统操作**：读写文件、管理目录
- **数据库查询**：PostgreSQL、SQLite、MySQL 等
- **API 请求**：调用外部 REST API
- **代码分析**：静态分析、Lint 工具
- **Git 操作**：管理代码仓库（需谨慎使用）

## 键盘快捷键速查

| 操作 | VS Code | JetBrains |
|------|---------|-----------|
| 打开/切换聊天面板 | `Ctrl+Shift+I` | `Alt+C` |
| 接受 Tab 补全 | `Tab` | `Tab` |
| 拒绝 Tab 补全 | `Esc` | `Esc` |
| 输入中触发补全 | `Alt+\` | `Alt+\` |
| 选中代码发送到聊天 | 选中后按 `Ctrl+Shift+L` | 选中后按 `Alt+Shift+L` |
| 快速提问 | `Ctrl+Shift+K` | `Alt+Shift+K` |
| 打开 Continue 配置 | `Ctrl+Shift+P` > Continue: Open Config | `Alt+C` > Settings |

## 常见问题

**Q：本地运行模型时补全速度慢怎么办？**

A：选择更小的模型（如 `deepseek-coder:1.3b` 替代 `6.7b`），或在配置中降低 `debounceMs` 值。也可以使用 GPU 加速（Ollama 自动支持 CUDA）。

**Q：如何让 Continue 忘记当前对话？**

A：点击聊天面板顶部的"新建对话"按钮（"+"/"New Chat"），或按 `Ctrl+Shift+I` 两次重新打开。

**Q：能否同时使用多个模型？**

A：可以。在 `models` 数组中添加多个模型配置，聊天时左下角可切换当前使用的模型。

**Q：Continue 和 Cursor / Copilot 有什么区别？**

A：Continue 完全开源且数据可控（可本地化部署），支持任意 LLM 后端；Cursor 基于 VS Code 分支深度集成 AI；Copilot 依赖 GitHub 生态且仅支持 OpenAI 系列模型。
