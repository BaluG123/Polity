import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CaseStudiesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const cases = [
    {
      id: 'kesavananda',
      title: 'Kesavananda Bharati Case',
      year: '1973',
      significance: 'Basic Structure Doctrine',
      icon: '⚖️',
      color: '#E91E63',
    },
    {
      id: 'maneka',
      title: 'Maneka Gandhi Case',
      year: '1978',
      significance: 'Expanded Article 21',
      icon: '🛡️',
      color: '#1976D2',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Landmark Cases</Text>
          <Text style={styles.headerSubtitle}>
            Supreme Court judgments that shaped India
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚖️ Constitutional Cases</Text>
          {cases.map((caseItem) => (
            <TouchableOpacity key={caseItem.id} style={styles.caseCard}>
              <Text style={styles.caseIcon}>{caseItem.icon}</Text>
              <View style={styles.caseInfo}>
                <Text style={styles.caseTitle}>{caseItem.title}</Text>
                <Text style={styles.caseYear}>{caseItem.year}</Text>
                <Text style={styles.caseSignificance}>{caseItem.significance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  caseIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  caseInfo: {
    flex: 1,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  caseYear: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 3,
  },
  caseSignificance: {
    fontSize: 14,
    color: '#666',
  },
});

export default CaseStudiesScreen;