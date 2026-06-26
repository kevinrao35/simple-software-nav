#!/usr/bin/env node
// Generate software + tutorial markdown files from topic library data
const fs = require('fs');
const path = require('path');

const SOFTWARE_DIR = path.join(__dirname, 'src', 'content', 'software');
const TUTORIALS_DIR = path.join(__dirname, 'src', 'content', 'tutorials');

// Order: software displayed in sequence. 选题库 items, excluding already-published
// (OpenCut #4, Voicebox #5, Agent-Reach #6)
const items = [
  {
    slug: 'mattpocock-skills',
    name: 'Skills',
    enName: 'Skills for Real Engineers',
    category: 'AI 工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: 'AI 编码技能',
    rating: 4.5,
    website: 'github.com/mattpocock/skills',
    github: 'mattpocock/skills',
    size: '~5MB',
    order: 12,
    tags: ['免费软件, 开源, AI工具, 开发者工具'],
    summary: 'mattpocock 出品的 AI 编码代理技能集合，143k 星标，本周增长最快。',
    features: [
      '**精选技能库**：覆盖 React、TypeScript、Node.js、Testing、Code Review 等常用开发场景',
      '**持续更新**：mattpocock 本人维护，跟随 AI 编码工具升级',
      '**开箱即用**：复制粘贴到 Claude Code / Cursor 即可生效',
      '**MIT 协议**：完全开源免费，可自由修改分发'
    ],
    tutorial: {
      title: 'Skills 完整使用教程：AI 编码技能速通',
      desc: '手把手教你把 mattpocock 的 143k 星标技能集成到 Claude Code / Cursor，AI 编码效率翻倍。',
      difficulty: 'beginner',
      category: '开发者工具',
    }
  },
  {
    slug: 'addyosmani-agent-skills',
    name: 'Agent Skills',
    enName: 'Agent Skills by Addy Osmani',
    category: 'AI 工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: '工程级 AI 技能',
    rating: 4.5,
    website: 'github.com/addyosmani/agent-skills',
    github: 'addyosmani/agent-skills',
    size: '~3MB',
    order: 13,
    tags: ['免费软件, 开源, AI工具, 工程师'],
    summary: 'Google 工程师出品的工程级 AI 代理技能包，含 8 个斜杠命令 + 24 个技能。',
    features: [
      '**8 个斜杠命令**：从代码审查到测试生成，覆盖工程全流程',
      '**24 个技能**：代码质量、安全、性能、可维护性全方位',
      '**Google 工程实践**：作者是 Google Chrome 团队工程主管',
      '**与 Claude Code 深度集成**：直接复制 .claude/ 目录使用'
    ],
    tutorial: {
      title: 'Agent Skills 使用教程：Google 工程师的 AI 工作流',
      desc: '从零开始集成 Addy Osmani 的工程级 AI 技能，让你的开发流程跟 Google 工程师一样规范。',
      difficulty: 'intermediate',
      category: '开发者工具',
    }
  },
  {
    slug: 'system-prompts-leaks',
    name: 'System Prompts Leaks',
    enName: 'System Prompts Leaks',
    category: 'AI 工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: 'AI 系统提示词库',
    rating: 4.0,
    website: 'github.com/asgeirtj/system_prompts_leaks',
    github: 'asgeirtj/system_prompts_leaks',
    size: '~2MB',
    order: 14,
    tags: ['免费软件, 开源, AI工具, 提示词'],
    summary: '各大 AI 模型系统提示词泄露合集，被华盛顿邮报报道。',
    features: [
      '**收录全面**：Claude、ChatGPT、Gemini、Cursor、Devin 等主流 AI 系统提示词',
      '**持续更新**：AI 模型更新时同步跟进',
      '**学习价值**：了解 AI 是如何被提示的，写出更好的提示词',
      '**媒体关注**：被华盛顿邮报等媒体报道'
    ],
    tutorial: {
      title: 'System Prompts Leaks 使用教程：探秘 AI 背后的指令',
      desc: '通过查看各大 AI 的系统提示词，学会写出更有效的 AI 提示词。',
      difficulty: 'beginner',
      category: 'AI 提示词',
    }
  },
  {
    slug: 'continue',
    name: 'Continue',
    enName: 'Continue',
    category: 'AI 工具',
    price: '完全免费',
    openSource: true,
    platforms: ['VS Code', 'JetBrains', '终端'],
    alt: '开源 AI 编程助手',
    rating: 4.5,
    website: 'github.com/continuedev/continue',
    github: 'continuedev/continue',
    size: '~50MB',
    order: 15,
    tags: ['免费软件, 开源, AI工具, 编程助手, 开发者'],
    summary: '开源 AI 编码代理，支持 VS Code + JetBrains + CLI 三种模式。',
    features: [
      '**VS Code / JetBrains 插件**：无缝集成到现有 IDE',
      '**支持任意 LLM**：OpenAI、Anthropic、本地 Ollama 都可以',
      '**代码补全 + 对话**：Tab 补全 + 侧边栏对话',
      '**完全开源**：Apache 2.0 协议，数据本地化'
    ],
    tutorial: {
      title: 'Continue 使用教程：开源 AI 编程助手完整指南',
      desc: '从安装到高级用法，手把手教你用 Continue 提升编码效率。',
      difficulty: 'intermediate',
      category: 'AI 编程',
    }
  },
  {
    slug: 'umi-ocr',
    name: 'Umi-OCR',
    enName: 'Umi-OCR',
    category: '办公效率',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows'],
    alt: '1Password',
    rating: 4.5,
    website: 'github.com/hiroi-sora/Umi-OCR',
    github: 'hiroi-sora/Umi-OCR',
    size: '~100MB',
    order: 16,
    tags: ['免费软件, 开源, OCR, 办公效率, 文字识别'],
    summary: '开源免费的离线 OCR 文字识别工具，截图就能复制文字。',
    features: [
      '**截图识别**：截图即识别文字，Ctrl+C 直接复制',
      '**批量识别**：批量导入图片/PDF 一次性识别',
      '**二维码识别**：扫描/生成二维码',
      '**完全离线**：本地识别不上传，隐私安全',
      '**多国语言**：支持中英日韩等数十种语言'
    ],
    tutorial: {
      title: 'Umi-OCR 使用教程：免费离线 OCR 神器',
      desc: '从截图识别到批量处理，学会用 Umi-OCR 高效提取图片和 PDF 中的文字。',
      difficulty: 'beginner',
      category: '办公效率',
    }
  },
  {
    slug: 'powertoys',
    name: 'PowerToys',
    enName: 'Microsoft PowerToys',
    category: '系统优化',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows'],
    alt: 'Windows 增强工具',
    rating: 5.0,
    website: 'github.com/microsoft/PowerToys',
    github: 'microsoft/PowerToys',
    size: '~150MB',
    order: 17,
    tags: ['免费软件, 开源, 系统优化, Windows, 微软'],
    summary: '微软官方出品的 Windows 增强工具集，25+ 实用工具提升工作效率。',
    features: [
      '**FancyZones**：窗口布局管理，多任务神器',
      '**PowerRename**：批量重命名文件',
      '**颜色拾取器**：吸取屏幕任意颜色',
      '**Text Extractor (OCR)**：屏幕文字提取',
      '**键盘管理器**：自定义快捷键',
      '**微软出品**：持续维护更新'
    ],
    tutorial: {
      title: 'PowerToys 使用教程：Windows 效率神器 25 件套',
      desc: '精选 PowerToys 最实用的功能，让你的 Windows 电脑效率翻倍。',
      difficulty: 'beginner',
      category: '系统优化',
    }
  },
  {
    slug: 'world-monitor',
    name: 'World Monitor',
    enName: 'World Monitor',
    category: '网络工具',
    price: '完全免费',
    openSource: true,
    platforms: ['网页'],
    alt: '全球事件仪表板',
    rating: 4.0,
    website: 'github.com/koala73/worldmonitor',
    github: 'koala73/worldmonitor',
    size: '~0MB (Web App)',
    order: 18,
    tags: ['免费软件, 开源, 网络工具, 实时数据'],
    summary: '免费开源的实时全球情报仪表板，65+ 数据源展示全球动态。',
    features: [
      '**AI 驱动新闻聚合**：自动汇总全球新闻',
      '**地图可视化**：航运、航班、冲突、网络中断、自然灾害实时展示',
      '**65+ 数据源**：覆盖政治、经济、气象等多个领域',
      '**完全开源**：可自部署'
    ],
    tutorial: {
      title: 'World Monitor 使用教程：免费看遍全球实时动态',
      desc: '从安装到高级配置，学会用 World Monitor 跟踪全球事件。',
      difficulty: 'beginner',
      category: '网络工具',
    }
  },
  {
    slug: 'stirling-pdf',
    name: 'Stirling PDF',
    enName: 'Stirling PDF',
    category: '办公效率',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux', 'Docker'],
    alt: 'PDF 工具箱',
    rating: 4.5,
    website: 'github.com/Stirling-Tools/Stirling-PDF',
    github: 'Stirling-Tools/Stirling-PDF',
    size: '~200MB',
    order: 19,
    tags: ['免费软件, 开源, PDF, 办公效率, 文档处理'],
    summary: '全能的本地 PDF 处理工具箱，无需上传文件到云端。',
    features: [
      '**合并/拆分 PDF**：PDF 基本操作',
      '**PDF 转 Word/Excel/图片**：格式互转',
      '**OCR 识别**：扫描件转可编辑文本',
      '**加密/解密/水印**：PDF 安全功能',
      '**本地运行**：浏览器 Web 界面，文件不上传',
      '**30+ 功能**：满足几乎所有 PDF 需求'
    ],
    tutorial: {
      title: 'Stirling PDF 使用教程：本地 PDF 处理全家桶',
      desc: '从合并拆分到 OCR 识别，手把手教你用 Stirling PDF 处理所有 PDF 需求。',
      difficulty: 'beginner',
      category: '办公效率',
    }
  },
  {
    slug: 'rustdesk',
    name: 'RustDesk',
    enName: 'RustDesk',
    category: '网络工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', '网页'],
    alt: 'TeamViewer 平替',
    rating: 5.0,
    website: 'github.com/rustdesk/rustdesk',
    github: 'rustdesk/rustdesk',
    size: '~30MB',
    order: 20,
    tags: ['免费软件, 开源, 远程桌面, 网络工具, TeamViewer平替'],
    summary: '免费开源的远程桌面控制工具，TeamViewer 的最佳平替。',
    features: [
      '**自建中继服务器**：数据私密安全',
      '**跨平台**：Windows/macOS/Linux/Android/iOS/Web 全覆盖',
      '**低延迟流畅**：Rust 编写性能优异',
      '**文件传输**：支持文件互传',
      '**剪贴板共享**：跨设备复制粘贴',
      '**无需注册**：扫码即用'
    ],
    tutorial: {
      title: 'RustDesk 使用教程：免费远程桌面神器',
      desc: '从安装到自建服务器，学会用 RustDesk 替代 TeamViewer 远程办公。',
      difficulty: 'intermediate',
      category: '远程办公',
    }
  },
  {
    slug: 'czkawka',
    name: 'Czkawka',
    enName: 'Czkawka',
    category: '系统优化',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: '重复文件清理',
    rating: 4.5,
    website: 'github.com/qarmin/czkawka',
    github: 'qarmin/czkawka',
    size: '~10MB',
    order: 21,
    tags: ['免费软件, 开源, 系统优化, 磁盘清理, Rust'],
    summary: '超快速的重复文件/垃圾文件清理工具，1TB 硬盘不到 1 分钟扫完。',
    features: [
      '**Rust 编写**：速度极快',
      '**6 种清理类型**：重复文件、空文件夹、相似图片、临时文件、大文件、坏文件',
      '**预览后删除**：防止误删',
      '**跨平台**：Windows/macOS/Linux',
      '**界面简洁**：CLI 和 GUI 两种'
    ],
    tutorial: {
      title: 'Czkawka 使用教程：1 分钟清理几十 G 垃圾文件',
      desc: '从安装到高级用法，手把手教你用 Czkawka 释放磁盘空间。',
      difficulty: 'beginner',
      category: '系统优化',
    }
  },
  {
    slug: 'keepassxc',
    name: 'KeePassXC',
    enName: 'KeePassXC',
    category: '安全隐私',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: '密码管理器',
    rating: 4.5,
    website: 'keepassxc.org',
    github: 'keepassxreboot/keepassxc',
    size: '~40MB',
    order: 22,
    tags: ['免费软件, 开源, 安全隐私, 密码管理'],
    summary: '免费开源的本地密码管理器，告别浏览器记住密码和付费密码软件。',
    features: [
      '**本地存储**：密码不上传云端，零泄露风险',
      '**跨平台**：Windows/macOS/Linux 全支持',
      '**浏览器集成**：自动填充密码',
      '**强密码生成**：一键生成高强度密码',
      '**SSH 代理**：管理 SSH 密钥',
      '**硬件密钥**：支持 YubiKey'
    ],
    tutorial: {
      title: 'KeePassXC 使用教程：本地密码管理器完整指南',
      desc: '从创建密码库到浏览器集成，手把手教你安全地管理所有密码。',
      difficulty: 'beginner',
      category: '安全隐私',
    }
  },
  {
    slug: 'syncthing',
    name: 'Syncthing',
    enName: 'Syncthing',
    category: '文件管理',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'BSD'],
    alt: 'P2P 文件同步',
    rating: 4.5,
    website: 'syncthing.net',
    github: 'syncthing/syncthing',
    size: '~20MB',
    order: 23,
    tags: ['免费软件, 开源, 文件同步, P2P, 替代云盘'],
    summary: '免费开源的 P2P 文件同步工具，不依赖云盘也能多设备同步。',
    features: [
      '**P2P 同步**：文件不经过任何服务器',
      '**隐私安全**：加密传输，本地存储',
      '**跨平台**：Win/Mac/Linux/Android/BSD',
      '**版本历史**：保留文件历史版本',
      '**冲突处理**：自动处理同步冲突',
      '**无需注册**：直接配对设备'
    ],
    tutorial: {
      title: 'Syncthing 使用教程：免费搭建私人云同步',
      desc: '从安装到多设备配对，学会用 Syncthing 实现电脑手机文件自动同步。',
      difficulty: 'intermediate',
      category: '文件管理',
    }
  },
  {
    slug: 'ventoy',
    name: 'Ventoy',
    enName: 'Ventoy',
    category: '系统优化',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'Linux'],
    alt: '启动 U 盘制作',
    rating: 4.5,
    website: 'github.com/ventoy/Ventoy',
    github: 'ventoy/Ventoy',
    size: '~15MB',
    order: 24,
    tags: ['免费软件, 开源, 系统优化, U盘启动, 系统重装'],
    summary: '最简单好用的启动 U 盘制作工具，复制 ISO 就能用。',
    features: [
      '**复制即用**：ISO/IMG/VHD 文件直接拖入 U 盘',
      '**多系统并存**：一个 U 盘存多个系统镜像',
      '**支持广泛**：Windows/Linux/VMware 等几乎所有系统',
      '**100% 开源免费**：GPLv3 协议',
      '**持续更新**：77k+ 星标'
    ],
    tutorial: {
      title: 'Ventoy 使用教程：一招搞定所有启动 U 盘',
      desc: '从安装 Ventoy 到制作多系统 U 盘，学会最简单实用的启动盘制作方法。',
      difficulty: 'beginner',
      category: '系统优化',
    }
  },
  {
    slug: 'localsend',
    name: 'LocalSend',
    enName: 'LocalSend',
    category: '文件管理',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    alt: '局域网文件传输',
    rating: 5.0,
    website: 'github.com/localsend/localsend',
    github: 'localsend/localsend',
    size: '~10MB',
    order: 25,
    tags: ['免费软件, 开源, 文件传输, 局域网, AirDrop平替'],
    summary: '免费开源的局域网文件传输工具，手机电脑互传不费流量。',
    features: [
      '**跨平台**：Windows/macOS/Linux/Android/iOS 全支持',
      '**纯局域网**：文件不经过云端服务器',
      '**速度快**：本地网络直传',
      '**无需注册**：同一 WiFi 即可',
      '**隐私安全**：无云端传输',
      '**界面美观**：操作极简'
    ],
    tutorial: {
      title: 'LocalSend 使用教程：比 AirDrop 还好用的传文件神器',
      desc: '从安装到跨平台传文件，学会用 LocalSend 在手机电脑间无缝传文件。',
      difficulty: 'beginner',
      category: '文件管理',
    }
  },
  {
    slug: 'obs-studio',
    name: 'OBS Studio',
    enName: 'OBS Studio',
    category: '截图录屏',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: '录屏直播软件',
    rating: 5.0,
    website: 'github.com/obsproject/obs-studio',
    github: 'obsproject/obs-studio',
    size: '~150MB',
    order: 26,
    tags: ['免费软件, 开源, 录屏, 直播, OBS'],
    summary: '免费开源的直播推流和屏幕录制软件，专业级录制体验。',
    features: [
      '**4K 高帧率录屏**：无水印无时长限制',
      '**多场景切换**：专业直播功能',
      '**画面叠加/滤镜/字幕**：丰富特效',
      '**多平台推流**：B 站/抖音/YouTube/Twitch',
      '**多源接入**：屏幕/摄像头/麦克风',
      '**插件生态**：功能无限扩展'
    ],
    tutorial: {
      title: 'OBS Studio 使用教程：从录屏到直播完全指南',
      desc: '从下载安装到专业直播，手把手教你用 OBS 录制和直播。',
      difficulty: 'intermediate',
      category: '截图录屏',
    }
  },
  {
    slug: 'handbrake',
    name: 'HandBrake',
    enName: 'HandBrake',
    category: '视频剪辑',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: '视频转码压缩',
    rating: 4.5,
    website: 'github.com/HandBrake/HandBrake',
    github: 'HandBrake/HandBrake',
    size: '~30MB',
    order: 27,
    tags: ['免费软件, 开源, 视频剪辑, 视频压缩, 转码'],
    summary: '免费开源的万能视频格式转换压缩工具。',
    features: [
      '**几乎所有格式互转**：MP4/MKV/AVI/MOV 等',
      '**4K 压缩 30%+**：画质几乎无损',
      '**大量预设模板**：iPhone/iPad/PS4 一键适配',
      '**批量转换**：批量处理多个视频',
      '**章节分割/字幕嵌入**：专业功能',
      '**GPL 协议**：持续维护近 20 年'
    ],
    tutorial: {
      title: 'HandBrake 使用教程：视频压缩转码完全指南',
      desc: '从基础转换到高级压缩，手把手教你用 HandBrake 处理各种视频格式。',
      difficulty: 'beginner',
      category: '视频剪辑',
    }
  },
  {
    slug: 'quicklook',
    name: 'QuickLook',
    enName: 'QuickLook',
    category: '办公效率',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows'],
    alt: '空格预览文件',
    rating: 4.5,
    website: 'github.com/QL-Win/QuickLook',
    github: 'QL-Win/QuickLook',
    size: '~5MB',
    order: 28,
    tags: ['免费软件, 开源, 办公效率, 文件预览'],
    summary: 'Windows 上按空格键就能快速预览文件的神器，Mac 用户狂喜。',
    features: [
      '**空格预览**：选中文件按空格即预览',
      '**支持全面**：图片/视频/音频/PDF/Word/Excel/代码',
      '**无需打开软件**：快速浏览',
      '**GPL-3.0 开源**：完全免费',
      '**插件系统**：支持更多格式',
      '**轻量无后台**：用完即走'
    ],
    tutorial: {
      title: 'QuickLook 使用教程：Windows 上的空格预览神器',
      desc: '从安装到插件扩展，让 Windows 也拥有 Mac 般的快速预览体验。',
      difficulty: 'beginner',
      category: '办公效率',
    }
  },
  {
    slug: 'marktext',
    name: 'MarkText',
    enName: 'MarkText',
    category: '笔记工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux'],
    alt: 'Typora 平替',
    rating: 4.5,
    website: 'github.com/marktext/marktext',
    github: 'marktext/marktext',
    size: '~150MB',
    order: 29,
    tags: ['免费软件, 开源, Markdown, 笔记工具, Typora平替'],
    summary: '免费开源的高颜值 Markdown 编辑器，Typora 的最佳平替。',
    features: [
      '**所见即所得**：像 Typora 一样丝滑',
      '**实时预览**：边写边看效果',
      '**数学公式/表格/流程图**：丰富排版',
      '**跨平台**：Windows/macOS/Linux',
      '**深色模式**：护眼写作',
      '**导出 HTML/PDF**：多种格式输出'
    ],
    tutorial: {
      title: 'MarkText 使用教程：Typora 的免费开源平替',
      desc: '从基础编辑到高级排版，学会用 MarkText 写出漂亮的 Markdown 文档。',
      difficulty: 'beginner',
      category: '笔记工具',
    }
  },
  {
    slug: 'koodo-reader',
    name: 'Koodo Reader',
    enName: 'Koodo Reader',
    category: '笔记工具',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', '网页'],
    alt: '电子书阅读器',
    rating: 4.5,
    website: 'github.com/koodo-reader/koodo-reader',
    github: 'koodo-reader/koodo-reader',
    size: '~100MB',
    order: 30,
    tags: ['免费软件, 开源, 电子书, 阅读器, 笔记工具'],
    summary: '免费开源的全能电子书阅读器，一个软件通吃所有电子书格式。',
    features: [
      '**支持格式全**：EPUB/PDF/MOBI/AZW3/TXT/FB2/CBZ/CBR',
      '**跨平台同步**：Win/Mac/Linux/Android/iOS/Web',
      '**多设备同步**：阅读进度和笔记云同步',
      '**翻译/词典**：内置多语言支持',
      '**笔记标注**：边读边记',
      '**语音朗读**：TTS 支持'
    ],
    tutorial: {
      title: 'Koodo Reader 使用教程：全能电子书阅读器',
      desc: '从导入电子书到笔记同步，学会用 Koodo Reader 打造完美的阅读体验。',
      difficulty: 'beginner',
      category: '笔记工具',
    }
  },
  {
    slug: 'casaos',
    name: 'CasaOS',
    enName: 'CasaOS',
    category: '文件管理',
    price: '完全免费',
    openSource: true,
    platforms: ['Linux'],
    alt: '个人云系统',
    rating: 4.5,
    website: 'github.com/IceWhaleTech/CasaOS',
    github: 'IceWhaleTech/CasaOS',
    size: '~300MB',
    order: 31,
    tags: ['免费软件, 开源, NAS, 个人云, Docker'],
    summary: '免费开源的个人云系统，用旧电脑就能搭建私有云/NAS。',
    features: [
      '**一键部署**：基于 Docker',
      '**应用商店**：20+ 应用一键安装',
      '**极简 Web UI**：不像群晖/威联通复杂',
      '**文件管理/相册/下载中心**：一体化',
      '**多设备支持**：树莓派/旧电脑/玩客云',
      '**Apache-2.0**：开源免费'
    ],
    tutorial: {
      title: 'CasaOS 使用教程：旧电脑变身私人云',
      desc: '从系统安装到应用部署，手把手教你搭建自己的私人云。',
      difficulty: 'intermediate',
      category: '文件管理',
    }
  },
  {
    slug: 'flow-launcher',
    name: 'Flow Launcher',
    enName: 'Flow Launcher',
    category: '办公效率',
    price: '完全免费',
    openSource: true,
    platforms: ['Windows'],
    alt: '启动器搜索',
    rating: 4.5,
    website: 'github.com/Flow-Launcher/Flow.Launcher',
    github: 'Flow-Launcher/Flow.Launcher',
    size: '~30MB',
    order: 32,
    tags: ['免费软件, 开源, 办公效率, 启动器, Everything平替'],
    summary: '免费开源的 Windows 文件搜索与应用启动器，Everything 的现代替代品。',
    features: [
      '**比 Everything 智能**：搜文件+启动软件+翻译+计算',
      '**200+ 插件**：计算器/翻译/天气/Everything/书签',
      '**界面美观**：主题和自定义',
      '**拼音搜索**：中文文件名友好',
      '**MIT 协议**：完全开源',
      '**快捷键启动**：Alt + Space 一键呼出'
    ],
    tutorial: {
      title: 'Flow Launcher 使用教程：搜索+启动+工具一体化',
      desc: '从安装到插件配置，让 Flow Launcher 成为你的效率中枢。',
      difficulty: 'beginner',
      category: '办公效率',
    }
  },
];

// Generate software md files
function generateSoftware(item) {
  const platforms = JSON.stringify(item.platforms);
  const tags = JSON.stringify(item.tags);
  const fm = `---
软件名称: ${item.name}
英文名称: ${item.enName}
类别: ${item.category}
价格: ${item.price}
开源: ${item.openSource}
平台: ${platforms}
平替: ${item.alt}
评分: ${item.rating}
官网: ${item.website}
github: ${item.github}
大小: ${item.size}
序号: ${item.order}
发布时间: "2026-06-26"
标签: ${tags}
---

# ${item.name} — ${item.alt} 免费平替

${item.summary}

## 核心功能
${item.features.map(f => `- **${f.split('**')[1] || ''}**${f.split('**').slice(2).join('**') || ''}`).join('\n')}

## 适用人群
适合所有需要 ${item.category} 的普通用户和开发者

## 一句话总结
${item.summary}
`;
  const filepath = path.join(SOFTWARE_DIR, `${item.slug}.md`);
  fs.writeFileSync(filepath, fm, 'utf-8');
  console.log(`✓ Created software: ${item.slug}.md`);
}

// Generate tutorial md files
function generateTutorial(item) {
  const fm = `---
title: ${item.tutorial.title}
software: ${item.name}
softwareSlug: ${item.slug}
difficulty: ${item.tutorial.difficulty}
category: ${item.tutorial.category}
order: ${item.order}
description: "${item.tutorial.desc}"
---

${item.tutorial.desc}

## 软件简介

${item.summary}

## 核心功能详解

${item.features.map(f => `- ${f}`).join('\n')}

## 下载与安装

1. 打开官网 **${item.website}**
2. 选择对应平台版本下载安装
3. 安装完成后打开软件开始使用

## 快速上手

${item.name} 界面直观，无需复杂配置即可使用。具体使用场景请参考官方文档和社区教程。

## 进阶玩法

- 探索高级设置和插件系统
- 加入社区（GitHub Discussions / Discord）交流使用技巧
- 根据自己的使用习惯自定义配置
`;
  const filepath = path.join(TUTORIALS_DIR, `${item.slug}.md`);
  fs.writeFileSync(filepath, fm, 'utf-8');
  console.log(`✓ Created tutorial: ${item.slug}.md`);
}

// Process all items
console.log(`Generating ${items.length} software + tutorial files...\n`);
for (const item of items) {
  generateSoftware(item);
  generateTutorial(item);
}
console.log(`\nDone! Generated ${items.length * 2} files.`);
