import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setSelectedTopic } from '../store/slices/politySlice';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConstitutionScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState('all');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const constitutionParts = [
    {
      id: 'preamble',
      title: 'Preamble',
      description: 'The philosophical foundation of the Constitution',
      articles: 'Preamble',
      icon: '📜',
      color: '#1976D2',
    },
    {
      id: 'part1',
      title: 'Part I - The Union and its Territory',
      description: 'Articles 1-4: Territory of India and its states',
      articles: 'Articles 1-4',
      icon: '🗺️',
      color: '#4CAF50',
    },
    {
      id: 'part2',
      title: 'Part II - Citizenship',
      description: 'Articles 5-11: Citizenship provisions',
      articles: 'Articles 5-11',
      icon: '👥',
      color: '#FF9800',
    },
    {
      id: 'part3',
      title: 'Part III - Fundamental Rights',
      description: 'Articles 12-35: Basic rights of citizens',
      articles: 'Articles 12-35',
      icon: '⚖️',
      color: '#E91E63',
    },
    {
      id: 'part4',
      title: 'Part IV - Directive Principles',
      description: 'Articles 36-51: Guidelines for governance',
      articles: 'Articles 36-51',
      icon: '🎯',
      color: '#9C27B0',
    },
    {
      id: 'part4a',
      title: 'Part IVA - Fundamental Duties',
      description: 'Article 51A: Duties of citizens',
      articles: 'Article 51A',
      icon: '📋',
      color: '#607D8B',
    },
    {
      id: 'part5',
      title: 'Part V - The Union',
      description: 'Articles 52-151: Union Government structure',
      articles: 'Articles 52-151',
      icon: '🏛️',
      color: '#795548',
    },
    {
      id: 'part6',
      title: 'Part VI - The States',
      description: 'Articles 152-237: State Government structure',
      articles: 'Articles 152-237',
      icon: '🏢',
      color: '#009688',
    },
  ];

  const importantArticles = [
    {
      id: 'art14',
      number: '14',
      title: 'Equality before Law',
      description: 'Right to equality and equal protection of laws',
      part: 'Part III',
      importance: 'high',
    },
    {
      id: 'art19',
      number: '19',
      title: 'Protection of Rights',
      description: 'Six fundamental freedoms including speech and expression',
      part: 'Part III',
      importance: 'high',
    },
    {
      id: 'art21',
      number: '21',
      title: 'Right to Life',
      description: 'Protection of life and personal liberty',
      part: 'Part III',
      importance: 'high',
    },
    {
      id: 'art32',
      number: '32',
      title: 'Right to Constitutional Remedies',
      description: 'Heart and soul of the Constitution - Dr. Ambedkar',
      part: 'Part III',
      importance: 'high',
    },
    {
      id: 'art44',
      number: '44',
      title: 'Uniform Civil Code',
      description: 'State shall secure uniform civil code',
      part: 'Part IV',
      importance: 'medium',
    },
    {
      id: 'art356',
      number: '356',
      title: 'President\'s Rule',
      description: 'Provisions for failure of constitutional machinery',
      part: 'Part XVIII',
      importance: 'high',
    },
  ];

  const amendments = [
    {
      id: 'amend1',
      number: '1st',
      year: '1951',
      title: 'Land Reforms and Reservations',
      description: 'Added 9th Schedule, enabled land reforms',
      significance: 'high',
    },
    {
      id: 'amend42',
      number: '42nd',
      year: '1976',
      title: 'Mini Constitution',
      description: 'Added Socialist, Secular to Preamble, Fundamental Duties',
      significance: 'high',
    },
    {
      id: 'amend44',
      number: '44th',
      year: '1978',
      title: 'Post-Emergency Reforms',
      description: 'Restored civil liberties, limited emergency powers',
      significance: 'high',
    },
    {
      id: 'amend73',
      number: '73rd',
      year: '1992',
      title: 'Panchayati Raj',
      description: 'Constitutional status to Panchayati Raj institutions',
      significance: 'high',
    },
    {
      id: 'amend103',
      number: '103rd',
      year: '2019',
      title: 'EWS Reservation',
      description: '10% reservation for economically weaker sections',
      significance: 'medium',
    },
  ];

  const filterOptions = [
    { id: 'all', title: 'All Parts', icon: '📚' },
    { id: 'rights', title: 'Rights', icon: '⚖️' },
    { id: 'government', title: 'Government', icon: '🏛️' },
    { id: 'amendments', title: 'Amendments', icon: '📝' },
  ];

  const handlePartPress = (part) => {
    dispatch(setSelectedTopic(part));
    navigation.navigate('TopicDetail', { 
      topic: part,
      title: part.title 
    });
  };

  const handleArticlePress = (article) => {
    navigation.navigate('ConceptDetail', {
      concept: article,
      title: `Article ${article.number}`
    });
  };

  const renderConstitutionPart = ({ item }) => (
    <TouchableOpacity
      style={[styles.partCard, { borderLeftColor: item.color }]}
      onPress={() => handlePartPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.partHeader}>
        <Text style={styles.partIcon}>{item.icon}</Text>
        <View style={styles.partInfo}>
          <Text style={styles.partTitle}>{item.title}</Text>
          <Text style={styles.partArticles}>{item.articles}</Text>
        </View>
        <Icon name="arrow-forward-ios" size={16} color="#666" />
      </View>
      <Text style={styles.partDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderImportantArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => handleArticlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.articleHeader}>
        <View style={[
          styles.articleNumber, 
          { backgroundColor: item.importance === 'high' ? '#E91E63' : '#FF9800' }
        ]}>
          <Text style={styles.articleNumberText}>{item.number}</Text>
        </View>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articlePart}>{item.part}</Text>
        </View>
        <View style={[
          styles.importanceBadge,
          { backgroundColor: item.importance === 'high' ? '#E91E63' : '#FF9800' }
        ]}>
          <Text style={styles.importanceText}>
            {item.importance === 'high' ? 'HIGH' : 'MED'}
          </Text>
        </View>
      </View>
      <Text style={styles.articleDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderAmendment = ({ item }) => (
    <TouchableOpacity
      style={styles.amendmentCard}
      activeOpacity={0.7}
    >
      <View style={styles.amendmentHeader}>
        <View style={styles.amendmentNumber}>
          <Text style={styles.amendmentNumberText}>{item.number}</Text>
          <Text style={styles.amendmentYear}>{item.year}</Text>
        </View>
        <View style={styles.amendmentInfo}>
          <Text style={styles.amendmentTitle}>{item.title}</Text>
          <Text style={styles.amendmentDescription}>{item.description}</Text>
        </View>
        <View style={[
          styles.significanceBadge,
          { backgroundColor: item.significance === 'high' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Icon 
            name={item.significance === 'high' ? 'star' : 'star-half'} 
            size={16} 
            color="#FFFFFF" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Indian Constitution</Text>
          <Text style={styles.headerSubtitle}>
            Explore articles, amendments, and constitutional provisions
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles, amendments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.filterOption,
              selectedPart === option.id && styles.filterOptionActive
            ]}
            onPress={() => setSelectedPart(option.id)}
          >
            <Text style={styles.filterIcon}>{option.icon}</Text>
            <Text style={[
              styles.filterText,
              selectedPart === option.id && styles.filterTextActive
            ]}>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Constitution Parts */}
        {(selectedPart === 'all' || selectedPart === 'government') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Constitution Parts</Text>
            <FlatList
              data={constitutionParts}
              renderItem={renderConstitutionPart}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Important Articles */}
        {(selectedPart === 'all' || selectedPart === 'rights') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ Important Articles</Text>
            <FlatList
              data={importantArticles}
              renderItem={renderImportantArticle}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Constitutional Amendments */}
        {(selectedPart === 'all' || selectedPart === 'amendments') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Key Amendments</Text>
            <FlatList
              data={amendments}
              renderItem={renderAmendment}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Constitution at a Glance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>395</Text>
              <Text style={styles.statLabel}>Articles</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>22</Text>
              <Text style={styles.statLabel}>Parts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Schedules</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>105</Text>
              <Text style={styles.statLabel}>Amendments</Text>
            </View>
          </View>
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
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  filterOptionActive: {
    backgroundColor: '#E3F2FD',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#1976D2',
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
  partCard: {
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
  partHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  partIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  partInfo: {
    flex: 1,
  },
  partTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  partArticles: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  partDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  articleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  articleNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  articleNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  articlePart: {
    fontSize: 12,
    color: '#666',
  },
  importanceBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  importanceText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  amendmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  amendmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amendmentNumber: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 60,
  },
  amendmentNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  amendmentYear: {
    fontSize: 12,
    color: '#666',
  },
  amendmentInfo: {
    flex: 1,
  },
  amendmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  amendmentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  significanceBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default ConstitutionScreen;