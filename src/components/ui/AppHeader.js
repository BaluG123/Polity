import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { space } from '../../theme/spacing';

const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

/**
 * Premium top bar — deep navy gradient with gold accent details.
 * Tab-root screens pass `onRightPress` (settings gear);
 * pushed detail screens pass `onBack` instead.
 */
const AppHeader = ({ theme, title, subtitle, onBack, rightIcon = 'settings', onRightPress, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />
      <LinearGradient
        colors={theme.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.wrap, { paddingTop: insets.top + space.xs }]}
      >
        {/* thin gold line at very top */}
        <View style={[styles.topAccent, { backgroundColor: theme.accent }]} />

        <View style={styles.row}>
          {onBack ? (
            <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.75} hitSlop={HIT_SLOP}>
              <View style={styles.iconCircle}>
                <Icon name="arrow-back" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBtn} />
          )}

          <View style={styles.titleCol}>
            {/* title with letter-spacing for authority feel */}
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {!!subtitle && (
              <View style={styles.subtitleRow}>
                <View style={[styles.subtitleDot, { backgroundColor: theme.accent }]} />
                <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
                <View style={[styles.subtitleDot, { backgroundColor: theme.accent }]} />
              </View>
            )}
          </View>

          {onRightPress ? (
            <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} activeOpacity={0.75} hitSlop={HIT_SLOP}>
              <View style={styles.iconCircle}>
                <Icon name={rightIcon} size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBtn} />
          )}
        </View>

        {/* bottom gold trim */}
        <View style={styles.trimRow}>
          <View style={[styles.trimLine, { backgroundColor: theme.accent + '40' }]} />
          <View style={[styles.trimDiamond, { backgroundColor: theme.accent }]} />
          <View style={[styles.trimLine, { backgroundColor: theme.accent + '40' }]} />
        </View>

        {children}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: space.lg,
    paddingBottom: space.md,
  },
  topAccent: {
    height: 2,
    marginHorizontal: -space.lg,
    marginBottom: space.sm,
    opacity: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: space.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  subtitleDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  trimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: space.sm,
    paddingHorizontal: space.xl,
  },
  trimLine: {
    flex: 1,
    height: 1,
  },
  trimDiamond: {
    width: 6,
    height: 6,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },
});

export default AppHeader;
