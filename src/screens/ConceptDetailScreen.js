import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { constitutionContent } from '../data/constitutionContent';
import { getTheme } from '../theme/palette';

const ConceptDetailScreen = ({ route, navigation }) => {
  const { concept, title, content, subtitle } = route.params || {};
  const insets = useSafeAreaInsets();
  const { themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);

  const data = constitutionContent[concept?.id];

  // Use passed content or fallback to constitutionContent
  const displayContent = content || data?.content;
  const displayTitle = title || data?.title || 'Concept Details';
  const displaySubtitle = subtitle || data?.subtitle;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />

      <LinearGradient
        colors={[theme.primaryDark, theme.primary, '#00897B']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{displayTitle}</Text>
            {displaySubtitle && (
              <Text style={styles.headerSubtitle}>{displaySubtitle}</Text>
            )}
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {displayContent ? (
          <View style={styles.section}>
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.cardTitle}>📖 Detailed Explanation</Text>
              <Text style={[styles.cardContent, { color: theme.text }]}>{displayContent}</Text>
            </View>

            {data?.keyPoints && (
              <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={styles.cardTitle}>✨ Key Points</Text>
                {data.keyPoints.map((point, index) => (
                  <View key={index} style={styles.pointRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.pointText, { color: theme.muted }]}>{point}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.cardTitle}>📖 {displayTitle}</Text>
              <Text style={[styles.cardContent, { color: theme.text }]}>
                Comprehensive information about {displayTitle} is being prepared. This section will include detailed explanations, key concepts, constitutional provisions, and relevant case studies.
              </Text>
            </View>
            
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.cardTitle}>🔍 What You'll Learn</Text>
              <View style={styles.pointRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.pointText, { color: theme.muted }]}>Constitutional provisions and articles</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.pointText, { color: theme.muted }]}>Historical background and evolution</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.pointText, { color: theme.muted }]}>Landmark cases and judgments</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.pointText, { color: theme.muted }]}>Practical applications and examples</Text>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.pointText, { color: theme.muted }]}>Exam-relevant points and tips</Text>
              </View>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
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
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'justify',
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    color: '#FF9800',
    marginRight: 10,
    marginTop: -2,
  },
  pointText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
});

export default ConceptDetailScreen;
