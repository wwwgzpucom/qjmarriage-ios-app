# 上传项目到 GitHub 详细步骤

## 📋 准备工作

### 1. 配置 Git 用户信息（首次使用 Git 需要）

打开命令行，运行以下命令：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

例如：
```bash
git config --global user.name "You Dongsheng"
git config --global user.email "admin@gzpu.com"
```

---

## 🚀 步骤 1：创建 GitHub 仓库

### 1.1 登录 GitHub

访问 https://github.com 并登录你的账号

### 1.2 创建新仓库

1. 点击右上角的 "+" 号
2. 选择 "New repository"
3. 填写信息：
   - **Repository name**: `qjmarriage-ios-app`
   - **Description**: 齐家婚姻 iOS 应用
   - **Privacy**: 选择 Private（私有）或 Public（公开）
   - **不要勾选** "Initialize this repository with a README"
4. 点击 "Create repository"

### 1.3 复制仓库地址

创建完成后，GitHub 会显示仓库地址，类似：
```
https://github.com/你的用户名/qjmarriage-ios-app.git
```

复制这个地址备用。

---

## 📝 步骤 2：提交代码到本地仓库

在项目目录 `qjmarriage-app` 中运行：

### 2.1 配置本地 Git（如果还没配置）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 2.2 提交代码

```bash
# 添加所有文件
git add .

# 提交到本地仓库
git commit -m "Initial commit: 齐家婚姻 iOS App"
```

---

## 🌐 步骤 3：推送到 GitHub

### 3.1 添加远程仓库

```bash
git remote add origin https://github.com/你的用户名/qjmarriage-ios-app.git
```

**注意**：把 `你的用户名` 替换成你的 GitHub 用户名！

### 3.2 设置主分支名称

```bash
git branch -M main
```

### 3.3 推送代码

```bash
git push -u origin main
```

第一次推送时，可能需要输入 GitHub 用户名和密码（或 Personal Access Token）。

---

## 🔑 GitHub 认证方式

### 方式 1：使用 Personal Access Token（推荐）

GitHub 已不再支持密码认证，需要使用 Token：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - **Note**: `qjmarriage-app`
   - **Expiration**: 选择有效期
   - **Select scopes**: 勾选 `repo`（完整仓库访问权限）
4. 点击 "Generate token"
5. **复制生成的 Token**（只显示一次！）

推送时使用 Token 作为密码：
- 用户名：你的 GitHub 用户名
- 密码：刚才复制的 Token

### 方式 2：使用 SSH（高级）

1. 生成 SSH 密钥：
   ```bash
   ssh-keygen -t ed25519 -C "你的邮箱@example.com"
   ```

2. 添加到 GitHub：
   - 复制公钥内容：`cat ~/.ssh/id_ed25519.pub`
   - 访问 https://github.com/settings/keys
   - 点击 "New SSH key"
   - 粘贴公钥内容

3. 使用 SSH 地址：
   ```bash
   git remote set-url origin git@github.com:你的用户名/qjmarriage-ios-app.git
   ```

---

## ✅ 步骤 4：验证上传成功

### 4.1 访问 GitHub 仓库

打开浏览器，访问：
```
https://github.com/你的用户名/qjmarriage-ios-app
```

你应该能看到所有文件已上传。

### 4.2 查看 GitHub Actions

1. 点击仓库的 "Actions" 标签
2. 应该能看到自动触发的构建任务
3. 点击查看构建进度

---

## 🔄 后续更新代码

以后修改代码后，使用以下命令更新：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交修改
git commit -m "描述你的修改内容"

# 3. 推送到 GitHub
git push
```

---

## 🎯 GitHub Actions 自动构建

项目已配置 GitHub Actions，每次推送代码时会自动：

1. ✅ 安装依赖
2. ✅ 构建 Web 资源
3. ✅ 同步到 iOS
4. ✅ 构建 iOS 应用
5. ✅ 上传构建产物

### 查看构建结果

1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 点击最新的构建任务
4. 查看每个步骤的日志

### 下载构建产物

1. 构建成功后
2. 在构建页面底部找到 "Artifacts"
3. 下载 `ios-build.zip`

---

## 🐛 常见问题

### Q1: 推送时要求输入密码

**解决方案**：使用 Personal Access Token 代替密码（见上面的认证方式）

### Q2: 推送失败：Permission denied

**解决方案**：
- 检查仓库地址是否正确
- 确认你有仓库的写入权限
- 使用正确的 Token 或 SSH 密钥

### Q3: GitHub Actions 构建失败

**解决方案**：
1. 点击失败的构建查看日志
2. 检查错误信息
3. 常见原因：
   - 依赖安装失败
   - CocoaPods 问题
   - Xcode 版本不兼容

### Q4: 文件太大无法上传

**解决方案**：
- GitHub 单个文件限制 100MB
- 检查 `.gitignore` 是否正确配置
- 不要上传 `node_modules/`、`dist/` 等目录

---

## 📋 完整命令清单

```bash
# 1. 配置 Git 用户信息（首次）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 2. 初始化仓库（已完成）
git init

# 3. 添加文件
git add .

# 4. 提交到本地
git commit -m "Initial commit: 齐家婚姻 iOS App"

# 5. 添加远程仓库
git remote add origin https://github.com/你的用户名/qjmarriage-ios-app.git

# 6. 设置主分支
git branch -M main

# 7. 推送到 GitHub
git push -u origin main

# 后续更新
git add .
git commit -m "更新说明"
git push
```

---

## 🎉 完成！

项目成功上传到 GitHub 后：

✅ 代码已备份到云端  
✅ GitHub Actions 自动构建已启用  
✅ 可以在任何地方访问和克隆项目  
✅ 团队成员可以协作开发  

---

## 📚 相关资源

- [GitHub 官方文档](https://docs.github.com/)
- [Git 教程](https://git-scm.com/book/zh/v2)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

祝你上传顺利！🚀
