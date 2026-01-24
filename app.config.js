// ========================================
// 应用配置文件 - 只需修改这里的设置
// ========================================

const APP_CONFIG = {
  // 你的网站地址（必填）
  websiteUrl: 'https://www.example.com',
  
  // 应用名称
  appName: 'QJ Marriage',
  
  // 离线时显示的页面（可选）
  offlineUrl: './offline.html',
  
  // 功能开关
  features: {
    // 允许缩放
    allowZoom: false,
    
    // 下拉刷新
    pullToRefresh: true,
    
    // 显示加载进度条
    showProgressBar: true,
    
    // 允许外部链接在浏览器打开
    openExternalLinks: true,
  },
  
  // 主题颜色
  themeColor: '#31d53d',
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
