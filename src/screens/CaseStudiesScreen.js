import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '../theme/palette';
import { AppHeader } from '../components/ui';
import { getText } from '../data/i18n';
import { LANDMARK_CASES } from '../data/polityData';
import { translateCase } from '../data/contentI18n';

const CASE_DISPLAY = {
  kesavananda_bharati: { icon: '⚖️', color: '#E91E63' },
  maneka_gandhi: { icon: '🛡️', color: '#1976D2' },
};

const CaseStudiesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  // Sourced from the real LANDMARK_CASES data (not a hardcoded duplicate) and
  // translated for the current language, with an English fallback.
  const cases = LANDMARK_CASES.map(caseItem => ({
    ...translateCase(caseItem, language),
    ...CASE_DISPLAY[caseItem.id],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader
        theme={theme}
        title={t('landmarkCasesTitle')}
        subtitle={t('landmarkCasesSubtitle')}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={styles.section}>
          {cases.map(caseItem => (
            <TouchableOpacity
              key={caseItem.id}
              style={[styles.caseCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => navigation.navigate('CaseStudyDetail', { caseStudy: caseItem, title: caseItem.title })}
              activeOpacity={0.7}
            >
              <Text style={styles.caseIcon}>{caseItem.icon}</Text>
              <View style={styles.caseInfo}>
                <Text style={[styles.caseTitle, { color: theme.text }]}>{caseItem.title}</Text>
                <Text style={styles.caseYear}>{caseItem.date?.slice(0, 4)}</Text>
                <Text style={[styles.caseSignificance, { color: theme.muted }]}>{caseItem.significance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  caseCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  caseIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  caseInfo: {
    flex: 1,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caseYear: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 3,
  },
  caseSignificance: {
    fontSize: 14,
  },
});

export default CaseStudiesScreen;
