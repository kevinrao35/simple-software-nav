---
title: System Prompts Leaks 使用教程：探秘 AI 背后的指令
software: System Prompts Leaks
softwareSlug: system-prompts-leaks
difficulty: beginner
category: AI 提示词
order: 14
description: "通过查看各大 AI 的系统提示词，学会写出更有效的 AI 提示词。"
---

## 项目说明

System Prompts Leaks 是一个在 GitHub 上持续更新的开源知识库项目，专门收集、整理各大 AI 模型的系统提示词（System Prompts）。这些系统提示词是 AI 厂商在模型底层设定的核心指令，决定了 AI 的行为模式、能力边界、内容限制和交互风格。

> **项目地址**：[github.com/asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)

该项目因收集了 Claude、ChatGPT、Gemini、Grok 等主流 AI 的系统提示词，曾被《华盛顿邮报》（The Washington Post）等主流媒体报道，成为 AI 社区中了解"AI 如何被设定"的重要参考资料。

**重要说明**：这不是一个可安装的软件或应用，而是一个学习资料库。你只需要浏览器或 Markdown 阅读器即可浏览全部内容。

## 仓库结构浏览

克隆或访问 GitHub 仓库后，你会看到以下目录结构：

```
system_prompts_leaks/
├── README.md               # 项目说明和导航
├── claude/                 # Anthropic Claude 系列提示词
│   ├── claude-3-opus.md
│   ├── claude-3-sonnet.md
│   ├── claude-3-haiku.md
│   └── claude-4.md
├── chatgpt/                # OpenAI ChatGPT 系列
│   ├── gpt-4.md
│   ├── gpt-4-turbo.md
│   ├── gpt-4o.md
│   └── custom-instructions.md
├── gemini/                 # Google Gemini
│   └── gemini-pro.md
├── cursor/                 # Cursor IDE
│   └── cursor-system-prompt.md
├── devin/                  # Devin AI 工程师
│   └── devin-prompt.md
├── copilot/                # GitHub Copilot
│   └── copilot-chat.md
├── grok/                   # xAI Grok
│   └── grok-system-prompt.md
├── perplexity/             # Perplexity AI
│   └── perplexity-prompt.md
└── others/                 # 其他 AI 产品
    ├── pi-ai.md
    └── ...
```

目录结构清晰地按 AI 产品和版本分类，每个 Markdown 文件对应一个已知的系统提示词版本。

## 如何查看特定 AI 的系统提示词

### 方式一：直接在 GitHub 上查看

1. 打开仓库页面：[github.com/asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)
2. 点击对应 AI 公司的文件夹（例如 `claude/`）
3. 点击对应的版本文件（例如 `claude-4.md`）
4. GitHub 会自动渲染 Markdown 文件，内容一目了然

### 方式二：克隆到本地查看

```bash
git clone https://github.com/asgeirtj/system_prompts_leaks.git
cd system_prompts_leaks
```

然后用任何文本编辑器或 Markdown 阅读器打开对应文件即可。

### 方式三：不克隆仓库，直接下载单个文件

如果你只想看某个特定 AI 的提示词，可以直接在 GitHub 上打开文件后点击"Raw"按钮，或使用 `wget` 下载：

```bash
wget https://raw.githubusercontent.com/asgeirtj/system_prompts_leaks/main/claude/claude-4.md
```

## 学习价值

通过阅读这些系统提示词，你可以获得以下方面的深刻洞察：

### 1. 了解 AI 的角色设定

每个 AI 厂商都会为模型设定一个"人格角色"。例如：

- **Claude** 被设定为"乐于助人、无害且诚实的助手"，强调避免输出有害内容
- **ChatGPT** 被设定为"有帮助、友好且中立的 AI 助手"，强调事实准确性
- **Grok** 被设定为"带有幽默感和叛逆精神"，语气更加随意和直接
- **Gemini** 被设定为"有用且安全的 AI"，强调信息来源的透明性

### 2. 了解 AI 的行为限制

系统提示词中包含了详细的限制规则：

- **内容审核规则**：拒绝生成暴力、色情、违法内容的具体定义
- **信息时效性**：知识截止日期、是否启用搜索功能
- **身份声明**：如何回答"你是谁""谁创造了你"这类问题
- **幻觉抑制**：如何在不确定时表达"我不知道"

### 3. 了解输出格式规范

系统提示词会定义 AI 的回复格式：

- **结构要求**：是否使用 Markdown、标题层级、列表格式
- **长度限制**：回答的最大 Token 数或字数
- **语气风格**：正式/友好/专业/口语化
- **多语言策略**：中文环境下的输出偏好

### 4. 了解敏感内容处理策略

每个 AI 对敏感话题的处理方式各不相同：

- **政治敏感话题**：如何回应，哪些可以讨论，哪些需要拒绝
- **医疗/法律建议**：是否提供 disclaimer（免责声明）
- **个人隐私**：如何处理用户提供的个人信息
- **伦理边界**：哪些请求会被判定为不道德而拒绝

## 提示工程要点

从这些系统提示词中，可以梳理出以下提示工程的关键原则：

### 角色设定技巧

观察 Claude 和 ChatGPT 的系统提示词，可以发现：

```
你是一个[角色]，擅长[领域]...你必须遵守[规则]...
```

这种"角色 + 能力 + 约束"的三段式结构是最有效的系统提示模板。在你自己编写提示词时，可以仿照这种结构。

### 规则编写方法

有效的规则通常具备以下特征：

1. **具体明确**：不说"要友善"，而是"不要使用攻击性语言"
2. **可操作性强**：不说"回答要详细"，而是"回答不少于 200 字，包含具体示例"
3. **边界清晰**：明确什么是允许的、什么是不允许的
4. **优先级明确**：规定规则冲突时的处理顺序

### 输出格式控制

从各 AI 的系统提示词可以看到，输出格式通常采用以下方法控制：

```
请使用 Markdown 格式回答。
使用 ## 和 ### 作为标题层级。
重要术语使用 **加粗**。
代码块使用 ```language 标记。
```

在编写自己的提示词时，明确指定输出格式可以显著提升结果质量。

### 上下文管理

系统提示词中最精妙的设计之一是上下文管理策略：

- **简短的系统提示**：ChatGPT 早期的系统提示很短，给予模型更大的自由度
- **详细的系统提示**：Claude 的提示词非常详细，精确定义每个场景的行为
- **在系统提示中嵌入示例**：部分 AI 在提示词中给出了 Few-shot 示例

## 如何参与贡献

该项目欢迎社区贡献，具体方式如下：

### 提交新的提示词

如果你发现某个 AI 模型的系统提示词尚未收录，或发现了更新版本：

1. Fork 该仓库
2. 在对应目录下创建新的 Markdown 文件
3. 提交 Pull Request

### 更新现有内容

AI 厂商经常更新系统提示词，如果发现内容已过时：

1. 在 GitHub Issues 中提交更新请求
2. 或直接提交 Pull Request 更新文件

### 注意事项

- 提示词来源需要注明出处（如来源 URL）
- 确保内容与原始提示词一致，不要添加个人解读
- 涉及版权的部分请遵守合理使用（Fair Use）原则

## 常见问题

**Q：这些系统提示词是官方公开的吗？**

A：大部分不是官方公开的。它们是通过各种方式——包括逆向工程、模型行为推理、信息泄露等——收集而来。部分提示词已经得到 AI 模型自身输出的印证。

**Q：这些提示词准确吗？**

A：大部分经过多次验证，准确性较高。但由于 AI 模型经常更新，部分提示词可能已经过时。建议结合最新版本参考。

**Q：我可以直接复制这些系统提示词来使用吗？**

A：可以学习其中的结构和技巧，但不建议直接复制。因为这些提示词是专门为对应模型设计的，你的 API 调用有自己的系统提示词接口，你可以基于这些公开提示词来设计自己的系统提示。

**Q：看这些系统提示词对写自己的提示词有帮助吗？**

A：非常有帮助。这是最直接的学习素材——你可以看到专业团队是如何设计 AI 行为准则的，包括角色设定、规则编写、边界定义、输出格式控制等，这些技巧都可以迁移到你自己的提示词编写中。
