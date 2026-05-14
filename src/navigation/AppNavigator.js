import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToAuthChanges } from '../services/AuthService';
import { setUser } from '../store/slices/authSlice';
import { getText } from '../data/i18n';
import { getTheme } from '../theme/palette';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ConstitutionScreen from '../screens/ConstitutionScreen';
import CaseStudiesScreen from '../screens/CaseStudiesScreen';
import QuizScreen from '../screens/QuizScreen';
import ProgressScreen from '../screens/ProgressScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import ConceptDetailScreen from '../screens/ConceptDetailScreen';
import CaseStudyDetailScreen from '../screens/CaseStudyDetailScreen';
import HistoricalMapScreen from '../screens/HistoricalMapScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import GovernmentScreen from '../screens/GovernmentScreen';
import JudiciaryScreen from '../screens/JudiciaryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerHeader = props => {
  const { language, themeMode } = useSelector(state => state.app);
  const { user } = useSelector(state => state.auth);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, paddingTop: 14, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: theme.text }}>TargetPolity</Text>
        <Text style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>{t('appTagline')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={{ width: 46, height: 46, borderRadius: 23 }} />
          ) : (
            <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="person" size={26} color="#FFFFFF" />
            </View>
          )}
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text numberOfLines={1} style={{ color: theme.text, fontSize: 15, fontWeight: '900' }}>
              {user?.displayName || t('guest')}
            </Text>
            <Text numberOfLines={1} style={{ color: theme.muted, fontSize: 12, marginTop: 2 }}>
              {user?.email || t('studyMode')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, paddingTop: 8 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const { language, themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerHeader {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'Constitution') {
            iconName = 'article';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Quiz') {
            iconName = 'quiz';
          } else if (route.name === 'Progress') {
            iconName = 'trending-up';
          } else if (route.name === 'Bookmarks') {
            iconName = 'bookmark';
          } else if (route.name === 'Leaderboard') {
            iconName = 'emoji-events';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: true,
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: '900' },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.muted,
        drawerActiveBackgroundColor: theme.dark ? '#1E3A5F' : '#E3F2FD',
        drawerStyle: { backgroundColor: theme.background },
        drawerLabelStyle: { fontSize: 14, fontWeight: '800' },
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: t('home'),
          title: t('home'),
        }}
      />
      <Drawer.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          drawerLabel: t('explore'),
          title: t('explore'),
        }}
      />
      <Drawer.Screen
        name="Constitution"
        component={ConstitutionScreen}
        options={{
          drawerLabel: t('constitution'),
          title: t('constitution'),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={HistoricalMapScreen}
        options={{
          drawerLabel: t('map'),
          title: t('map'),
        }}
      />
      <Drawer.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          drawerLabel: t('quiz'),
          title: t('quiz'),
        }}
      />
      <Drawer.Screen name="Progress" component={ProgressScreen} options={{ drawerLabel: t('progress'), title: t('progress') }} />
      <Drawer.Screen name="Bookmarks" component={BookmarkScreen} options={{ drawerLabel: t('bookmarks'), title: t('bookmarks') }} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} options={{ drawerLabel: t('leaderboard'), title: t('leaderboard') }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ drawerLabel: t('settings'), title: t('settings') }} />
    </Drawer.Navigator>
  );
};

import NotificationService from '../services/NotificationService';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);

  useEffect(() => {
    let isSetup = false;
    
    const setupApp = async () => {
      if (isSetup) return;
      isSetup = true;
      
      // Setup notifications once
      try {
        await NotificationService.configure();
        await NotificationService.scheduleDailyReminder(20, 0); // 8:00 PM
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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Government"
          component={GovernmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Judiciary"
          component={JudiciaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetailScreen}
          options={({ route }) => ({
            title: route.params?.title || 'Topic Details',
          })}
        />
        <Stack.Screen
          name="ConceptDetail"
          component={ConceptDetailScreen}
          options={({ route }) => ({
            title: route.params?.title || 'Concept Details',
          })}
        />
        <Stack.Screen
          name="CaseStudyDetail"
          component={CaseStudyDetailScreen}
          options={({ route }) => ({
            title: route.params?.title || 'Case Study',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
