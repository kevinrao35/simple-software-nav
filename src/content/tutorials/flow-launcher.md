---
title: Flow Launcher 使用教程：搜索+启动+工具一体化
software: Flow Launcher
softwareSlug: flow-launcher
difficulty: beginner
category: 办公效率
order: 32
description: "从安装到插件配置，让 Flow Launcher 成为你的效率中枢。"
---

Flow Launcher 是一个免费开源的 Windows 快速启动工具，按下 `Alt+Space` 即可呼出搜索框，快速启动应用、搜索文件、执行系统命令、计算表达式、查词典等。它支持 200+ 插件扩展，支持 C#、Python、JavaScript 编写自定义插件，还内置了拼音搜索功能，对中文文件名搜索非常友好。

## 安装方式

### 方式一：官网安装包
1. 访问 [Flow Launcher 官网](https://www.flowlauncher.com/)。
2. 点击首页的 **Download** 按钮，下载 `Flow-Launcher-Setup.exe`。
3. 运行安装程序，安装过程中可以选择：
   - 是否开机自启（建议勾选）
   - 是否以管理员身份运行（如果需要 Everything 插件等功能则勾选）
   - 安装路径（默认 `%AppData%\FlowLauncher`）

### 方式二：winget
```bash
winget install Flow-Launcher.Flow-Launcher
```

### 方式三：GitHub Releases
访问 [Flow Launcher Releases](https://github.com/Flow-Launcher/Flow.Launcher/releases)，下载 `Flow-Launcher-Setup-Installer.exe`。

安装完成后，按 `Alt+Space` 即可呼出搜索框。首次启动会显示简要的新手指引界面。

![Flow Launcher 搜索界面截图描述：屏幕中央显示一个圆角矩形搜索框，搜索框下方是最近使用的应用列表，搜索框底部有设置齿轮图标和插件管理图标。背景桌面半透明模糊效果。]

---

## 基本使用

### 启动应用
无需额外设置，直接输入应用名称即可搜索到已安装的程序：
- 输入 `chrome` 可搜索到 Google Chrome。
- 输入 `微信` 或 `wechat` 均可找到微信。
- 支持拼音搜索：输入 `wps` 可搜到 WPS Office，输入 `xl` 可搜到 Excel。

按 `Enter` 启动选中的应用，按 `Ctrl+Enter` 以管理员身份启动。

### 搜索文件
默认插件已集成文件搜索（基于 Windows 索引），直接输入文件名即可。如果需要更快的 Everything 搜索效果，安装 Everything 插件（见下文插件部分）。

### 执行系统命令
部分系统命令可直接输入：
- `关机` 或 `shutdown` - 显示关机/重启/休眠选项
- `控制面板` 或 `control panel` - 打开控制面板
- `设置` 或 `settings` - 打开 Windows 设置
- `打开...` 后跟路径 - 打开指定文件夹

### 万能计算
直接在搜索框中输入数学表达式，Flow Launcher 会立即显示计算结果：
- `1024*768` → 786432
- `sqrt(144)` → 12
- `$100 to cny` → 实时汇率换算（需联网）
- `100+20%` → 120

### 网页搜索快捷操作
输入 `>` 后跟搜索内容，可快速进行网页搜索：
- `>g flow launcher` — Google 搜索
- `>b 天气` — Bing 搜索
- `>bd 天气预报` — 百度搜索
- `>w 人工智能` — 维基百科搜索
- `>tb 手机` — 淘宝搜索

（各快捷前缀可在插件设置中自定义）

---

## 高级功能

### 系统操作
输入以下关键词可执行系统操作：
| 输入 | 操作 |
|------|------|
| `关机` | 显示关机/重启/注销 |
| `锁屏` 或 `lock` | 锁定屏幕 |
| `休眠` | 进入休眠模式 |
| `清空回收站` | 清空回收站 |
| `卸载 应用名` | 直接进入该应用的卸载界面 |
| `打开 路径` | 在资源管理器中打开路径 |

### 剪贴板历史
Flow Launcher 内置剪贴板管理插件（需手动启用），按 `Alt+Space` 后输入 `剪贴板` 或 `clipboard` 即可查看和搜索历史剪贴板内容，支持文字和图片。

### 进程管理
输入进程名可查看和结束进程：
- 例如输入 `chrome` 会显示 Chrome 所有进程。
- 选择后按 `Ctrl+Shift+Enter` 可结束该进程。

---

## 插件系统（核心优势）

### 安装插件
方法一（在 Flow Launcher 界面中安装）：
1. 按 `Alt+Space` 呼出搜索框。
2. 输入 `pm install 插件名` 或点击搜索框右上角的插件图标（拼图块状按钮）。
3. 在插件商店中浏览和搜索，点击对应插件右侧的"安装"按钮。
4. 安装完成后按提示或按 `Ctrl+R` 刷新插件列表。

方法二（手动下载）：
- 从 [Flow Launcher 插件市场](https://www.flowlauncher.com/#/plugins) 下载 `.xaml` 插件文件。
- 放入 `%AppData%\FlowLauncher\Plugins` 目录。
- 重启 Flow Launcher。

### 推荐的必备插件

**1. Everything**
> 极速文件搜索，基于 voidtools Everything 引擎。
- 安装后在 Flow Launcher 中输入任意关键词，搜索结果秒出。
- 支持 `*.txt` 通配符和 `!folder` 排除等 Everything 语法。
- **前提条件**：需提前安装 [Everything](https://www.voidtools.com/zh-cn/)，并将 Flow Launcher 以管理员身份运行。

**2. Calculator**
> 默认已安装。支持复杂数学计算、进制转换、单位换算。
- 输入 `=10 USD in JPY` 实时汇率换算。
- 输入 `=0xFF` 十六进制转十进制（255）。
- 支援函数：sin、cos、sqrt、log 等。

**3. Browser Bookmarks**
> 搜索 Chrome/Edge/Firefox 的浏览器书签和历史记录。
- 安装后连接指定浏览器，输入书签名称即可直接跳转。
- 支持收藏夹文件夹的层级搜索。

**4. Process Killer**
> 搜索和结束正在运行的进程。
- 输入进程名部分关键字即可匹配。
- 选择后 `Enter` 结束进程，比 `Ctrl+Alt+Del` 快得多。

**5. URL**
> 输入 URL 地址直接打开网站，功能已内置。
- 直接输入 `github.com` 默认用浏览器打开。
- 支持 `tab` 键切换到其他 URL 解析器。

**6. Windows Settings**
> 搜索 Windows 设置项（默认已安装）。
- 输入 `显示设置`、`蓝牙`、`防火墙` 等关键词可直达对应 Windows 设置页面。

**7. Translation**
> 在线翻译插件，支持多语种互译。
- 用法：输入 `tr 你好 world` 或 `翻译 hello`。
- 默认使用谷歌翻译，可切换到 DeepL 等引擎。

**8. Emoji**
> 快速搜索和插入表情符号。
- 输入 `:smile` 或 `:开心` 搜索匹配的 Emoji。
- 选中后自动复制到剪贴板。

![Flow Launcher 插件管理界面截图描述：搜索框中央显示"pm"命令后的插件商店列表，每行显示插件图标、名称、简介和安装按钮，已安装的插件显示为灰色"已安装"标签，顶部有搜索框可筛选插件。]

---

## 主题设置

Flow Launcher 支持自定义主题，改变搜索框的外观风格。

### 切换内置主题
1. 呼出 Flow Launcher 搜索框。
2. 点击右侧的齿轮图标进入设置。
3. 选择 **主题** 选项卡。
4. 从下拉菜单中选择内置主题（Light / Dark / Black / Blur 等）。

### 安装社区主题
- 访问 [Flow Launcher 官方主题仓库](https://github.com/Flow-Launcher/Flow.Launcher.Themes)。
- 下载 `.xaml` 主题文件。
- 放入 `%AppData%\FlowLauncher\Themes` 目录（无则新建）。
- 在设置 > 主题中切换。

### 自定义主题
1. 在设置 > 主题中点击"编辑主题文件"。
2. 修改 `Colors.xaml` 中的颜色值（HEX 格式）。
3. 核心可自定义项：
   - 搜索框背景色、文字颜色
   - 结果列表高亮颜色
   - 边框圆角半径
   - 字体大小和字族
   - 模糊效果强度

**推荐配置（暗黑模式）：**
```xml
<!-- 在 Colors.xaml 中修改 -->
<Color x:Key="BackgroundColor">#1A1A2E</Color>
<Color x:Key="TextColor">#E0E0E0</Color>
<Color x:Key="HighlightColor">#4A90D9</Color>
```

---

## 快捷键设置

在设置 > 快捷键中可自定义所有快捷键：

| 功能 | 默认快捷键 | 推荐调整 |
|------|-----------|---------|
| 打开搜索框 | `Alt+Space` | 可改为 `Pause` 或 `Win+Space` |
| 插件管理器 | `Ctrl+P` | - |
| 设置 | `Ctrl+I` | - |
| 刷新插件缓存 | `Ctrl+R` | - |
| 上下文菜单 | `Ctrl+O` | - |
| 打开文件所在位置 | `Ctrl+Enter` | - |

如果 `Alt+Space` 与游戏中或其他软件冲突，建议改为 `Ctrl+Space` 或双击 `Ctrl`。

---

## 配置建议

### 开机自启
在设置 > 通用中，勾选"开机自动启动"，这样 Flow Launcher 常驻后台。

### 设置合理的热键
建议将热键设置为：
- 如果习惯单手操作：`Caps Lock + Space`（通过 PowerToys 将 Caps 映射为 Ctrl 然后使用 `Ctrl+Space`）
- 如果避免游戏冲突：`Win+Space`

### 排除不需要的插件
在插件管理中禁用不用的插件：
- 保留：Everything、Calculator、Browser Bookmarks、Windows Settings、System Commands、Shell
- 建议禁用：如果不需要可以关掉 Web Search、Colors（如果不常用取色）

### Everything 整合配置
要获得最佳文件搜索体验，需要：
1. 安装 Everything 桌面版（免费）。
2. 启动 Everything 并让其建立索引（首次可能需要 1~5 分钟）。
3. 安装 Flow Launcher 的 Everything 插件。
4. 将 Flow Launcher 设置为以管理员身份运行（设置 > 通用 > 以管理员身份运行，或右键 FlowLauncher.exe 属性 > 兼容性 > 勾选"以管理员身份运行"）。

> Everything 插件搜文件速度比内置文件搜索快 10~100 倍，强烈建议配置。

---

## 常见问题

**Q：Flow Launcher 和 PowerToys Run 有什么区别？**
A：两者功能类似，但 Flow Launcher 插件生态更丰富（200+ 插件），且支持 Python/JavaScript/C# 编写自定义插件。PowerToys Run 的优势在于与 PowerToys 其他工具深度集成。建议都安装尝试后按喜好选择，两者无冲突。

**Q：拼音搜索怎么用？**
A：直接输入拼音首字母即可，如输入 `wxl` 可搜到"WPS 文字"，输入 `qq` 可搜到"QQ 音乐"。无需任何配置，默认支持。

**Q：搜索不到文件？**
A：请检查：
1. Everything 插件需要先安装 Everything 桌面版。
2. 尝试以管理员身份运行 Flow Launcher。
3. 在设置 > 通用中点击"重建索引"。
4. 检查是否在插件列表中禁用了文件搜索插件。

**Q：如何卸载 Flow Launcher？**
A：在设置 > 通用中点击"卸载 Flow Launcher"，或通过 Windows 设置 > 应用 > 已安装的应用中卸载。

**Q：Flow Launcher 占多少内存？**
A：空闲状态约 60~100MB，视插件数量而定。Everything 插件启用后稍高，但仍在可接受范围。

**Q：能否在 Linux/macOS 上使用？**
A：不能。Flow Launcher 仅支持 Windows 7 及以上版本。Linux/macOS 用户可以考虑类似工具如 Albert（Linux）或 Raycast/Alfred（macOS）。
