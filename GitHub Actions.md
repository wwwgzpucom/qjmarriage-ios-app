# 使用 GitHub Actions 自动构建 iOS 应用

## 📖 什么是 GitHub Actions？

GitHub Actions 是 GitHub 提供的免费 CI/CD 服务，可以在云端的 macOS 环境中自动构建和测试你的 iOS 应用。

### 优势：
- ✅ **完全免费**（每月 2000 分钟）
- ✅ **真实的 macOS 环境**
- ✅ **自动化构建**
- ✅ **无需本地 Mac**
- ✅ **支持自动上传到 App Store**

---

## 🚀 快速开始

### 前提条件
1. 项目已上传到 GitHub
2. 有 GitHub 账号
3. 有 Apple Developer 账号（上架需要）

---

## 📝 步骤 1：创建 GitHub 仓库

### 1.1 初始化 Git（如果还没有）

在项目目录运行：

```bash
cd qjmarriage-app
git init
git add .
git commit -m "Initial commit"
```

### 1.2 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`qjmarriage-ios-app`
3. 选择 Private（私有）
4. 点击 "Create repository"

### 1.3 推送代码到 GitHub

```bash
git remote add origin https://github.com/你的用户名/qjmarriage-ios-app.git
git branch -M main
git push -u origin main
```

---

## 📝 步骤 2：创建 GitHub Actions 工作流

### 2.1 创建工作流文件

在项目根目录创建文件：`.github/workflows/ios-build.yml`

```yaml
name: iOS Build

# 触发条件：推送到 main 分支或手动触发
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:  # 允许手动触发

jobs:
  build:
    name: Build iOS App
    runs-on: macos-latest  # 使用最新的 macOS 环境
    
    steps:
    # 1. 检出代码
    - name: Checkout code
      uses: actions/checkout@v4
    
    # 2. 设置 Node.js 环境
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    # 3. 安装依赖
    - name: Install dependencies
      run: npm ci
    
    # 4. 构建 Web 资源
    - name: Build web assets
      run: npm run build
    
    # 5. 同步到 iOS
    - name: Sync Capacitor
      run: npx cap sync ios
    
    # 6. 安装 CocoaPods 依赖
    - name: Install CocoaPods dependencies
      run: |
        cd ios/App
        pod install
    
    # 7. 构建 iOS 应用（模拟器）
    - name: Build iOS app
      run: |
        cd ios/App
        xcodebuild -workspace App.xcworkspace \
          -scheme App \
          -sdk iphonesimulator \
          -configuration Debug \
          -derivedDataPath build \
          CODE_SIGNING_ALLOWED=NO
    
    # 8. 上传构建产物
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: ios-build
        path: ios/App/build/Build/Products/Debug-iphonesimulator/App.app
```

---

## 📝 步骤 3：配置自动构建

### 3.1 提交工作流文件

```bash
git add .github/workflows/ios-build.yml
git commit -m "Add GitHub Actions workflow"
git push
```

### 3.2 查看构建状态

1. 访问你的 GitHub 仓库
2. 点击 "Actions" 标签
3. 查看构建进度

---

## 🎯 高级配置：自动上传到 App Store

### 4.1 准备证书和配置文件

你需要从 Apple Developer 账号获取：

1. **App Store Connect API Key**
2. **Distribution Certificate (.p12)**
3. **Provisioning Profile**

### 4.2 添加 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Secrets：

| Secret 名称 | 说明 |
|------------|------|
| `APP_STORE_CONNECT_API_KEY_ID` | API Key ID |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID |
| `APP_STORE_CONNECT_API_KEY` | API Key 内容（Base64） |
| `CERTIFICATE_P12` | 证书文件（Base64） |
| `CERTIFICATE_PASSWORD` | 证书密码 |
| `PROVISIONING_PROFILE` | 配置文件（Base64） |

### 4.3 完整的上架工作流

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
    
    # 配置签名证书
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
    
    # 安装配置文件
    - name: Install provisioning profile
      env:
        PROVISIONING_PROFILE: ${{ secrets.PROVISIONING_PROFILE }}
      run: |
        mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
        echo $PROVISIONING_PROFILE | base64 --decode > ~/Library/MobileDevice/Provisioning\ Profiles/profile.mobileprovision
    
    # 构建并归档
    - name: Build and archive
      run: |
        cd ios/App
        xcodebuild -workspace App.xcworkspace \
          -scheme App \
          -sdk iphoneos \
          -configuration Release \
          -archivePath $PWD/build/App.xcarchive \
          clean archive
    
    # 导出 IPA
    - name: Export IPA
      run: |
        cd ios/App
        xcodebuild -exportArchive \
          -archivePath $PWD/build/App.xcarchive \
          -exportOptionsPlist exportOptions.plist \
          -exportPath $PWD/build
    
    # 上传到 App Store Connect
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

## 🔧 常用命令

### 手动触发构建

1. 进入 GitHub 仓库
2. 点击 "Actions"
3. 选择工作流
4. 点击 "Run workflow"

### 查看构建日志

1. 进入 "Actions" 标签
2. 点击具体的构建
3. 查看每个步骤的日志

### 下载构建产物

1. 构建完成后
2. 在构建页面底部找到 "Artifacts"
3. 下载 `ios-build.zip`

---

## 📊 免费额度说明

### GitHub Actions 免费额度

- **公开仓库**：无限制
- **私有仓库**：每月 2000 分钟

### macOS 构建时间消耗

- macOS 环境按 **10 倍**计算
- 实际可用时间：200 分钟/月
- 单次构建约 5-10 分钟
- 每月可构建约 20-40 次

### 节省时间的技巧

1. **使用缓存**：
   ```yaml
   - uses: actions/cache@v4
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

2. **只在需要时构建**：
   - 使用 `workflow_dispatch` 手动触发
   - 只在特定分支触发

3. **使用自托管 Runner**（高级）：
   - 在自己的 Mac 上运行
   - 无时间限制

---

## 🐛 常见问题

### Q1: 构建失败：找不到 Xcode

**解决方案**：
```yaml
- name: Select Xcode version
  run: sudo xcode-select -s /Applications/Xcode_15.0.app
```

### Q2: CocoaPods 安装失败

**解决方案**：
```yaml
- name: Install CocoaPods
  run: |
    sudo gem install cocoapods
    cd ios/App
    pod install --repo-update
```

### Q3: 签名失败

**解决方案**：
- 检查证书是否正确
- 确认 Bundle ID 匹配
- 验证 Provisioning Profile 有效

### Q4: 超出免费额度

**解决方案**：
- 减少构建频率
- 使用缓存
- 考虑升级 GitHub 计划
- 使用自托管 Runner

---

## 📚 完整示例项目结构

```
qjmarriage-app/
├── .github/
│   └── workflows/
│       ├── ios-build.yml      # 开发构建
│       └── ios-release.yml    # 发布构建
├── ios/
│   └── App/
│       ├── App.xcworkspace
│       └── exportOptions.plist
├── src/
├── package.json
└── capacitor.config.json
```

---

## 🎯 推荐工作流

### 开发阶段
1. 本地开发和测试
2. 推送到 GitHub
3. 自动触发构建验证
4. 在 Actions 中查看结果

### 发布阶段
1. 更新版本号
2. 创建 Git 标签：`git tag v1.0.0`
3. 推送标签：`git push --tags`
4. 自动构建并上传到 App Store Connect
5. 在 App Store Connect 中提交审核

---

## 💡 最佳实践

### 1. 版本管理
```bash
# 更新版本号
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 推送标签
git push --tags
```

### 2. 分支策略
- `main` - 稳定版本
- `develop` - 开发版本
- `feature/*` - 功能分支

### 3. 构建通知
在工作流中添加通知：

```yaml
- name: Send notification
  if: failure()
  run: |
    curl -X POST https://your-webhook-url \
      -d "Build failed for ${{ github.repository }}"
```

---

## 🔗 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Xcode Cloud 替代方案](https://developer.apple.com/xcode-cloud/)
- [Fastlane 自动化工具](https://fastlane.tools/)
- [App Store Connect API](https://developer.apple.com/app-store-connect/api/)

---

## 📝 总结

使用 GitHub Actions 的优势：

✅ **无需本地 Mac** - 在云端构建  
✅ **完全免费** - 每月 2000 分钟  
✅ **自动化** - 推送代码自动构建  
✅ **可靠** - GitHub 提供的稳定环境  
✅ **灵活** - 支持自定义工作流  

非常适合：
- 没有 Mac 的开发者
- 需要 CI/CD 的团队
- 想要自动化发布流程

祝你构建顺利！🚀
