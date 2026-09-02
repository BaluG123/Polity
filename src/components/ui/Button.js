import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { radius } from '../../theme/palette';
import { type } from '../../theme/typography';

/**
 * Shared button. variant: 'primary' | 'accent' | 'ghost' | 'outline'.
 * Reads colors from `theme` so it works in light and dark automatically.
 */
const Button = ({
  theme,
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}) => {
  const palette = {
    primary: { bg: theme.primary, fg: theme.onPrimary, border: theme.primary },
    accent: { bg: theme.accent, fg: theme.onAccent, border: theme.accent },
    outline: { bg: 'transparent', fg: theme.text, border: theme.borderStrong },
    ghost: { bg: 'transparent', fg: theme.primary, border: 'transparent' },
  }[variant] || { bg: theme.primary, fg: theme.onPrimary, border: theme.primary };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          opacity: disabled ? 0.55 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.fg} size="small" />
      ) : (
        <View style={styles.row}>
          {icon && iconPosition === 'left' && <Icon name={icon} size={19} color={palette.fg} style={styles.iconLeft} />}
          <Text style={[type.button, { color: palette.fg }]}>{title}</Text>
          {icon && iconPosition === 'right' && <Icon name={icon} size={19} color={palette.fg} style={styles.iconRight} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  fullWidth: { alignSelf: 'stretch' },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

export default Button;
