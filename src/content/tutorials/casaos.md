---
title: CasaOS 使用教程：旧电脑变身私人云
software: CasaOS
softwareSlug: casaos
difficulty: intermediate
category: 文件管理
order: 31
description: "从系统安装到应用部署，手把手教你搭建自己的私人云。"
---

## 软件简介

CasaOS 是一个基于 Docker 的轻量级个人云操作系统，由 IceWhale 团队用 Golang 开发，采用 Apache-2.0 开源协议。它的核心理念是让普通用户也能轻松搭建私有云/NAS，无需懂 Linux 命令行或 Docker 技术细节。

与群晖（Synology）或威联通（QNAP）这类商业 NAS 系统相比，CasaOS 的最大优势是极简——安装只需一行命令，Web UI 设计现代直观，应用商店内置 100+ Docker 应用可一键部署。它可以在树莓派、老旧 PC、玩客云、各种 x86/ARM 设备上运行，将闲置硬件变成一个功能完整的私人云服务器。

CasaOS 的主要功能模块包括：仪表盘（系统状态总览）、文件管理、应用商店、设置中心。默认通过服务器的 80 端口提供 Web 界面访问。

## 安装前提

在开始安装前，请准备：

- 一台 Linux 设备（推荐 Ubuntu/Debian，也支持树莓派 OS、Armbian、OpenWrt 等）
- 设备已连接网络，建议使用有线连接以保证稳定性
- 至少 2GB 内存、16GB 存储空间（推荐 4GB+ 内存、64GB+ 存储）
- 系统已安装 curl（大多数 Linux 发行版自带）
- 如需外网访问，建议准备一个域名或配置 DDNS

> **注意**：CasaOS 依赖 Docker 运行。安装脚本会自动安装 Docker，如果你已有 Docker 环境建议先备份现有容器。

## 安装方式

### 方式一：一键安装脚本（推荐）

CasaOS 提供官方一键安装脚本，适用于大多数 Linux 发行版：

```bash
curl -fsSL https://get.casaos.io | bash
```

安装过程大约需要 3-10 分钟，取决于网络速度。脚本会自动完成以下工作：

1. 检测系统架构（x86_64 / ARM64 / ARMv7）
2. 安装 Docker 引擎（如果尚未安装）
3. 拉取 CasaOS 核心镜像
4. 启动 CasaOS 服务
5. 配置开机自启

安装完成后终端会显示类似如下信息：

```
CasaOS installed successfully!
Web UI: http://<你的IP地址>
```

### 方式二：手动安装

如果你的设备不方便使用一键脚本，也可以手动安装：

```bash
# 1. 安装 Docker
curl -fsSL https://get.docker.com | bash
sudo systemctl enable --now docker

# 2. 下载 CasaOS
wget -qO- https://github.com/IceWhaleTech/CasaOS/archive/refs/tags/v0.4.12.tar.gz | tar xz

# 3. 进入目录执行安装
cd CasaOS-*
sudo ./install.sh
```

### 方式三：在已有 Docker 环境上安装

如果你已经运行着 Portainer 或其他 Docker 管理工具，CasaOS 可以共存。安装脚本会检测现有 Docker 环境并跳过 Docker 安装步骤，仅部署 CasaOS 容器。

## 首次启动设置

### 1. 访问 Web 界面

在浏览器中输入 `http://<你的设备IP地址>`（例如 `http://192.168.1.100`）。如果使用安装 CasaOS 的设备本身的浏览器，可以直接访问 `http://localhost`。

> **提示**：如果你不知道设备的 IP 地址，可以在路由器后台查看，或在设备终端输入 `ip addr`（Linux）或 `ifconfig`。

### 2. 创建管理员账号

首次访问会进入设置向导：

1. **设置用户名**：输入管理员用户名（例如 `admin`）
2. **设置密码**：输入强密码（建议 8 位以上，包含字母和数字）
3. **确认密码**：再次输入密码

完成设置后点击"创建"即可进入 CasaOS 主界面。

> **安全提示**：请务必设置强密码，尤其当你计划开启外网访问时。不要使用 `admin/123456` 这类弱密码。

## Web 界面功能详解

### 仪表盘

登录后首先看到的是仪表盘，包含：

- **系统状态卡片**：CPU 使用率、内存占用、存储空间、网络流量
- **最近添加的应用**：快捷入口
- **系统通知**：更新提醒、存储告警等
- **快捷操作**：上传文件、创建文件夹、打开终端

仪表盘顶部的搜索框可以快速查找应用和文件。

### 文件管理

CasaOS 的文件管理器支持完整的文件操作：

- **浏览文件**：树形目录结构，支持缩略图预览（图片、视频）
- **上传文件**：支持拖拽上传和点击选择，单文件最大 4GB
- **下载文件**：点击文件即可下载
- **文件操作**：新建文件夹、重命名、移动、复制、删除
- **分享功能**：右键文件选择"分享"，生成分享链接（可设置有效期和访问密码）
- **文本编辑器**：直接编辑代码文件（支持语法高亮）
- **图片预览**：内置图片查看器，支持幻灯片播放
- **视频播放**：内置播放器，支持常见视频格式

文件管理器默认展示 `/DATA` 目录下的内容，这是 CasaOS 的数据存储目录。

### 应用商店

应用商店是 CasaOS 的核心功能之一，内置 100+ Docker 应用，全部支持一键安装。

**热门应用推荐：**

| 应用 | 用途 | 安装要点 |
|------|------|---------|
| Nextcloud | 私有云盘，文件同步/分享 | 建议分配独立存储卷（20GB+） |
| Jellyfin | 多媒体服务器，影视管理 | 需配置媒体库路径 |
| AdGuard Home | 网络广告过滤/DNS 服务器 | 安装后需修改路由器 DNS |
| qBittorrent | BT 下载工具 | 注意配置下载目录和端口映射 |
| Aria2 | 轻量级下载器 | 配合 AriaNg Web 界面使用 |
| Home Assistant | 智能家居控制中心 | 需配置 Zigbee/Z-Wave 硬件 |
| WordPress | 建站工具 | 安装时可选 MySQL/MariaDB |
| Photoprism | AI 相册管理 | 自动识别人脸/地点/标签 |
| Pi-hole | 网络广告拦截 | 类似 AdGuard，更轻量 |

**安装步骤：**

1. 点击左侧菜单"应用商店"
2. 浏览或搜索应用（支持分类筛选：工具、媒体、开发、安全等）
3. 点击应用卡片进入详情页
4. 查看应用描述、所需资源、端口映射信息
5. 点击"安装"按钮
6. 配置存储路径和端口（高级用户可自定义，新手建议使用默认值）
7. 等待安装进度条完成（Docker 镜像拉取耗时取决于网速）
8. 安装完成后，应用卡片会显示"已安装"和"打开"按钮

### 设置中心

设置中心包含以下配置模块：

- **系统信息**：设备名称、CasaOS 版本、Docker 版本、系统版本
- **存储管理**：查看磁盘使用情况，支持挂载外部存储设备
- **用户管理**：修改密码、添加子账户（可分配不同权限）
- **端口管理**：查看和修改 CasaOS 和应用的端口映射
- **网络设置**：配置代理服务器（如需要）
- **备份与恢复**：备份 CasaOS 配置，方便迁移到新设备
- **系统更新**：检查并更新 CasaOS 到最新版本
- **日志查看**：系统运行日志，用于排查问题

## 外网访问配置

要让 CasaOS 能从外网访问，有以下几种方式：

### DDNS（动态域名解析）

1. 在路由器上设置 DDNS（大多数路由器支持花生壳、3322 等）
2. 绑定一个域名到你的公网 IP
3. 在路由器设置端口转发，将外部端口（如 8080）转发到内网 CasaOS 设备的 80 端口

### Cloudflare Tunnel（推荐）

使用 Cloudflare 的免费 Tunnel 服务，无需公网 IP：

```bash
# 在 CasaOS 终端中安装 cloudflared
docker run -d --name cloudflared \
  --restart=unless-stopped \
  cloudflare/cloudflared:latest tunnel --no-autoupdate \
  run --token <你的Tunnel Token>
```

### 反向代理（Nginx Proxy Manager）

在 CasaOS 应用商店中搜索安装"**Nginx Proxy Manager**"，配置反向代理规则，添加 SSL 证书，实现通过域名安全访问 CasaOS 和各个应用。

## 在特定设备上安装的注意事项

### 树莓派（Raspberry Pi）

- 推荐 Raspberry Pi 4B 或 5（4GB+ 内存）
- 操作系统推荐 Raspberry Pi OS Lite（64 位）
- 建议使用 SSD（USB 3.0 外接）而非 SD 卡，提升 I/O 性能
- 安装命令与标准 Linux 相同

### 玩客云（OneCloud）

- 需先刷入 Armbian 系统（参照网上教程）
- 玩客云只有 1GB 内存，建议不要同时运行过多 Docker 容器
- 推荐安装轻量应用：Aria2、qBittorrent、AdGuard Home

### 老旧 PC / 笔记本

- 推荐安装 Ubuntu Server 或 Debian，不需要桌面环境
- 建议将硬盘清理后重新分区，专门用于 CasaOS 数据存储
- 可以通过 BIOS 设置通电自启，实现无人值守运行

## CasaOS 与商业 NAS 的对比

| 特性 | CasaOS | 群晖 DSM | QNAP QTS |
|------|--------|----------|----------|
| 价格 | 免费 | 硬件捆绑（数千元+） | 硬件捆绑（数千元+） |
| 安装难度 | 一行命令 | 中等（需专用引导） | 中等 |
| 硬件兼容 | 广泛（x86/ARM） | 仅自家硬件 | 仅自家硬件 |
| 应用数量 | 100+（Docker） | 官方+社区第三方 | 官方+社区第三方 |
| Docker 支持 | 原生集成 | 需安装套件 | 需安装 Container Station |
| RAID 支持 | 基本 | 专业（SHR/RAID） | 专业（RAID 全系列） |
| 用户权限 | 基础 | 精细 | 精细 |
| 移动端 App | 有（CasaOS App） | 丰富 | 丰富 |
| 社区活跃度 | 高（GitHub 20k+ Stars） | 极高 | 高 |

**总结**：CasaOS 适合追求简单易用的个人用户、家庭用户、DIY 爱好者。如果你需要企业级 RAID、精细权限管理、多用户协作等高级功能，群晖/QNAP 仍然是更专业的选择。但作为零成本将闲置设备变废为宝的方案，CasaOS 无疑是最佳入门之选。

## 常见问题

**Q：安装后无法访问 Web 界面？**

A：检查设备防火墙是否放行 80 端口：`sudo ufw allow 80`。也可尝试通过 `http://localhost` 在本机访问。

**Q：应用商店加载失败？**

A：确认 Docker 运行正常：`sudo systemctl status docker`。检查网络连接，部分地区可能需要配置 Docker 镜像加速器。

**Q：如何彻底卸载 CasaOS？**

A：运行 `curl -fsSL https://get.casaos.io/uninstall | bash` 即可卸载并清理数据。

**Q：外网访问速度慢怎么办？**

A：建议使用 Cloudflare Tunnel 或 frp 内网穿透。如果家宽上传带宽有限，可限制 qBittorrent 等下载工具的上传速度。
