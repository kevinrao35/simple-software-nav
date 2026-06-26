---
title: MAS 使用教程：Windows & Office 永久激活
software: MAS
softwareSlug: mas
difficulty: beginner
category: 系统工具
order: 11
description: "开源透明的 Windows 和 Office 激活脚本，HWID 数字永久激活，一条 PowerShell 命令搞定。"
---

## 下载与使用

MAS 最新的推荐方式是通过 PowerShell 一键运行：

1. 右键点击「开始」按钮，选择 **Windows PowerShell (管理员)** 或 **终端(管理员)**。
2. 复制粘贴以下命令后回车：

```powershell
irm https://get.activated.win | iex
```

3. 等待脚本加载完成，会显示绿色菜单。
4. 根据菜单输入对应的数字选择激活方式。

> 如果 `get.activated.win` 被 ISP 屏蔽，可以启用 DNS-over-HTTPS：
> ```powershell
> iex (curl.exe -s --doh-url https://1.1.1.1/dns-query https://get.activated.win | Out-String)
> ```
> 如果遇到 TLS/SSL 错误（旧版 Windows），先运行：
> ```powershell
> [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12
> ```

### 传统方式（离线）

如果不想用 PowerShell 命令，也可以直接从 **massgrave.dev** 下载 `MAS_AIO.zip`，解压后以管理员身份运行 `MAS_AIO.cmd`，同样弹出绿色菜单选择激活方式。

## 四种激活方式

### 1. HWID 数字许可证激活（推荐 Windows）

- **适用**：Windows 10 / 11
- **有效期**：永久
- **需要联网**：是
- **特点**：一次激活，重装同版本系统后自动恢复

微软服务器会记录你的设备硬件信息，以后重装联网自动激活。

### 2. Ohook 激活（推荐 Office）

- **适用**：Office（2016/2019/2021/2024/365）
- **有效期**：永久
- **需要联网**：否
- **特点**：本地激活，最稳定可靠的 Office 永久方案

### 3. TSforge 激活

- **适用**：Windows / ESU / Office
- **有效期**：永久
- **需要联网**：Windows Build 26100 及以上需要
- **特点**：新一代永久激活方案

### 4. Online KMS 激活

- **适用**：Windows / Office
- **有效期**：180 天（自动续期）
- **需要联网**：是
- **特点**：适合批量部署

## 其他功能

- **版本切换**：一键转换 Windows 或 Office 版本（如家庭版→专业版）
- **激活状态检查**：查看当前 Windows/Office 激活状态
- **无人值守模式**：支持命令行参数，适合装机批量部署

## 最新版本

MAS 当前最新版本为 v3.11（2026-05-02），托管在 GitHub、Azure DevOps 和自建 Git 服务上。

## 常见问题

### 安全吗？

MAS 是完全开源的批处理脚本，代码透明可见。GitHub 100k+ Stars，是 Windows 激活工具中最受信任的一个。

### 杀毒软件报毒怎么办？

MAS 本身是安全的批处理脚本，但激活操作会修改系统授权，某些杀软会误报。建议从 massgrave.dev 官方渠道下载，用 Windows Defender 扫描通常不会报。

### HWID 和 KMS 有什么区别？

- **HWID**：永久激活，重装自动恢复。适合个人电脑。
- **KMS**：180 天有效期，需续期。适合企业批量部署。

### 支持 Windows 7 吗？

MAS 主要支持 Windows 10/11。Windows 7 可使用 KMS 方式激活，不支持 HWID。
