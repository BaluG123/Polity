import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../theme/palette';
import { getText } from '../data/i18n';
import { AppHeader } from '../components/ui';

// Minimal placeholder Home screen — reserved for your upcoming News feature.
const HomeScreen = ({ navigation }) => {
  const { language, themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);
  const t = key => getText(language, key);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title={t('home')} onRightPress={() => navigation.navigate('Settings')} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>Home</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>New feature (News) will appear here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 8, fontSize: 14 },
});

export default HomeScreen;
