import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// 配置网站地址
const WEBSITE_URL = 'https://qjmarriage.com/m/index.php';

// 获取元素
const webview = document.getElementById('webview');
const loading = document.getElementById('loading');
const app = document.getElementById('app');

// 初始化应用
async function initApp() {
  console.log('齐家婚姻 App 启动中...');
  console.log('平台:', Capacitor.getPlatform());
  console.log('是否原生:', Capacitor.isNativePlatform());
  
  try {
    // 设置 WebView 地址
    webview.src = WEBSITE_URL;
    
    // 监听 WebView 加载
    webview.addEventListener('load', onWebViewLoaded);
    webview.addEventListener('error', onWebViewError);
    
    // 注入原生功能到 WebView
    setupNativeBridge();
    
    // 延迟隐藏启动屏幕
    setTimeout(async () => {
      await SplashScreen.hide();
    }, 2000);
    
  } catch (error) {
    console.error('初始化失败:', error);
    showError('应用初始化失败，请重试');
  }
}

// WebView 加载完成
function onWebViewLoaded() {
  console.log('WebView 加载完成');
  loading.classList.add('hidden');
  
  // 注入原生功能到网页
  injectNativeFunctions();
}

// WebView 加载错误
function onWebViewError(error) {
  console.error('WebView 加载失败:', error);
  showError('网站加载失败，请检查网络连接');
}

// 显示错误信息
function showError(message) {
  loading.innerHTML = `
    <div class="error-message">
      <p>${message}</p>
      <button class="retry-button" onclick="location.reload()">重试</button>
    </div>
  `;
}

// 设置原生功能桥接
function setupNativeBridge() {
  // 监听来自 WebView 的消息
  window.addEventListener('message', async (event) => {
    const { type, data } = event.data;
    
    switch (type) {
      case 'TAKE_PHOTO':
        await takePhoto();
        break;
      case 'PICK_IMAGE':
        await pickImage();
        break;
      case 'SHARE':
        await shareContent(data);
        break;
      default:
        console.log('未知消息类型:', type);
    }
  });
}

// 注入原生功能到网页
function injectNativeFunctions() {
  if (!Capacitor.isNativePlatform()) {
    return;
  }
  
  // 创建一个脚本，注入到 iframe 中
  const script = `
    window.NativeApp = {
      platform: '${Capacitor.getPlatform()}',
      isNative: true,
      
      // 拍照
      takePhoto: function() {
        window.parent.postMessage({ type: 'TAKE_PHOTO' }, '*');
      },
      
      // 选择图片
      pickImage: function() {
        window.parent.postMessage({ type: 'PICK_IMAGE' }, '*');
      },
      
      // 分享
      share: function(data) {
        window.parent.postMessage({ type: 'SHARE', data: data }, '*');
      }
    };
    
    console.log('原生功能已注入');
  `;
  
  try {
    webview.contentWindow.eval(script);
  } catch (error) {
    console.error('注入原生功能失败:', error);
  }
}

// 拍照功能
async function takePhoto() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    
    console.log('拍照成功:', image.webPath);
    
    // 发送图片路径回 WebView
    webview.contentWindow.postMessage({
      type: 'PHOTO_TAKEN',
      data: { path: image.webPath }
    }, '*');
    
  } catch (error) {
    console.error('拍照失败:', error);
  }
}

// 选择图片
async function pickImage() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    
    console.log('选择图片成功:', image.webPath);
    
    // 发送图片路径回 WebView
    webview.contentWindow.postMessage({
      type: 'IMAGE_PICKED',
      data: { path: image.webPath }
    }, '*');
    
  } catch (error) {
    console.error('选择图片失败:', error);
  }
}

// 分享内容
async function shareContent(data) {
  try {
    // 这里可以添加分享功能
    console.log('分享内容:', data);
  } catch (error) {
    console.error('分享失败:', error);
  }
}

// 启动应用
initApp();
