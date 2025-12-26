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

const TopicDetailScreen = ({ route, navigation }) => {
  const { topic, title } = route.params || {};
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    const data = constitutionContent[topic?.id];

    if (!data) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Content</Text>
          <Text style={styles.contentText}>
            Detailed content for {title || 'this topic'} will be displayed here.
          </Text>
        </View>
      );
    }

    // Preamble Special Rendering
    if (topic?.id === 'preamble') {
      return (
        <View style={styles.preambleContainer}>
          <Text style={styles.preambleText}>
            <Text style={styles.highlight}>WE, THE PEOPLE OF INDIA,</Text> having solemnly resolved to constitute India into a
            <Text style={styles.highlight}> SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</Text> and to secure to all its citizens:
          </Text>

          <View style={styles.divider} />

          <Text style={styles.preambleText}>
            <Text style={styles.highlight}>JUSTICE,</Text> social, economic and political;
          </Text>

          <Text style={styles.preambleText}>
            <Text style={styles.highlight}>LIBERTY</Text> of thought, expression, belief, faith and worship;
          </Text>

          <Text style={styles.preambleText}>
            <Text style={styles.highlight}>EQUALITY</Text> of status and of opportunity;
          </Text>

          <Text style={styles.preambleText}>
            and to promote among them all
          </Text>

          <Text style={styles.preambleText}>
            <Text style={styles.highlight}>FRATERNITY</Text> assuring the dignity of the individual and the unity and integrity of the Nation;
          </Text>

          <View style={styles.divider} />

          <Text style={styles.footerText}>
            IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
          </Text>
        </View>
      );
    }

    // Generic Part Rendering (List of Articles)
    if (data.articles) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.title}</Text>
          {data.articles.map((article, index) => (
            <View key={index} style={styles.articleCard}>
              <View style={styles.articleHeader}>
                <Text style={styles.articleTitle}>{article.title}</Text>
              </View>
              <Text style={styles.articleDescription}>{article.description}</Text>
              <Text style={styles.articleContent}>{article.content}</Text>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <Text style={styles.contentText}>Content not available.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title || 'Topic Details'}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {renderContent()}
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
  preambleContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  preambleText: {
    fontSize: 18,
    lineHeight: 32,
    color: '#37474F',
    textAlign: 'justify',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#D84315',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#CFD8DC',
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#546E7A',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
    paddingTop: 16,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  articleHeader: {
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  articleDescription: {
    fontSize: 14,
    color: '#546E7A',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  articleContent: {
    fontSize: 15,
    color: '#37474F',
    lineHeight: 22,
  },
});

export default TopicDetailScreen;