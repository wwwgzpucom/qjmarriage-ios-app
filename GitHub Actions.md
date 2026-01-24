# GitHub Actions 自动构建指南

## 📖 什么是 GitHub Actions？

GitHub Actions 是 GitHub 提供的免费 CI/CD 服务，可以在云端的 macOS 环境中自动构建和测试你的 iOS 应用。

### 优势：
- ✅ **完全免费**（每月 2000 分钟）
- ✅ **真实的 macOS 环境**
- ✅ **自动化构建**
- ✅ **无需本地 Mac**
- ✅ **支持自动上传到 App Store**

---

## ✅ 当前状态

本项目已成功配置 GitHub Actions：

- **仓库地址**：https://github.com/wwwgzpucom/qjmarriage-ios-app
- **工作流文件**：`.github/workflows/ios-build.yml`
- **触发条件**：推送到 main 分支或手动触发
- **构建状态**：✅ 最近构建成功（5分钟）
- **依赖管理**：使用 Swift Package Manager (SPM)
- **查看构建**：[Actions 页面](https://github.com/wwwgzpucom/qjmarriage-ios-app/actions)

---

## 🚀 如何使用

### 自动构建

每次推送代码到 main 分支时，会自动触发构建：

```bash
git add .
git commit -m "更新说明"
git push
```

### 手动触发构建

1. 访问：https://github.com/wwwgzpucom/qjmarriage-ios-app/actions
2. 点击 "iOS Build" 工作流
3. 点击 "Run workflow" 按钮
4. 选择分支（main）
5. 点击 "Run workflow"

### 查看构建进度

1. 进入 [Actions 页面](https://github.com/wwwgzpucom/qjmarriage-ios-app/actions)
2. 点击最新的构建任务
3. 查看每个步骤的日志
4. 等待构建完成（约 5-10 分钟）

### 下载构建产物

构建成功后：

1. 在构建详情页面底部找到 "Artifacts"
2. 下载 `ios-build.zip`
3. 解压后可以在模拟器中测试

---

## 📋 工作流说明

当前配置的构建步骤：

1. ✅ **检出代码** - 从 GitHub 获取最新代码
2. ✅ **设置 Node.js 22** - 配置 Node.js 环境（Capacitor 要求）
3. ✅ **安装项目依赖** - 运行 `npm ci`
4. ✅ **构建 Web 资源** - 运行 `npm run build`
5. ✅ **同步到 iOS** - 运行 `npx cap sync ios`
6. ✅ **检查 Podfile** - 自动检测是否需要 CocoaPods
7. ⏭️ **跳过 CocoaPods** - 项目使用 SPM，不需要 CocoaPods
8. ✅ **选择 Xcode** - 配置 Xcode 版本
9. ✅ **构建 iOS 应用** - 使用 xcodebuild 构建模拟器版本
10. ✅ **上传构建产物** - 上传 .app 文件供下载

**构建时间**：约 5 分钟

---

## 📊 免费额度说明

### GitHub Actions 免费额度

- **公开仓库**：无限制
- **私有仓库**：每月 2000 分钟

### macOS 构建时间消耗

- macOS 环境按 **10 倍**计算
- 实际可用时间：**200 分钟/月**
- 单次构建约 **5-10 分钟**
- 每月可构建约 **20-40 次**

### 节省时间的技巧

1. **只在需要时构建**：使用手动触发而不是每次推送
2. **使用缓存**：已配置 npm 缓存
3. **合并提交**：多个小改动合并后一次性推送

---

## 🔧 修改工作流

如需修改构建配置，编辑 `.github/workflows/ios-build.yml` 文件。

### 当前配置特点

- ✅ **自动检测依赖管理方式**：支持 CocoaPods 和 SPM
- ✅ **智能构建**：根据项目配置选择 workspace 或 project
- ✅ **Node.js 22**：满足 Capacitor 8.x 要求
- ✅ **禁用代码签名**：模拟器构建不需要签名

### 示例：只在特定文件变化时构建

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
      - 'ios/**'
      - 'package.json'
  workflow_dispatch:
```

### 示例：添加构建通知

```yaml
- name: Send success notification
  if: success()
  run: echo "✅ 构建成功！"

- name: Send failure notification
  if: failure()
  run: echo "❌ 构建失败，请检查日志"
```

---

## 🎯 上架 App Store（高级）

### 准备工作

需要从 Apple Developer 账号获取：

1. **App Store Connect API Key**
2. **Distribution Certificate (.p12)**
3. **Provisioning Profile**

### 添加 GitHub Secrets

进入仓库 → Settings → Secrets and variables → Actions，添加：

| Secret 名称 | 说明 |
|------------|------|
| `APP_STORE_CONNECT_API_KEY_ID` | API Key ID |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID |
| `APP_STORE_CONNECT_API_KEY` | API Key 内容（Base64） |
| `CERTIFICATE_P12` | 证书文件（Base64） |
| `CERTIFICATE_PASSWORD` | 证书密码 |
| `PROVISIONING_PROFILE` | 配置文件（Base64） |

### 创建发布工作流

创建 `.github/workflows/ios-release.yml`：

```yaml
name: iOS Release to App Store

on:
  push:
    tags:
      - 'v*'  # 当推送 v1.0.0 这样的标签时触发
  workflow_dispatch:

jobs:
  release:
    name: Build and Release to App Store
    runs-on: macos-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build web assets
      run: npm run build
    
    - name: Sync Capacitor
      run: npx cap sync ios
    
    - name: Install CocoaPods
      run: |
        cd ios/App
        pod install
    
    - name: Import signing certificate
      env:
        CERTIFICATE_P12: ${{ secrets.CERTIFICATE_P12 }}
        CERTIFICATE_PASSWORD: ${{ secrets.CERTIFICATE_PASSWORD }}
      run: |
        echo $CERTIFICATE_P12 | base64 --decode > certificate.p12
        security create-keychain -p "" build.keychain
        security import certificate.p12 -k build.keychain -P $CERTIFICATE_PASSWORD -T /usr/bin/codesign
        security list-keychains -s build.keychain
        security default-keychain -s build.keychain
        security unlock-keychain -p "" build.keychain
        security set-key-partition-list -S apple-tool:,apple: -s -k "" build.keychain
    
    - name: Build and archive
      run: |
        cd ios/App
        xcodebuild -workspace App.xcworkspace \
          -scheme App \
          -sdk iphoneos \
          -configuration Release \
          -archivePath $PWD/build/App.xcarchive \
          clean archive
    
    - name: Upload to App Store Connect
      env:
        API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
        API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
        API_KEY: ${{ secrets.APP_STORE_CONNECT_API_KEY }}
      run: |
        echo $API_KEY | base64 --decode > AuthKey.p8
        xcrun altool --upload-app \
          --type ios \
          --file ios/App/build/App.ipa \
          --apiKey $API_KEY_ID \
          --apiIssuer $API_ISSUER_ID
```

---

## 🐛 常见问题

### Q1: 为什么跳过 CocoaPods？

**答**：项目使用 Swift Package Manager (SPM)，这是 Capacitor 8.x 的默认方式，不需要 CocoaPods。

### Q2: 构建失败：Node.js 版本问题

**答**：Capacitor CLI 需要 Node.js 22+，工作流已配置正确版本。

### Q3: 如何下载构建产物？

**答**：
1. 进入成功的构建任务
2. 滚动到底部找到 "Artifacts"
3. 下载 `ios-build.zip`
4. 解压后在 Mac 模拟器中测试

### Q4: 超出免费额度怎么办？

**解决方案**：
- 使用手动触发而不是每次推送自动构建
- 合并多个提交后一次性推送
- 只在重要更新时触发构建
- 考虑升级 GitHub 计划（如果需要）

### Q5: 构建成功但应用无法运行？

**检查**：
- 确保在 Mac 上测试
- 使用 iOS 模拟器（不是真机）
- 检查 Xcode 版本兼容性

---

## 💡 最佳实践

### 版本管理

```bash
# 更新版本号并创建标签
npm version patch  # 1.0.0 -> 1.0.1
git push --tags    # 触发发布工作流
```

### 分支策略

- `main` - 稳定版本，自动构建
- `develop` - 开发版本，手动构建
- `feature/*` - 功能分支，不构建

---

## 🔗 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Capacitor 文档](https://capacitorjs.com/docs)
- [Fastlane 自动化工具](https://fastlane.tools/)
- [App Store Connect API](https://developer.apple.com/app-store-connect/api/)

---

## 📝 总结

✅ **项目已成功配置 GitHub Actions**  
✅ **构建已验证成功**（5分钟完成）  
✅ **每次推送自动构建**  
✅ **可手动触发构建**  
✅ **支持下载构建产物**  
✅ **使用 Swift Package Manager**  
✅ **可扩展为自动上架**  

**查看构建状态**：https://github.com/wwwgzpucom/qjmarriage-ios-app/actions

**最近构建**：✅ 成功（2分钟前）
