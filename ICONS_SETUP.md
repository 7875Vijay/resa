# 🎨 App Icons & Launch Screen Guide

This document explains how to configure and customize app icons and launch screens for the Resa app across iOS and Android platforms.

---

## 📌 Current Icon Configuration

Your app is already configured in `app.json` with these logo files located in `assets/images/`:

### Icon Files

| File | Purpose | Dimensions | Format | Status |
|------|---------|-----------|--------|--------|
| `resalogo.png` | **Main app icon** | 1024×1024 | PNG | ✅ In Use |
| `android-icon-foreground.png` | Android adaptive icon (foreground) | 1080×1080 | PNG | ✅ In Use |
| `android-icon-background.png` | Android adaptive icon (background) | 1080×1080 | PNG | ✅ In Use |
| `android-icon-monochrome.png` | Android adaptive icon (monochrome) | 1080×1080 | PNG | ✅ In Use |
| `favicon.png` | Web favicon | 192×192 | PNG | ✅ In Use |

---

## 🔧 app.json Configuration

```json
{
  "expo": {
    "icon": "./assets/images/resalogo.png",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      }
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/resalogo.png",
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ]
  }
}
```

---

## 🎯 Your Logo is Ready!

Your `resalogo.png` is already configured and being used by:
- ✅ iOS app icon
- ✅ Android launcher icon  
- ✅ Splash screen
- ✅ Web favicon

### To Update Your Logo

Simply replace `assets/images/resalogo.png` with your new design (1024×1024 PNG minimum).

```bash
# Clear cache to see changes immediately
npm start -- --clear
```

### Advanced: Update Android Adaptive Icons

If you want to customize Android adaptive icons separately:

1. **Replace these files**:
   - `android-icon-foreground.png` (should have transparent background)
   - `android-icon-background.png` (solid color or gradient)
   - `android-icon-monochrome.png` (single-color version)

2. **Update background color in `app.json`**:
   ```json
   "android": {
     "adaptiveIcon": {
       "backgroundColor": "#E6F4FE"  // Change to your brand color
     }
   }
   ```

3. **Rebuild**:
   ```bash
   eas build --platform android --profile preview
   ```

---

## 📱 iOS App Icon Setup

### Icon Specifications
- **Format**: PNG with transparency
- **Size**: 1024×1024 pixels (will be scaled down)
- **Colors**: RGB or RGBA
- **Safe zone**: Ensure important elements are within 923×923 center area

### Supported Icon Sizes Generated

Expo automatically generates:
- 16×16, 20×20, 29×29, 32×32, 40×40, 58×58, 60×60, 64×64, 87×87, 120×120, 128×128, 180×180

---

## 🤖 Android App Icon Setup

### Adaptive Icon (Recommended)

Modern Android (API 26+) uses adaptive icons with:
- **Foreground image**: Your icon design (1080×1080)
- **Background color**: Solid color or pattern
- **Monochrome image**: Single-color version

### Non-Adaptive Fallback

For older Android versions, the main icon is used.

### Icon Guidelines

- **Safe zone**: Keep important elements within the center 540×540 area
- **Margins**: Provide 108px margin from edges
- **Format**: PNG with transparency
- **Colors**: Follow your brand colors

---

## 🌐 Web Favicon

- **Format**: PNG or ICO
- **Size**: 192×192 minimum (192×192 recommended)
- **Location**: `assets/images/favicon.png`

---

## 🎨 Customization Examples

### Change Primary Colors

1. Edit `app.json`:
   ```json
   "android": {
     "adaptiveIcon": {
       "backgroundColor": "#YOUR_COLOR_HEX"
     }
   }
   ```

2. Update the SVG or PNG icon colors to match

### Using SVG Icons

Convert SVG to PNG using:

```bash
# Using ImageMagick
convert -background none app-icon.svg -size 1024x1024 resalogo.png

# Using Inkscape (CLI)
inkscape -w 1024 -h 1024 -o resalogo.png app-icon.svg
```

---

## 🚀 Testing Icons

### iOS Simulator
```bash
npm run ios
# Icon will display in home screen
```

### Android Emulator
```bash
npm run android
# Icon will display in home screen
```

### Physical Device
Build and run on your device to see icons in production quality.

---

## 📦 Build and Publish

### Prebuild for Native Apps

```bash
# Generate native iOS and Android code
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

### Verify Icons Before Publishing

1. Check icon appears correctly in app switcher
2. Verify adaptive icon renders properly (Android)
3. Confirm notification icons are visible
4. Test on both light and dark modes

---

## 🛠️ Tools for Icon Design

- **Figma**: Free design tool with templates
- **Adobe XD**: Professional design tool
- **Icon generators**: 
  - [Expo Image Generator](https://icons.expo.fyi)
  - [AppIcon](https://www.appicon.co)
  - [IconKitchen](https://www.iconkitchen.com)

---

## ❓ Troubleshooting

### Icon Not Updating

```bash
# Clear Expo cache
expo start --clear

# Rebuild the app
expo prebuild --clean
```

### Icon Looks Blurry

- Ensure source image is at least 1024×1024
- Use PNG format with transparency
- Avoid excessive compression

### Adaptive Icon Issues (Android)

- Check `android-icon-foreground.png` has transparency
- Verify background color is valid hex code
- Test on Android 8+ devices

---

## 📚 Resources

- [Expo Icon Documentation](https://docs.expo.dev/config/app/#icon)
- [Android Adaptive Icons Guide](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
- [iOS App Icon Requirements](https://developer.apple.com/design/human-interface-guidelines/icons)

---

## 🔄 Icon Update Workflow

1. **Design** your icon in Figma/Adobe XD
2. **Export** as 1024×1024 PNG
3. **Generate variants** using `expo-app-icons`
4. **Update** all icon references in `app.json`
5. **Test** on simulators and devices
6. **Rebuild** and deploy

---

**Last Updated**: May 2026  
**Resa App** - Property Rental Discovery Platform
