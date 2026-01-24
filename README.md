# 齐家婚姻 iOS App

一个基于 Capacitor 的 iOS WebView 应用，将 https://qjmarriage.com 网站包装成原生 iOS 应用。

[![GitHub Actions](https://github.com/wwwgzpucom/qjmarriage-ios-app/actions/workflows/ios-build.yml/badge.svg)](https://github.com/wwwgzpucom/qjmarriage-ios-app/actions)

## 📱 项目信息

- **应用名称**: 齐家婚姻
- **包名**: com.qjmarriage.app
- **网站地址**: https://qjmarriage.com
- **GitHub**: https://github.com/wwwgzpucom/qjmarriage-ios-app
- **框架**: Capacitor 8.x

---

## ⚡ 快速开始

### 克隆项目

```bash
git clone https://github.com/wwwgzpucom/qjmarriage-ios-app.git
cd qjmarriage-ios-app
```

### 安装依赖

```bash
npm install
```

### 构建项目

```bash
npm run build
npx cap sync ios
```

### 在 Mac 上打开 Xcode

```bash
npx cap open ios
```

然后在 Xcode 中点击运行按钮（▶️）。

---

## 🎨 自定义配置

### 修改网站地址

编辑 `src/js/app.js`，修改第 4 行：

```javascript
const WEBSITE_URL = 'https://你的网站.com';
```

### 更新应用图标

1. 替换根目录的 `appIcon.png`（1024x1024 PNG）
2. 运行命令：

```bash
npm run generate-icons
npx cap sync ios
```

### 修改应用名称

编辑 `capacitor.config.json`：

```json
{
  "appName": "你的应用名称"
}
```

---

## 🚀 GitHub Actions 自动构建

项目已配置自动构建，每次推送代码会自动：

- ✅ 构建 Web 资源
- ✅ 同步到 iOS
- ✅ 构建 iOS 应用
- ✅ 上传构建产物

**查看构建状态**：[Actions 页面](https://github.com/wwwgzpucom/qjmarriage-ios-app/actions)

---

## 🛠️ 可用命令

```bash
# 开发预览（浏览器）
npm start

# 构建项目
npm run build

# 生成应用图标
npm run generate-icons

# 同步到 iOS
npx cap sync ios

# 打开 Xcode（需要 Mac）
npx cap open ios

# 更新代码到 GitHub
git add .
git commit -m "更新说明"
git push
```

---

## � 文档

- **[使用说明.md](./使用说明.md)** - 完整使用指南和上架 App Store 步骤
- **[MAC电脑.md](./MAC电脑.md)** - 虚拟机 macOS 开发指南
- **[GitHub Actions.md](./GitHub%20Actions.md)** - 云端自动构建指南

---

## ⚠️ 重要提示

### 需要 Mac 电脑

iOS 应用只能在 macOS 上使用 Xcode 构建和测试。

**Windows 用户可以**：
- 使用虚拟机 macOS（查看 [MAC电脑.md](./MAC电脑.md)）
- 使用云端 Mac 服务（MacStadium、MacinCloud）
- 使用 GitHub Actions 云端构建（查看 [GitHub Actions.md](./GitHub%20Actions.md)）

### 上架 App Store

需要准备：
- Apple Developer 账号（$99/年）
- 应用图标和截图
- 隐私政策网页
- 应用描述

详细步骤查看 [使用说明.md](./使用说明.md)。

---

## 🔧 技术栈

- **Capacitor 8.x** - 跨平台应用框架
- **Vite** - 快速构建工具
- **Sharp** - 图标生成工具
- **GitHub Actions** - 自动化构建

---

## 📁 项目结构

```
qjmarriage-ios-app/
├── .github/workflows/    # GitHub Actions 配置
├── ios/                  # iOS 原生项目
├── src/                  # 源代码
│   ├── index.html       # 主页面
│   ├── js/app.js        # 应用逻辑（修改网址）
│   └── assets/          # 资源文件
├── appIcon.png          # 应用图标
├── generate-icons.js    # 图标生成脚本
├── capacitor.config.json # Capacitor 配置
└── package.json         # 项目配置
```

---

## 🆘 需要帮助？

- **查看文档**：项目包含完整的中文文档
- **Capacitor 官方文档**：https://capacitorjs.com/docs
- **GitHub Issues**：https://github.com/wwwgzpucom/qjmarriage-ios-app/issues
- **Stack Overflow**：https://stackoverflow.com/questions/tagged/capacitor

---

## 📄 许可证

MIT License

---

**祝你开发顺利！** 🎉
