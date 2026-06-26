---
title: Skills 完整使用教程：AI 编码技能速通
software: Skills
softwareSlug: mattpocock-skills
difficulty: beginner
category: 开发者工具
order: 12
description: "手把手教你把 mattpocock 的 143k 星标技能集成到 Claude Code / Cursor，AI 编码效率翻倍。"
---

## 什么是 Matt Pocock Skills

Matt Pocock Skills 是由知名 TypeScript 专家、前端教育者 **Matt Pocock**（mattpocock.com）维护的一套 AI 编码代理技能集合。GitHub 上拥有 140k+ star，是 AI 编码提示工程领域最受欢迎的开源项目之一。项目地址：**github.com/mattpocock/skills**。

这套技能包的核心价值不在于"自动完成编码"，而在于**教会你如何编写高质量的 AI 提示词**。每个技能文件都是一份精心设计的提示工程模板，覆盖 React 组件开发、TypeScript 类型安全、Node.js API 编写、测试生成、代码审查等常见开发场景。

## 安装方法

### 方式一：git clone（安装全部技能）

```bash
# 在项目根目录创建 .claude/skills/ 目录
mkdir -p .claude/skills

# 克隆技能仓库
git clone https://github.com/mattpocock/skills.git /tmp/mattpocock-skills

# 复制所有技能文件到项目目录
cp -r /tmp/mattpocock-skills/skills/* .claude/skills/

# 清理临时文件
rm -rf /tmp/mattpocock-skills
```

### 方式二：选择性安装（推荐新手）

先浏览仓库中的技能列表，只复制你需要的技能：

```bash
mkdir -p .claude/skills

# 下载并只复制 TypeScript 和 React 相关技能
cd /tmp
git clone --depth 1 https://github.com/mattpocock/skills.git
cp skills/typescript.md /your-project/.claude/skills/
cp skills/react.md /your-project/.claude/skills/
cp skills/testing.md /your-project/.claude/skills/
```

### 方式三：手动复制

如果你不想使用命令行，也可以：
1. 浏览器打开 **github.com/mattpocock/skills**
2. 进入 `skills/` 目录
3. 逐个打开需要的 `.md` 文件，点击 "Raw" 按钮
4. 复制全部内容
5. 在项目本地的 `.claude/skills/` 目录下创建同名文件并粘贴

### 验证安装

```bash
ls .claude/skills/
```

如果看到 `typescript.md`、`react.md`、`testing.md`、`node.md` 等文件，说明安装成功。启动 Claude Code 或 Cursor 即可自动加载。

## 使用方法

### 在 Claude Code 中使用

安装完成后，技能会自动激活，无需额外配置：

1. 在项目目录启动 Claude Code：`claude`
2. AI 会自动扫描 `.claude/skills/` 目录并加载所有技能
3. 开始对话时，AI 会根据上下文自动匹配并应用相关技能

**示例**：如果你想编写一个 React 自定义 Hook，直接描述需求：

```
你：帮我创建一个 useLocalStorage hook，支持类型参数
```

AI 会自动加载 `react.md` 和 `typescript.md` 中的提示模板，生成代码时自动遵循 TypeScript 最佳实践、React Hook 规则、以及类型安全约定。

### 在 Cursor 中使用

1. 同样将技能文件放入项目根目录的 `.claude/skills/` 下
2. Cursor 的 AI 引擎会自动识别并加载
3. 在 Chat 面板中正常对话即可享受技能增强

## 核心技能详解

### TypeScript 技能（typescript.md）

聚焦 TypeScript 类型安全和高级类型编程：

- **类型推断优化**：提示 AI 优先使用类型推断而非显式注解，减少冗余代码
- **泛型约束**：指导 AI 正确使用 `extends`、`keyof`、`infer` 等泛型关键字
- **类型守卫**：自动生成用户自定义类型守卫（type predicates）
- **模板字面量类型**：在字符串处理场景中推荐模板字面量类型
- **实用类型工具**：善用 `Partial<T>`、`Required<T>`、`Pick<T, K>`、`Omit<T, K>` 等内置工具类型

### React 技能（react.md）

面向现代 React 开发的提示模板，覆盖：

- **组件设计**：函数组件 vs 类组件的选择建议
- **Hook 规则**：确保生成的代码遵守 Hooks 调用规则
- **状态管理**：`useState`、`useReducer`、`useContext` 的合理使用场景
- **性能优化**：`useMemo`、`useCallback`、`React.memo` 的使用指导
- **自定义 Hooks**：提取可复用的逻辑到自定义 Hooks
- **Suspense 边界**：加载状态和错误边界的处理

### Node.js API 技能（node.md）

面向服务端开发的提示模板：

- **路由设计**：RESTful API 的路由组织方式
- **中间件模式**：错误处理、认证、日志中间件的结构
- **输入验证**：使用 Zod 或 Joi 进行请求参数验证
- **数据库操作**：ORM 查询优化和事务处理
- **错误处理**：统一的错误响应格式和全局异常捕获

### 测试技能（testing.md）

涵盖主流测试框架的最佳实践：

- **单元测试**：使用 Vitest/Jest 编写隔离良好的单元测试
- **组件测试**：React Testing Library 的渲染和交互测试
- **Mocking 策略**：合理的模拟策略，避免过度 Mock
- **覆盖率**：指导 AI 关注有意义的分支覆盖而非数字游戏
- **集成测试**：API 端到端的集成测试编写

### 代码审查技能（review.md）

代码审查的 AI 提示模板：

- **逻辑审查**：检查边界条件和异常路径处理
- **类型安全**：避免 `any`、未使用的类型断言等问题
- **代码风格**：一致性和项目规范的遵守情况
- **可维护性**：模块划分和职责单一原则的遵守

## 与 .cursorrules 配合使用

Matt Pocock Skills 与 `.cursorrules` 文件可以形成互补：

**.cursorrules** 定义项目的全局规则（技术栈、命名规范、架构约定），是静态配置。

**Skills** 是动态的提示模板，在 AI 执行具体任务时提供精细化的行为指导。

推荐组合方式：

1. 在 `.cursorrules` 中声明项目的技术栈和通用规则：

```markdown
你是一个专业的 TypeScript 开发者。项目使用 React 18、Next.js 14、Prisma ORM。
遵循函数式编程风格，优先使用不可变数据。
```

2. 在 `.claude/skills/` 中放置 Matt Pocock 的技能文件，提供具体的任务级提示

这样 AI 既能理解项目的全局约束，又能在具体任务中应用 TypeScript、React 的最佳实践。

## 学习价值：如何编写高质量 AI 提示词

Matt Pocock Skills 的最大价值在于**教学意义**。通过阅读这些技能文件，你可以学习到提示工程的核心技巧：

### 角色设定的艺术

```markdown
## Role
You are a senior TypeScript engineer with deep expertise in type-level programming.
```

技能文件通过精确定义 AI 的角色，大幅提升输出质量。你可以学到如何为不同任务设定合适的角色描述。

### 约束条件的力量

```markdown
## Guidelines
- Never use `any` — prefer `unknown` and type narrowing
- Always provide explicit return types for public API functions
- Prefer type inference for internal variables
```

好的约束条件能有效消除 AI 输出的常见问题。

### 示例驱动

每个技能文件都包含代码示例，这告诉 AI 你期望的输出风格和质量水平。通过研究这些示例的写法，你可以学会如何在自己的提示中有效地使用示例。

## 个性化修改指南

Matt Pocock 的技能文件采用 MIT 协议开源，你可以自由修改：

### 调整 React 技能适配你的项目

编辑 `.claude/skills/react.md`，将通用规则替换为你的项目约定：

- 将默认的 CSS 方案改为你的选择（Tailwind / CSS Modules / styled-components）
- 添加你项目中的组件命名规范（如文件名大驼峰、组件名大驼峰）
- 指定你使用的组件库（Ant Design / shadcn/ui / MUI）

### 定制测试策略

编辑 `.claude/skills/testing.md`：

- 将测试框架改为项目实际使用的（Vitest / Jest / Playwright）
- 添加覆盖率阈值要求
- 指定 Mock 策略（如统一使用 `vi.mock` 而非 `jest.mock`）

### 创建你自己的技能

参考 Matt Pocock 的模板结构，你可以创建项目专属的技能文件：

```markdown
# [你的技能名称]

You are a [角色描述].

## Skills
[详细描述该技能的职责和包含的具体能力]

## Constraints
[列出 AI 必须遵守的约束条件]

## Output Format
[描述输出格式要求]
```

创建后保存为 `.claude/skills/你的技能名.md`，AI 会自动加载。

## 最佳实践

1. **从少到多**：初学者建议先安装 3-5 个核心技能（TypeScript、React、Testing），熟悉后再扩展
2. **版本管理**：将 `.claude/skills/` 提交到 Git 仓库，团队共享一套技能配置
3. **定期更新**：Matt Pocock 经常更新技能文件，定期从上游仓库拉取更新
4. **组合使用**：多个技能会同时生效，如同时加载 TypeScript 和 React 技能，开发 React 组件时会自动应用 TypeScript 类型安全约束
5. **持续改进**：根据实际使用效果不断调整技能文件中的约束条件和角色设定
