import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { type } from '../../theme/typography';

/**
 * Consistent page title + optional subtitle + optional trailing action,
 * used at the top of content screens (Explore, Settings, etc.).
 */
const ScreenHeader = ({ theme, title, subtitle, actionLabel, onActionPress, actionIcon }) => (
  <View style={styles.row}>
    <View style={styles.textCol}>
      <Text style={[type.display, { color: theme.text, fontSize: 28 }]}>{title}</Text>
      {!!subtitle && <Text style={[type.body, { color: theme.muted, marginTop: 6 }]}>{subtitle}</Text>}
    </View>
    {!!actionLabel && (
      <TouchableOpacity onPress={onActionPress} style={styles.action} activeOpacity={0.75}>
        <Text style={[type.bodyStrong, { color: theme.primary }]}>{actionLabel}</Text>
        {actionIcon && <Icon name={actionIcon} size={16} color={theme.primary} style={{ marginLeft: 2 }} />}
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  textCol: { flex: 1, paddingRight: 12 },
  action: { flexDirection: 'row', alignItems: 'center', paddingTop: 6 },
});

export default ScreenHeader;
