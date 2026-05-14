import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme } from '../theme/palette';

const ProgressScreen = ({ navigation }) => {
  const { studyStreak, completedTopics, quizScores } = useSelector(state => state.progress);
  const { themeMode } = useSelector(state => state.app);
  const insets = useSafeAreaInsets();
  const theme = getTheme(themeMode);

  const averageScore = quizScores.length
    ? Math.round(quizScores.reduce((sum, item) => sum + (item.score || 0), 0) / quizScores.length)
    : 0;

  const stats = [
    { label: 'Day Streak', value: studyStreak, icon: 'local-fire-department', color: '#F57C00' },
    { label: 'Topics Done', value: completedTopics.length, icon: 'check-circle', color: '#2E7D32' },
    { label: 'Quizzes Taken', value: quizScores.length, icon: 'quiz', color: '#D81B60' },
    { label: 'Avg Score', value: `${averageScore}%`, icon: 'trending-up', color: '#1976D2' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, '#00897B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>
            Track your learning journey
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistics</Text>
          
          <View style={styles.statsGrid}>
            {stats.map(item => (
              <View key={item.label} style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Icon name={item.icon} size={30} color={item.color} />
                <Text style={[styles.statValue, { color: theme.text }]}>{item.value}</Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.noteCard, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Icon name="insights" size={22} color={theme.primary} />
            <Text style={[styles.noteText, { color: theme.muted }]}>
              Build a simple loop: read one concept, inspect its map context, then take one quiz. Progress will become richer as topic completion is connected across screens.
            </Text>
          </View>
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
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: { fontSize: 22, fontWeight: '900', marginBottom: 15 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  noteCard: { borderWidth: 1, borderRadius: 14, padding: 16, flexDirection: 'row', gap: 10, marginTop: 4 },
  noteText: { flex: 1, fontSize: 13, lineHeight: 20 },
});

export default ProgressScreen;
