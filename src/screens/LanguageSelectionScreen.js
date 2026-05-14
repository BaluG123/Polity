import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES, getText } from '../data/i18n';
import { setLanguage } from '../store/slices/appSlice';
import { getTheme } from '../theme/palette';

const LanguageSelectionScreen = () => {
  const dispatch = useDispatch();
  const { language, themeMode } = useSelector(state => state.app);
  const [selected, setSelected] = useState(language || 'en');
  const theme = getTheme(themeMode);
  const t = key => getText(selected, key);

  const handleContinue = () => {
    dispatch(setLanguage(selected));
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0D47A1" />
      <LinearGradient colors={['#0D47A1', '#1976D2', '#26A69A']} style={styles.hero}>
        <Text style={styles.logo}>🏛️</Text>
        <Text style={styles.title}>TargetPolity</Text>
        <Text style={styles.subtitle}>{t('appTagline')}</Text>
      </LinearGradient>

      <View style={styles.panel}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('chooseLanguage')}</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.muted }]}>{t('chooseLanguageSubtitle')}</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {LANGUAGES.map(item => {
            const active = item.code === selected;
            return (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.languageCard,
                  { backgroundColor: theme.surface, borderColor: active ? theme.primary : theme.border },
                  active && styles.languageCardActive,
                ]}
                onPress={() => setSelected(item.code)}
                activeOpacity={0.78}>
                <View>
                  <Text style={[styles.nativeName, { color: theme.text }]}>{item.nativeName}</Text>
                  <Text style={[styles.englishName, { color: theme.muted }]}>{item.englishName}</Text>
                </View>
                <Icon name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={active ? theme.primary : theme.muted} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.85}>
        <Text style={styles.continueText}>{t('continue')}</Text>
        <Icon name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { paddingTop: 58, paddingBottom: 30, paddingHorizontal: 24 },
  logo: { fontSize: 54 },
  title: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginTop: 8 },
  subtitle: { color: '#E3F2FD', fontSize: 15, lineHeight: 22, marginTop: 8 },
  panel: { flex: 1, paddingHorizontal: 20, paddingTop: 22 },
  sectionTitle: { fontSize: 24, fontWeight: '900' },
  sectionSubtitle: { fontSize: 14, lineHeight: 20, marginTop: 6 },
  list: { paddingTop: 18, paddingBottom: 100 },
  languageCard: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageCardActive: { borderWidth: 2 },
  nativeName: { fontSize: 18, fontWeight: '800' },
  englishName: { fontSize: 13, marginTop: 3 },
  continueButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  continueText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
});

export default LanguageSelectionScreen;
