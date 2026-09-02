import React from 'react';
import { StyleSheet, View } from 'react-native';
import { radius, shadow } from '../../theme/palette';

/**
 * Base surface used across the app for grouped content — a topic row, a stat
 * tile, a settings section. Keeps border/radius/shadow consistent so screens
 * don't each invent their own card look.
 */
const Card = ({ theme, style, elevated = false, padded = true, children, ...rest }) => (
  <View
    style={[
      styles.base,
      {
        backgroundColor: theme.surface,
        borderColor: theme.border,
      },
      padded && styles.padded,
      elevated && shadow.card,
      style,
    ]}
    {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  padded: {
    padding: 16,
  },
});

export default Card;
