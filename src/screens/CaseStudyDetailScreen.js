import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '../theme/palette';
import { AppHeader } from '../components/ui';
import { getText } from '../data/i18n';
import { translateCase } from '../data/contentI18n';

const CaseStudyDetailScreen = ({ route, navigation }) => {
  const { caseStudy, title } = route.params || {};
  const insets = useSafeAreaInsets();
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  // caseStudy already arrives translated from CaseStudiesScreen, but
  // translateCase is idempotent-safe here too in case this screen is ever
  // reached with the raw English case object.
  const data = translateCase(caseStudy, language) || {};
  const displayTitle = title || data.title || t('landmarkCasesTitle');

  const sections = [
    { label: t('caseSignificance'), value: data.significance, icon: '⭐' },
    { label: t('caseFacts'), value: data.facts, icon: '📋' },
    { label: t('caseJudgment'), value: data.judgment, icon: '⚖️' },
    { label: t('caseImpact'), value: data.impact, icon: '🌍' },
  ].filter(section => !!section.value);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader
        theme={theme}
        title={displayTitle}
        subtitle={(data.court || data.date) ? [data.court, data.date].filter(Boolean).join(' • ') : undefined}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={styles.section}>
          {sections.length > 0 ? (
            sections.map(section => (
              <View
                key={section.label}
                style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
              >
                <Text style={styles.cardTitle}>{section.icon} {section.label}</Text>
                <Text style={[styles.cardContent, { color: theme.text }]}>{section.value}</Text>
              </View>
            ))
          ) : (
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={[styles.cardContent, { color: theme.muted }]}>
                Detailed analysis of {displayTitle} will be displayed here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default CaseStudyDetailScreen;
