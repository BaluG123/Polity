import React from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signInWithGoogle, signOut } from '../services/AuthService';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { getTheme, radius } from '../theme/palette';
import { type } from '../theme/typography';
import { space } from '../theme/spacing';
import { getText } from '../data/i18n';
import { Card } from '../components/ui';

// Legacy Home screen saved before we replaced it with a blank placeholder.
// Keep this file so you can restore the previous Home content anytime.

const HomeLegacyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { studyStreak } = useSelector(state => state.progress);
  const { bookmarks } = useSelector(state => state.polity);
  const { user } = useSelector(state => state.auth);
  const { themeMode, language } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  const handleProfilePress = async () => {
    if (user) {
      Alert.alert(t('profileTitle'), `${t('signedInAs')} ${user.displayName || user.email}`, [
        { text: t('cancel'), style: 'cancel' },
        { text: t('settings'), onPress: () => navigation.navigate('Settings') },
        { text: t('signOut'), style: 'destructive', onPress: signOut },
      ]);
      return;
    }

    try {
      await signInWithGoogle();
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(t('googlePlayServicesTitle'), t('googlePlayServicesBody'));
        return;
      }
      Alert.alert(t('signInFailedTitle'), error?.message || t('tryAgainLater'));
    }
  };

  const learningPaths = [
    { title: t('pathConstitutionTitle'), subtitle: t('pathConstitutionSubtitle'), icon: 'article', color: theme.primary, screen: 'Constitution' },
    { title: t('pathGovernmentTitle'), subtitle: t('pathGovernmentSubtitle'), icon: 'account-balance', color: theme.success, screen: 'Government' },
  ];

  const pillars = [
    { value: String(studyStreak || 0), label: t('statDayStreak') },
    { value: String(bookmarks.length), label: t('bookmarks') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={theme.heroGradient} style={styles.hero}>
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

          <Text style={styles.heroTitle}>Rajakiya</Text>
          <Text style={styles.heroSubtitle}>{t('heroSubtitle')}</Text>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.statsRow}>
            {pillars.map(item => (
              <Card key={item.label} theme={theme} style={styles.statCard}>
                <Text style={[type.h1, { color: theme.text, fontSize: 22 }]}>{item.value}</Text>
                <Text style={[type.label, { color: theme.muted, marginTop: 4 }]}>{item.label}</Text>
              </Card>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[type.h2, { color: theme.text }]}>{t('startLearning')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
              <Text style={[type.bodyStrong, { color: theme.primary }]}>{t('exploreAll')}</Text>
            </TouchableOpacity>
          </View>

          {learningPaths.map(item => (
            <TouchableOpacity
              key={item.title}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.82}>
              <Card theme={theme} style={styles.pathCard}>
                <View style={[styles.pathIcon, { backgroundColor: item.color }]}>
                  <Icon name={item.icon} size={23} color="#FFFFFF" />
                </View>
                <View style={styles.pathText}>
                  <Text style={[type.h3, { color: theme.text }]}>{item.title}</Text>
                  <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 3 }]}>{item.subtitle}</Text>
                </View>
                <Icon name="chevron-right" size={22} color={theme.faint} />
              </Card>
            </TouchableOpacity>
          ))}

          <Card theme={theme} style={[styles.tipCard, { backgroundColor: theme.surfaceAlt }]}>
            <Icon name="psychology" size={24} color={theme.accentDark} />
            <View style={styles.tipText}>
              <Text style={[type.h3, { color: theme.text }]}>{t('howToStudyTitle')}</Text>
              <Text style={[type.body, { color: theme.muted, marginTop: 4 }]}>{t('howToStudyBody')}</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 50, paddingHorizontal: space.xl, paddingBottom: space.xxl },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandMark: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center' },
  brandEmoji: { fontSize: 25 },
  profileButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 44, height: 44, borderRadius: 22 },
  heroTitle: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginTop: 22, letterSpacing: 0.4 },
  heroSubtitle: { color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 22, marginTop: 8, maxWidth: 340 },
  body: { padding: space.xl },
  statsRow: { flexDirection: 'row', gap: space.sm + 2, marginTop: -space.xl, marginBottom: space.xl + 2 },
  statCard: { flex: 1, padding: space.md + 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.md },
  pathCard: { flexDirection: 'row', alignItems: 'center', marginBottom: space.md, padding: space.md + 2 },
  pathIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  pathText: { flex: 1, marginLeft: space.md + 1 },
  tipCard: { flexDirection: 'row', marginTop: space.xs, padding: space.lg },
  tipText: { flex: 1, marginLeft: space.md },
});

export default HomeLegacyScreen;
