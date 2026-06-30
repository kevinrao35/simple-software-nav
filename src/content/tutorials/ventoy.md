---
title: Ventoy 使用教程：一招搞定所有启动 U 盘
software: Ventoy
softwareSlug: ventoy
difficulty: beginner
category: 系统优化
order: 24
description: "从安装 Ventoy 到制作多系统 U 盘，学会最简单实用的启动盘制作方法。"
---

## 软件简介

Ventoy 是一个开源的启动 U 盘制作工具（GPLv3 协议），由国内开发者 longpanda 创建，GitHub 星标超过 68k。它的核心理念与传统的 Rufus、UltraISO、balenaEtcher 等工具完全不同：传统的启动盘制作工具在写入系统镜像时需要格式化 U 盘，而一个 U 盘只能存放一个系统镜像。Ventoy 在安装到 U 盘后，你只需要把 ISO 文件直接复制到 U 盘里就能启动，不需要反复格式化。

这意味着你可以把 Windows 10、Windows 11、Ubuntu、CentOS、Deepin、PE 工具箱等多个系统的 ISO 镜像文件全部存放在同一个 U 盘上，启动时 Ventoy 会显示一个菜单让你选择要启动哪个系统。

Ventoy 支持超过 1200 种 ISO 文件的启动，还支持 WIM、IMG、VHD(x)、EFI 等文件格式。兼容 Legacy BIOS 和 UEFI 两种启动模式，并且支持安全启动（Secure Boot）。

## 核心特性

- **复制即用**：ISO 文件直接拷贝到 U 盘即可启动，无需重复格式化
- **多系统共存**：一个 U 盘可以放几十个 ISO，互不干扰
- **广泛兼容**：支持 1200+ 种 ISO 文件，几乎涵盖所有主流 Linux 发行版和 Windows
- **双模式启动**：同时支持 Legacy BIOS 和 UEFI（包括 x86_64 和 IA32）
- **安全启动**：支持 UEFI Secure Boot（需导入密钥）
- **持久化**：为 Linux Live USB 创建持久化存储，重启后数据不丢失
- **插件系统**：通过 ventoy.json 配置文件实现自动安装、主题美化等高级功能
- **无损升级**：更新 Ventoy 版本不会丢失 U 盘上的 ISO 文件

## 下载与安装

### 下载

从 Ventoy 官方 GitHub Releases 页面下载：
- https://github.com/ventoy/Ventoy/releases

下载 `ventoy-版本号-windows.zip`（Windows）或 `ventoy-版本号-linux.tar.gz`（Linux）。

### Windows 安装步骤

1. 解压下载的 zip 文件，运行 `Ventoy2Disk.exe`（可能需要管理员权限）
2. 插入 U 盘（建议使用至少 16GB 的 U 盘，推荐 32GB 或 64GB）
3. 在 Ventoy2Disk 界面中，**确认 U 盘选择正确**（这一步会格式化 U 盘！）
4. 检查 **分区类型**：
   - **MBR**：兼容性最好，支持 Legacy BIOS 和 UEFI，推荐在较老的电脑上使用
   - **GPT**：纯 UEFI 启动，如果只在近年购买的电脑上使用可选此项
5. 点击 **安装** 按钮
6. 弹出警告确认对话框，确认无误后点击 **是**
7. 等待安装完成（通常只需几秒钟）

安装完成后，U 盘会被分为两个分区：
- 第一个分区（大容量）：数据分区，格式为 exFAT，用来存放 ISO 文件
- 第二个分区（小容量）：Ventoy 引导分区，自动隐藏

> **警告**：安装 Ventoy 会格式化 U 盘，清空所有数据。如果有重要数据请提前备份。

### Linux 安装步骤

```bash
# 解压
tar -xzf ventoy-版本号-linux.tar.gz
cd ventoy-版本号

# 查看 U 盘设备名（确认是 /dev/sdX 而不是 /dev/sda）
sudo fdisk -l

# 安装 Ventoy 到 U 盘（以 /dev/sdb 为例）
sudo sh Ventoy2Disk.sh -i /dev/sdb

# 使用 GPT 分区表
sudo sh Ventoy2Disk.sh -i -g /dev/sdb

# 启用安全启动支持
sudo sh Ventoy2Disk.sh -i -s /dev/sdb
```

## 基本使用：三步制作多系统启动盘

### 第一步：安装 Ventoy 到 U 盘

按上述 Windows 或 Linux 方法完成 Ventoy 安装。

### 第二步：复制 ISO 文件到 U 盘

1. 打开 Ventoy 安装后的 U 盘（通常盘符为 VENTOY）
2. 直接将下载好的 ISO 文件复制到 U 盘根目录或任意子文件夹中
3. 可以同时复制多个 ISO 文件，例如：
   ```
   U 盘根目录/
   ├── Windows 11 24H2.iso
   ├── Windows 10 22H2.iso
   ├── ubuntu-24.04-desktop.iso
   ├── Deepin 23.iso
   ├── Hiren's BootCD PE x64.iso
   └── ISOs/                    （也可以放到子目录中）
       ├── CentOS-Stream-10.iso
       └── archlinux-2025.iso
   ```
4. 复制完成后可以正常弹出 U 盘

### 第三步：从 U 盘启动

1. 将 U 盘插入需要启动的电脑
2. 开机时按特定的快捷键进入启动菜单（不同品牌按键不同）：
   - **F12**：戴尔、联想、惠普
   - **F11**：小米、华为
   - **F10**：华硕
   - **F9**：惠普
   - **F7**：华为 MateBook
   - **Esc**：华硕、技嘉
   - 或者进 BIOS 设置 U 盘为第一启动项
3. 选择 U 盘启动
4. Ventoy 引导菜单显示所有 ISO 文件列表
5. 用键盘上下键选择要启动的 ISO，按回车确认
6. 如果遇到启动异常，可以按 F1 或 F2 尝试不同的启动模式

## Ventoy 升级方法

当 Ventoy 发布了新版本时，可以无损升级，U 盘上已有的 ISO 文件不会丢失：

### Windows
1. 打开新版本的 `Ventoy2Disk.exe`
2. 确保 U 盘已插入，选择正确的 U 盘
3. 点击 **更新** 按钮（不是安装按钮）
4. 等待更新完成

### Linux
```bash
sudo sh Ventoy2Disk.sh -u /dev/sdb
```

## 持久化分区（Linux Live USB）

如果你使用 Linux 发行版的 Live 模式（如 Ubuntu 试用的 U 盘环境），默认重启后所有设置、安装的软件、保存的文件都会丢失。Ventoy 的持久化功能可以解决这个问题。

### 创建持久化分区

**方法一：在 Ventoy2Disk GUI 中创建**
1. 安装 Ventoy 后，点击 **配置选项 > 创建持久化分区**
2. 设置持久化分区的大小（例如 4GB、8GB）
3. 点击确定

**方法二：使用命令行**
```bash
# Windows（管理员 cmd）
Ventoy2Disk.exe -P 4096   # 4GB 持久化分区，单位 MB

# Linux
sudo sh Ventoy2Disk.sh -P 4096 /dev/sdb
```

### 使用持久化功能

1. 安装 Ventoy 时创建了持久化分区后，将 Linux ISO 复制到 U 盘数据分区
2. 启动时选择对应的 ISO，Ventoy 菜单底部会显示"持久化"相关的选项
3. 部分 Linux 发行版（如 Ubuntu、MX Linux）支持自动检测持久化分区
4. 在 Live 环境中安装的软件和保存的文件，会在下次启动时保留

**注意**：持久化功能依赖 Linux 发行版本身的支持，不是所有发行版都兼容。

## 安全启动（Secure Boot）配置

许多新电脑默认开启 Secure Boot，如果没有正确配置，Ventoy 启动时会报错。有两种解决方法：

### 方法一：导入 Ventoy 密钥

1. 启动系统时进入 BIOS 设置
2. 找到 Secure Boot 相关设置（通常在 Security 或 Boot 选项卡中）
3. 选择导入自定义密钥或切换到 Setup Mode
4. 重启从 Ventoy U 盘启动，Ventoy 会提示导入密钥

### 方法二：安装时启用

在 Windows 版 Ventoy2Disk 中：
1. 点击 **配置选项 > 安全启动支持**
2. 点击 **安装** 或 **更新** 时自动包含安全启动密钥

或者在 Linux 下安装时加 `-s` 参数：
```bash
sudo sh Ventoy2Disk.sh -i -s /dev/sdb
```

### 方法三：关闭 Secure Boot

如果前两种方法不成功，可以在 BIOS 中暂时关闭 Secure Boot。对于临时启动系统来说，关闭 Secure Boot 不会有安全风险（安装完系统后可以重新打开）。BIOS 中找到 Secure Boot 选项，设为 Disabled，保存退出。

## 插件配置（ventoy.json）

Ventoy 支持通过 `ventoy.json` 配置文件实现许多高级功能。在 U 盘根目录下创建 `ventoy.json` 文件（注意文件名必须全小写），写入 JSON 格式的配置。

### 示例配置

```json
{
    "control": [
        { "VTOY_DEFAULT_SEARCH_ROOT": "/ISO" },
        { "VTOY_MENU_TIMEOUT": "0" },
        { "VTOY_TREE_VIEW_MENU_STYLE": "1" },
        { "VTOY_FILT_DOT_UNDERSCORE_FILE": "1" }
    ],
    "theme": {
        "file": "/ventoy/theme/theme.txt",
        "gfxmode": "1920x1080"
    },
    "persistence": [
        {
            "image": "/ubuntu-24.04-desktop.iso",
            "backend": "/persistence/ubuntu.dat"
        }
    ],
    "injection": [
        {
            "image": "/Windows.iso",
            "dir": "/ventoy/injection"
        }
    ]
}
```

### 常用配置项说明

- **VTOY_DEFAULT_SEARCH_ROOT**：Ventoy 搜索 ISO 文件的根目录，默认是整个 U 盘
- **VTOY_MENU_TIMEOUT**：启动菜单超时时间（秒），0 表示不自动选择
- **VTOY_TREE_VIEW_MENU_STYLE**：启用树形菜单样式，方便浏览子文件夹
- **VTOY_FILT_DOT_UNDERSCORE_FILE**：隐藏以点或下划线开头的文件
- **persistence**：持久化配置，每个 ISO 可以指定不同的后端文件
- **injection**：驱动注入，在安装 Windows 时注入驱动
- **theme**：自定义 Ventoy 启动菜单的主题

详细配置说明可参考官方文档：https://www.ventoy.net/en/Plugin.html

### 自动安装（无人值守）

通过 `ventoy_grub.cfg` 或 `ventoy.json` 中的 `injection` 插件，可以在安装 Windows 时自动绕过一些交互（如跳过产品密钥输入、自动创建账户等）。对于 Linux，配合发行版自带的 preseed/kickstart 文件可以实现全自动安装。

## 常见问题与排错

**Q：启动时出现 "Failed to load ldlinux.c32"？**
A：通常是 U 盘引导记录损坏。重新运行 Ventoy 安装一次即可修复。

**Q：我的某个 ISO 无法启动？**
A：Ventoy 虽然兼容 1200+ ISO，但仍有个别发行版可能存在兼容性问题。可以尝试：
1. 启动时按 F1 切换到 grub2 模式
2. 按 F2 切换到传统模式
3. 按 F5 查看启动日志找出问题原因
4. 在 Ventoy GitHub Issues 中搜索该 ISO 的兼容情况

**Q：U 盘可以同时使用存储功能吗？**
A：可以。Ventoy 的数据分区是正常的文件系统（默认 exFAT），除了放 ISO 文件，你还可以放任何普通文件。Windows 和 macOS 也可以正常读写。

**Q：Ventoy 支持移动硬盘吗？**
A：支持。Ventoy 可以安装在移动硬盘上，甚至是 SSD 移动硬盘，启动速度会更快。

**Q：安装 Ventoy 失败，提示 "Device is busy"？**
A：关闭所有可能占用 U 盘的程序（如文件管理器打开的 U 盘窗口、杀毒软件等），或者拔插 U 盘后重试。在 Linux 下先卸载所有挂载的分区。

**Q：如何彻底移除 Ventoy？**
A：在 Windows 版 Ventoy2Disk 中点击 **配置选项 > 清除 Ventoy**，或者直接用 Diskpart 或磁盘管理工具删除所有分区，重新格式化 U 盘即可。
