/**
 * Rajakiya - Political Science Learning App for UPSC/KPSC
 * Complete offline polity guide with interactive constitution explorer and historical events map
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import SplashScreen from './src/components/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import { hydratePreferences } from './src/store/slices/appSlice';
import { getTheme } from './src/theme/palette';

const preloadTheme = getTheme('light');

const AppGate = () => {
  const dispatch = useDispatch<any>();
  const { hydrated, hasSelectedLanguage } = useSelector((state: any) => state.app);

  useEffect(() => {
    dispatch(hydratePreferences());
  }, [dispatch]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: preloadTheme.background }}>
        <ActivityIndicator size="large" color={preloadTheme.primary} />
      </View>
    );
  }

  if (!hasSelectedLanguage) {
    return <LanguageSelectionScreen />;
  }

  return <AppNavigator />;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <SplashScreen onFinish={handleSplashFinish} />
        </ErrorBoundary>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <AppGate />
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
