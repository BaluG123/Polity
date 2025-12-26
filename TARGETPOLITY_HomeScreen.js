import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithGoogle, signOut } from '../services/authService';
import { setUser, setLoading, setError } from '../store/slices/authSlice';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { studyStreak } = useSelector(state => state.progress);
  const { bookmarks } = useSelector(state => state.polity);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(targetUser => {
      dispatch(setUser(targetUser));
    });
    return subscriber;
  }, [dispatch]);

  const handleGoogleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      const user = await signInWithGoogle();
      dispatch(setUser(user));
      Alert.alert('Success', 'Signed in successfully!');
    } catch (error) {
      dispatch(setError(error.message));
      Alert.alert('Error', error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(setUser(null));
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const quickActions = [
    {
      id: 'constitution',
      title: 'Constitution',
      subtitle: 'Articles & Amendments',
      icon: 'article',
      color: '#1976D2',
      screen: 'Constitution',
    },
    {
      id: 'cases',
      title: 'Landmark Cases',
      subtitle: 'Supreme Court Judgments',
      icon: 'gavel',
      color: '#E91E63',
      screen: 'Cases',
    },
    {
      id: 'quiz',
      title: 'Practice Quiz',
      subtitle: 'Test Your Knowledge',
      icon: 'quiz',
      color: '#4CAF50',
      screen: 'Quiz',
    },
    {
      id: 'explore',
      title: 'Explore Topics',
      subtitle: 'Browse All Content',
      icon: 'explore',
      color: '#FF9800',
      screen: 'Explore',
    },
  ];

  const recentTopics = [
    {
      id: 'fundamental_rights',
      title: 'Fundamental Rights',
      category: 'Constitution',
      progress: 75,
      icon: '⚖️',
    },
    {
      id: 'dpsp',
      title: 'Directive Principles',
      category: 'Constitution',
      progress: 60,
      icon: '🎯',
    },
    {
      id: 'president',
      title: 'President of India',
      category: 'Government',
      progress: 45,
      icon: '🏛️',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.appTitle}>TargetPolity</Text>
            <Text style={styles.appSubtitle}>Master Indian Polity & Constitution</Text>
          </View>
          
          <View style={styles.headerRight}>
            {user ? (
              <TouchableOpacity style={styles.profileBtn} onPress={handleSignOut}>
                <Icon name="account-circle" size={32} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.signInBtn} onPress={handleGoogleSignIn}>
                <Icon name="login" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="local-fire-department" size={24} color="#FF6F00" />
            <Text style={styles.statValue}>{studyStreak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="bookmark" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{bookmarks.length}</Text>
            <Text style={styles.statLabel}>Bookmarks</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="trending-up" size={24} color="#2196F3" />
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            {user ? `Welcome back, ${user.displayName?.split(' ')[0] || 'Student'}!` : 'Welcome to TargetPolity!'}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Master the Indian Constitution and Political System with comprehensive study materials and practice questions.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Quick Access</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Icon name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={16} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Topics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📖 Continue Learning</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => navigation.navigate('TopicDetail', { topic })}
              activeOpacity={0.7}
            >
              <View style={styles.topicLeft}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicCategory}>{topic.category}</Text>
                </View>
              </View>
              
              <View style={styles.topicRight}>
                <Text style={styles.progressText}>{topic.progress}%</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${topic.progress}%` }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Tip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Daily Constitutional Tip</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <Icon name="lightbulb" size={20} color="#FF9800" />
              <Text style={styles.tipTitle}>Article 21 - Right to Life</Text>
            </View>
            <Text style={styles.tipContent}>
              The Supreme Court in Maneka Gandhi case (1978) expanded Article 21 to include 'right to live with dignity'. 
              This landmark judgment transformed the interpretation of fundamental rights in India.
            </Text>
            <TouchableOpacity style={styles.tipButton}>
              <Text style={styles.tipButtonText}>Learn More</Text>
              <Icon name="arrow-forward" size={16} color="#1976D2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Affairs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📰 Latest Updates</Text>
          <TouchableOpacity style={styles.newsCard}>
            <View style={styles.newsHeader}>
              <View style={styles.newsCategory}>
                <Text style={styles.newsCategoryText}>Supreme Court</Text>
              </View>
              <Text style={styles.newsDate}>Today</Text>
            </View>
            <Text style={styles.newsTitle}>
              SC Upholds Right to Privacy as Fundamental Right
            </Text>
            <Text style={styles.newsContent}>
              The Supreme Court reaffirms privacy as an intrinsic part of Article 21, 
              impacting digital rights and data protection laws...
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  headerRight: {
    alignItems: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 0.3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#E3F2FD',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  quickActionsGrid: {
    gap: 15,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topicCategory: {
    fontSize: 14,
    color: '#666',
  },
  topicRight: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 2,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  tipContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  tipButtonText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginRight: 5,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  newsCategory: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newsCategoryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  newsContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;