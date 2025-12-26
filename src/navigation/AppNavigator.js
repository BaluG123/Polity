import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');
  
  // Calculate appropriate tab bar height based on device
  const tabBarHeight = Platform.OS === 'ios' 
    ? Math.max(60 + insets.bottom, 80) 
    : Math.min(65, screenHeight * 0.08);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
          }

          return <Icon name={iconName} size={focused ? size + 2 : size} color={color} />;
        },
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen 
        name="Constitution" 
        component={ConstitutionScreen}
        options={{
          tabBarLabel: 'Constitution',
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={HistoricalMapScreen}
        options={{
          tabBarLabel: 'Events Map',
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{
          tabBarLabel: 'Quiz',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976D2',
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
          component={TabNavigator} 
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
        <Stack.Screen 
          name="Progress" 
          component={ProgressScreen}
          options={{
            title: 'Your Progress',
          }}
        />
        <Stack.Screen 
          name="Bookmarks" 
          component={BookmarkScreen}
          options={{
            title: 'Bookmarks',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;