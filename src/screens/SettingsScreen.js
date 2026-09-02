import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { LANGUAGES, getText } from '../data/i18n';
import { signInWithGoogle, signOut } from '../services/AuthService';
import { setLanguage, setThemeMode } from '../store/slices/appSlice';
import { getTheme, radius } from '../theme/palette';
import { type } from '../theme/typography';
import { space } from '../theme/spacing';
import { AppHeader, Card } from '../components/ui';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { language, themeMode } = useSelector(state => state.app);
  const { user } = useSelector(state => state.auth);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  const handleGoogleAuth = async () => {
    if (user) {
      Alert.alert(t('signOutConfirmTitle'), t('signOutConfirmBody'), [
        { text: t('cancel'), style: 'cancel' },
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title={t('settings')} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card theme={theme} style={styles.profileCard}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: theme.primary }]}>
              <Icon name="person" size={30} color="#FFFFFF" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={[type.h3, { color: theme.text }]}>{user?.displayName || t('guest')}</Text>
            <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 4 }]}>{user?.email || t('learnerFallback')}</Text>
          </View>
        </Card>

        <TouchableOpacity onPress={handleGoogleAuth} activeOpacity={0.82}>
          <Card theme={theme} style={[styles.signInCard, { borderColor: user ? theme.success : theme.accent }]}>
            <View style={[styles.googleIconWrap, { backgroundColor: user ? theme.successSoft : theme.accentSoft }]}>
              <Icon name={user ? 'verified-user' : 'login'} size={23} color={user ? theme.success : theme.accentDark} />
            </View>
            <View style={styles.signInText}>
              <Text style={[type.h3, { color: theme.text }]}>{user ? t('progressSyncActive') : t('signInWithGoogle')}</Text>
              <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 3 }]}>
                {user ? t('tapToSignOut') : t('signInSubtitle')}
              </Text>
            </View>
            <Icon name="chevron-right" size={22} color={theme.faint} />
          </Card>
        </TouchableOpacity>

        <Card theme={theme} style={styles.section}>
          <Text style={[type.h3, { color: theme.text, marginBottom: space.md }]}>{t('theme')}</Text>
          <View style={styles.segment}>
            {['light', 'dark'].map(mode => {
              const active = themeMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  style={[styles.segmentButton, { backgroundColor: active ? theme.primary : theme.surfaceAlt }]}
                  onPress={() => dispatch(setThemeMode(mode))}>
                  <Icon name={mode === 'light' ? 'light-mode' : 'dark-mode'} size={18} color={active ? theme.onPrimary : theme.muted} />
                  <Text style={[type.bodyStrong, { color: active ? theme.onPrimary : theme.text, textTransform: 'capitalize' }]}>{t(mode)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Card theme={theme} style={styles.section}>
          <Text style={[type.h3, { color: theme.text, marginBottom: space.sm }]}>{t('language')}</Text>
          {LANGUAGES.map(item => {
            const active = item.code === language;
            return (
              <TouchableOpacity
                key={item.code}
                style={[styles.languageRow, { borderBottomColor: theme.border }]}
                onPress={() => dispatch(setLanguage(item.code))}>
                <View>
                  <Text style={[type.bodyStrong, { color: theme.text }]}>{item.nativeName}</Text>
                  <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 2 }]}>{item.englishName}</Text>
                </View>
                <Icon name={active ? 'check-circle' : 'radio-button-unchecked'} size={22} color={active ? theme.accentDark : theme.faint} />
              </TouchableOpacity>
            );
          })}
        </Card>

        <View style={[styles.note, { backgroundColor: theme.surfaceAlt }]}>
          <Icon name="verified" size={18} color={theme.success} />
          <Text style={[type.caption, { color: theme.muted, textTransform: 'none', flex: 1, lineHeight: 19 }]}>
            {t('comingContent')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: space.xl, paddingBottom: 40 },
  profileCard: { flexDirection: 'row', alignItems: 'center', marginBottom: space.lg, padding: space.lg },
  avatar: { width: 58, height: 58, borderRadius: 29 },
  avatarFallback: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  profileText: { flex: 1, marginLeft: space.md + 2 },
  signInCard: { flexDirection: 'row', alignItems: 'center', marginBottom: space.lg, padding: space.md + 2, borderWidth: 1 },
  googleIconWrap: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  signInText: { flex: 1, marginLeft: space.md },
  section: { marginBottom: space.lg, padding: space.lg },
  segment: { flexDirection: 'row', gap: space.sm + 2 },
  segmentButton: { flex: 1, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  languageRow: { paddingVertical: space.sm + 4, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  note: { borderRadius: radius.lg, padding: space.md + 2, flexDirection: 'row', gap: space.sm + 2 },
});

export default SettingsScreen;
