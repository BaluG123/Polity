import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { type } from '../../theme/typography';

const EmptyState = ({ theme, icon = 'inbox', title, subtitle }) => (
  <View style={styles.wrap}>
    <View style={[styles.iconWrap, { backgroundColor: theme.surfaceAlt }]}>
      <Icon name={icon} size={30} color={theme.muted} />
    </View>
    <Text style={[type.h3, { color: theme.text, marginTop: 14 }]}>{title}</Text>
    {!!subtitle && <Text style={[type.body, { color: theme.muted, marginTop: 6, textAlign: 'center' }]}>{subtitle}</Text>}
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24 },
  iconWrap: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
});

export default EmptyState;
