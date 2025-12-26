#!/bin/bash

echo "🚀 Setting up TargetPolity React Native App..."

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# For iOS - install pods
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios && pod install && cd ..
else
    echo "⚠️  Skipping iOS setup (not on macOS)"
fi

# Clean and reset cache
echo "🧹 Cleaning cache..."
npx react-native start --reset-cache &
METRO_PID=$!
sleep 3
kill $METRO_PID

# Link vector icons (for older RN versions, but won't hurt)
echo "🔗 Linking vector icons..."
npx react-native link react-native-vector-icons

echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo "  Android: npx react-native run-android"
echo "  iOS:     npx react-native run-ios"
echo ""
echo "If you encounter issues:"
echo "  1. Clean build: cd android && ./gradlew clean && cd .."
echo "  2. Reset cache: npx react-native start --reset-cache"
echo "  3. Rebuild: npx react-native run-android"