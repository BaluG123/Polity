import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { radius } from '../../theme/palette';
import { type } from '../../theme/typography';

/**
 * Small pill control used for filters, categories and quick toggles.
 */
const Chip = ({ theme, label, active = false, onPress, style }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
      styles.base,
      {
        backgroundColor: active ? theme.primary : theme.surfaceAlt,
        borderColor: active ? theme.primary : theme.border,
      },
      style,
    ]}>
    <Text style={[type.caption, { color: active ? theme.onPrimary : theme.muted, textTransform: 'none' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
});

export default Chip;
