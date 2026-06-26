---
title: World Monitor 使用教程：免费看遍全球实时动态
software: World Monitor
softwareSlug: world-monitor
difficulty: beginner
category: 网络工具
order: 18
description: "从安装到高级配置，学会用 World Monitor 跟踪全球事件。"
---

## 软件简介

World Monitor 是一个开源的全球实时事件仪表板，由开发者 koala73 创建并维护。它通过聚合 65+ 个公开数据源，以地图和列表的形式可视化展示全球范围内的实时动态——从飞行航班、船舶航迹、新闻事件、网络中断、自然灾害到冲突区域信息，全部汇集在一个界面上。

与 Flightradar24（专注航班跟踪）或 MarineTraffic（专注船舶追踪）这类单一领域商业服务不同，World Monitor 将多个维度的数据整合到同一张交互式地图中，让你可以一目了然地了解全球正在发生的事情。项目完全开源，支持自托管部署（Docker），数据源可自定义扩展。

项目地址：[github.com/koala73/worldmonitor](https://github.com/koala73/worldmonitor)

## 安装方式

### 方式一：Docker 部署（推荐）

World Monitor 官方推荐通过 Docker 或 Docker Compose 部署。这是最快、最稳定的方式。

**前提条件：** 安装 Docker 和 Docker Compose（或 Docker Desktop v3+ 已内置 Compose）。

**第一步：创建 docker-compose.yml**

在你想存放项目的目录下（例如 `~/worldmonitor/`），创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  worldmonitor:
    image: ghcr.io/koala73/worldmonitor:latest
    container_name: worldmonitor
    ports:
      - "8080:8080"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

**第二步：启动容器**

```bash
# 进入项目目录
cd ~/worldmonitor

# 启动服务
docker compose up -d

# 查看日志（确认启动成功）
docker compose logs -f
```

**第三步：访问 Web 界面**

打开浏览器访问 `http://localhost:8080` 即可看到 World Monitor 仪表板。

### 方式二：从 GitHub 下载构建版本

```bash
# 克隆仓库
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor

# 使用 npm 构建
npm install
npm run build

# 启动服务
npm start
```

> **注意**：方式二需要本地安装 Node.js 18+ 和 npm。

## 首次启动配置

### 设置地图中心点

启动后，地图默认以全球视角显示。你可以通过以下方式调整：

1. **鼠标拖拽**：在地图上拖拽移动视角
2. **滚轮缩放**：滚动滚轮缩放层级
3. **双击放大**：双击地图上的某个位置放大查看

对于特定区域的使用者，建议在配置文件中设置默认中心点：

```json
{
  "map": {
    "center": [35.0, 105.0],
    "zoom": 4
  }
}
```

### 数据源选择

World Monitor 默认启用所有数据源，但你可以按需求开启或关闭特定类别：

在左侧面板中找到"数据源"（Data Sources）区域，可以看到按类型分组的数据源开关：

- **Flights**：航班跟踪
- **Vessels**：船舶追踪
- **News**：新闻事件
- **Outages**：网络中断
- **Disasters**：自然灾害
- **Conflicts**：冲突与军事动态

点击开关即可启用或禁用对应的数据图层。

## 界面功能详解

### 主视图布局

World Monitor 的界面分为三个主要区域：

**1. 交互式地图（中央区域）**

- 基于 Leaflet 地图引擎，支持 OpenStreetMap 等多种底图
- 不同类型的事件使用不同的图标和颜色标记
  - 飞机图标（蓝色）= 航班
  - 船舶图标（绿色）= 船舶
  - 圆形标记（红色）= 冲突/军事事件
  - 圆形标记（橙色）= 自然灾害
  - 圆形标记（紫色）= 网络中断
- 点击标记弹出详情窗口，包含事件名称、时间、来源链接等信息

**2. 事件列表（左侧面板）**

- 实时滚动的列表，按时间倒序排列
- 每条事件包含：标题、类型标签、时间戳
- 点击列表项可在地图上定位对应位置
- 支持搜索过滤

**3. 控制面板（顶部/右侧）**

- 数据源开关
- 时间范围过滤
- 搜索功能
- 地图样式切换

### 过滤功能

通过过滤器可以精确筛选感兴趣的事件：

- **按类型过滤**：勾选/取消勾选数据源类型
- **按时间过滤**：选择最近 1 小时/6 小时/24 小时/7 天
- **按关键词搜索**：输入关键词搜索事件标题和描述
- **按区域过滤**：在地图上拉框选择查看特定区域

## 数据源类型详解

World Monitor 的 65+ 数据源大致分为以下几类：

### 航班跟踪数据

| 数据源 | 说明 | 覆盖范围 |
|--------|------|---------|
| OpenSky Network | 开源 ADS-B 航班数据 | 全球（依赖地面接收站） |
| ADS-B Exchange | 社区驱动的航班追踪 | 全球，无过滤（显示军用机等） |

数据显示内容包括：航班号、起降机场、机型、高度、速度、当前位置。点击航班标记可查看详细飞行信息。

### 船舶追踪数据

| 数据源 | 说明 | 覆盖范围 |
|--------|------|---------|
| AIS 公开数据 | 船舶自动识别系统数据 | 全球主要航线/港口 |

通过 AIS（自动识别系统），可以追踪货轮、油轮、客轮、渔船的实时位置、航速、航向、目的地港口。

### 新闻聚合

| 数据源 | 说明 | 语言 |
|--------|------|------|
| RSS Feed 聚合 | 聚合多家国际新闻媒体 RSS | 英文为主 |
| 事件标注 | 自动识别新闻中的地理位置 | 全球 |

新闻事件在地图上按发生地标注，点击可查看新闻摘要和原文链接。

### 网络中断监测

| 数据源 | 说明 | 数据来源 |
|--------|------|---------|
| 网络中断数据 | 监测主要网络服务/区域的中断事件 | 公开监测数据 |

展示互联网服务中断、海底光缆故障、DNS 问题等网络事件的地理分布。

### 自然灾害数据

| 数据源 | 说明 |
|--------|------|
| 地震数据 | USGS 美国地质调查局实时地震数据 |
| 天气灾害 | 飓风/台风/洪水/野火等极端天气事件 |

地震数据包含震级、震源深度、发生时间；天气灾害包含路径预测、影响范围。

### 冲突与军事动态

| 数据源 | 说明 |
|--------|------|
| 冲突区域数据 | 战争冲突区的实时事件（ACLED 等数据源） |

涵盖武装冲突、抗议活动、军事行动等事件的地理位置和详情。

## 自定义数据源

World Monitor 支持添加自定义数据源。编辑配置文件 `config/sources.json`：

```json
{
  "customSources": [
    {
      "name": "My RSS Feed",
      "type": "rss",
      "url": "https://example.com/feed.xml",
      "interval": 300
    },
    {
      "name": "Custom API",
      "type": "api",
      "url": "https://api.example.com/events.json",
      "interval": 600,
      "parseFunction": "customParser"
    }
  ]
}
```

- `type`：支持 `rss`（RSS 订阅）、`api`（REST API）、`websocket`（WebSocket 实时数据）
- `interval`：数据拉取间隔（秒）
- `parseFunction`：自定义解析函数名（需要在代码中定义）

## Docker 部署的进阶配置

### 使用环境变量配置

```yaml
services:
  worldmonitor:
    image: ghcr.io/koala73/worldmonitor:latest
    environment:
      - TZ=Asia/Shanghai
      - PORT=8080
      - DB_PATH=/app/data/database.sqlite
      - LOG_LEVEL=info
```

### 使用 Nginx 反向代理（配置域名访问）

```nginx
server {
    listen 80;
    server_name monitor.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 数据持久化

确保 Docker Compose 中的 volume 映射正确。`data` 目录存储数据库文件，`config` 目录存储配置：

```yaml
volumes:
  - ./data:/app/data
  - ./config:/app/config
```

## 与商业服务的对比

| 特性 | World Monitor | Flightradar24 | MarineTraffic | Google Earth |
|------|--------------|---------------|---------------|--------------|
| 价格 | 免费开源 | 免费（基础）/付费 | 免费（基础）/付费 | 免费 |
| 数据维度 | 多维度整合 | 单一（航班） | 单一（船舶） | 卫星图像 |
| 实时性 | 近实时 | 实时 | 实时 | 非实时 |
| 自部署 | 支持 Docker | 不支持 | 不支持 | 不支持 |
| 数据源扩展 | 支持自定义 | 不支持 | 不支持 | 不支持 |
| 隐私安全 | 完全自控 | 数据归提供商 | 数据归提供商 | 数据归 Google |

## 常见问题

**Q：地图上数据不显示怎么办？**

A：检查数据源开关是否开启，确认 Docker 容器能正常访问外网。部分数据源可能需要科学上网。

**Q：为什么航班数据比 Flightradar24 少？**

A：World Monitor 使用开源 ADS-B 数据（如 OpenSky Network），覆盖范围取决于地面接收站密度，而 Flightradar24 使用付费数据源和自有接收站网络。

**Q：如何升级到最新版本？**

A：`docker compose pull && docker compose up -d` 即可更新到最新镜像。

**Q：可以同时查看多个区域吗？**

A：目前一个实例只显示一个视图。你可以部署多个实例并配置不同的中心点和数据源。
