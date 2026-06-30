---
title: Voicebox 使用教程：免费本地 AI 语音工作室
software: Voicebox
softwareSlug: voicebox
difficulty: intermediate
category: AI 语音工具
order: 8
description: "7 种 TTS 引擎、语音克隆、全局听写、多轨故事编辑、MCP 集成——全本地运行的开源 ElevenLabs 替代品。"
---

## 下载与安装

1. 打开官网 **voicebox.sh** 或 GitHub 仓库 **github.com/jamiepine/voicebox**。
2. 下载对应版本：
   - **macOS (Apple Silicon)**：DMG 安装包
   - **macOS (Intel)**：DMG 安装包
   - **Windows**：MSI 安装包
   - **Linux**：需从源码构建
3. 双击安装，首次启动会自动下载需要的模型。

Voicebox 由 Jamie Pine（也是开源文件管理器 Spacedrive 的作者）开发，定位是 **本地优先的 AI 语音工作室**，是 ElevenLabs 和 WisprFlow 的免费开源替代品。

## TTS 引擎：7 种可选

Voicebox 内置 7 种 TTS 引擎，可在生成时自由切换：

| 引擎 | 语言 | 特点 |
|------|------|------|
| **Qwen3-TTS** (0.6B / 1.7B) | 10 种 | 高质量多语言克隆，支持"说慢点""小声说"等自然语言指令 |
| **Qwen CustomVoice** | 10 种 | 9 个预设声音，自然语言控制语调 |
| **LuxTTS** | 英文 | 轻量级，48kHz 输出，CPU 可跑 |
| **Chatterbox Multilingual** | 23 种 | 覆盖阿拉伯语/丹麦语/芬兰语/希腊语/希伯来语/印地语/马来语/挪威语/波兰语/斯瓦希里语/瑞典语/土耳其语等 |
| **Chatterbox Turbo** | 英文 | 350M 快速模型，支持情感标签 |
| **TADA (HumeAI)** (1B / 3B) | 10 种 | 语音语言模型，700 秒+连贯音频 |
| **Kokoro** | 8 种 | 50 个预设声音，82M 极小模型，CPU 飞快 |

> 中文内容推荐使用 **Qwen3-TTS**，效果最好。

## 语音克隆

- **零样本克隆**：几秒音频即可克隆声音
- **多样本支持**：多个音频样本可提升克隆质量
- **50+ 预设声音**（Kokoro + Qwen CustomVoice）
- 支持导入音频文件或直接在应用内录制
- 支持导入/导出声音配置

## 后期处理效果

Voicebox 内置 8 种音效，基于 Spotify 的 pedalboard 库：

1. **音高调整**（Pitch Shift）— ±12 半音
2. **混响**（Reverb）— 可调房间大小/阻尼/干湿比
3. **延迟**（Delay）— 可调时间/反馈/混音
4. **合唱/镶边**（Chorus / Flanger）
5. **压缩器**（Compressor）
6. **增益**（Gain）— -40 到 +40 dB
7. **高通滤波** — 去除低频
8. **低通滤波** — 去除高频

内置 4 个预设效果：Robotic、Radio、Echo Chamber、Deep Voice。效果可绑定到每个声音配置作为默认。

## Stories 编辑器：多轨故事编排

Voicebox 内置多轨故事编辑器，用于多角色对话、播客、有声书制作：

1. 在 Stories 编辑器中创建项目。
2. 为每个角色分配声音配置。
3. 拖拽排列各个角色的对话轨道。
4. 支持裁剪和分割音频片段。
5. 每个片段可单独切换不同版本（Original / Effects / Takes）。
6. 自动同步播放。

## 全局听写

Voicebox 支持系统级听写：

- **按键说话模式**：按住快捷键说话，松开即停止
- **点击切换模式**：按一下开启，再按一下关闭
- **快捷键可自定义**
- macOS 支持无障碍注入，自动粘贴到当前输入框
- 浮窗显示录制/转写/优化/播放状态

## Captures 录音管理

每一次听写、应用内录音、上传的音频文件都会收集在 Captures 中：

- 回放和重新转写（可选不同 Whisper 模型大小）
- 通过本地 LLM 优化文本（清理语气词、修正自我纠正）
- 可以直接作为声音样本用于克隆
- 一键"以该声音播放"

## 语音人格（Personalities）

Voicebox 内置了本地 LLM（Qwen3 0.6B/1.7B/4B），可以做两件事：

- **Compose**：根据人格描述自动生成一句话
- **Speak in character**：输入文字先经过 LLM 改写，再转语音

## MCP 集成（AI 助手语音输出）

Voicebox 支持 MCP 协议，AI 编程助手可以直接调用它说话：

```bash
# Claude Code 一键添加
claude mcp add voicebox --transport http --url http://127.0.0.1:17493/mcp --header "X-Voicebox-Client-Id: claude-code"
```

Cursor、Windsurf、VS Code 等也支持配置连接。配置后 AI 可以：
- 用克隆的声音读出代码注释
- 用特定人格音色回答
- 批量生成语音内容

## REST API

Voicebox 在 `http://127.0.0.1:17493` 提供 REST API：

- `POST /generate` — 生成语音（text, profile_id, language）
- `POST /speak` — 文字转语音
- `POST /transcribe` — 转写音频
- `GET /profiles` — 列出声音配置

## GPU 加速

| 平台 | 后端 |
|------|------|
| macOS (Apple Silicon) | MLX (Metal)，神经引擎加速 4-5 倍 |
| Windows/Linux (NVIDIA) | CUDA |
| Linux (AMD) | ROCm |
| Windows (任意 GPU) | DirectML |
| Intel Arc | IPEX/XPU |
| 纯 CPU | 可用，较慢 |

## 常见问题

### 和 ElevenLabs 比怎么样？

Voicebox 在功能丰富度上甚至超过 ElevenLabs 免费版——7 种引擎、MCP 集成、Stories 编辑器、8 种音效都是 ElevenLabs 没有的。语音质量方面，Qwen3-TTS 在中文上表现很好。主要差距在英文顶尖音质和声音市场生态。

### 支持中文吗？

支持。Qwen3-TTS 原生支持中文效果最好，Kokoro 也覆盖中文。Chatterbox Multilingual 支持 23 种语言但不包括中文，所以做中文内容用 Qwen3 引擎。

### 需要多强的显卡？

- macOS Apple Silicon 体验最好（MLX 原生支持）
- NVIDIA 显卡 4GB+ 显存可流畅运行
- 纯 CPU 也能跑，但生成速度较慢

### 生成不限长度？

不限长度。Voicebox 会自动在句子边界切分并做交叉淡入淡出。单次最多 50,000 字符，跨段长度无限制。

### macOS 听写有时无法自动粘贴？

Windows 和 Linux 的自动粘贴还在开发中（Roadmap 中）。macOS 上需要授予 Accessibility 和 Input Monitoring 权限。如果自动粘贴不工作，手动粘贴即可。
