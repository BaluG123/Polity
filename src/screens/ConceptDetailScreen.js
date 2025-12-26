import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { constitutionContent } from '../data/constitutionContent';

const ConceptDetailScreen = ({ route, navigation }) => {
  const { concept, title } = route.params || {};
  const insets = useSafeAreaInsets();

  const data = constitutionContent[concept?.id];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title || data?.title || 'Concept Details'}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {data ? (
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📜 Text</Text>
              <Text style={styles.cardContent}>{data.content}</Text>
            </View>

            {data.keyPoints && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>✨ Key Points</Text>
                {data.keyPoints.map((point, index) => (
                  <View key={index} style={styles.pointRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 Explanation</Text>
            <Text style={styles.contentText}>
              Detailed explanation for {title || 'this concept'} will be displayed here.
            </Text>
          </View>
        )}
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
    textAlign: 'center',
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
  contentText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  cardContent: {
    fontSize: 16,
    color: '#37474F',
    lineHeight: 26,
    textAlign: 'justify',
  },
  pointRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    color: '#FF9800',
    marginRight: 10,
    marginTop: -2,
  },
  pointText: {
    fontSize: 15,
    color: '#455A64',
    lineHeight: 22,
    flex: 1,
  },
});

export default ConceptDetailScreen;