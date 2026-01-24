# 齐家婚姻 iOS App

一个基于 Capacitor 的 iOS WebView 应用，用于将 https://qjmarriage.com 网站包装成原生 iOS 应用。

## 📱 项目信息

- **应用名称**: 齐家婚姻
- **包名**: com.qjmarriage.app
- **网站地址**: https://qjmarriage.com
- **框架**: Capacitor 8.x
- **平台**: iOS

## ⚡ 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/qjmarriage-ios-app.git
cd qjmarriage-ios-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 构建项目

```bash
npm run build
npx cap sync ios
```

### 4. 在 Xcode 中打开（需要 Mac）

```bash
npx cap open ios
```

## 🎨 修改网站地址

编辑 `src/js/app.js`，修改第 4 行：

```javascript
const WEBSITE_URL = 'https://你的网站.com';
```

## 🖼️ 更新应用图标

1. 替换根目录的 `appIcon.png` 文件（1024x1024 PNG）
2. 运行命令生成所有尺寸：

```bash
npm run generate-icons
npx cap sync ios
```

## 🚀 GitHub Actions 自动构建

本项目已配置 GitHub Actions，每次推送代码到 main 分支时会自动构建。

查看构建状态：
1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 查看构建进度

## 📚 文档

- [使用说明.md](./使用说明.md) - 完整使用指南
- [MAC电脑.md](./MAC电脑.md) - 虚拟机 macOS 开发指南
- [GitHub Actions.md](./GitHub Actions.md) - 云端自动构建指南
- [设置应用图标.md](./设置应用图标.md) - 图标设置详细说明

## 🛠️ 可用命令

```bash
# 开发模式（在浏览器预览）
npm start

# 构建项目
npm run build

# 生成应用图标
npm run generate-icons

# 同步到 iOS
npx cap sync ios

# 打开 Xcode
npx cap open ios
```

## ⚠️ 重要提示

**此项目需要在 macOS 上使用 Xcode 构建和测试！**

Windows 用户需要：
- 使用 Mac 电脑
- 或使用云端 Mac 服务（MacStadium、MacinCloud）
- 或使用 GitHub Actions 进行构建

## 📱 上架 App Store

详细步骤请查看 [使用说明.md](./使用说明.md) 中的"上架 App Store 步骤"章节。

需要：
- Apple Developer 账号（$99/年）
- 应用图标和截图
- 隐私政策网页
- 应用描述

## 🔧 技术栈

- **Capacitor** - 跨平台应用框架
- **Vite** - 构建工具
- **Sharp** - 图标生成工具
- **原生 iOS WebView**

## 📄 许可证

MIT License

## 🆘 需要帮助？

如果遇到问题：
1. 查看项目文档
2. 访问 [Capacitor 官方文档](https://capacitorjs.com/docs)
3. 搜索 [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

---

**祝你开发顺利！** 🎉
