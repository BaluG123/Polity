/**
 * TargetPolity - Political Science Learning App for UPSC/KPSC
 * Complete offline polity guide with interactive constitution explorer
 */

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import SplashScreen from './src/components/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import { requestUserPermission, getFCMToken, notificationListener, createNotificationChannel, scheduleDailyReminder } from './src/services/notificationService';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const setupNotifications = async () => {
      await requestUserPermission();
      await createNotificationChannel();
      await scheduleDailyReminder();
      await getFCMToken();
    };

    setupNotifications();
    const unsubscribe = notificationListener();
    return unsubscribe;
  }, []);

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
          <AppNavigator />
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;