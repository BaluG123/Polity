import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type } from '../../theme/typography';
import { space } from '../../theme/spacing';

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

/**
 * The one top bar every screen in the app renders — same navy gradient,
 * same back-button position, same title/subtitle rhythm, so no screen
 * looks like it wandered in from a different app.
 *
 * Tab-root screens (Home, Explore, Constitution) pass `onRightPress`
 * (the settings gear); pushed detail screens pass `onBack` instead. Both
 * slots reserve the same width even when empty, so the title always sits
 * dead-center regardless of which buttons are showing. `children` renders
 * extra header content (e.g. Constitution's inline search field) below the
 * title row, still inside the gradient.
 */
const AppHeader = ({ theme, title, subtitle, onBack, rightIcon = 'settings', onRightPress, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      <LinearGradient colors={theme.heroGradient} style={[styles.wrap, { paddingTop: insets.top + space.sm }]}>
        <View style={styles.row}>
          {onBack ? (
            <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.75} hitSlop={HIT_SLOP}>
              <Icon name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBtn} />
          )}

          <View style={styles.titleCol}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            {!!subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            )}
          </View>

          {onRightPress ? (
            <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} activeOpacity={0.75} hitSlop={HIT_SLOP}>
              <Icon name={rightIcon} size={22} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBtn} />
          )}
        </View>

        {children}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    paddingBottom: space.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  titleCol: { flex: 1, alignItems: 'center', paddingHorizontal: space.xs },
  title: { ...type.h2, color: '#FFFFFF', textAlign: 'center' },
  subtitle: {
    ...type.caption,
    color: 'rgba(255,255,255,0.78)',
    textTransform: 'none',
    textAlign: 'center',
    marginTop: 3,
  },
});

export default AppHeader;
