import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { constitutionContent } from '../data/constitutionContent';
import { translateArticle, translatePreambleSpans } from '../data/contentI18n';
import { getTheme } from '../theme/palette';
import { AppHeader } from '../components/ui';

const TopicDetailScreen = ({ route, navigation }) => {
  const { topic, title } = route.params || {};
  const insets = useSafeAreaInsets();
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);

  const renderContent = () => {
    const data = constitutionContent[topic?.id];

    if (!data) {
      return (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Content</Text>
          <Text style={[styles.contentText, { color: theme.muted }]}>
            Detailed content for {title || 'this topic'} will be displayed here.
          </Text>
        </View>
      );
    }

    // Preamble Special Rendering — driven by the real span data (with
    // highlight/footer flags) instead of a hardcoded English duplicate, so
    // it renders correctly in every language via translatePreambleSpans.
    if (topic?.id === 'preamble') {
      const spans = translatePreambleSpans(constitutionContent.preamble.content, language);
      const bodySpans = spans.filter(span => !span.footer);
      const footerSpan = spans.find(span => span.footer);

      return (
        <View style={[styles.preambleContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.preambleText, { color: theme.text }]}>
            {bodySpans.map((span, index) => (
              <Text key={index} style={span.highlight ? styles.highlight : undefined}>
                {span.text}
              </Text>
            ))}
          </Text>

          {footerSpan && (
            <>
              <View style={styles.divider} />
              <Text style={[styles.footerText, { color: theme.muted, borderTopColor: theme.border }]}>
                {footerSpan.text}
              </Text>
            </>
          )}
        </View>
      );
    }

    // Generic Part Rendering (List of Articles) — each article is
    // translated individually so mixed-availability translations still
    // render correctly (untranslated articles fall back to English).
    if (data.articles) {
      return (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{title || data.title}</Text>
          {data.articles.map((rawArticle, index) => {
            const article = translateArticle(rawArticle, language);
            return (
              <View key={index} style={[styles.articleCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={styles.articleHeader}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
                <Text style={[styles.articleDescription, { color: theme.muted }]}>{article.description}</Text>
                <Text style={[styles.articleContent, { color: theme.text }]}>{article.content}</Text>
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={[styles.contentText, { color: theme.muted }]}>Content not available.</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title={title || 'Topic Details'} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {renderContent()}
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
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  preambleContainer: {
    padding: 24,
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  preambleText: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'justify',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#D84315',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#CFD8DC',
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  articleCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  articleHeader: {
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  articleDescription: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  articleContent: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default TopicDetailScreen;
