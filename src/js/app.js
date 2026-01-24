// 简单的 WebView 应用逻辑

// 配置你的网站地址
const WEBSITE_URL = 'https://qjmarriage.com';

// 获取元素
const webview = document.getElementById('webview');
const loading = document.getElementById('loading');

// 设置网站地址
webview.src = WEBSITE_URL;

// 监听加载完成
webview.addEventListener('load', () => {
  loading.classList.add('hidden');
});

// 错误处理
webview.addEventListener('error', () => {
  loading.innerHTML = '<p style="color: red;">加载失败，请检查网络连接</p>';
});

console.log('WebView App 已启动，加载地址:', WEBSITE_URL);
