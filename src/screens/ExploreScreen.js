import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme, radius } from '../theme/palette';
import { type } from '../theme/typography';
import { space } from '../theme/spacing';
import { getText } from '../data/i18n';
import { AppHeader, Card, EmptyState } from '../components/ui';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  const topics = [
    { id: 'constitution', title: t('constitution'), subtitle: t('topicConstitutionSubtitle'), icon: 'article', color: theme.primary, screen: 'Constitution' },
    { id: 'government', title: t('topicGovernmentTitle'), subtitle: t('topicGovernmentSubtitle'), icon: 'account-balance', color: theme.success, screen: 'Government' },
    { id: 'judiciary', title: t('judiciary'), subtitle: t('topicJudiciarySubtitle'), icon: 'gavel', color: theme.danger, screen: 'Judiciary' },
    { id: 'cases', title: t('landmarkCasesTitle'), subtitle: t('landmarkCasesSubtitle'), icon: 'balance', color: theme.accentDark, screen: 'CaseStudies' },
  ].filter(item => {
    const q = searchQuery.trim().toLowerCase();
    return !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader
        theme={theme}
        title={t('explore')}
        subtitle={t('exploreSubtitle')}
        onRightPress={() => navigation.navigate('Settings')}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.searchBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Icon name="search" size={20} color={theme.muted} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={theme.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {topics.length === 0 ? (
          <EmptyState theme={theme} icon="search-off" title={t('searchPlaceholder')} />
        ) : (
          topics.map(topic => (
            <TouchableOpacity key={topic.id} onPress={() => navigation.navigate(topic.screen)} activeOpacity={0.82}>
              <Card theme={theme} style={styles.topicCard}>
                <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
                  <Icon name={topic.icon} size={23} color="#FFFFFF" />
                </View>
                <View style={styles.topicText}>
                  <Text style={[type.h3, { color: theme.text }]}>{topic.title}</Text>
                  <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 3 }]}>{topic.subtitle}</Text>
                </View>
                <Icon name="chevron-right" size={22} color={theme.faint} />
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: space.xl, paddingBottom: 40 },
  searchBox: {
    height: 52,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: space.md + 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: space.lg,
    marginBottom: space.lg,
  },
  searchInput: { flex: 1, fontSize: 15, marginLeft: space.sm + 2 },
  topicCard: { flexDirection: 'row', alignItems: 'center', marginBottom: space.md, padding: space.md + 2 },
  topicIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  topicText: { flex: 1, marginLeft: space.md + 1 },
});

export default ExploreScreen;
