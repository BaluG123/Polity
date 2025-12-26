import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { INDIAN_CONSTITUTION } from '../data/polityData';

const { width } = Dimensions.get('window');

import { signInWithGoogle, signOut } from '../services/AuthService';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { FirestoreService } from '../services/FirestoreService';

const HomeScreen = ({ navigation }) => {
  const { studyStreak } = useSelector(state => state.progress);
  const { bookmarks } = useSelector(state => state.polity);
  const { user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleProfilePress = async () => {
    if (user) {
      Alert.alert(
        'Sign Out',
        `Signed in as ${user.displayName || user.email}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out', onPress: async () => {
              try {
                await signOut();
              } catch (error) {
                Alert.alert('Error', 'Failed to sign out');
              }
            }, style: 'destructive'
          }
        ]
      );
    } else {
      try {
        await signInWithGoogle();
      } catch (error) {
        if (error && error.code) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Error', 'Google Play Services not available or outdated.');
          } else {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Sign In Failed', `Error: ${error.message || 'Unknown error'}`);
          }
        } else {
          console.error('Unknown Sign-In Error:', error);
          Alert.alert('Sign In Failed', 'An unknown error occurred.');
        }
      }
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
      id: 'map',
      title: 'Historical Events',
      subtitle: 'Timeline & Map View',
      icon: 'map',
      color: '#4CAF50',
      screen: 'Map',
    },
    {
      id: 'quiz',
      title: 'Practice Quiz',
      subtitle: 'Test Your Knowledge',
      icon: 'quiz',
      color: '#E91E63',
      screen: 'Quiz',
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      subtitle: 'Top Scorers',
      icon: 'emoji-events',
      color: '#FFD700',
      screen: 'Leaderboard',
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
      hasDetailedContent: true,
      content: INDIAN_CONSTITUTION.fundamentalRights
    },
    {
      id: 'historical_events',
      title: 'Historical Events',
      category: 'Timeline',
      progress: 60,
      icon: '📅',
      hasDetailedContent: true,
      content: {
        title: 'Historical Events in Indian Political Development',
        topics: [
          {
            title: 'British Colonial Era (1773-1947)',
            description: 'Key legislative acts and constitutional developments under British rule',
            concepts: [
              {
                title: 'Regulating Act of 1773',
                content: `The Regulating Act of 1773 was the first step by the British Government to regulate the affairs of the East India Company in India.

KEY PROVISIONS:
• Designated Governor of Bengal as Governor-General
• Established Supreme Court at Calcutta (1774)
• Prohibited private trade by Company servants
• Required Court of Directors to report Indian affairs to British Government

SIGNIFICANCE:
• First constitutional step towards centralized administration
• Beginning of British Crown's control over Company
• Laid foundation for future constitutional developments
• Warren Hastings became first Governor-General

LIMITATIONS:
• Governor-General had limited control over other presidencies
• Conflicts between Governor-General and Council
• Supreme Court's jurisdiction unclear`,
                keywords: ['Regulating Act', '1773', 'Warren Hastings', 'Governor-General', 'Supreme Court'],
                examTips: 'Remember this as the first constitutional act for India. Warren Hastings was the first Governor-General under this act.'
              },
              {
                title: 'Government of India Act 1858',
                content: `The Government of India Act 1858 transferred the powers of the East India Company to the British Crown following the 1857 revolt.

KEY PROVISIONS:
• Company's rule ended, Crown rule began
• Secretary of State for India created in British Cabinet
• Council of India (15 members) to assist Secretary of State
• Governor-General became Viceroy (representative of Crown)
• Indian Civil Service established

SIGNIFICANCE:
• End of Company Rule, beginning of Crown Rule
• Direct administration by British Government
• Lord Canning became first Viceroy
• Established pattern of colonial administration

IMPACT:
• More systematic administration
• Better coordination with British policy
• Foundation for future constitutional reforms
• Centralized decision-making in London`,
                keywords: ['Government of India Act', '1858', 'Crown Rule', 'Viceroy', 'Secretary of State'],
                examTips: 'This act ended Company rule and started Crown rule. Lord Canning was the first Viceroy.'
              }
            ]
          },
          {
            title: 'Constitutional Development (1909-1935)',
            description: 'Progressive constitutional reforms leading to limited self-governance',
            concepts: [
              {
                title: 'Morley-Minto Reforms (1909)',
                content: `The Indian Councils Act 1909, known as Morley-Minto Reforms, introduced separate electorates and expanded legislative councils.

KEY FEATURES:
• Separate electorates for Muslims
• Expanded Legislative Councils (Central and Provincial)
• Indian members in Viceroy's Executive Council
• Limited powers to discuss budget and ask questions

SIGNIFICANCE:
• First recognition of communal representation
• Beginning of constitutional reforms
• Limited Indian participation in governance
• Foundation for future communal politics

CRITICISM:
• Legalized communalism in Indian politics
• Divide and rule policy
• Limited powers to Indian members
• No real transfer of power`,
                keywords: ['Morley-Minto', '1909', 'separate electorates', 'communal representation'],
                examTips: 'Remember this introduced separate electorates for Muslims, which later became a major issue in Indian politics.'
              },
              {
                title: 'Government of India Act 1935',
                content: `The Government of India Act 1935 was the most comprehensive constitutional document for India, serving as the blueprint for the 1950 Constitution.

KEY FEATURES:
• All-India Federation (never implemented)
• Provincial Autonomy (implemented in 1937)
• Bicameral legislature at Centre
• Federal Court established
• Separate electorates continued

PROVINCIAL AUTONOMY:
• Responsible government in provinces
• Governor as constitutional head
• Council of Ministers responsible to legislature
• Reserved subjects under Governor

FEDERAL PROVISIONS:
• Federation of British India and Princely States
• Distribution of powers (Federal, Provincial, Concurrent)
• Federal Court as highest judicial authority
• Governor-General retained special powers

SIGNIFICANCE:
• Largest constitutional document (321 sections, 10 schedules)
• Blueprint for Indian Constitution
• First experience of responsible government
• Foundation for federal structure

LIMITATIONS:
• Federation never implemented due to princely states' opposition
• Governor retained special powers
• No real transfer of power at Centre
• Communal electorates continued`,
                keywords: ['Government of India Act 1935', 'Provincial Autonomy', 'Federation', 'Federal Court'],
                examTips: 'This act was the primary source of the Indian Constitution. Remember it introduced provincial autonomy and federal structure.'
              }
            ]
          },
          {
            title: 'Independence and Constitution Making (1946-1950)',
            description: 'The final phase leading to independence and constitutional framework',
            concepts: [
              {
                title: 'Cabinet Mission Plan (1946)',
                content: `The Cabinet Mission Plan proposed the framework for Indian independence and constitutional structure.

PROPOSALS:
• Rejection of Pakistan demand
• Three-tier federal structure
• Constituent Assembly formation
• Interim Government
• Grouping of provinces

CONSTITUENT ASSEMBLY:
• 389 members (292 from British India, 97 from Princely States)
• Indirect election by Provincial Assemblies
• Communal representation basis
• Dr. Rajendra Prasad as President

SIGNIFICANCE:
• Last British attempt to keep India united
• Provided framework for Constituent Assembly
• Basis for constitutional making process
• Interim Government formation

OUTCOME:
• Partially accepted by Congress and Muslim League
• Led to formation of Constituent Assembly
• Interim Government under Nehru
• Foundation for constitutional process`,
                keywords: ['Cabinet Mission', '1946', 'Constituent Assembly', 'three-tier federation'],
                examTips: 'Cabinet Mission Plan led to the formation of Constituent Assembly which drafted our Constitution.'
              },
              {
                title: 'Independence Day (August 15, 1947)',
                content: `India gained independence on August 15, 1947, marking the end of British colonial rule and birth of two nations.

EVENTS:
• Indian Independence Act 1947 passed by British Parliament
• Partition into India and Pakistan
• Transfer of power to Indian leaders
• Jawaharlal Nehru became first Prime Minister
• Lord Mountbatten as first Governor-General

PARTITION:
• Based on two-nation theory
• Massive population exchange
• Communal riots and displacement
• Integration of princely states
• Refugee rehabilitation

CHALLENGES:
• Communal violence
• Administrative reorganization
• Economic disruption
• Integration of 562 princely states
• Refugee crisis

SIGNIFICANCE:
• End of 200 years of British rule
• Birth of world's largest democracy
• Beginning of decolonization process
• Model for other independence movements`,
                keywords: ['Independence', 'August 15 1947', 'Partition', 'Nehru', 'Mountbatten'],
                examTips: 'Remember the date August 15, 1947, and that Nehru was the first PM while Mountbatten was the first Governor-General.'
              },
              {
                title: 'Constitution Adoption (November 26, 1949)',
                content: `The Indian Constitution was adopted by the Constituent Assembly on November 26, 1949, after nearly three years of deliberation.

DRAFTING PROCESS:
• Constituent Assembly worked from 1946-1949
• 11 sessions over 2 years, 11 months, 18 days
• 114 days of actual deliberation
• Dr. B.R. Ambedkar as Drafting Committee Chairman
• 395 articles, 8 schedules initially

KEY FEATURES ADOPTED:
• Parliamentary system of government
• Federal structure with unitary bias
• Fundamental Rights and Duties
• Independent Judiciary
• Universal Adult Suffrage

SOURCES:
• Government of India Act 1935 (major source)
• British Constitution (Parliamentary system)
• US Constitution (Fundamental Rights, Judicial Review)
• Irish Constitution (Directive Principles)
• Canadian Constitution (Federation)

SIGNIFICANCE:
• World's longest written constitution
• Comprehensive document covering all aspects
• Balance between various interests
• Foundation of Indian democracy
• November 26 celebrated as Law Day`,
                keywords: ['Constitution adoption', 'November 26 1949', 'Ambedkar', 'Constituent Assembly'],
                examTips: 'Constitution was adopted on November 26, 1949 but came into effect on January 26, 1950. Ambedkar was the Drafting Committee Chairman.'
              }
            ]
          }
        ]
      }
    },
    {
      id: 'president',
      title: 'President of India',
      category: 'Government',
      progress: 45,
      icon: '🏛️',
      hasDetailedContent: true,
      content: INDIAN_CONSTITUTION.presidentOfIndia
    },
  ];



  // ... inside component ...

  const handleSecretSeed = async () => {
    Alert.alert(
      'Secret Admin Menu',
      'Do you want to seed the database with quiz questions?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Seed Database',
          onPress: async () => {
            try {
              const success = await FirestoreService.seedDatabase();
              if (success) {
                Alert.alert('Success', 'Database seeded successfully!');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to seed database.');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  const getGreeting = () => {
    if (user && user.displayName) {
      const firstName = user.displayName.split(' ')[0];
      return `Hello, ${firstName}!`;
    }
    return 'TargetPolity';
  };

  const handleTopicPress = (topic) => {
    if (topic.hasDetailedContent && topic.content) {
      // Navigate to ConceptDetail with formatted content
      navigation.navigate('ConceptDetail', {
        title: topic.title,
        content: formatDetailedContent(topic.content),
        subtitle: `${topic.category} - ${topic.progress}% Complete`
      });
    } else {
      // Navigate to TopicDetail for topics without detailed content
      navigation.navigate('TopicDetail', { topic });
    }
  };

  const formatDetailedContent = (detailedContent) => {
    if (!detailedContent || !detailedContent.topics) {
      return "Detailed content is being prepared for this section.";
    }

    let formattedContent = `${detailedContent.title}\n\n`;
    
    detailedContent.topics.forEach((topic, topicIndex) => {
      formattedContent += `${topicIndex + 1}. ${topic.title}\n`;
      formattedContent += `${topic.description}\n\n`;
      
      if (topic.concepts) {
        topic.concepts.forEach((concept, conceptIndex) => {
          formattedContent += `${topicIndex + 1}.${conceptIndex + 1} ${concept.title}\n`;
          formattedContent += `${concept.content}\n\n`;
          
          if (concept.keywords && concept.keywords.length > 0) {
            formattedContent += `Keywords: ${concept.keywords.join(', ')}\n\n`;
          }
          
          if (concept.examTips) {
            formattedContent += `💡 Exam Tips: ${concept.examTips}\n\n`;
          }
          
          formattedContent += "---\n\n";
        });
      }
    });
    
    return formattedContent;
  };

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
            <TouchableOpacity onLongPress={handleSecretSeed} activeOpacity={0.9}>
              <Text style={styles.appTitle}>{getGreeting()}</Text>
            </TouchableOpacity>
            <Text style={styles.appSubtitle}>Master Indian Polity & Constitution</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.profileBtn} onPress={handleProfilePress}>
              {user && user.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={{ width: 36, height: 36, borderRadius: 18 }} />
              ) : (
                <Icon name="account-circle" size={32} color="#FFFFFF" />
              )}
            </TouchableOpacity>
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
            Welcome to TargetPolity!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Master the Indian Constitution and Political System with comprehensive study materials, historical timeline, and practice questions.
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
              onPress={() => handleTopicPress(topic)}
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

        {/* Featured Historical Event */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 This Day in History</Text>
          <TouchableOpacity
            style={styles.historyCard}
            onPress={() => navigation.navigate('Map')}
          >
            <View style={styles.historyHeader}>
              <View style={styles.historyDate}>
                <Text style={styles.historyDateText}>26 Jan</Text>
                <Text style={styles.historyYear}>1950</Text>
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>Republic Day</Text>
                <Text style={styles.historyDescription}>
                  The Constitution of India came into effect, making India a republic
                </Text>
              </View>
              <Text style={styles.historyIcon}>🏛️</Text>
            </View>
            <View style={styles.historyFooter}>
              <Text style={styles.historyFooterText}>View on Events Map</Text>
              <Icon name="map" size={16} color="#1976D2" />
            </View>
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
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
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyDate: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
    minWidth: 60,
  },
  historyDateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyYear: {
    color: '#E3F2FD',
    fontSize: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  historyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  historyIcon: {
    fontSize: 30,
  },
  historyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  historyFooterText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginRight: 5,
  },
});

export default HomeScreen;