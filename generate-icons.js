import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// iOS 图标尺寸配置
const iconSizes = [
  { name: 'Icon-App-20x20@1x.png', size: 20 },
  { name: 'Icon-App-20x20@2x.png', size: 40 },
  { name: 'Icon-App-20x20@3x.png', size: 60 },
  { name: 'Icon-App-29x29@1x.png', size: 29 },
  { name: 'Icon-App-29x29@2x.png', size: 58 },
  { name: 'Icon-App-29x29@3x.png', size: 87 },
  { name: 'Icon-App-40x40@1x.png', size: 40 },
  { name: 'Icon-App-40x40@2x.png', size: 80 },
  { name: 'Icon-App-40x40@3x.png', size: 120 },
  { name: 'Icon-App-60x60@2x.png', size: 120 },
  { name: 'Icon-App-60x60@3x.png', size: 180 },
  { name: 'Icon-App-76x76@1x.png', size: 76 },
  { name: 'Icon-App-76x76@2x.png', size: 152 },
  { name: 'Icon-App-83.5x83.5@2x.png', size: 167 },
  { name: 'Icon-App-1024x1024@1x.png', size: 1024 },
];

// 输入和输出路径
const inputImage = path.join(__dirname, 'appIcon.png');
const outputDir = path.join(__dirname, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成所有尺寸的图标
async function generateIcons() {
  console.log('🎨 开始生成 iOS 应用图标...\n');

  for (const icon of iconSizes) {
    try {
      const outputPath = path.join(outputDir, icon.name);
      
      await sharp(inputImage)
        .resize(icon.size, icon.size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ 生成: ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ 生成失败: ${icon.name}`, error.message);
    }
  }

  // 创建 Contents.json
  const contentsJson = {
    images: [
      {
        size: "20x20",
        idiom: "iphone",
        filename: "Icon-App-20x20@2x.png",
        scale: "2x"
      },
      {
        size: "20x20",
        idiom: "iphone",
        filename: "Icon-App-20x20@3x.png",
        scale: "3x"
      },
      {
        size: "29x29",
        idiom: "iphone",
        filename: "Icon-App-29x29@1x.png",
        scale: "1x"
      },
      {
        size: "29x29",
        idiom: "iphone",
        filename: "Icon-App-29x29@2x.png",
        scale: "2x"
      },
      {
        size: "29x29",
        idiom: "iphone",
        filename: "Icon-App-29x29@3x.png",
        scale: "3x"
      },
      {
        size: "40x40",
        idiom: "iphone",
        filename: "Icon-App-40x40@2x.png",
        scale: "2x"
      },
      {
        size: "40x40",
        idiom: "iphone",
        filename: "Icon-App-40x40@3x.png",
        scale: "3x"
      },
      {
        size: "60x60",
        idiom: "iphone",
        filename: "Icon-App-60x60@2x.png",
        scale: "2x"
      },
      {
        size: "60x60",
        idiom: "iphone",
        filename: "Icon-App-60x60@3x.png",
        scale: "3x"
      },
      {
        size: "20x20",
        idiom: "ipad",
        filename: "Icon-App-20x20@1x.png",
        scale: "1x"
      },
      {
        size: "20x20",
        idiom: "ipad",
        filename: "Icon-App-20x20@2x.png",
        scale: "2x"
      },
      {
        size: "29x29",
        idiom: "ipad",
        filename: "Icon-App-29x29@1x.png",
        scale: "1x"
      },
      {
        size: "29x29",
        idiom: "ipad",
        filename: "Icon-App-29x29@2x.png",
        scale: "2x"
      },
      {
        size: "40x40",
        idiom: "ipad",
        filename: "Icon-App-40x40@1x.png",
        scale: "1x"
      },
      {
        size: "40x40",
        idiom: "ipad",
        filename: "Icon-App-40x40@2x.png",
        scale: "2x"
      },
      {
        size: "76x76",
        idiom: "ipad",
        filename: "Icon-App-76x76@1x.png",
        scale: "1x"
      },
      {
        size: "76x76",
        idiom: "ipad",
        filename: "Icon-App-76x76@2x.png",
        scale: "2x"
      },
      {
        size: "83.5x83.5",
        idiom: "ipad",
        filename: "Icon-App-83.5x83.5@2x.png",
        scale: "2x"
      },
      {
        size: "1024x1024",
        idiom: "ios-marketing",
        filename: "Icon-App-1024x1024@1x.png",
        scale: "1x"
      }
    ],
    info: {
      version: 1,
      author: "xcode"
    }
  };

  const contentsPath = path.join(outputDir, 'Contents.json');
  fs.writeFileSync(contentsPath, JSON.stringify(contentsJson, null, 2));
  console.log('\n✅ 生成: Contents.json');

  console.log('\n🎉 所有图标生成完成！');
  console.log(`📁 输出目录: ${outputDir}`);
}

// 运行
generateIcons().catch(error => {
  console.error('❌ 生成图标时出错:', error);
  process.exit(1);
});
