// 这个文件保持简单，主要重定向逻辑在 HTML 中
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动屏幕
setTimeout(async () => {
  try {
    await SplashScreen.hide();
  } catch (e) {
    console.log('隐藏启动屏幕失败:', e);
  }
}, 1000);

console.log('齐家婚姻 App - 正在重定向到网站');
