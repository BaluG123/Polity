import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const topics = [
    {
      id: 'constitution',
      title: 'Constitution',
      subtitle: 'Articles & Amendments',
      icon: '📜',
      color: '#1976D2',
      screen: 'Constitution',
    },
    {
      id: 'historical_events',
      title: 'Historical Events',
      subtitle: 'Timeline & Map View',
      icon: '📅',
      color: '#4CAF50',
      screen: 'Map',
    },
    {
      id: 'government',
      title: 'Government Structure',
      subtitle: 'Union, State & Local',
      icon: '🏛️',
      color: '#FF9800',
      screen: 'Government',
    },
    {
      id: 'judiciary',
      title: 'Judiciary',
      subtitle: 'Courts & Legal System',
      icon: '⚖️',
      color: '#E91E63',
      screen: 'Judiciary',
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
          <Text style={styles.headerTitle}>Explore Topics</Text>
          <Text style={styles.headerSubtitle}>
            Discover comprehensive study materials
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Study Topics</Text>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { borderLeftColor: topic.color }]}
              onPress={() => navigation.navigate(topic.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.topicHeader}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topicSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExploreScreen;