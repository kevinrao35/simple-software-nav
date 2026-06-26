---
title: Czkawka 使用教程：1 分钟清理几十 G 垃圾文件
software: Czkawka
softwareSlug: czkawka
difficulty: beginner
category: 系统优化
order: 21
description: "从安装到高级用法，手把手教你用 Czkawka 释放磁盘空间。"
---

## 软件简介

Czkawka（波兰语发音类似"shkafka"，意为**"打嗝"**）是一款用 **Rust 语言** 编写的极速重复文件清理工具。它拥有双重界面：基于 GTK4 的 GUI 图形界面和功能完整的 CLI 命令行界面。

它的核心优势在于**速度**——得益于 Rust 的零成本抽象和内存安全特性，Czkawka 扫描 1TB 的大容量硬盘只需要约 1 分钟（使用哈希比较模式），远快于同类工具如 dupeGuru、CCleaner 等。

安全方面，Czkawka **不会自动删除任何文件**，所有操作都需要用户手动确认。默认的"删除"操作是移动到回收站/垃圾桶，给用户留了反悔的余地。

## 核心特性

- **6 种清理模式**：
  1. **重复文件（Duplicates）**：通过哈希（Hash）比较或文件名+大小比较找出完全相同的文件。
  2. **相似图片（Similar Images）**：使用感知哈希算法（Perceptual Hashing）找出视觉上相似的图片，即使分辨率或压缩率不同。
  3. **空文件夹（Empty Folders）**：查找并列出所有空目录。
  4. **大文件（Big Files）**：按指定大小阈值列出所有大文件，方便定位占用空间的"元凶"。
  5. **临时文件（Temporary Files）**：查找系统临时目录和项目中的临时文件。
  6. **同名文件（Same Names）**：查找文件名相同但内容可能不同的文件。

- **极高性能**：1TB HDD 扫描约 60 秒，SSD 更快。
- **安全删除**：默认移入回收站/垃圾桶，可配置为直接删除。
- **排除设置**：可排除指定目录和文件类型（支持通配符模式）。
- **跨平台**：支持 Windows / macOS / Linux。
- **CLI 模式**：支持命令行操作，可编写脚本批量清理。

## 下载与安装

Czkawka 支持 Windows、macOS、Linux 三大平台。

### Windows

**方式一：GitHub Releases（推荐）**
前往 [Czkawka Releases 页面](https://github.com/qarmin/czkawka/releases)，下载最新版本的 Windows 安装包：
- `czkawka_gui_windows_*.exe`：GUI 版安装包，双击运行安装即可。
- `czkawka_cli_windows_*.exe`：CLI 命令行版（需要配合终端使用）。

安装后从开始菜单启动 "Czkawka"。

**方式二：winget**
```
winget install czkawka
```

**方式三：Scoop**
```
scoop bucket add extras
scoop install czkawka
```

### macOS

**GitHub Releases**
下载 macOS 版本的 `.dmg` 或 `.app` 文件：
- `czkawka_gui_mac_*.dmg`：GUI 版，打开后将 Czkawka 拖入 Applications 文件夹。
- 首次打开需要在 `系统设置 > 隐私与安全性` 中允许运行。

**Homebrew**
```
brew install czkawka
```

**MacPorts**
```
sudo port install czkawka
```

### Linux

**AppImage（通用）**
```
chmod +x czkawka_gui_linux_*.AppImage
./czkawka_gui_linux_*.AppImage
```

**包管理器**
- Ubuntu/Debian（PPA）：`sudo add-apt-repository ppa:czkawka-stable/czkawka && sudo apt update && sudo apt install czkawka`
- Arch Linux（AUR）：`yay -S czkawka`
- Fedora：`sudo dnf install czkawka`
- Flatpak：`flatpak install flathub com.github.qarmin.czkawka`

**源码编译（cargo install）**
如果你已安装 Rust 工具链：
```
cargo install czkawka-cli
cargo install czkawka-gui
```

## GUI 界面功能详解

启动 Czkawka 后，你会看到一个简洁的界面，左侧是 6 种清理模式的切换按钮，右侧是结果展示和操作区域。

### 1. 重复文件扫描（Duplicates）

这是最常用也最核心的功能。

**使用步骤：**
1. 启动 Czkawka，默认进入重复文件模式。
2. 在左侧面板点击 **添加目录（Add Path）**，选择要扫描的文件夹。可以添加多个目录（如 D 盘、E 盘等）。
3. **可选高级设置**：
   - **最小文件大小**：设置扫描的最小文件尺寸（例如 1MB，忽略过小的文件如 1KB 的图标）。
   - **最大文件大小**：设置文件大小上限。
   - **检查方法**：
     - `Hash`（哈希）：最精确，计算文件完整 SHA256 哈希进行比较，确保内容 100% 相同。
     - `Size + Name`（大小+名称）：只比较文件大小和名称，速度更快但可能遗漏重命名文件。
     - `Size`（大小）：只比较文件大小，速度最快但误判率最高。
   - **允许硬链接**：默认忽略硬链接（不视为重复），因为硬链接本质是同一文件的不同入口。
4. 点击右上角 **搜索（Search）** 按钮开始扫描。
5. 扫描完成后，结果按"重复组"分组展示。每个组内包含两个或更多相同的文件。
6. 在每个组内：
   - 勾选要保留的文件（通常保留一个即可），其余文件默认为选中（待删除）。
   - 可以勾选组标题下的"选中所有"来快速选择整个组。
7. 点击 **删除（Delete）** 按钮执行清理：
   - **移动到回收站**（默认）：安全，可恢复。
   - **永久删除**：直接擦除，不可恢复（谨慎使用）。

**提示**：建议先使用"选中所有"勾选所有重复组，然后逐组检查是否有需要保留的副本。程序安装文件、缓存文件通常可以安全删除。

### 2. 相似图片扫描（Similar Images）

使用感知哈希算法找出视觉上相似的图片，适合清理经过压缩、缩放、滤镜处理过的图片副本。

**使用步骤：**
1. 切换到"相似图片"模式。
2. 添加要扫描的目录。
3. 调整相似度阈值（Similarity Threshold）：
   - **高阈值（如 99%）**：只检测几乎完全相同的图片。
   - **低阈值（如 70%）**：检测构图相似的图片（适合查找同一个场景的不同拍摄版本）。
4. 点击搜索。扫描时间比重复文件扫描稍长（需要对每张图片计算感知哈希）。
5. 结果以"相似组"展示。拖动相似度滑块可动态筛选结果。
6. 预览图片后决定保留还是删除。

**支持格式**：JPG/JPEG、PNG、BMP、GIF、TIFF、WebP。

### 3. 空文件夹查找（Empty Folders）

快速找出文件系统中所有空目录。

1. 切换到"空文件夹"模式。
2. 添加要扫描的目录。
3. 点击搜索。
4. 结果列出所有不含任何文件的目录（包括不含任何子目录和文件的"完全空目录"）。
5. 选中后点击删除——**强烈建议勾选"如果目录为空则删除"**，这样可以递归删除空文件夹结构。

### 4. 大文件扫描（Big Files）

快速定位磁盘空间中体积最大的文件，找出"空间杀手"。

1. 切换到"大文件"模式。
2. 添加要扫描的目录。
3. 设置最小文件大小（例如 100MB）。
4. 点击搜索。
5. 结果按文件大小从大到小排列，清晰展示每个大文件的路径和大小。
6. 选中不需要的文件后删除（如旧的 ISO 镜像、安装包、视频缓存等）。

**典型清理对象**：Windows.old 文件夹、macOS 的 Time Machine 本地快照、IDE 的本地缓存目录、node_modules 文件夹、Steam 旧游戏备份等。

### 5. 临时文件清理（Temporary Files）

查找各种应用程序产生的临时文件。

1. 切换到"临时文件"模式。
2. 默认扫描系统的临时目录（Windows: `%TEMP%`，Linux/macOS: `/tmp`）。
3. 也可手动添加自定义目录。
4. 点击搜索后列出所有临时文件，选中不需要的删除。

**注意**：部分临时文件可能正在被程序使用，Czkawka 会提示无法删除的文件。建议先关闭所有正在运行的程序再清理临时文件。

### 6. 同名文件查找（Same Names）

查找文件名相同但内容可能不同的文件。

1. 切换到"同名文件"模式。
2. 添加目录并点击搜索。
3. 结果列出所有同名文件组（如多个目录下都有的 `readme.txt` 或 `index.js`）。
4. 通过查看路径和修改时间判断是否需要删除。

**适用场景**：项目中存在分散在各子目录的雷同配置文件，或下载文件夹中重复下载的同名文件。

## 排除设置

在扫描之前，可以通过 **排除（Exclude）** 选项卡设置不需要扫描的目录或文件。

### 排除目录

在排除栏中添加目录路径，支持通配符模式，例如：
- `/home/user/.cache`：排除缓存目录。
- `C:\Windows`：排除系统目录。

### 排除文件类型

在排除设置中可以指定不希望扫描的文件扩展名，例如：
- `*.exe`：排除所有 exe 文件。
- `*.dll`：排除所有 dll 文件。
- `*.bak`：排除备份文件。
- `*.tmp`：排除临时文件。

**提示**：多组排除条件用逗号分隔。排除条件和包含条件的组合使用可以精确控制扫描范围。

## CLI 命令行使用

Czkawka 的 CLI 版本适合编写脚本进行批量自动化清理。

### 安装 CLI

CLI 工具在 Releases 页面中单独提供（名称包含 `cli`），也可以 `cargo install czkawka-cli` 安装。

### 基本用法

```
czkawka_cli dup -d /path/to/scan -o results.txt
```

参数说明：
- `dup`：指定重复文件模式（可选 `similar`：相似图片；`empty`：空文件夹；`big`：大文件；`temp`：临时文件；`same`：同名文件）。
- `-d /path/to/scan`：指定要扫描的目录（可多次使用 `-d` 指定多个目录）。
- `-o results.txt`：将结果输出到文本文件（避免在终端中显示大量结果）。
- `-e "*.exe,*.dll"`：排除指定文件类型。
- `-f "*.mp3,*.jpg"`：只包含指定文件类型。
- `--min-size 100`：设置最小文件大小（MB），对大文件模式很有用。

### 高级 CLI 示例

**查找所有大文件（大于 500MB）并输出到文件**：
```
czkawka_cli big -d C:\Users -o bigfiles.txt --min-size 500
```

**扫描空目录并直接删除（无交互）**：
```
czkawka_cli empty -d /home/user/documents
```
（结果中的空目录需要手动确认删除——CLI 默认不执行删除操作）

**查找同名文件**：
```
czkawka_cli same -d /home/user/downloads -o dup_names.txt
```

### 批量清理脚本示例（Linux/macOS Bash）

```bash
#!/bin/bash
# 扫描重复文件，将结果保存到文件
czkawka_cli dup -d /home/user/Documents -o duplicates.txt

# 从结果文件中提取文件路径并询问是否删除
# （需要自行编写删除逻辑，`czkawka_cli` 无自动删除参数）
while IFS= read -r line; do
  if [ -f "$line" ]; then
    echo "删除: $line"
    rm "$line"
  fi
done < <(tail -n +2 duplicates.txt)
```

**注意**：目前的 Czkawka CLI 版本没有类似 `--auto-delete` 的参数。删除操作需要在查看结果后手动处理，这是一种安全设计。

## 与同类工具对比

| 对比项 | Czkawka | dupeGuru | CCleaner | fdupes |
|--------|---------|----------|----------|--------|
| **开发语言** | Rust | Python | C++ | C |
| **扫描速度** | 极快 | 中等 | 中慢 | 快 |
| **相似图片检测** | 支持 | 支持 | 不支持 | 不支持 |
| **GUI 界面** | GTK4 原生 | Qt 界面 | 原生 Windows | 仅 CLI |
| **平台** | Win/Mac/Linux | Win/Mac/Linux | 仅 Windows | Linux/Unix |
| **开源** | 是（AGPL-3.0） | 是 | 否 | 是 |
| **安全性** | 默认移动到回收站 | 移动到回收站 | 直接删除（危险） | 需手动操作 |

Czkawka 在速度、安全性、跨平台方面都表现优异，特别是扫描性能远超同类工具。

## 注意事项与最佳实践

### 安全第一
- 首次使用建议先扫描观察结果，不要立即删除——先看看 Czkawka 都找到了什么。
- 始终使用默认的"移动到回收站"模式，如果误删可以在回收站中恢复。
- 对于不确定是否该删除的文件，暂时保留。

### 扫描前关闭其他应用
特别是扫描大文件和临时文件模式时，关闭正在运行的程序可以避免出现"文件被占用"的提示，也能更准确地找到可清理的临时文件。

### 善用排除列表
系统目录（Windows 的 `C:\Windows`、Linux 的 `/usr`、macOS 的 `/System`）通常不需要扫描。把它们添加到排除列表，可以节省大量扫描时间。

### 定期清理频率建议
- 重复文件：每月一次。
- 临时文件：每 2-4 周一次。
- 大文件：每季度一次（关注是否有不再需要的大型安装包或备份文件）。
- 空文件夹：每月一次（开发人员尤其需要，项目目录中经常产生空文件夹）。

## 常见问题

### Czkawka 的名字怎么读？
Czkawka 是波兰语"打嗝"的意思，发音类似"shkafka"。因为作者是波兰人，所以取了这个有趣的名字。

### 为什么扫描速度这么快？
因为 Czkawka 使用 Rust 编写，Rust 编译后的机器码性能接近 C/C++。同时它在哈希计算时使用了多线程并行处理，并对 IO 操作进行了优化——读文件时使用了大缓冲区，减少了系统调用次数。

### Czkawka 能扫描网络驱动器吗？
可以。只要网络驱动器被挂载为本地盘符（如 Windows 的 Z 盘、Linux 的 `/mnt/nas`），Czkawka 就能正常扫描。注意通过局域网扫描大量文件时速度可能会受网络带宽限制。

### Czkawka 能处理中文文件名吗？
完全支持。Czkawka 基于 UTF-8 编码处理所有文件名，中文字符在 GUI 和 CLI 中均能正常显示。
