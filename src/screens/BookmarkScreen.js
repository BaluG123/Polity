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

const BookmarkScreen = ({ navigation }) => {
  const { bookmarks } = useSelector(state => state.polity);
  const { themeMode } = useSelector(state => state.app);
  const insets = useSafeAreaInsets();
  const theme = getTheme(themeMode);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      
      <LinearGradient
        colors={[theme.primaryDark, theme.primary, '#00897B']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Bookmarks</Text>
          <Text style={styles.headerSubtitle}>
            Your saved content
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={styles.section}>
          {bookmarks.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={[styles.emptyIconWrap, { backgroundColor: theme.surfaceAlt }]}>
                <Icon name="bookmark-border" size={42} color={theme.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No bookmarks yet</Text>
              <Text style={[styles.emptyDescription, { color: theme.muted }]}>
                Start bookmarking topics and articles to see them here
              </Text>
            </View>
          ) : (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Saved Items ({bookmarks.length})</Text>
              {bookmarks.map((bookmark, index) => (
                <View key={bookmark.id || index} style={[styles.bookmarkCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <Icon name="bookmark" size={22} color={theme.primary} />
                  <View style={styles.bookmarkText}>
                    <Text style={[styles.bookmarkTitle, { color: theme.text }]}>{bookmark.title || 'Saved topic'}</Text>
                    <Text style={[styles.bookmarkSubtitle, { color: theme.muted }]}>{bookmark.subtitle || bookmark.type || 'Review later'}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 22,
    borderRadius: 16,
    borderWidth: 1,
  },
  emptyIconWrap: {
    width: 82,
    height: 82,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  bookmarkCard: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  bookmarkText: { flex: 1, marginLeft: 12 },
  bookmarkTitle: { fontSize: 16, fontWeight: '900' },
  bookmarkSubtitle: { fontSize: 13, marginTop: 3 },
});

export default BookmarkScreen;
