import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, shadow } from '../../theme/palette';
import { space } from '../../theme/spacing';
import { type } from '../../theme/typography';

const ICONS = { Home: 'article', Explore: 'explore', Constitution: 'menu-book' };
const LABEL_KEYS = { Home: 'home', Explore: 'explore', Constitution: 'constitution' };

/**
 * Rajakiya's signature floating tab bar. A gold pill glides between tabs
 * (Animated.spring — the same primitive SplashScreen.js already animates
 * with) and the focused tab expands to reveal its label inside that pill;
 * the others stay icon-only, so the bar reads as one continuous shape
 * reacting to touch rather than three static buttons. Ties the bottom
 * chrome to the same navy/gold brand pairing as AppHeader up top.
 */
const TabBar = ({ state, navigation, theme, t }) => {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const tabCount = state.routes.length;
  const tabWidth = barWidth / tabCount;

  useEffect(() => {
    if (!barWidth) return;
    Animated.spring(indicatorX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      friction: 9,
      tension: 80,
    }).start();
  }, [state.index, barWidth, tabWidth, indicatorX]);

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]} pointerEvents="box-none">
      <View
        style={[
          styles.bar,
          { backgroundColor: theme.surface, borderColor: theme.dark ? theme.borderStrong : theme.accentSoft },
          shadow.raised,
        ]}
        onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
      >
        {barWidth > 0 && (
          <Animated.View
            style={[
              styles.indicator,
              {
                width: tabWidth - 8,
                backgroundColor: theme.accent,
                transform: [{ translateX: indicatorX }],
              },
            ]}
          />
        )}

        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.8} style={styles.tab}>
              <Icon name={ICONS[route.name] || 'circle'} size={22} color={focused ? theme.onAccent : theme.muted} />
              {focused && (
                <Text style={[styles.label, { color: theme.onAccent }]} numberOfLines={1}>
                  {t(LABEL_KEYS[route.name] || route.name)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: space.lg,
    height: 64,
    borderRadius: radius.pill,
    borderWidth: 1,
    overflow: 'hidden',
  },
  indicator: { position: 'absolute', top: 6, bottom: 6, left: 4, borderRadius: radius.pill },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  label: { ...type.button, fontSize: 13 },
});

export default TabBar;
