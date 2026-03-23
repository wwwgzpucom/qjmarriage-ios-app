# 使用 .NET 的 System.Drawing 来移除图标的透明通道
Add-Type -AssemblyName System.Drawing

$iconDir = "ios/App/App/Assets.xcassets/AppIcon.appiconset"
$files = Get-ChildItem -Path $iconDir -Filter "*.png"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    $bitmap = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
    
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::White)  # 白色背景
    $graphics.DrawImage($img, 0, 0, $img.Width, $img.Height)
    
    $img.Dispose()
    $graphics.Dispose()
    
    # 保存为不透明的 PNG
    $bitmap.Save($file.FullName, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    
    Write-Host "  ✓ Fixed: $($file.Name)"
}

Write-Host "`n✅ All icons fixed!"
