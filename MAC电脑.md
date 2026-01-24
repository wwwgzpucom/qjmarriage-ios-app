# 在虚拟机 macOS 上开发 iOS 应用

## ✅ 虚拟机 macOS 可以做的事：

### 1. 开发和测试
- ✅ 安装 Xcode
- ✅ 在模拟器上运行应用
- ✅ 编写和调试代码
- ✅ 构建应用

### 2. 基本功能测试
- ✅ 测试 WebView 加载
- ✅ 测试界面和交互
- ✅ 调试 JavaScript

---

## ⚠️ 虚拟机 macOS 的限制：

### 1. 真机测试困难
- ❌ USB 连接真实 iPhone 可能不稳定
- ❌ 需要配置 USB 直通（复杂）

### 2. 上架 App Store
- ⚠️ 理论上可以，但不推荐
- ⚠️ 可能违反 Apple 许可协议
- ⚠️ 性能较差，构建时间长

### 3. 性能问题
- ⚠️ Xcode 运行较慢
- ⚠️ 模拟器可能卡顿
- ⚠️ 需要较高的硬件配置

---

## 💻 推荐的虚拟机配置：

如果使用虚拟机，建议：

- **CPU**: 至少 4 核心（8 核更好）
- **内存**: 至少 8GB（16GB 推荐）
- **硬盘**: 至少 60GB 空闲空间
- **虚拟化软件**: VMware Workstation 或 VirtualBox
- **macOS 版本**: macOS Monterey 或更新

---

## 🎯 更好的替代方案：

### 1. 云端 Mac 服务（推荐）
- **MacStadium** - 专业的云端 Mac
- **MacinCloud** - 按小时付费
- **AWS EC2 Mac** - 亚马逊云服务
- **优点**：性能好，可以真机测试，合法

### 2. GitHub Actions（免费）
- 用于自动构建和测试
- 每月免费 2000 分钟
- 适合 CI/CD

### 3. 借用或租用真实 Mac
- Mac mini（最便宜的选择）
- 二手 MacBook

---

## 📋 虚拟机 macOS 安装步骤：

如果你决定使用虚拟机：

### 步骤 1：准备工作
1. 下载 macOS 镜像
2. 安装虚拟化软件（VMware 或 VirtualBox）

### 步骤 2：创建虚拟机
1. 创建虚拟机（分配足够资源）
2. 安装 macOS

### 步骤 3：安装开发工具
1. **安装 Xcode**（从 App Store，免费但需要 Apple ID）
2. **安装 Xcode Command Line Tools**：
   ```bash
   xcode-select --install
   ```
3. **安装 CocoaPods**：
   ```bash
   sudo gem install cocoapods
   ```

---

## 🚀 在虚拟机上运行你的项目：

### 步骤 1：传输项目
把 `qjmarriage-app` 文件夹复制到虚拟机

### 步骤 2：打开项目
打开终端，进入项目目录：
```bash
cd ~/Desktop/qjmarriage-app
```

### 步骤 3：打开 Xcode
运行命令：
```bash
npx cap open ios
```

### 步骤 4：运行应用
1. 在 Xcode 中选择模拟器（如 iPhone 15）
2. 点击运行按钮（▶️）
3. 等待应用启动

---

## ⚡ 我的建议：

### 对于学习和开发
**虚拟机 macOS 完全够用！**

你可以：
- 测试应用功能
- 调试代码
- 在模拟器上预览效果

### 对于上架 App Store
建议使用：
- 云端 Mac 服务
- 或购买便宜的 Mac mini

---

## 🔧 常见问题

### Q: 虚拟机 macOS 合法吗？
A: 在非 Apple 硬件上运行 macOS 违反 Apple 许可协议，但用于学习和开发通常不会有问题。商业用途建议使用真实 Mac 或云端服务。

### Q: 虚拟机性能够用吗？
A: 如果硬件配置足够（8GB+ 内存，4+ 核心），开发和测试没问题，但会比真实 Mac 慢。

### Q: 可以在虚拟机上上架应用吗？
A: 技术上可以，但不推荐。构建和上传过程会很慢，且可能不稳定。

### Q: 需要 Apple Developer 账号吗？
A: 
- 在模拟器上测试：不需要
- 在真机上测试：需要（免费账号即可）
- 上架 App Store：需要付费账号（$99/年）

---

## 📚 相关资源

- [Xcode 下载](https://developer.apple.com/xcode/)
- [Capacitor 文档](https://capacitorjs.com/docs)
- [iOS 开发指南](https://developer.apple.com/ios/)

---

## 💡 总结

虚拟机 macOS 适合你现在测试和开发应用，等到真正要上架时再考虑其他方案。

**推荐流程**：
1. 先在虚拟机上开发和测试
2. 确认应用功能正常
3. 准备上架时使用云端 Mac 或真实 Mac

祝你开发顺利！🎉
