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

  // Data remains identical to maintain functionality
  const constitutionParts = [
    { id: 'preamble', title: 'Preamble', description: 'The philosophical foundation of the Constitution', articles: 'Preamble', icon: '📜', color: '#1976D2' },
    { id: 'part1', title: 'Part I - The Union & Territory', description: 'Articles 1-4: Territory of India and its states', articles: 'Articles 1-4', icon: '🗺️', color: '#4CAF50' },
    { id: 'part2', title: 'Part II - Citizenship', description: 'Articles 5-11: Citizenship provisions', articles: 'Articles 5-11', icon: '👥', color: '#FF9800' },
    { id: 'part3', title: 'Part III - Fundamental Rights', description: 'Articles 12-35: Basic rights of citizens', articles: 'Articles 12-35', icon: '⚖️', color: '#E91E63' },
    { id: 'part4', title: 'Part IV - Directive Principles', description: 'Articles 36-51: Guidelines for governance', articles: 'Articles 36-51', icon: '🎯', color: '#9C27B0' },
    { id: 'part4a', title: 'Part IVA - Fundamental Duties', description: 'Article 51A: Duties of citizens', articles: 'Article 51A', icon: '📋', color: '#607D8B' },
  ];

  const importantArticles = [
    { id: 'art14', number: '14', title: 'Equality before Law', description: 'Right to equality and equal protection of laws', part: 'Part III', importance: 'high' },
    { id: 'art19', number: '19', title: 'Protection of Rights', description: 'Six fundamental freedoms including speech and expression', part: 'Part III', importance: 'high' },
    { id: 'art21', number: '21', title: 'Right to Life', description: 'Protection of life and personal liberty', part: 'Part III', importance: 'high' },
    { id: 'art44', number: '44', title: 'Uniform Civil Code', description: 'State shall secure uniform civil code', part: 'Part IV', importance: 'medium' },
  ];

  const amendments = [
    { id: 'amend42', number: '42nd', year: '1976', title: 'Mini Constitution', description: 'Added Socialist, Secular to Preamble, Fundamental Duties', significance: 'high' },
    { id: 'amend73', number: '73rd', year: '1992', title: 'Panchayati Raj', description: 'Constitutional status to Panchayati Raj institutions', significance: 'high' },
  ];

  const filterOptions = [
    { id: 'all', title: 'All Content', icon: 'auto-awesome' },
    { id: 'rights', title: 'Rights', icon: 'gavel' },
    { id: 'government', title: 'Union/States', icon: 'account-balance' },
    { id: 'amendments', title: 'Amendments', icon: 'history-edu' },
  ];

  const handlePartPress = (part) => {
    dispatch(setSelectedTopic(part));
    navigation.navigate('TopicDetail', { topic: part, title: part.title });
  };

  const handleArticlePress = (article) => {
    navigation.navigate('ConceptDetail', { concept: article, title: `Article ${article.number}` });
  };

  const renderConstitutionPart = ({ item }) => (
    <TouchableOpacity
      style={[styles.partCard, { borderLeftColor: item.color }]}
      onPress={() => handlePartPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.partHeader}>
        <View style={[styles.partIconCircle, { backgroundColor: item.color + '15' }]}>
          <Text style={styles.partIcon}>{item.icon}</Text>
        </View>
        <View style={styles.partInfo}>
          <Text style={styles.partTitle}>{item.title}</Text>
          <Text style={[styles.partArticles, { color: item.color }]}>{item.articles}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#BDC3C7" />
      </View>
      <Text style={styles.partDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderImportantArticle = ({ item }) => (
    <TouchableOpacity style={styles.articleCard} onPress={() => handleArticlePress(item)} activeOpacity={0.7}>
      <View style={styles.articleHeader}>
        <View style={[styles.articleNumber, { backgroundColor: item.importance === 'high' ? '#E91E63' : '#FF9800' }]}>
          <Text style={styles.articleNumberText}>{item.number}</Text>
        </View>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articlePart}>{item.part}</Text>
        </View>
        <View style={[styles.importanceBadge, { backgroundColor: item.importance === 'high' ? '#FFEBEF' : '#FFF4E5' }]}>
          <Text style={[styles.importanceText, { color: item.importance === 'high' ? '#E91E63' : '#FF9800' }]}>
            {item.importance === 'high' ? 'CRITICAL' : 'IMPORTANT'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAmendment = ({ item }) => (
    <View style={styles.amendmentCard}>
      <View style={styles.amendmentHeader}>
        <View style={styles.amendmentBadge}>
          <Text style={styles.amendmentNumberText}>{item.number}</Text>
          <Text style={styles.amendmentYear}>{item.year}</Text>
        </View>
        <View style={styles.amendmentInfo}>
          <Text style={styles.amendmentTitle}>{item.title}</Text>
          <Text style={styles.amendmentDescription} numberOfLines={2}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      {/* Header Section */}
      <LinearGradient colors={['#1976D2', '#1565C0']} style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Indian Constitution</Text>
          <Text style={styles.headerSubtitle}>Digital Compendium of Laws & Provisions</Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#1976D2" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles, parts, or keywords..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#90A4AE"
          />
        </View>
      </LinearGradient>

      {/* Redesigned Scrollable Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[styles.filterPill, selectedPart === option.id && styles.filterPillActive]}
              onPress={() => setSelectedPart(option.id)}
            >
              <Icon
                name={option.icon}
                size={16}
                color={selectedPart === option.id ? '#FFFFFF' : '#1976D2'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.filterText, selectedPart === option.id && styles.filterTextActive]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>

        {/* Parts Section */}
        {(selectedPart === 'all' || selectedPart === 'government') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Constitution Parts</Text>
            <FlatList
              data={constitutionParts}
              renderItem={renderConstitutionPart}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Articles Section */}
        {(selectedPart === 'all' || selectedPart === 'rights') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Important Articles</Text>
            <FlatList
              data={importantArticles}
              renderItem={renderImportantArticle}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Amendments Section */}
        {(selectedPart === 'all' || selectedPart === 'amendments') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Amendments</Text>
            <FlatList
              data={amendments}
              renderItem={renderAmendment}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* At a Glance Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.statsGrid}>
            {[
              { val: '395', lab: 'Articles' },
              { val: '22', lab: 'Parts' },
              { val: '12', lab: 'Schedules' },
              { val: '105', lab: 'Amendments' }
            ].map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.val}</Text>
                <Text style={styles.statLabel}>{stat.lab}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#1976D2',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerContent: { marginBottom: 18 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#E3F2FD', opacity: 0.9, letterSpacing: 0.5 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#263238' },

  // Filter System Redesign
  filterWrapper: { marginTop: -20, marginBottom: 10 },
  filterContent: { paddingHorizontal: 20, paddingVertical: 5, gap: 10 },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterPillActive: { backgroundColor: '#1976D2' },
  filterText: { fontSize: 13, color: '#1976D2', fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },

  content: { flex: 1, marginTop: 10 },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#263238', marginBottom: 15, letterSpacing: 0.3 },

  // Part Cards
  partCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  partHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  partIconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  partIcon: { fontSize: 20 },
  partInfo: { flex: 1 },
  partTitle: { fontSize: 15, fontWeight: '700', color: '#263238' },
  partArticles: { fontSize: 12, fontWeight: '800', marginTop: 2 },
  partDescription: { fontSize: 13, color: '#546E7A', lineHeight: 18 },

  // Article Cards
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  articleHeader: { flexDirection: 'row', alignItems: 'center' },
  articleNumber: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  articleNumberText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  articleInfo: { flex: 1 },
  articleTitle: { fontSize: 15, fontWeight: '700', color: '#263238' },
  articlePart: { fontSize: 11, color: '#78909C', textTransform: 'uppercase', fontWeight: '600' },
  importanceBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  importanceText: { fontSize: 9, fontWeight: '900' },

  // Amendment Cards
  amendmentCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ECEFF1' },
  amendmentHeader: { flexDirection: 'row' },
  amendmentBadge: { alignItems: 'center', paddingRight: 15, borderRightWidth: 1, borderRightColor: '#F1F5F9', marginRight: 15 },
  amendmentNumberText: { fontSize: 16, fontWeight: '800', color: '#1976D2' },
  amendmentYear: { fontSize: 11, color: '#78909C' },
  amendmentInfo: { flex: 1 },
  amendmentTitle: { fontSize: 15, fontWeight: '700', color: '#263238', marginBottom: 4 },
  amendmentDescription: { fontSize: 13, color: '#546E7A' },

  // Stats Grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, alignItems: 'center', width: '23%', elevation: 1 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1976D2' },
  statLabel: { fontSize: 10, color: '#78909C', marginTop: 2 }
});

export default ConstitutionScreen;