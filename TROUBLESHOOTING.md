# 🔧 TargetPolity Troubleshooting Guide

## React Native Gesture Handler Issues

### Error: "RNGestureHandler was not found"

**Solution:**
1. **Install the dependency:**
   ```bash
   npm install react-native-gesture-handler
   ```

2. **For React Native 0.60+, run autolinking:**
   ```bash
   npx react-native unlink react-native-gesture-handler
   npx react-native link react-native-gesture-handler
   ```

3. **Update index.js (IMPORTANT):**
   Make sure `index.js` has this import at the very top:
   ```javascript
   import 'react-native-gesture-handler';
   ```

4. **Android Configuration:**
   - MainActivity.kt should import gesture handler
   - Clean and rebuild: `cd android && ./gradlew clean && cd .. && npx react-native run-android`

5. **iOS Configuration:**
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

### Error: "Invariant Violation: Native module cannot be null"

**Solution:**
1. **Reset Metro cache:**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Clean builds:**
   ```bash
   # Android
   cd android && ./gradlew clean && cd ..
   
   # iOS
   cd ios && xcodebuild clean && cd ..
   ```

3. **Reinstall node_modules:**
   ```bash
   rm -rf node_modules
   npm install
   cd ios && pod install && cd .. # iOS only
   ```

## React Native Vector Icons Issues

### Error: "Unrecognized font family 'MaterialIcons'"

**Solution:**
1. **Verify installation:**
   ```bash
   npm install react-native-vector-icons
   ```

2. **Android Configuration:**
   - Check `android/app/build.gradle` has: `apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")`
   - Clean and rebuild

3. **iOS Configuration:**
   - Check `ios/TargetPolity/Info.plist` has UIAppFonts array with font files
   - Run `cd ios && pod install && cd ..`

4. **Manual linking (if needed):**
   ```bash
   npx react-native link react-native-vector-icons
   ```

### Icons not showing (showing as squares/boxes)

**Solution:**
1. **Check font files are included:**
   - Android: Fonts should be in `android/app/src/main/assets/fonts/`
   - iOS: Fonts should be listed in Info.plist

2. **Rebuild the app completely:**
   ```bash
   # Clean everything
   rm -rf node_modules
   npm install
   
   # Android
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   
   # iOS
   cd ios && pod install && xcodebuild clean && cd ..
   npx react-native run-ios
   ```

3. **Check import statement:**
   ```javascript
   import Icon from 'react-native-vector-icons/MaterialIcons';
   ```

## General React Native Issues

### Metro bundler issues

**Solution:**
```bash
# Kill any running Metro processes
npx react-native start --reset-cache

# Or manually kill processes
lsof -ti:8081 | xargs kill -9
```

### Build failures

**Android:**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
npx react-native run-android
```

**iOS:**
```bash
cd ios
xcodebuild clean
pod install
cd ..
npx react-native run-ios
```

### "Unable to resolve module" errors

**Solution:**
1. **Clear watchman cache:**
   ```bash
   watchman watch-del-all
   ```

2. **Clear React Native cache:**
   ```bash
   npx react-native start --reset-cache
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Step-by-Step Fix for Common Issues

### Complete Reset (Nuclear Option)

If nothing else works, try this complete reset:

```bash
# 1. Stop all processes
pkill -f "react-native"
pkill -f "metro"

# 2. Clean everything
rm -rf node_modules
rm -rf ios/build
rm -rf android/build
rm -rf android/app/build
rm package-lock.json

# 3. Reinstall
npm install

# 4. iOS setup (macOS only)
cd ios
pod deintegrate
pod install
cd ..

# 5. Android clean
cd android
./gradlew clean
cd ..

# 6. Start fresh
npx react-native start --reset-cache
```

Then in a new terminal:
```bash
npx react-native run-android
# or
npx react-native run-ios
```

## Specific TargetPolity Issues

### Navigation errors

Make sure all navigation dependencies are installed:
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
```

### Redux/State management errors

Verify Redux Toolkit installation:
```bash
npm install @reduxjs/toolkit react-redux
```

### Linear Gradient issues

For Android, make sure the gradle configuration is correct in `android/app/build.gradle`.

## Getting Help

If you're still having issues:

1. **Check the React Native documentation:** https://reactnative.dev/docs/troubleshooting
2. **Search existing issues:** Check GitHub issues for react-native-gesture-handler and react-native-vector-icons
3. **Create a minimal reproduction:** Isolate the problem in a simple test case
4. **Check versions:** Ensure all dependencies are compatible with your React Native version

## Quick Commands Reference

```bash
# Setup from scratch
npm install
cd ios && pod install && cd .. # iOS only

# Clean and rebuild
npm run clean
npx react-native start --reset-cache

# Run app
npx react-native run-android
npx react-native run-ios

# Debug
npx react-native log-android
npx react-native log-ios
```