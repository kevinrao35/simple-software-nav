---
title: Koodo Reader 使用教程：全能电子书阅读器
software: Koodo Reader
softwareSlug: koodo-reader
difficulty: beginner
category: 笔记工具
order: 30
description: "从导入电子书到笔记同步，学会用 Koodo Reader 打造完美的阅读体验。"
---

## 软件简介

Koodo Reader 是一款基于 **AGPL-3.0 开源协议** 的跨平台电子书阅读器，采用 Electron + React 技术栈开发。它的最大亮点是**格式支持极其广泛**，几乎可以打开市面上所有主流电子书格式，包括 EPUB、PDF、MOBI、AZW3、DJVU、CBZ、CBR、TXT、FB2、RTF、HTML、Markdown、DOCX 等。此外还提供 **Web 在线版**，无需安装即可在浏览器中阅读。

Koodo Reader 在 GitHub 上拥有 20k+ Stars，社区活跃，更新频繁。它注重用户阅读数据的自主可控——所有阅读数据均存储在本地，也可以通过 WebDAV 同步到自己的云存储服务。

## 核心特性

- **格式支持全面**：EPUB / PDF / MOBI / AZW3 / DJVU / CBZ(CBR) / TXT / FB2 / RTF / HTML / MD / DOCX，基本覆盖所有常见电子书格式。
- **书架管理**：支持按收藏夹、标签分类管理书籍，支持列表/网格/封面三种视图。
- **阅读进度同步**：通过 WebDAV 协议跨设备同步阅读进度、笔记和高亮。
- **笔记与高亮**：支持在阅读过程中添加高亮、下划线、批注笔记，可导出为 Markdown 或纯文本。
- **夜间模式**：提供多款阅读主题（明亮/棕黄/深灰/黑色等），保护视力。
- **TTS 语音朗读**：内置文字转语音引擎，支持多种语言和语速调节。
- **触控模式**：平板设备上优化触控操作，支持手势翻页。
- **导入 Kindle 剪贴簿**：支持导入 Kindle 的 `My Clippings.txt` 文件，集中管理 Kindle 笔记。
- **多语言界面**：支持中文、英文、日文、韩文、法文、德文等 15+ 种语言界面。

## 下载与安装

Koodo Reader 支持 Windows、macOS、Linux 以及 Web 浏览器访问。

### Windows

**方式一：GitHub Releases（推荐）**
前往 [Koodo Reader Releases 页面](https://github.com/koodo-reader/koodo-reader/releases)，下载以下格式之一：
- **Koodo-Reader-{version}-x64.exe**：Windows 安装包
- **Koodo-Reader-{version}-x64.msi**：Windows MSI 安装包（适合企业批量部署）
- **Koodo-Reader-{version}-x64-Portable.zip**：便携版，解压即用，无需安装

**方式二：winget**
```
winget install koodo-reader
```

**方式三：Chocolatey**
```
choco install koodo-reader
```

### macOS

下载 `.dmg` 文件（注意区分 Apple Silicon 和 Intel 版本）：
- `Koodo.Reader-{version}-arm64.dmg`：M1/M2/M3 芯片使用
- `Koodo.Reader-{version}-x64.dmg`：Intel 芯片使用

打开后将 Koodo Reader 拖入 Applications 文件夹。首次打开可能需要在 `系统设置 > 隐私与安全性` 中确认允许打开。

也可以通过 Homebrew 安装：
```
brew install --cask koodo-reader
```

### Linux

提供 `AppImage` 和 `.deb` 两种格式：
- **AppImage（通用）**：
  ```
  chmod +x Koodo.Reader-{version}-x86_64.AppImage
  ./Koodo.Reader-{version}-x86_64.AppImage
  ```
- **.deb（Debian/Ubuntu）**：`sudo dpkg -i koodo-reader_{version}_amd64.deb`

### Web 版（无需安装）

直接访问 [https://app.koodoreader.com](https://app.koodoreader.com) 即可在浏览器中使用。Web 版功能与桌面版基本一致，但数据保存在浏览器本地存储中（需要配合 WebDAV 实现跨设备同步）。

## 添加与导入书籍

### 添加文件到书架

Koodo Reader 支持三种添加方式：
1. **拖拽导入**：从文件管理器直接将电子书文件拖入 Koodo Reader 窗口。
2. **点击添加**：点击书架页面的"+"按钮，选择本地文件或整个文件夹（批量导入）。
3. **导入目录**：点击 `导入目录` 可将指定文件夹下的所有电子书一次性导入，Koodo Reader 会自动递归搜索子目录。

### 支持的导入策略

在设置中可以配置导入策略：
- **复制到库目录**：将电子书文件复制到 Koodo Reader 的数据目录中（默认推荐，文件管理更集中）。
- **建立链接**：保留原文件位置，只在库中创建引用（适合图书文件已整齐归档的用户）。

### 从 Kindle 导入笔记

1. 将 Kindle 通过 USB 连接到电脑。
2. 从 Kindle 根目录复制 `documents/My Clippings.txt` 文件到电脑。
3. 在 Koodo Reader 中点击 `导入 > Kindle 剪贴簿`，选择该文件。
4. Kindle 上的所有标注和笔记会被导入并关联到对应的电子书（如果该书也在 Koodo 书库中）。

## 书架管理

### 视图切换

书架支持三种视图模式，通过右上角图标切换：
- **列表视图**：以列表形式显示书名、作者、阅读进度。
- **网格视图**：以封面缩略图为主，每行多本书。
- **封面视图**：大封面展示，适合浏览收藏。

### 分类管理

Koodo Reader 支持两种分类方式：

**收藏夹**：类似文件夹，一本书只能属于一个收藏夹。
- 右键书籍 > `添加到收藏夹` > 选择已有收藏夹或新建。
- 左侧导航栏点击收藏夹名称即可筛选查看。

**标签**：一本书可以添加多个标签。
- 右键书籍 > `管理标签` > 输入标签名称后回车。
- 点击左侧导航栏中的标签即可筛选出所有打上了该标签的书。

### 搜索与排序

书架顶部提供搜索框，支持按书名、作者、出版社搜索。同时支持按以下维度排序：
- 最近阅读
- 最近添加
- 书名（A-Z）
- 作者
- 出版年份

## 阅读设置

打开任意一本书后，点击屏幕中央或顶部工具栏图标即可调出阅读设置面板。

### 字体与排版

- **字体**：支持选择系统已安装的字体，也可自行安装字体文件。中文阅读推荐思源宋体、Noto Sans CJK 或霞鹜文楷。
- **字号**：滑动滑块调整，支持 8px～72px。
- **行距**：1.0～2.5 倍行距，可根据个人阅读习惯调节。
- **上下边距**：调节页面上下留白宽度。
- **左右边距**：调节页面左右留白宽度。
- **对齐方式**：左对齐 / 两端对齐。
- **首行缩进**：开启后每段首行自动缩进两字符。

### 阅读主题

内置 6 种主题色：
1. **默认（白底黑字）**：最清晰，适合光线充足的环境。
2. **棕黄护眼**：仿纸质书底色，适合长时间阅读。
3. **深灰**：深灰色背景，比纯黑色更柔和。
4. **黑色**：纯黑背景 OLED 友好模式。
5. **深棕**：仿复古书籍风格。
6. **自定义**：可分别设置背景色和文字色。

### 滚动方式

- **翻页模式**：左右点击或按键翻页（类似纸质书）。
- **滚动模式**：上下连续滚动阅读（类似网页）。
- **分页模式**：按页面分割内容，一次显示一页。

### 其他阅读设置

- **自动翻页**：开启后每隔 N 秒自动翻页（N 可调），适合边做事边听书。
- **竖排阅读**：部分 EPUB 支持竖排排版（从右到左）。
- **高亮颜色**：可预设多种高亮颜色（黄/绿/蓝/粉/橙），标注时快捷选择。

## 笔记与标注功能

### 添加高亮

1. 选中文字后，自动弹出标注工具栏。
2. 点击高亮图标（或快捷键），文字被标记为高亮。
3. 再次点击同一段高亮文字可修改颜色或删除高亮。

### 添加笔记

1. 选中文字后，点击标注工具栏中的笔记图标。
2. 在弹出的输入框中输入笔记内容，点击确定保存。
3. 添加了笔记的高亮段落会显示一个小笔记图标。

### 管理笔记

点击左侧导航栏的 `笔记` 进入笔记管理界面，可以：
- 按书籍筛选查看所有笔记。
- 点击笔记跳转到原文位置。
- 导出笔记为 Markdown（保留书名、章节、时间戳）或纯文本。
- 删除或编辑已有笔记。

### 导出笔记

在笔记管理界面点击 `导出`：
- **导出为 Markdown**：按书籍分类，保留高亮文本和笔记内容，带有原文链接。
- **导出为纯文本**：只保留笔记文字，无格式。

## TTS 语音朗读

Koodo Reader 内置文字转语音功能，支持边听边读。

### 启用 TTS

1. 打开电子书后，点击顶部工具栏的喇叭图标。
2. 点击播放按钮开始朗读，TTS 会从当前页面开始朗读。
3. 朗读过程中可以随时暂停、停止或调整语速。

### TTS 设置

- **语速**：0.5x ～ 3.0x 倍速调节，正常语速推荐 1.0x～1.25x。
- **发音人**：根据操作系统可用的 TTS 引擎选择发音人（Windows 可使用微软小莹/晓晓等中文语音；macOS 可使用 Tingting 等）。
- **语言**：自动识别文本语言选择对应的 TTS 引擎。

**注意**：TTS 功能依赖于系统 TTS 引擎。Windows 10/11 的中文 TTS 体验较好，macOS 的 TTS 也表现稳定。Linux 系统可能需要额外安装语音引擎（如 espeak-ng）。

## WebDAV 同步设置

Koodo Reader 支持通过 WebDAV 协议在多台设备之间同步阅读进度、笔记和高亮数据。同步不包含电子书文件本身（需要手动在每台设备上导入）。

### 配置 WebDAV 同步

1. 点击 `设置 > 同步`。
2. 开启 `启用 WebDAV 同步`。
3. 填写以下信息：
   - **服务器地址**：你的 WebDAV 服务器 URL（例如 `https://dav.jianguoyun.com/dav/` 或 `https://example.com/remote.php/dav/files/username/`）。
   - **用户名**：WebDAV 账号的用户名。
   - **密码**：WebDAV 账号的密码（坚果云等服务需要使用应用密码，而非登录密码）。
4. 点击 `验证连接` 确认配置正确。
5. 点击 `立即同步` 进行首次同步。

### 推荐 WebDAV 服务

| 服务 | 免费额度 | 特点 |
|------|----------|------|
| **坚果云** | 1GB / 月上传流量，3GB 存储 | 国内速度快，中文支持好 |
| **ownCloud / NextCloud** | 自建无限制 | 完全自控，适合有服务器的用户 |
| **INFINITY FREE** | 10GB | 国外免费 WebDAV 服务 |

### 同步策略

- **自动同步**：默认关闭，可在设置中开启。开启后每次关闭书籍或退出应用时自动同步。
- **手动同步**：随时点击 `同步` 按钮手动触发。
- **冲突处理**：如果多台设备同时修改了同一本书的笔记，Koodo 会以最近修改为准。

## 备份与恢复数据

Koodo Reader 的所有数据（书架信息、阅读进度、笔记、设置）存储在本地数据库文件中。

### 备份

1. 进入 `设置 > 数据`。
2. 点击 `导出数据`，选择保存位置。
3. 导出的 `.json` 文件包含所有阅读数据（不含电子书文件本身）。
4. 建议同时备份电子书文件（将 Koodo 库目录中的文件一并复制）。

### 恢复

1. 在新设备上安装 Koodo Reader 后，进入 `设置 > 数据`。
2. 点击 `导入数据`，选择之前导出的 `.json` 文件。
3. 重新导入电子书文件（如果使用了"复制到库目录"策略，可以直接将备份的库目录复制到新设备）。

### 数据存储位置

Koodo Reader 的数据默认存储在：
- **Windows**：`C:\Users\{用户名}\AppData\Roaming\koodo-reader`
- **macOS**：`~/Library/Application Support/koodo-reader`
- **Linux**：`~/.config/koodo-reader`

## 键盘快捷键

| 功能 | 快捷键 |
|------|--------|
| 打开文件 | Ctrl+O |
| 切换全屏 | F11 |
| 搜索 | Ctrl+F |
| 翻到下一页 | 右箭头 / PageDown |
| 翻到上一页 | 左箭头 / PageUp |
| 增加字号 | Ctrl+= |
| 减小字号 | Ctrl+- |
| 切换侧边栏 | Ctrl+B |
| 切换阅读主题 | Ctrl+Shift+T |
| 添加书签 | Ctrl+D |
| 查看书签 | Ctrl+Shift+D |
| TTS 播放/暂停 | Ctrl+Shift+E |

## 与 Kindle / Calibre 配合使用

### Kindle 用户

- 将 Kindle 中的电子书通过 USB 复制到电脑，拖入 Koodo Reader。
- 使用 `导入 > Kindle 剪贴簿` 导入 Kindle 笔记和高亮。
- Koodo Reader 对 MOBI 和 AZW3 格式支持良好，但注意新版 Kindle 使用 KFX 格式，需要先用 Calibre 转换为 MOBI/AZW3。

### Calibre 用户

- Calibre 是业界最强大的电子书管理工具，擅长格式转换和元数据管理。
- **推荐工作流**：用 Calibre 管理书库和转换格式 -> 用 Calibre 的内容服务器（Content Server）在局域网中访问 -> 或导出为 EPUB（Koodo Reader 的最佳格式）后在 Koodo Reader 中阅读。
- Koodo Reader 侧重优化**阅读体验**，Calibre 侧重**管理**，两者互补而非替代。

## 常见问题

### 为什么有些 MOBI/AZW3 书籍无法正常显示？
MOBI 和 AZW3 是老旧的封闭格式，Koodo Reader 通过逆向工程实现支持。如果遇到排版错乱，建议使用 Calibre 转换为 EPUB 格式，EPUB 的阅读体验最稳定。

### Koodo Reader 会读取我的隐私数据吗？
不会。Koodo Reader 是开源软件，所有阅读数据仅存储在本地或你指定的 WebDAV 服务器。没有云收集行为。

### 扫描版 PDF 在 Koodo Reader 中无法选中文字？
扫描版 PDF 本质上是图片，Koodo Reader 不支持 OCR。这类 PDF 只能像图片一样翻页查看，无法做笔记和高亮。建议配合 ADOBE ACROBAT 或 专业 OCR 软件处理。

### Web 版数据会丢失吗？
Web 版数据存储在浏览器 IndexedDB 中，清除浏览器缓存会丢失数据。建议 Web 版用户配置 WebDAV 同步或定期导出备份。
