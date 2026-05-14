import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme } from '../theme/palette';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { themeMode } = useSelector(state => state.app);
  const theme = getTheme(themeMode);

  const topics = [
    { id: 'constitution', title: 'Constitution', subtitle: 'Articles, rights, DPSP, amendments', icon: 'article', color: '#1976D2', screen: 'Constitution' },
    { id: 'historical_events', title: 'Historical Events Map', subtitle: 'Political milestones across India', icon: 'map', color: '#009688', screen: 'Map' },
    { id: 'government', title: 'Government Structure', subtitle: 'Union, State and Local government', icon: 'account-balance', color: '#F57C00', screen: 'Government' },
    { id: 'judiciary', title: 'Judiciary', subtitle: 'Courts, doctrines and landmark cases', icon: 'gavel', color: '#D81B60', screen: 'Judiciary' },
    { id: 'quiz', title: 'Offline Quiz Practice', subtitle: 'Exam-style questions with explanations', icon: 'quiz', color: '#6A1B9A', screen: 'Quiz' },
  ].filter(item => {
    const q = searchQuery.trim().toLowerCase();
    return !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Explore</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          One place for concepts, context, practice and revision.
        </Text>

        <View style={[styles.searchBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Icon name="search" size={20} color={theme.muted} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search polity topics"
            placeholderTextColor={theme.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {topics.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => navigation.navigate(topic.screen)}
            activeOpacity={0.82}>
            <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
              <Icon name={topic.icon} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.topicText}>
              <Text style={[styles.topicTitle, { color: theme.text }]}>{topic.title}</Text>
              <Text style={[styles.topicSubtitle, { color: theme.muted }]}>{topic.subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.muted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 30, fontWeight: '900', marginTop: 14 },
  subtitle: { fontSize: 14, lineHeight: 21, marginTop: 6, marginBottom: 18 },
  searchBox: { height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  searchInput: { flex: 1, fontSize: 15, marginLeft: 10 },
  topicCard: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  topicIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  topicText: { flex: 1, marginLeft: 13 },
  topicTitle: { fontSize: 16, fontWeight: '900' },
  topicSubtitle: { fontSize: 13, lineHeight: 18, marginTop: 3 },
});

export default ExploreScreen;
