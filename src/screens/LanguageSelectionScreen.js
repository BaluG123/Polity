import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES, getText } from '../data/i18n';
import { setLanguage } from '../store/slices/appSlice';
import { getTheme, radius } from '../theme/palette';
import { type } from '../theme/typography';
import { space } from '../theme/spacing';
import { Button } from '../components/ui';

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
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      <LinearGradient colors={theme.heroGradient} style={styles.hero}>
        <Text style={styles.logo}>🏛️</Text>
        <Text style={styles.title}>Rajakiya</Text>
        <Text style={styles.subtitle}>{t('appTagline')}</Text>
      </LinearGradient>

      <View style={styles.panel}>
        <Text style={[type.h1, { color: theme.text }]}>{t('chooseLanguage')}</Text>
        <Text style={[type.body, { color: theme.muted, marginTop: 6 }]}>{t('chooseLanguageSubtitle')}</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {LANGUAGES.map(item => {
            const active = item.code === selected;
            return (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.languageCard,
                  {
                    backgroundColor: active ? theme.accentSoft : theme.surface,
                    borderColor: active ? theme.accent : theme.border,
                  },
                  active && styles.languageCardActive,
                ]}
                onPress={() => setSelected(item.code)}
                activeOpacity={0.78}>
                <View>
                  <Text style={[type.h3, { color: theme.text }]}>{item.nativeName}</Text>
                  <Text style={[type.caption, { color: theme.muted, textTransform: 'none', marginTop: 3 }]}>{item.englishName}</Text>
                </View>
                <Icon
                  name={active ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={active ? theme.accentDark : theme.faint}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button theme={theme} title={t('continue')} icon="arrow-forward" onPress={handleContinue} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { paddingTop: 58, paddingBottom: 30, paddingHorizontal: space.xl },
  logo: { fontSize: 50 },
  title: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 10, letterSpacing: 0.4 },
  subtitle: { color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 22, marginTop: 8 },
  panel: { flex: 1, paddingHorizontal: space.xl, paddingTop: space.xl },
  list: { paddingTop: space.lg, paddingBottom: 110 },
  languageCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    paddingVertical: space.md + 2,
    marginBottom: space.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageCardActive: { borderWidth: 1.5 },
  footer: { position: 'absolute', left: space.xl, right: space.xl, bottom: space.xl },
});

export default LanguageSelectionScreen;
