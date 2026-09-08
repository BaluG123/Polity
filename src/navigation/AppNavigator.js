import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToAuthChanges } from '../services/AuthService';
import { setUser } from '../store/slices/authSlice';
import { getText } from '../data/i18n';
import { getTheme } from '../theme/palette';
import { TabBar } from '../components/ui';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ConstitutionScreen from '../screens/ConstitutionScreen';
// Progress, Bookmark and Leaderboard screens removed from primary navigation
import TopicDetailScreen from '../screens/TopicDetailScreen';
import ConceptDetailScreen from '../screens/ConceptDetailScreen';
import CaseStudiesScreen from '../screens/CaseStudiesScreen';
import CaseStudyDetailScreen from '../screens/CaseStudyDetailScreen';
// Leaderboard screen removed from primary navigation
import GovernmentScreen from '../screens/GovernmentScreen';
import JudiciaryScreen from '../screens/JudiciaryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import NotificationService from '../services/NotificationService';
import NewsService from '../services/NewsService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// The 3 primary destinations. Government stays reachable only via Explore's
// topic list + the outer Stack (see below) — it used to also be a bottom
// tab, which meant it was registered as two different routes with two
// different header behaviors (native tab header AND its own in-screen
// header rendering at once). Keeping it Stack-only fixes that double header
// and keeps the tab bar to the 3 destinations that actually need a
// permanent home.
const TabNavigator = () => {
  const { language, themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} theme={theme} t={t} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Constitution" component={ConstitutionScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isSetup = false;

    const setupApp = async () => {
      if (isSetup) return;
      isSetup = true;

      // Setup notifications once
      try {
        await NotificationService.configure();
        await NotificationService.scheduleDailyReminder(20, 0); // 8:00 PM

        // Check for new news content
        const { hasUpdate } = await NewsService.checkForUpdates();
        if (hasUpdate) {
          await NotificationService.showNewsUpdate();
        }
      } catch (error) {
        console.error('Notification setup failed:', error);
      }
    };

    setupApp();

    // Auth
    const unsubscribe = subscribeToAuthChanges((user) => {
      // We store serializable user data in Redux
      const serializableUser = user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      } : null;

      dispatch(setUser(serializableUser));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Government" component={GovernmentScreen} />
        <Stack.Screen name="Judiciary" component={JudiciaryScreen} />
        <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
        <Stack.Screen name="ConceptDetail" component={ConceptDetailScreen} />
        <Stack.Screen name="CaseStudies" component={CaseStudiesScreen} />
        <Stack.Screen name="CaseStudyDetail" component={CaseStudyDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
