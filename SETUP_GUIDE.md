# 🚀 TargetPolity Setup Guide

This guide will help you set up the TargetPolity React Native application from scratch with proper React Native Gesture Handler and Vector Icons configuration.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **React Native CLI** - `npm install -g @react-native-community/cli`
- **Git** for version control

### For Android Development:
- **Android Studio** with Android SDK
- **Java Development Kit (JDK 11 or higher)**

### For iOS Development (macOS only):
- **Xcode** (latest version)
- **CocoaPods** - `sudo gem install cocoapods`

## 🛠️ Installation Steps

### 1. Clone or Create Project

If you have the source code:
```bash
git clone <repository-url>
cd TargetPolity
```

If creating from scratch:
```bash
npx @react-native-community/cli@latest init TargetPolity
cd TargetPolity
```

### 2. Install Dependencies

```bash
# Install all npm dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

### 3. Configure React Native Gesture Handler

**IMPORTANT:** This is already configured in the project, but verify these steps:

#### a) Check index.js
Ensure `index.js` has this import at the very top:
```javascript
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

#### b) Android Configuration
Check `android/app/src/main/java/com/targetpolity/MainActivity.kt`:
```kotlin
package com.targetpolity

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "TargetPolity"
  
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

#### c) Babel Configuration
Check `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### 4. Configure React Native Vector Icons

**IMPORTANT:** This is already configured in the project, but verify these steps:

#### a) Android Configuration
Check `android/app/build.gradle` has this at the bottom:
```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

#### b) iOS Configuration
Check `ios/TargetPolity/Info.plist` has the UIAppFonts array:
```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialIcons.ttf</string>
  <string>FontAwesome.ttf</string>
  <!-- ... other fonts ... -->
</array>
```

#### c) React Native Config
The project includes `react-native.config.js` for proper font linking.

### 5. Run the Application

#### Start Metro Bundler
```bash
npx react-native start --reset-cache
```

#### Run on Android
```bash
# In a new terminal
npx react-native run-android
```

#### Run on iOS (macOS only)
```bash
# In a new terminal
npx react-native run-ios
```

## 🔧 Troubleshooting

### React Native Gesture Handler Issues

If you get "RNGestureHandler was not found" error:

1. **Verify import in index.js:**
   ```javascript
   import 'react-native-gesture-handler'; // Must be at the top
   ```

2. **Clean and rebuild:**
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native start --reset-cache
   npx react-native run-android
   ```

3. **For iOS:**
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

### Vector Icons Issues

If icons show as squares or don't appear:

1. **Android - Clean and rebuild:**
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

2. **iOS - Reinstall pods:**
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

3. **Manual linking (if needed):**
   ```bash
   npx react-native link react-native-vector-icons
   ```

### Common Issues and Solutions

#### 1. Metro Bundler Issues
```bash
# Clear cache and restart
npx react-native start --reset-cache
```

#### 2. Android Build Issues
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### 3. iOS Build Issues
```bash
# Clean iOS build
cd ios
xcodebuild clean
pod install
cd ..
npx react-native run-ios
```

#### 4. Complete Reset (Nuclear Option)
```bash
# Stop all processes
pkill -f "react-native"
pkill -f "metro"

# Clean everything
rm -rf node_modules
rm -rf ios/build
rm -rf android/build
rm package-lock.json

# Reinstall
npm install
cd ios && pod install && cd .. # iOS only

# Clean builds
cd android && ./gradlew clean && cd ..

# Start fresh
npx react-native start --reset-cache
```

## 📱 Testing the App

### 1. Verify Core Features
- [ ] App launches without crashes
- [ ] Navigation between tabs works (gesture handler working)
- [ ] Icons display properly (vector icons working)
- [ ] Historical Map screen displays events
- [ ] Constitution screen shows articles
- [ ] Quiz functionality works
- [ ] Home screen displays properly

### 2. Test Gestures
- [ ] Tab navigation works
- [ ] Screen transitions are smooth
- [ ] Scroll views work properly
- [ ] Touch interactions respond correctly

### 3. Test Icons
- [ ] Material Icons display correctly
- [ ] All screen icons are visible
- [ ] No square boxes instead of icons

## 🎯 Key Features to Verify

### Historical Map Screen
- [ ] Timeline view shows events chronologically
- [ ] Map view displays event markers
- [ ] Category filters work correctly
- [ ] Event detail modal opens properly
- [ ] Toggle between timeline and map views

### Constitution Screen
- [ ] All constitutional parts are listed
- [ ] Search functionality works
- [ ] Article details are accessible
- [ ] Amendment information is displayed

### Quiz Screen
- [ ] Questions load properly
- [ ] Answer selection works
- [ ] Progress tracking functions
- [ ] Results screen displays correctly

## 🚀 Quick Setup Script

Run the automated setup script:
```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- Install npm dependencies
- Install iOS pods (macOS only)
- Clean cache
- Link vector icons
- Provide next steps

## 📚 Additional Resources

### Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### Troubleshooting
- See `TROUBLESHOOTING.md` for detailed issue resolution
- Check React Native community forums
- Search GitHub issues for specific libraries

## ✅ Success Checklist

- [ ] Project builds successfully on Android
- [ ] Project builds successfully on iOS (if applicable)
- [ ] All main screens are accessible
- [ ] Navigation gestures work smoothly
- [ ] All icons display correctly
- [ ] Historical events map displays correctly
- [ ] Constitution content loads properly
- [ ] Quiz functionality works
- [ ] No console errors or warnings
- [ ] App performs smoothly on target devices

---

**Congratulations!** 🎉 You should now have a fully functional TargetPolity app with working gesture handler and vector icons. The app includes a comprehensive historical events map, constitution explorer, and quiz system for learning Indian political science.