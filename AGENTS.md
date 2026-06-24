## 简单软件 · 导航站

### 本地开发
```
npm run dev
```

### 构建生产版本
```
npm run build
```
输出到 `dist/` 目录。

### 新增软件
1. 在 `src/content/software/` 下新建 `.md` 文件
2. YAML frontmatter 按现有格式填写（参考其他文件）
3. 序号递增
4. 构建后自动生成首页卡片 + 详情页

### 配置网盘下载链接
在 `.md` 文件的 YAML 中添加：
```yaml
网盘:
  夸克: https://pan.quark.cn/s/xxxxx
  腾讯微云: https://share.weiyun.com/xxxxx
```

### 部署
构建产物在 `dist/` 目录，可直接上传到 Cloudflare Pages（拖拽上传或连接 Git 仓库）。
