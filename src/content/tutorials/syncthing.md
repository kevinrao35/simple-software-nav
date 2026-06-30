---
title: Syncthing 使用教程：免费搭建私人云同步
software: Syncthing
softwareSlug: syncthing
difficulty: intermediate
category: 文件管理
order: 23
description: "从安装到多设备配对，学会用 Syncthing 实现电脑手机文件自动同步。"
---

## 软件简介

Syncthing 是一个用 Go 语言编写的开源 P2P 文件同步工具。它不依赖任何云服务商，设备之间直连传输，文件不会经过任何第三方服务器。所有传输均采用 TLS 加密，确保数据在传输过程中不会被窃听或篡改。

与传统的网盘方案（OneDrive、Dropbox、百度网盘等）不同，Syncthing 不需要注册账号，没有存储空间限制（仅受设备硬盘大小限制），也不存在文件被扫描审查的风险。它采用去中心化的 P2P 架构，每台设备都是对等节点，既可以是发送方也可以是接收方。

## 核心特性

- **P2P 直连同步**：文件在设备间直接传输，不经过任何中央服务器
- **端到端加密**：所有通信使用 TLS 加密，每台设备有独立的加密证书
- **版本控制**：保留文件的历史版本，误改或误删后可恢复
- **选择性同步**：可以只同步文件夹中的部分子目录或文件
- **冲突处理**：当文件在多台设备上同时修改时，自动保留冲突副本
- **跨平台支持**：Windows、macOS、Linux、Android、BSD、NAS（群晖、QNAP 等）
- **中继与发现**：设备在 NAT 后面时自动通过中继服务器转发或通过发现服务器寻找对方
- **Web 管理界面**：浏览器访问 `http://localhost:8384` 即可管理

## 各平台安装方法

### Windows

**方法一：官方安装包（推荐）**
1. 访问 https://syncthing.net/downloads/ 下载 Windows 版本的 exe 安装包
2. 运行安装程序，按向导完成安装
3. 安装后 Syncthing 会自动启动并在系统托盘运行，浏览器会自动打开管理界面

**方法二：便携版**
1. 下载 Windows 版本的 zip 压缩包
2. 解压到任意目录（如 `C:\Syncthing`）
3. 直接运行 `syncthing.exe` 即可，无需安装

### macOS

**方法一：Homebrew**
```bash
brew install syncthing
brew services start syncthing
```
安装后管理界面访问 `http://localhost:8384`

**方法二：dmg 安装包**
1. 从 https://syncthing.net/downloads/ 下载 macOS 版本
2. 打开 dmg 文件，将 Syncthing 拖入 Applications 文件夹
3. 首次启动时需要允许在"系统偏好设置 > 安全性与隐私"中允许运行

### Linux

**方法一：APT（Debian/Ubuntu）**
```bash
# 添加官方仓库
sudo mkdir -p /etc/apt/keyrings
sudo curl -fsSL https://syncthing.net/release-key.txt | sudo gpg --dearmor -o /etc/apt/keyrings/syncthing-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
sudo apt update
sudo apt install syncthing
```

**方法二：Snap**
```bash
sudo snap install syncthing
sudo snap start syncthing
```

**方法三：Flatpak**
```bash
flatpak install flathub me.kozec.syncthingtk
flatpak run me.kozec.syncthingtk
```

### Android

推荐安装 **Syncthing-Fork**（社区分支，比官方版维护更活跃）：
1. 在 F-Droid 搜索 Syncthing-Fork 安装
2. 或在 GitHub Releases 下载 APK：https://github.com/Catfriend1/syncthing-android

## 首次设置流程

### 第一步：添加设备

在设备 A 上操作：
1. 打开 Web 管理界面 `http://localhost:8384`
2. 点击右下角的 **操作** 按钮（齿轮图标）
3. 选择 **显示设备 ID**
4. 复制出现的设备 ID（一个长的字符串，如 `4ZPNF3V-...`）

在设备 B 上操作：
1. 同样打开 Web 管理界面
2. 点击右上角的 **添加远程设备** 按钮
3. 粘贴设备 A 的 ID
4. 设备 A 会收到配对请求弹窗，点击 **添加设备** 确认

两台设备之间会开始加密握手，建立直接连接。如果两台设备在同一个局域网内，会自动使用局域网直连（速度最快）。如果不在同一网络，会自动通过发现服务器和中继服务器建立连接。

### 第二步：共享文件夹

1. 在任意一台设备上点击 **添加文件夹**
2. 设置 **文件夹标签**（如"工作文档"）
3. 设置 **文件夹路径**（如 `C:\Users\YourName\Sync\WorkDocs`）
4. 在 **共享** 标签页中勾选要同步到的设备
5. 点击 **保存**

另一台设备会收到共享文件夹邀请，选择接受并设置本地路径后，文件就开始同步。

## Web 管理界面功能详解

Syncthing 的 Web 界面（默认端口 8384）主要分为以下几个区域：

**顶部状态栏**
- 显示已连接设备数量、当前同步进度、网络流量
- 点击地球图标可选择界面语言（支持简体中文）

**左侧设备列表**
- 展示所有已添加的远程设备
- 每个设备显示连接状态（已连接/断开/正在重连）、设备名称和加密指纹

**中央文件夹列表**
- 每个共享文件夹显示同步状态（已同步/同步中/待同步）
- 显示文件总数、总大小、待同步文件数
- 点击文件夹可查看详细的同步文件列表

**右下角操作菜单**
- 显示设备 ID
- 重启 / 关闭 Syncthing
- 高级设置入口（监听地址、速率限制、GUI 设置等）

## 文件夹类型

在添加或编辑文件夹时，需要设置**文件夹类型**：

- **发送和接收**：默认类型。本地文件的修改会发送给远程设备，远程设备的修改也会同步到本地。双向同步，适合日常文档同步。
- **仅发送**：本地修改会发送给远程设备，但远程设备的修改不会同步回来。适合备份场景（如服务器备份到 NAS）。
- **仅接收**：接收远程设备的修改，但本地修改不会同步出去。适合在终端设备上查看文件（如办公电脑从服务器接收资料）。

## 版本控制设置

Syncthing 内置了文件版本控制功能，防止误修改或误删除。在编辑文件夹时进入 **文件版本控制** 标签页：

**简单文件版本控制**
- 保留被替换或删除的文件到 `.stversions` 目录
- 可设置保留天数（例如 30 天）
- 适合大多数用户

**回收站版本控制**
- 类似 Windows 回收站逻辑
- 文件被删除后在回收站中保留指定天数

**阶梯式版本控制**
- 按时间阶梯保留多个版本：最近每 1 小时保留一个，之后每 1 天保留一个，再之后每 1 周保留一个
- 更精细的版本保留策略
- 适合频繁修改的重要文件

恢复旧版本：进入同步文件夹下的 `.stversions` 目录（默认隐藏），找到对应的历史版本文件直接复制出来即可。

## 中继和发现服务器原理

**全局发现服务器**
- 作用：帮助设备互相找到对方
- 设备启动时向发现服务器报告自己的地址
- 另一台设备查找时获取地址列表
- 地址 `https://discovery.syncthing.net/`

**中继服务器**
- 当设备无法直接连接时（如双方都在严格的 NAT 后面），数据通过中继服务器转发
- 中继服务器只能看到加密的数据流，无法查看文件内容
- Syncthing 会自动选择延迟最低的中继
- 所有传输经过 TLS 加密，中继无法解密

默认情况下这两个功能都是开启的，数据始终加密。如果你对隐私有极端要求，可以自建发现服务器和中继服务器，然后在设置中关闭官方服务器。

## 高级设置（速率限制与过滤）

### 速率限制

在 **设置 > 连接** 中可以设置：
- **总下载速率**：限制所有同步下载的最大速度（如 5000 KB/s）
- **总上传速率**：限制同步上传的最大速度
- **单设备速率**：单独限制每台设备的上下行速度

建议在家用网络中上传限速，避免占满上行带宽导致网络卡顿。

### 忽略模式（.stignore）

与 `.gitignore` 类似，在 `~/.config/syncthing/.stignore` 或文件夹根目录下创建 `.stignore` 文件，用于排除不需要同步的文件：

```
# 忽略临时文件
*.tmp
*.bak
~$*

# 忽略系统文件
Thumbs.db
.DS_Store

# 忽略特定目录
node_modules/
.cache/
__pycache__/
```

## 安全建议与防火墙设置

### 防火墙放行

Syncthing 默认使用的端口：
- **22000/TCP**：设备间数据传输端口
- **21027/UDP**：局域网发现协议端口

如果开启 Windows 防火墙或路由器防火墙，需要放行这两个端口以加速直连同步。

Windows 防火墙设置：
1. 打开"控制面板 > Windows Defender 防火墙 > 允许应用通过防火墙"
2. 点击"允许其他应用"，添加 `syncthing.exe`
3. 确保专用网络和公用网络都勾选

### 安全最佳实践

1. **始终使用 HTTPS**：在设置中启用 GUI 的 HTTPS，避免管理界面被中间人攻击
2. **设置 GUI 认证用户和密码**：防止局域网内他人访问设备管理界面
3. **设备 ID 验证**：添加设备时核对对方显示的 ID 是否一致，防止中间人攻击
4. **定期检查连接状态**：留意是否有未知设备连接
5. **启用版本控制**：重要文件夹开启版本控制，防止误操作

## 常见问题

**Q：同步速度慢怎么办？**
A：检查是否是中继连接（状态显示"已连接（中继）"），中继连接比直连慢。尝试在路由器上开启 UPnP 或手动转发端口 22000/TCP，让设备建立直连。

**Q：两台设备不在同一个局域网，能同步吗？**
A：可以。Syncthing 会自动通过全局发现服务器寻找对方，如果双方都不能直连，会自动通过中继服务器加密转发。

**Q：文件冲突了怎么办？**
A：当文件在两台设备上同时被修改时，Syncthing 会自动保存冲突副本，文件名会加上 `.sync-conflict-日期时间-设备名称` 后缀。手动比较两个版本的内容，合并后删除冲突文件即可。

**Q：如何卸载 Syncthing？**
A：Windows 在控制面板卸载（安装版）或直接删除目录（便携版）。注意备份 `~/.config/syncthing/` 目录下的配置文件，里面有设备密钥和 ID。
