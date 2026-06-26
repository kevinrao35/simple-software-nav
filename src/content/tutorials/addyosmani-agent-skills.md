---
title: Agent Skills 使用教程：Google 工程师的 AI 工作流
software: Agent Skills
softwareSlug: addyosmani-agent-skills
difficulty: intermediate
category: 开发者工具
order: 13
description: "从零开始集成 Addy Osmani 的工程级 AI 技能，让你的开发流程跟 Google 工程师一样规范。"
---

## 什么是 Agent Skills

Agent Skills 是由 Google Chrome 工程主管 **Addy Osmani** 开源的一套 AI 编码代理技能包。它包含 **8 个斜杠命令** 和 **24 个独立技能文件**，专为 Claude Code、Cursor 等 AI 编码工具设计。项目地址：**github.com/addyosmani/agent-skills**。

每个技能是一个 `.md` 文件，放置在 `.claude/skills/` 目录下，AI 编码工具会自动读取并激活对应能力。这套技能包将 Google 工程师的代码审查、测试编写、重构、安全检查等工程实践，直接转化为 AI 可以执行的提示指令。

## 安装方法

### 方式一：git clone（推荐）

在项目根目录执行：

```bash
# 在项目根目录下创建 .claude/skills/ 目录（如不存在）
mkdir -p .claude/skills

# 将 agent-skills 仓库克隆到临时位置
git clone https://github.com/addyosmani/agent-skills.git /tmp/agent-skills

# 复制所有技能文件到项目的 .claude/skills/ 目录
cp -r /tmp/agent-skills/skills/* .claude/skills/

# 清理临时文件
rm -rf /tmp/agent-skills
```

### 方式二：直接复制（只需部分技能）

```bash
# 创建目录
mkdir -p .claude/skills

# 手动将你需要的 .md 技能文件复制到该目录
# 例如只复制代码审查和测试相关技能
cp /path/to/downloaded/review.md .claude/skills/
cp /path/to/downloaded/test.md .claude/skills/
cp /path/to/downloaded/refactor.md .claude/skills/
```

### 验证安装

安装完成后，检查目录结构是否正确：

```bash
ls .claude/skills/
```

如果看到 `review.md`、`test.md`、`refactor.md`、`security.md` 等文件，说明安装成功。打开 Claude Code 或 Cursor，AI 会自动加载这些技能。

## 8 个斜杠命令详解

斜杠命令是 Agent Skills 的核心交互方式。在 Claude Code 中输入以下命令即可激活对应技能：

### /review —— 代码审查

对当前文件或选中代码进行全面的代码审查，检查内容包括：
- 代码逻辑正确性和边界条件
- 性能瓶颈和优化机会
- 可读性和命名规范
- 潜在的 bug 和反模式
- 安全漏洞风险

使用方法：在 Claude Code 中打开一个文件，输入 `/review` 即可获得逐行审查意见。

### /test —— 测试生成

为选中的函数或模块自动生成单元测试：
- 根据函数签名和实现逻辑推断测试用例
- 覆盖正常路径、边界条件和异常情况
- 输出测试框架代码（支持 Vitest、Jest、Playwright 等）
- 包含测试描述和断言说明

### /refactor —— 代码重构

提供重构建议并自动执行重构：
- 识别可提取为独立函数/模块的代码块
- 建议设计模式改进（如策略模式替代大量 if-else）
- 简化复杂条件逻辑
- 消除重复代码（DRY 原则）
- 保持前后行为一致

### /security —— 安全检查

对代码进行安全审计，重点检查：
- SQL 注入和 NoSQL 注入风险
- XSS（跨站脚本攻击）漏洞
- CSRF（跨站请求伪造）防护
- 敏感信息硬编码（API Key、密码等）
- 不安全的依赖版本
- 输入验证缺失

### /perf —— 性能优化

分析和优化代码性能：
- 识别 O(n^2) 及以上复杂度的算法
- 发现不必要的重复计算
- 建议缓存策略（ memoization、Redis 等）
- 分析数据库查询效率
- 识别内存泄漏风险

### /deps —— 依赖管理

检查项目依赖状态：
- 列出过时的依赖包
- 识别存在已知 CVE 的依赖
- 建议版本升级路径
- 检测冗余和未使用的依赖
- 分析依赖树中的冲突

### /docs —— 文档生成

为代码自动生成文档：
- 为函数和类生成 JSDoc / TSDoc 注释
- 生成 README 片段的 API 说明
- 为复杂的业务逻辑添加行内注释
- 保持文档与代码同步更新

### /arch —— 架构分析

分析项目架构和模块间关系：
- 绘制模块依赖图（文本描述）
- 识别循环依赖
- 评估模块内聚性和耦合度
- 建议目录结构调整
- 检查是否违反分层架构原则

## 24 个技能文件结构

安装后，`.claude/skills/` 目录下会包含以下技能文件分组：

**代码质量**：`review.md`、`refactor.md`、`lint.md`、`complexity.md`、`style.md`

**测试**：`test.md`、`coverage.md`、`mocking.md`、`e2e.md`、`fixtures.md`

**安全**：`security.md`、`auth.md`、`sanitize.md`、`secrets.md`、`crypto.md`

**性能**：`perf.md`、`bundle.md`、`cache.md`、`lazy.md`、`metrics.md`

**工程**：`deps.md`、`docs.md`、`arch.md`、`ci.md`

每个文件是一个 Markdown 文件，内容遵循固定模板：角色定义（Role）、技能描述（Skill）、约束条件（Constraints）、输出格式（Output Format）。你可以直接阅读和修改这些文件来调整 AI 行为。

## 在 Claude Code 中使用

1. 确保技能文件已放置在项目的 `.claude/skills/` 目录
2. 启动 Claude Code：在终端中运行 `claude` 命令
3. 加载技能：Claude Code 启动时会自动扫描 `.claude/skills/` 目录，加载所有技能文件
4. 使用斜杠命令：在对话中输入 `/review`、`/test` 等命令即可激活对应技能
5. 结合上下文：可以先描述需求，再使用斜杠命令精确定位要执行的技能

示例工作流：

```
你：我想审查一下 src/auth/login.ts 的代码
Claude：好的，我来查看这个文件...
你：/review
Claude：[执行代码审查，返回审查意见...]
你：/security
Claude：[执行安全检查，返回安全隐患...]
```

## 在 Cursor 中使用

Cursor 同样支持 `.claude/skills/` 目录：
1. 将技能文件放入项目根目录的 `.claude/skills/` 下
2. 在 Cursor 的 Chat 面板中，AI 会自动加载这些技能
3. 在聊天中输入斜杠命令（如 `/review`）即可激活
4. 也可以在选中代码后右键选择对应技能

## 自定义和修改技能

Agent Skills 的每个文件都是纯文本 Markdown，你可以自由修改：

### 调整代码审查标准

编辑 `.claude/skills/review.md`，在 Constraints 部分添加你的团队规范：

```markdown
## Constraints
- 变量命名必须遵循 camelCase
- 函数长度不超过 50 行
- 优先使用函数式组件而非类组件
- 所有 API 调用必须有错误处理
```

### 定制测试框架

编辑 `.claude/skills/test.md`，指定你使用的测试工具：

```markdown
## Preferences
- 测试框架：Vitest
- 断言风格：expect
- 覆盖率阈值：80%
- Mock 库：vi.mock()
```

### 添加自定义斜杠命令

你也可以创建自己的技能文件，命名格式为 `你的命令名.md`，内容参考现有文件模板。创建后 AI 会自动识别新的斜杠命令。

## 技能文件模板说明

每个技能文件的标准结构如下：

```markdown
# 技能名称

## Role
定义 AI 在执行该技能时应扮演的角色，如"资深代码审查工程师"。

## Skills
描述该技能的详细能力范围和执行步骤。

## Constraints
约束条件和规则，AI 必须遵守的限制。

## Output Format
指定输出结果的格式，如 Markdown 表格、列表、带代码块的报告等。
```

理解这个结构后，你就能自己编写高质量技能文件了。

## 最佳实践

1. **按需安装**：不需要一次安装全部 24 个技能，按项目阶段选择需要的能力
2. **团队统一**：团队使用同一套技能文件，保证代码质量标准的统一性
3. **版本控制**：将 `.claude/skills/` 纳入 Git 版本管理，方便团队同步和追溯修改历史
4. **持续更新**：定期从上游仓库拉取更新，获取最新的技能优化
5. **组合使用**：将多个斜杠命令组合使用效果更好，如先 `/review` 再 `/refactor`
