---
title: LocalSend 使用教程：比 AirDrop 还好用的传文件神器
software: LocalSend
softwareSlug: localsend
difficulty: beginner
category: 文件管理
order: 25
description: "从安装到跨平台传文件，学会用 LocalSend 在手机电脑间无缝传文件。"
---

LocalSend 是一个免费开源的跨平台局域网文件传输工具。与 AirDrop 仅限于 Apple 生态不同，LocalSend 支持 Windows、macOS、Linux、Android、iOS 和 Fire OS 六大平台，可以在任意设备之间互传文件。它的传输基于 REST API 和 HTTPS 加密，纯局域网传输，文件不经过任何云端服务器，速度快且无流量限制。

**LocalSend vs 竞品：**

| 对比维度 | LocalSend | AirDrop | Snapdrop | ShareIt/Xender |
|---------|-----------|---------|----------|---------------|
| 跨平台 | Windows/Mac/Linux/Android/iOS | 仅 Apple 生态 | 需浏览器 | 全平台 |
| 是否需要互联网 | 不需要 | 不需要 | 需要（走 WebRTC） | 不需要 |
| 是否需要注册 | 不需要 | 需要 iCloud 账户 | 不需要 | 需要 |
| 加密传输 | HTTPS + TLS | Apple 私有协议 | 无 | 无 |
| 文件大小限制 | 无（取决于设备存储） | 无 | 单文件有限制 | 无 |
| 开源 | 是（GPL-3.0） | 否 | 是 | 否 |
| 多设备同时发送 | 支持 | 仅一对一 | 支持多对一 | 仅一对一 |

---

## 各平台安装方式

### Windows
- **安装包**：访问 [LocalSend 官网](https://localsend.org/) 下载 Windows 安装包（`.msi` 或 `.exe`）。
- **winget：**
  ```bash
  winget install LocalSend.LocalSend
  ```
- **Microsoft Store：** 搜索 "LocalSend" 直接安装。
- **Portable 版**：下载 `.zip` 压缩包，解压后运行 `localsend.exe`，无需安装。

### macOS
- **手动安装**：从官网下载 `.dmg` 文件，拖入 Applications 文件夹。
  > macOS 首次运行可能提示"无法验证开发者"，请前往 系统设置 > 隐私与安全性 > 仍要打开。
- **Homebrew：**
  ```bash
  brew install --cask localsend
  ```

### Linux
- **AppImage：**
  ```bash
  chmod +x LocalSend-*.AppImage
  ./LocalSend-*.AppImage
  ```
- **Flatpak：**
  ```bash
  flatpak install flathub org.localsend.localsend_app
  ```
- **Snap：**
  ```bash
  snap install localsend
  ```
- **APT（Ubuntu/Debian）：** 从 GitHub Releases 下载 `.deb` 包后：
  ```bash
  sudo dpkg -i localsend_*.deb
  ```

### Android
- **Google Play**：搜索 "LocalSend" 安装。
- **F-Droid**：在 F-Droid 商店中搜索安装（纯粹开源版）。
- **APK 直接安装**：从 GitHub Releases 下载 `.apk` 文件。

### iOS / iPadOS
- **App Store**：搜索 "LocalSend" 安装。

### Fire OS（亚马逊平板）
- **Amazon Appstore**：搜索 "LocalSend" 安装。

---

## 发送文件：完整流程

### 准备工作
确保发送端和接收端满足以下条件：
1. **同一局域网**：两台设备连接到同一个路由器（或有线网络同一子网），可以是 WiFi 或有线网络。
2. **LocalSend 已运行**：在发送端和接收端都打开 LocalSend。
3. **无需注册或登录**：完全即开即用。

### 发送文件步骤（以 Windows 发送到 Android 为例）

**发送端（Windows）：**
1. 打开 LocalSend，主界面默认显示"发送"标签。
2. 选择接收设备：在设备列表中可以看到同一网络下其他运行 LocalSend 的设备。
   - 设备会显示设备名称和系统图标。
   - 如果设备未显示，请确认两设备在同一网络，并检查防火墙设置。
3. 点击要发送到的设备名称。
4. 选择要发送的文件：
   - 点击 **"添加文件"** 可选择一个或多个文件。
   - 点击 **"添加文件夹"** 可选择整个文件夹。
   - 也可以直接从文件资源管理器将文件/文件夹拖拽到 LocalSend 窗口。
   - 点击 **"添加文本"** 可输入一段文本直接发送（接收端自动复制到剪贴板）。
5. 点击 **"发送"** 按钮。

**接收端（Android）：**
1. 确保 Android 设备上的 LocalSend 已打开（可以在后台运行）。
2. 当收到发送请求时，LocalSend 会弹出通知和界面提示。
3. 选择操作：
   - **"接受"**：接收文件，保存在默认下载目录（可设置）。
   - **"拒绝"**：拒绝此文件传输。
   - 勾选"记住选择"后，后续来自同一设备的传输会自动按此选择处理。
4. 文件传输完成后，在界面上会显示绿色对勾和接收速度。

![LocalSend 发送界面截图描述：左侧"发送"标签页下，上方显示设备列表（每个设备有名称、系统图标和连接状态指示器），中间显示已选中的待发送文件列表（文件名、大小、缩略图），底部有"添加文件"、"添加文件夹"、"添加文本"按钮和"发送"按钮。]

---

## 接收文件设置

### 接收模式
在 LocalSend 设置（齿轮图标）> **接收** 中，可以配置接收行为：

**1. 手动接受（默认）**
- 收到文件时弹出确认对话框，需要用户点击"接受"。
- 适合日常使用，防止他人误传或恶作剧。

**2. 自动接受（安全性较低）**
- 接收来自所有设备的文件（无确认）。
- 接收来自受信任设备的文件（白名单模式，推荐）。
- **配置白名单**：在"受信任设备"中添加已确认的设备名称或 IP。
- 适合家庭内部的 NAS/媒体中心等设备长期接收文件。

### 保存位置
在设置 > 接收 > 保存到中可修改接收文件的默认保存目录：
- Windows 默认：`%USERPROFILE%\Downloads\LocalSend`
- macOS 默认：`~/Downloads/LocalSend`
- Android 默认：`内部存储/Download/LocalSend`
- iOS 默认：`文件 > LocalSend`

建议改为 OneDrive/Dropbox 同步文件夹，方便在多设备间共享接收的文件。

---

## 多设备同时发送

LocalSend 支持一对多发送——你可以同时将同一批文件发送给多个设备。

**操作步骤：**
1. 在"发送"页面，设备列表左侧有勾选框（如果不显示，点击右上角的"多选"图标）。
2. 勾选所有要发送的目标设备。
3. 选择文件后点击"发送"。
4. 每个目标设备会独立显示传输进度。

> **注意**：接收端各自的接受/拒绝选择互不影响。如果某设备拒绝了传输，其他设备不受影响。

---

## 文本发送

除了文件传输，LocalSend 还支持直接发送文本内容：

1. 在发送界面点击 **"添加文本"**。
2. 输入要发送的文字（支持多行文本，如网址、备忘录、验证码等）。
3. 点击"确定"后文本显示在文件列表中。
4. 发送后，接收端的文本将自动复制到剪贴板，并显示在接收界面上供查看。

这个功能非常适合快速分享链接、WiFi 密码等短文本，比发微信/QQ 截图方便得多。

---

## 命令行发送（CLI）

LocalSend 提供了 CLI 工具，适合通过脚本或快捷键传输文件。

### Windows
```bash
# 使用 LocalSend CLI 发送文件
localsend-cli send --ip 192.168.1.100 --file "C:\Documents\report.pdf"

# 发送文本
localsend-cli send --ip 192.168.1.100 --text "Hello from CLI!"

# 发送到多个设备
localsend-cli send --ip 192.168.1.100 --ip 192.168.1.101 --file "photo.jpg"
```

### macOS / Linux
```bash
# 发送文件
localsend-cli send --ip 192.168.1.100 --file ~/Documents/report.pdf

# 发送目录
localsend-cli send --ip 192.168.1.100 --file ~/Pictures/vacation/
```

> CLI 模式需要接收端设置为"自动接受"或提前将发送端 IP 加入白名单，否则接收端需手动确认。

---

## 高级设置与配置建议

### 网络设置
在 设置 > 网络：
- **端口**：默认 53317（TCP + UDP）。如果端口被占用可自定义。
- **发现协议**：基于 mDNS（Bonjour）的局域网发现，确保路由器支持多播（绝大部分路由器都支持）。
- **HTTPS 证书**：LocalSend 使用自签名证书加密传输，首次连接时两端会自动信任证书。

### 隐私设置
在 设置 > 隐私与安全：
- **设备名称**：自定义在局域网中显示的名称（支持 emoji）。
- **隐藏设备**：启用后其他设备无法发现此设备，但仍可接收文件（需对方手动输入 IP 地址）。

### 主题设置
支持浅色/深色/跟随系统三种主题，在 设置 > 外观 中切换。

### 下载重命名规则
在 设置 > 接收 > 文件命名 中可设置：
- **保留原始文件名**（默认）
- **添加时间戳前缀**：如 `2025-01-01_1430_report.pdf`
- **自动编号**：同名文件自动追加编号（如 `photo(2).jpg`）

---

## 常见问题

**Q：设备无法发现对方？**
A：请按以下顺序排查：
1. 确认两台设备连接的是**同一个路由器**（检查 WiFi SSID 是否相同，是否连接到访客网络）。
2. 确认两台设备都运行着 LocalSend 且在前台（Android 可能需要允许后台运行）。
3. Windows 防火墙可能拦截了 LocalSend：Windows 安全中心 > 防火墙和网络保护 > 允许应用通过防火墙 > 确保 LocalSend 的"专用"网络已勾选。
4. 企业网络或校园网可能禁止设备间通信（禁用了 mDNS/多播），此时可手动输入 IP 地址连接。
5. 关闭 VPN 或代理软件——VPN 会改变网络环境，导致局域网发现失败。

**Q：传输速度慢？**
A：LocalSend 速度取决于你的局域网质量。理想情况下（千兆局域网 + 5GHz WiFi）可达 50~100 MB/s。慢速原因：
- 路由器有线接口是百兆而非千兆（瓶颈约 11 MB/s）。
- WiFi 信号差（建议使用 5GHz 频段）。
- 文件读写速度限制（尤其是老旧手机的闪存）。
- 如果传输时网络有其他大流量（视频流、游戏下载），Lan 带宽可能被共享。

**Q：是否支持断点续传？**
A：目前不支持断点续传。如果传输中断，需要重新发送整个文件。对于大文件（>1GB），建议使用 `rsync` 或 `SMB 共享` 替代。

**Q：LocalSend 收费吗？有广告吗？**
A：完全免费，无任何广告或内购。GPL-3.0 开源协议，源代码可见 [GitHub](https://github.com/localsend/localsend)。

**Q：iOS 截图经常失败 / 接收文件打不开？**
A：iOS 的"文件"应用权限限制较严格。建议：
1. 在 iOS 设置 > LocalSend > 文件与媒体，确保"所有文件"权限已开启。
2. 接收文件后，在"文件"应用中手动移动到更常用的目录（如 iCloud Drive）。

**Q：能否跨网段传输？**
A：默认不能——需要设备在同一个子网中。如果两台设备在不同子网（如一个连接主路由，一个连接二级路由），需要：
1. 方案一：手动输入 IP 地址（在 LocalSend "发送"页面点击"手动输入 IP"）。
2. 方案二：配置路由器使其支持 mDNS 转发（如 Avahi reflector）。
3. 方案三：使用 `localsend-cli` 直接指定目标 IP。

**Q：Android 后台被杀怎么办？**
A：Android 系统可能为了省电而杀掉 LocalSend 后台进程。请进行以下设置：
1. 系统设置 > 应用 > LocalSend > 电池 > 选择"不优化"或"无限制"。
2. 系统设置 > 应用 > LocalSend > 自启动管理 > 允许自启动。
3. 将 LocalSend 加入多任务锁屏应用（在最近任务列表中下拉锁定）。
