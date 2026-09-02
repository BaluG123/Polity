import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setSelectedTopic } from '../store/slices/politySlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppHeader } from '../components/ui';
import { INDIAN_CONSTITUTION } from '../data/polityData';
import { constitutionContent } from '../data/constitutionContent';
import {
  translateConcept,
  translateArticle,
  translateSection,
  translateCategoryTitle,
  translateTopic,
  translateArticleSummary,
  translateAmendment,
} from '../data/contentI18n';
import { getTheme } from '../theme/palette';
import { getText } from '../data/i18n';

const ConstitutionScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState('all');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  // Base (English) data — translated below via translateSection so every
  // Part card reads in the user's selected language, not just its content.
  const constitutionPartsBase = [
    { 
      id: 'preamble', 
      title: 'Preamble', 
      description: 'The philosophical foundation of the Constitution', 
      articles: 'Preamble', 
      icon: '📜', 
      color: '#1976D2' 
    },
    { 
      id: 'part1', 
      title: 'Part I - The Union & Territory', 
      description: 'Articles 1-4: Territory of India and its states', 
      articles: 'Articles 1-4', 
      icon: '🗺️', 
      color: '#4CAF50' 
    },
    { 
      id: 'part2', 
      title: 'Part II - Citizenship', 
      description: 'Articles 5-11: Citizenship provisions', 
      articles: 'Articles 5-11', 
      icon: '👥', 
      color: '#FF9800' 
    },
    { 
      id: 'part3', 
      title: 'Part III - Fundamental Rights', 
      description: 'Articles 12-35: Basic rights of citizens', 
      articles: 'Articles 12-35', 
      icon: '⚖️', 
      color: '#E91E63',
      hasDetailedContent: true,
      detailedContent: INDIAN_CONSTITUTION.fundamentalRights,
      categoryKey: 'fundamentalRights',
    },
    { 
      id: 'part4', 
      title: 'Part IV - Directive Principles', 
      description: 'Articles 36-51: Guidelines for governance', 
      articles: 'Articles 36-51', 
      icon: '🎯', 
      color: '#9C27B0',
      hasDetailedContent: true,
      detailedContent: INDIAN_CONSTITUTION.dpsp,
      categoryKey: 'dpsp',
    },
    { 
      id: 'part4a', 
      title: 'Part IVA - Fundamental Duties', 
      description: 'Article 51A: Duties of citizens', 
      articles: 'Article 51A', 
      icon: '📋', 
      color: '#607D8B' 
    },
  ];
  const constitutionParts = constitutionPartsBase.map(part => translateSection(part, language));

  // Content for these five articles is resolved dynamically at press-time
  // (see handleArticlePress) so it can be translated via translateConcept /
  // translateArticle for the user's selected language. art44 now sources its
  // detailed content from constitutionContent.art44 (translatable) instead of
  // a third, English-only duplicate of the same article.
  const importantArticlesBase = [
    {
      id: 'art14',
      number: '14',
      title: 'Equality before Law',
      description: 'Right to equality and equal protection of laws',
      part: 'Part III',
      importance: 'high',
      sourceConcept: INDIAN_CONSTITUTION.fundamentalRights.topics[0].concepts[0],
    },
    {
      id: 'art15',
      number: '15',
      title: 'Prohibition of Discrimination',
      description: 'No discrimination on grounds of religion, race, caste, sex',
      part: 'Part III',
      importance: 'high',
      sourceConcept: INDIAN_CONSTITUTION.fundamentalRights.topics[0].concepts[1],
    },
    {
      id: 'art19',
      number: '19',
      title: 'Protection of Rights',
      description: 'Six fundamental freedoms including speech and expression',
      part: 'Part III',
      importance: 'high',
      sourceConcept: INDIAN_CONSTITUTION.fundamentalRights.topics[1].concepts[0],
    },
    {
      id: 'art21',
      number: '21',
      title: 'Right to Life',
      description: 'Protection of life and personal liberty',
      part: 'Part III',
      importance: 'high',
      sourceConcept: INDIAN_CONSTITUTION.fundamentalRights.topics[1].concepts[2],
    },
    {
      id: 'art44',
      number: '44',
      title: 'Uniform Civil Code',
      description: 'State shall secure uniform civil code',
      part: 'Part IV',
      importance: 'medium',
      sourceArticle: constitutionContent.art44,
    },
  ];
  const importantArticles = importantArticlesBase.map(article => {
    const translated = article.sourceConcept
      ? translateConcept(article.sourceConcept, language)
      : translateArticle(article.sourceArticle, language);
    const summary = translateArticleSummary(article.id, article.description, language);
    return { ...article, title: translated?.title || article.title, description: summary };
  });

  const amendmentsBase = [
    { id: 'amend42', number: '42nd', year: '1976', title: 'Mini Constitution', description: 'Added Socialist, Secular to Preamble, Fundamental Duties', significance: 'high' },
    { id: 'amend73', number: '73rd', year: '1992', title: 'Panchayati Raj', description: 'Constitutional status to Panchayati Raj institutions', significance: 'high' },
  ];
  const amendments = amendmentsBase.map(a => translateAmendment(a, language));

  const filterOptions = [
    { id: 'all', title: t('filterAllContent'), icon: 'auto-awesome' },
    { id: 'rights', title: t('filterRights'), icon: 'gavel' },
    { id: 'government', title: t('filterUnionStates'), icon: 'account-balance' },
    { id: 'amendments', title: t('filterAmendments'), icon: 'history-edu' },
  ];

  const handlePartPress = (part) => {
    dispatch(setSelectedTopic(part));
    
    // If the part has detailed content, navigate to a special detailed view
    if (part.hasDetailedContent) {
      navigation.navigate('ConceptDetail', { 
        title: part.title,
        content: formatDetailedContent(part.detailedContent, part.categoryKey),
        subtitle: part.description
      });
    } else {
      navigation.navigate('TopicDetail', { topic: part, title: part.title });
    }
  };

  // Translates each concept before concatenating, so Part III (Fundamental
  // Rights) and Part IV (DPSP) detail views read in the user's selected
  // language rather than always in English.
  const formatDetailedContent = (detailedContent, categoryKey) => {
    if (!detailedContent || !detailedContent.topics) {
      return t('contentPreparing');
    }

    const sectionTitle = translateCategoryTitle(categoryKey, detailedContent.title, language);
    let formattedContent = `${sectionTitle}\n\n`;

    detailedContent.topics.forEach((rawTopic, topicIndex) => {
      const topic = translateTopic(rawTopic, language);
      formattedContent += `${topicIndex + 1}. ${topic.title}\n`;
      formattedContent += `${topic.description}\n\n`;

      if (topic.concepts) {
        topic.concepts.forEach((rawConcept, conceptIndex) => {
          const concept = translateConcept(rawConcept, language);
          formattedContent += `${topicIndex + 1}.${conceptIndex + 1} ${concept.title}\n`;
          formattedContent += `${concept.content}\n\n`;

          if (concept.keywords && concept.keywords.length > 0) {
            formattedContent += `${t('keywordsLabel')}: ${concept.keywords.join(', ')}\n\n`;
          }

          if (concept.examTips) {
            formattedContent += `💡 ${t('examTipsLabel')}: ${concept.examTips}\n\n`;
          }

          formattedContent += "---\n\n";
        });
      }
    });

    return formattedContent;
  };

  const handleArticlePress = (article) => {
    // Each importantArticles entry sources its content from either an
    // INDIAN_CONSTITUTION concept or a constitutionContent.js article; both
    // are translated for the currently selected language before display.
    const translated = article.sourceConcept
      ? translateConcept(article.sourceConcept, language)
      : translateArticle(article.sourceArticle, language);

    navigation.navigate('ConceptDetail', {
      concept: { id: article.id },
      title: translated?.title || `Article ${article.number}`,
      content: translated?.content,
      subtitle: article.description,
    });
  };

  const renderConstitutionPart = ({ item }) => (
    <TouchableOpacity
      style={[styles.partCard, { borderLeftColor: item.color, backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => handlePartPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.partHeader}>
        <View style={[styles.partIconCircle, { backgroundColor: item.color + '15' }]}>
          <Text style={styles.partIcon}>{item.icon}</Text>
        </View>
        <View style={styles.partInfo}>
          <Text style={[styles.partTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.partArticles, { color: item.color }]}>{item.articles}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#BDC3C7" />
      </View>
      <Text style={[styles.partDescription, { color: theme.muted }]}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderImportantArticle = ({ item }) => (
    <TouchableOpacity style={[styles.articleCard, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => handleArticlePress(item)} activeOpacity={0.7}>
      <View style={styles.articleHeader}>
        <View style={[styles.articleNumber, { backgroundColor: item.importance === 'high' ? '#E91E63' : '#FF9800' }]}>
          <Text style={styles.articleNumberText}>{item.number}</Text>
        </View>
        <View style={styles.articleInfo}>
          <Text style={[styles.articleTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.articlePart, { color: theme.muted }]}>{item.part}</Text>
        </View>
        <View style={[styles.importanceBadge, { backgroundColor: item.importance === 'high' ? '#FFEBEF' : '#FFF4E5' }]}>
          <Text style={[styles.importanceText, { color: item.importance === 'high' ? '#E91E63' : '#FF9800' }]}>
            {item.importance === 'high' ? t('importanceCritical') : t('importanceImportant')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAmendment = ({ item }) => (
    <View style={[styles.amendmentCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.amendmentHeader}>
        <View style={styles.amendmentBadge}>
          <Text style={styles.amendmentNumberText}>{item.number}</Text>
          <Text style={styles.amendmentYear}>{item.year}</Text>
        </View>
        <View style={styles.amendmentInfo}>
          <Text style={[styles.amendmentTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.amendmentDescription, { color: theme.muted }]} numberOfLines={2}>{item.description}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader
        theme={theme}
        title="Indian Constitution"
        subtitle="Digital Compendium of Laws & Provisions"
        onRightPress={() => navigation.navigate('Settings')}
      >
        <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
          <Icon name="search" size={20} color="#1976D2" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search articles, parts, or keywords..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.muted}
          />
        </View>
      </AppHeader>

      {/* Redesigned Scrollable Filter Tabs */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[styles.filterPill, { backgroundColor: theme.surface }, selectedPart === option.id && styles.filterPillActive]}
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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Constitution Parts</Text>
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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Important Articles</Text>
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
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Key Amendments</Text>
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
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Summary</Text>
          <View style={styles.statsGrid}>
            {[
              { val: '395', lab: 'Articles' },
              { val: '22', lab: 'Parts' },
              { val: '12', lab: 'Schedules' },
              { val: '105', lab: 'Amendments' }
            ].map((stat, i) => (
              <View key={i} style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={styles.statValue}>{stat.val}</Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>{stat.lab}</Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
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
  amendmentCard: { borderRadius: 16, padding: 15, marginBottom: 10, borderWidth: 1 },
  amendmentHeader: { flexDirection: 'row' },
  amendmentBadge: { alignItems: 'center', paddingRight: 15, borderRightWidth: 1, borderRightColor: '#F1F5F9', marginRight: 15 },
  amendmentNumberText: { fontSize: 16, fontWeight: '800', color: '#1976D2' },
  amendmentYear: { fontSize: 11, color: '#78909C' },
  amendmentInfo: { flex: 1 },
  amendmentTitle: { fontSize: 15, fontWeight: '700', color: '#263238', marginBottom: 4 },
  amendmentDescription: { fontSize: 13, color: '#546E7A' },

  // Stats Grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { borderRadius: 16, padding: 15, alignItems: 'center', width: '23%', elevation: 1, borderWidth: 1 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1976D2' },
  statLabel: { fontSize: 10, color: '#78909C', marginTop: 2 }
});

export default ConstitutionScreen;
