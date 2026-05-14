import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES, getText } from '../data/i18n';
import { setLanguage, setThemeMode } from '../store/slices/appSlice';
import { getTheme } from '../theme/palette';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { language, themeMode } = useSelector(state => state.app);
  const { user } = useSelector(state => state.auth);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

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
