import React from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithGoogle, signOut } from '../services/AuthService';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { getTheme } from '../theme/palette';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { studyStreak } = useSelector(state => state.progress);
  const { bookmarks } = useSelector(state => state.polity);
  const { user } = useSelector(state => state.auth);
  const { themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);

  const handleProfilePress = async () => {
    if (user) {
      Alert.alert('Profile', `Signed in as ${user.displayName || user.email}`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Settings', onPress: () => navigation.navigate('Settings') },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]);
      return;
    }

    try {
      await signInWithGoogle();
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services', 'Google Play Services is not available or needs an update.');
        return;
      }
      Alert.alert('Sign In Failed', error?.message || 'Please try again later.');
    }
  };

  const learningPaths = [
    { title: 'Constitution Core', subtitle: 'Preamble, rights, duties, DPSP', icon: 'article', color: '#1976D2', screen: 'Constitution' },
    { title: 'Historical Map', subtitle: 'Zoom into democracy turning points', icon: 'map', color: '#009688', screen: 'Map' },
    { title: 'Offline Quizzes', subtitle: 'Practice anywhere, sync leaderboard later', icon: 'quiz', color: '#D81B60', screen: 'Quiz' },
    { title: 'Government System', subtitle: 'Union, states and local bodies', icon: 'account-balance', color: '#F57C00', screen: 'Government' },
  ];

  const pillars = [
    { value: '25+', label: 'Map events' },
    { value: String(studyStreak || 0), label: 'Day streak' },
    { value: String(bookmarks.length), label: 'Bookmarks' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[theme.primaryDark, theme.primary, '#00897B']} style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.brandMark}>
              <Text style={styles.brandEmoji}>🏛️</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
              ) : (
                <Icon name="person" size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.heroTitle}>TargetPolity</Text>
          <Text style={styles.heroSubtitle}>
            Learn Indian polity like a story, revise it like a topper, and remember it through maps.
          </Text>

          <TouchableOpacity style={styles.mapHeroButton} onPress={() => navigation.navigate('Map')} activeOpacity={0.86}>
            <View>
              <Text style={styles.mapHeroTitle}>Open India Political Map</Text>
              <Text style={styles.mapHeroSubtitle}>Events, judgments, amendments and federal milestones</Text>
            </View>
            <Icon name="travel-explore" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.statsRow}>
            {pillars.map(item => (
              <View key={item.label} style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.statValue, { color: theme.text }]}>{item.value}</Text>
                <Text style={[styles.statLabel, { color: theme.muted }]}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Start Learning</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
              <Text style={[styles.sectionAction, { color: theme.primary }]}>Explore all</Text>
            </TouchableOpacity>
          </View>

          {learningPaths.map(item => (
            <TouchableOpacity
              key={item.title}
              style={[styles.pathCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.82}>
              <View style={[styles.pathIcon, { backgroundColor: item.color }]}>
                <Icon name={item.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.pathText}>
                <Text style={[styles.pathTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.pathSubtitle, { color: theme.muted }]}>{item.subtitle}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={theme.muted} />
            </TouchableOpacity>
          ))}

          <View style={[styles.tipCard, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Icon name="psychology" size={24} color={theme.accent} />
            <View style={styles.tipText}>
              <Text style={[styles.tipTitle, { color: theme.text }]}>How to study today</Text>
              <Text style={[styles.tipBody, { color: theme.muted }]}>
                Read one concept, open the map for its historical context, then take one offline quiz. That loop builds recall faster than passive reading.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 26 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandMark: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  brandEmoji: { fontSize: 25 },
  profileButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 44, height: 44, borderRadius: 22 },
  heroTitle: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginTop: 22 },
  heroSubtitle: { color: '#EAF6FF', fontSize: 15, lineHeight: 22, marginTop: 8, maxWidth: 340 },
  mapHeroButton: {
    marginTop: 22,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapHeroTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  mapHeroSubtitle: { color: '#DDEFFF', fontSize: 12, marginTop: 4, maxWidth: 260 },
  body: { padding: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: -8, marginBottom: 22 },
  statCard: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 14 },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 11, marginTop: 4, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '900' },
  sectionAction: { fontSize: 13, fontWeight: '900' },
  pathCard: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  pathIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pathText: { flex: 1, marginLeft: 13 },
  pathTitle: { fontSize: 16, fontWeight: '900' },
  pathSubtitle: { fontSize: 13, lineHeight: 18, marginTop: 3 },
  tipCard: { borderWidth: 1, borderRadius: 14, padding: 16, marginTop: 8, flexDirection: 'row' },
  tipText: { flex: 1, marginLeft: 12 },
  tipTitle: { fontSize: 16, fontWeight: '900' },
  tipBody: { fontSize: 13, lineHeight: 20, marginTop: 4 },
});

export default HomeScreen;
