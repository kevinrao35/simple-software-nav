---
title: Stirling PDF 使用教程：本地 PDF 处理全家桶
software: Stirling PDF
softwareSlug: stirling-pdf
difficulty: beginner
category: 办公效率
order: 19
description: "从合并拆分到 OCR 识别，手把手教你用 Stirling PDF 处理所有 PDF 需求。"
---

## 软件简介

Stirling PDF 是一款基于 Java 开发的**开源 PDF 处理工具箱**，通过 Docker 容器化部署或直接运行 Java JAR 包使用。它提供 Web 浏览器界面，无需安装任何客户端软件即可使用 50+ 种 PDF 操作功能。

它的核心优势在于**完全本地运行**——所有文件处理都在你自己的服务器或电脑上完成，文件不会上传到任何第三方服务器，保障数据隐私和安全。因此非常适合企业用户处理合同、标书、财务报表等敏感文档。

Stirling PDF 在 GitHub 上拥有 45k+ Stars，是目前最受欢迎的本地 PDF 处理工具。

## 核心特性

- **50+ PDF 操作**：合并、拆分、压缩、转换、旋转、排序、提取页面等。
- **格式转换**：PDF 转 Word / 图片 / HTML / CSV / XML，图片转 PDF，网页转 PDF。
- **OCR 识别**：基于 Tesseract OCR 引擎，可将扫描版 PDF 转换为可搜索、可复制的文本 PDF。
- **安全功能**：添加/移除密码、数字签名、编辑元数据、添加水印、添加页码、编辑安全策略。
- **编辑功能**：添加文本注释、绘制图形、裁剪页面、调整页面大小、添加页眉页脚。
- **纯 Web 界面**：基于 Bootstrap 的响应式 UI，PC 和移动端均可使用。
- **多语言支持**：内置国际化支持，包括简体中文、英文、日文等 30+ 语言。

## 安装方式

Stirling PDF 提供了多种部署方式，推荐使用 Docker 部署。

### 方式一：Docker 部署（推荐）

确保已安装 Docker，然后在终端执行：

```
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v /path/to/data:/usr/share/tesseract-ocr/4.00/tessdata \
  -v /path/to/config:/configs \
  -e DOCKER_ENABLE_SECURITY=false \
  stirlingtools/stirling-pdf:latest
```

参数说明：
- `-p 8080:8080`：将容器的 8080 端口映射到主机的 8080 端口。
- `-v /path/to/data:/usr/share/tesseract-ocr/4.00/tessdata`：挂载 OCR 语言包目录（可选，如需中文 OCR 则必填）。
- `-v /path/to/config:/configs`：挂载配置文件目录，用于持久化设置。

启动后在浏览器访问 `http://localhost:8080` 即可打开 Stirling PDF 界面。

### 方式二：Docker Compose 部署

创建 `docker-compose.yml` 文件：

```yaml
version: '3.3'
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - "8080:8080"
    volumes:
      - ./trainingData:/usr/share/tesseract-ocr/4.00/tessdata  # OCR 语言包
      - ./configs:/configs                                      # 配置文件
      - ./output:/output                                        # 输出目录
      - ./customFiles:/customFiles                              # 自定义文件
    environment:
      - DOCKER_ENABLE_SECURITY=false
      - INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false
      - LANGS=en_US,zh_CN
    restart: unless-stopped
```

然后运行 `docker-compose up -d` 启动服务。

### 方式三：直接运行 Java JAR 包

不需要 Docker 的替代方案，适合在纯净环境中运行。

1. **安装 Java 17+**：
   - Windows：从 [Adoptium](https://adoptium.net/) 下载 JDK 17+ 安装。
   - macOS：`brew install openjdk@17`
   - Linux：`sudo apt install openjdk-17-jre`（Ubuntu/Debian）

2. **下载 JAR 包**：
   前往 [Stirling PDF Releases](https://github.com/Stirling-Tools/Stirling-PDF/releases)，下载 `Stirling-PDF-{version}.jar`。

3. **运行**：
   ```
   java -jar Stirling-PDF-{version}.jar
   ```
   默认监听 `localhost:8080`，在浏览器中访问即可。

   JAR 包方式同样支持通过环境变量配置，例如：
   ```
   java -jar -DCSRF_DISABLED=true Stirling-PDF-{version}.jar
   ```

## Web 界面功能导览

Stirling PDF 的 Web 界面将 50+ 功能按类别组织。打开 `http://localhost:8080` 后可以看到以下功能区：

### 顶部导航

左上角是 **Stirling PDF** Logo + 版本号。右上角提供：
- **语言切换**：点击国旗图标切换界面语言（支持简体中文）。
- **设置**：进入管理后台。
- **深色模式**：切换亮色/暗色主题。

### 功能卡片

首页以卡片网格形式展示所有 PDF 功能，分为以下几类：

- **转换（Convert）**：PDF 转图片、图片转 PDF、PDF 转 Word、PDF 转 HTML、PDF 转 CSV 等。
- **安全（Security）**：加密/解密 PDF、添加/移除水印、添加签名、更改权限。
- **编辑（Edit）**：添加文本、添加图片、绘制、裁剪、调整页面大小、添加页码、页眉页脚。
- **页面操作（Page）**：合并 PDF、拆分 PDF、提取页面、旋转页面、排序页面、删除页面。
- **其他（Other）**：压缩 PDF、OCR 识别、修复 PDF、比较 PDF 文件差异、读取元数据等。

### 设置页面

点击右上角齿轮图标进入设置页面，可配置：
- **应用名称**：修改 Web 界面的标题。
- **允许的功能**：可单独开启或关闭某个功能（控制显示隐藏，不影响实际文件）。
- **安全**：设置登录密码（多用户模式下）。
- **自定义**：上传自定义 CSS 或 Logo 图片。

## 常用操作详解

### 合并 PDF

这是最常用的功能之一，用于将多个 PDF 文件合并成一个。

1. 点击首页的 **合并 PDF** 卡片。
2. 点击 `选择文件` 按钮，或直接将 PDF 文件拖入虚线框区域。
3. 文件上传后会以列表形式展示，**按住拖拽手柄可调整顺序**（拖拽排序）。
4. 选择合并模式：
   - **普通合并**：按文件顺序合并。
   - **交错合并**：将多个 PDF 的页面逐一交错合并（如 1-A, 1-B, 2-A, 2-B...）。
5. 点击 `提交` 按钮，稍等片刻（大文件可能需要几秒）。
6. 处理完成后浏览器自动下载合并后的 PDF。

**提示**：合并大文件（超过 100MB）时建议关闭其他占用内存的应用。Stirling PDF 默认有 100MB 文件大小限制（可配置）。

### 拆分 PDF

将一个 PDF 按页数或书签拆分为多个独立的 PDF。

1. 点击首页的 **拆分 PDF** 卡片。
2. 上传要拆分的 PDF 文件。
3. 选择拆分方式：
   - **按页数拆分**：每 N 页拆成一个文件（例如每 10 页一个文件）。
   - **按书签拆分**：根据 PDF 内已有的书签层级拆分（适合有目录的书籍或报告）。
   - **按页码范围拆分**：输入自定义的页码范围（如 `1-5, 8-10, 15-20`），提取指定页面。
4. 点击 `提交`，浏览器会下载一个包含所有拆分后 PDF 的 ZIP 压缩包。

### PDF 转 Word

将 PDF 文件转换为可编辑的 Word 文档（.docx 格式）。

1. 点击首页的 **PDF 转 Word** 卡片。
2. 上传 PDF 文件。
3. 点击 `提交` 开始转换。
4. 处理完成后下载 Word 文件。

**适用场景**：需要编辑别人发来的 PDF 合同/报告。
**注意**：文字型 PDF 转换效果很好，扫描型 PDF 需要先做 OCR 再转换。

### PDF 转图片

将 PDF 的每一页分别导出为 JPG 或 PNG 图片。

1. 点击首页的 **PDF 转图片** 卡片。
2. 上传 PDF，选择输出格式（JPG/PNG）和 DPI 分辨率（默认 200 DPI，越高越清晰但文件越大）。
3. 点击 `提交`，下载包含所有图片的 ZIP 压缩包。

### OCR 识别扫描文档

将扫描版 PDF（内容为图片、无法选中文字）转换为可搜索、可复制的文本 PDF。

1. 点击首页的 **OCR 识别** 卡片。
2. 上传扫描版 PDF。
3. 选择 OCR 语言：如 `简体中文`、`英语` 或 `中英双语`。
4. 选择 OCR 密度：
   - **简单**：快速处理，识别精度一般。
   - **中等**：平衡速度和精度（推荐）。
   - **完整**：最精确但处理时间较长。
5. 点击 `提交` 开始 OCR 处理。
6. 下载处理后的 PDF，现在可以选中和搜索文字了。

### 压缩 PDF

减小 PDF 文件大小，适合在发送邮件或上传到网盘前使用。

1. 点击 **压缩 PDF** 卡片。
2. 上传 PDF，选择压缩级别（建议选择 `推荐` 或 `最大压缩`）。
3. 点击 `提交` 后下载压缩后的版本。

效果通常会压缩到原来的 30%～60%，但不建议对已经高度压缩的 PDF 继续压缩（效果有限且可能降低图片质量）。

## OCR 中文支持配置

Stirling PDF 内置的 Tesseract OCR 默认只包含英文语言包。要支持中文 OCR，需额外安装中文语言包。

### Docker 部署时

在 docker-compose.yml 中配置：

```yaml
environment:
  - LANGS=zh_CN
```

或在 docker run 命令中添加 `-e LANGS=zh_CN`。Stirling PDF 在启动时会自动下载并安装中文语言包。

如果想手动下载，可以从 [Tesseract tessdata](https://github.com/tesseract-ocr/tessdata) 下载 `chi_sim.traineddata`（简体中文）和 `chi_tra.traineddata`（繁体中文），放入挂载的 tessdata 目录中。

### JAR 包部署时

将中文语言包文件放入 `{Stirling-PDF目录}/tessdata/` 中。Stirling PDF 启动时会自动加载该目录下的所有语言包。

**提示**：OCR 中文扫描时，在 OCR 功能页面选择语言 `简体中文（chi_sim）`。如果处理的是中英混排文档，选择 `中英双语（chi_sim+eng）` 效果更好。

## 安全配置

### 设置登录密码

Stirling PDF 支持简单的登录认证（基于 HTTP Basic Auth）：

1. 进入 **设置 > 安全** 页面。
2. 开启 `启用登录` 开关。
3. 设置用户名和密码。
4. 点击保存后需要重新登录。
5. 设置环境变量 `DOCKER_ENABLE_SECURITY=true`（Docker 部署时）。

### 禁用某些功能

如果需要将 Stirling PDF 暴露给团队成员使用，可以禁用某些敏感功能：

1. 进入 **设置 > 功能可见性**。
2. 取消勾选需要禁用的功能（如删除、文件写入等）。
3. 被禁用的功能不会在首页显示，也无法通过 URL 直接访问。

### 设置文件大小限制

默认文件上传大小限制为 100MB。可通过环境变量调整：

```
APP_MAX_FILE_SIZE=200
```

单位为 MB。设置为 0 表示不限制（不推荐，可能导致内存溢出）。

## 高级设置

通过环境变量可配置更多选项：

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `APP_MAX_FILE_SIZE` | `100` | 单文件上传大小限制（MB） |
| `LANGS` | `en_US` | 安装的 OCR 语言包，多个用逗号分隔 |
| `DOCKER_ENABLE_SECURITY` | `false` | 是否启用登录认证 |
| `CSRF_DISABLED` | `false` | 是否禁用 CSRF 保护 |
| `INSTALL_BOOK_AND_ADVANCED_HTML_OPS` | `false` | 是否安装书籍和高级 HTML 处理功能（需要更多依赖） |
| `SYSTEM_DEFAULT_LOCALE` | `en-US` | 系统默认语言 |

## 常见问题

### Stirling PDF 启动后页面打不开？
检查端口 8080 是否被占用。可以使用 `docker ps`（Docker）或 `netstat -ano | findstr :8080`（Windows）排查。如果端口被占用，修改映射端口。

### 处理大 PDF 时提示内存不足？
JAR 包运行方式可以通过 `-Xmx` 参数增加内存限制：`java -Xmx4g -jar Stirling-PDF.jar`（分配 4GB 内存）。Docker 方式同样需要调整 `-e JAVA_TOOL_OPTIONS="-Xmx4g"`。

### OCR 识别时中文全是乱码？
说明 Tesseract 中文语言包未正确安装。确认 tessdata 目录下有 `chi_sim.traineddata`，并且 OCR 功能页面选择了正确的语言。

### 能否在局域网中多人使用？
可以。将端口映射到主机的某个端口后，同局域网的其他设备通过 `http://主机IP:8080` 即可访问。如需外网访问，建议配置反向代理（如 Nginx）和 HTTPS。
