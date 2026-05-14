import React from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { LANGUAGES, getText } from '../data/i18n';
import { signInWithGoogle, signOut } from '../services/AuthService';
import { setLanguage, setThemeMode } from '../store/slices/appSlice';
import { getTheme } from '../theme/palette';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { language, themeMode } = useSelector(state => state.app);
  const { user } = useSelector(state => state.auth);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  const handleGoogleAuth = async () => {
    if (user) {
      Alert.alert('Sign out', 'Do you want to sign out of TargetPolity?', [
        { text: 'Cancel', style: 'cancel' },
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.statusBar} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>{t('settings')}</Text>

        <View style={[styles.profileCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: theme.primary }]}>
              <Icon name="person" size={30} color="#FFFFFF" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={[styles.profileName, { color: theme.text }]}>{user?.displayName || t('guest')}</Text>
            <Text style={[styles.profileEmail, { color: theme.muted }]}>{user?.email || 'TargetPolity learner'}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.signInCard, { backgroundColor: theme.surface, borderColor: user ? theme.success : theme.primary }]}
          onPress={handleGoogleAuth}
          activeOpacity={0.82}>
          <View style={[styles.googleIconWrap, { backgroundColor: user ? '#E8F5E9' : '#E3F2FD' }]}>
            <Icon name={user ? 'verified-user' : 'login'} size={24} color={user ? theme.success : theme.primary} />
          </View>
          <View style={styles.signInText}>
            <Text style={[styles.signInTitle, { color: theme.text }]}>
              {user ? 'Progress sync is active' : 'Sign in with Google'}
            </Text>
            <Text style={[styles.signInSubtitle, { color: theme.muted }]}>
              {user ? 'Tap to sign out from this device.' : 'Save progress, quiz points and leaderboard rank securely.'}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.muted} />
        </TouchableOpacity>

        <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('theme')}</Text>
          <View style={styles.segment}>
            {['light', 'dark'].map(mode => {
              const active = themeMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  style={[styles.segmentButton, active && { backgroundColor: theme.primary }]}
                  onPress={() => dispatch(setThemeMode(mode))}>
                  <Icon name={mode === 'light' ? 'light-mode' : 'dark-mode'} size={18} color={active ? '#FFFFFF' : theme.muted} />
                  <Text style={[styles.segmentText, { color: active ? '#FFFFFF' : theme.text }]}>{t(mode)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('language')}</Text>
          {LANGUAGES.map(item => {
            const active = item.code === language;
            return (
              <TouchableOpacity
                key={item.code}
                style={[styles.languageRow, { borderBottomColor: theme.border }]}
                onPress={() => dispatch(setLanguage(item.code))}>
                <View>
                  <Text style={[styles.languageNative, { color: theme.text }]}>{item.nativeName}</Text>
                  <Text style={[styles.languageEnglish, { color: theme.muted }]}>{item.englishName}</Text>
                </View>
                <Icon name={active ? 'check-circle' : 'radio-button-unchecked'} size={22} color={active ? theme.primary : theme.muted} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.note, { backgroundColor: theme.surfaceAlt }]}>
          <Icon name="verified" size={18} color={theme.success} />
          <Text style={[styles.noteText, { color: theme.muted }]}>
            {t('quizAccuracyNote')} {t('comingContent')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', marginTop: 16, marginBottom: 18 },
  profileCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  avatarFallback: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  profileText: { flex: 1, marginLeft: 14 },
  profileName: { fontSize: 17, fontWeight: '900' },
  profileEmail: { fontSize: 13, marginTop: 4 },
  signInCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  googleIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  signInText: { flex: 1, marginLeft: 12 },
  signInTitle: { fontSize: 16, fontWeight: '900' },
  signInSubtitle: { fontSize: 12, lineHeight: 17, marginTop: 3 },
  section: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 12 },
  segment: { flexDirection: 'row', gap: 10 },
  segmentButton: { flex: 1, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  segmentText: { fontSize: 14, fontWeight: '800', textTransform: 'capitalize' },
  languageRow: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  languageNative: { fontSize: 16, fontWeight: '800' },
  languageEnglish: { fontSize: 12, marginTop: 2 },
  note: { borderRadius: 12, padding: 14, flexDirection: 'row', gap: 10 },
  noteText: { flex: 1, fontSize: 13, lineHeight: 19 },
});

export default SettingsScreen;
