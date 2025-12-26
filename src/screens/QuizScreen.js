import React, { useState } from 'react';
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
import { QUIZ_QUESTIONS } from '../data/polityData';

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const insets = useSafeAreaInsets();

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const renderQuizStart = () => (
    <View style={styles.startContainer}>
      <Text style={styles.startTitle}>🧠 Political Science Quiz</Text>
      <Text style={styles.startDescription}>
        Test your knowledge of Indian Constitution, Government Structure, and Political History
      </Text>
      
      <View style={styles.quizStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{QUIZ_QUESTIONS.length}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Mixed</Text>
          <Text style={styles.statLabel}>Difficulty</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
        <Icon name="play-arrow" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderQuestion = () => {
    const question = QUIZ_QUESTIONS[currentQuestion];
    
    return (
      <View style={styles.questionContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </Text>
        </View>

        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.optionButtonSelected
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionCircle,
                  selectedAnswer === index && styles.optionCircleSelected
                ]}>
                  <Text style={[
                    styles.optionLetter,
                    selectedAnswer === index && styles.optionLetterSelected
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedAnswer === null && styles.nextButtonDisabled
          ]}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion + 1 === QUIZ_QUESTIONS.length ? 'Finish' : 'Next'}
          </Text>
          <Icon name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderResult = () => {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>🎉 Quiz Completed!</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{score}/{QUIZ_QUESTIONS.length}</Text>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
        </View>

        <View style={styles.resultStats}>
          <View style={styles.resultStat}>
            <Icon name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.resultStatValue}>{score}</Text>
            <Text style={styles.resultStatLabel}>Correct</Text>
          </View>
          <View style={styles.resultStat}>
            <Icon name="cancel" size={24} color="#F44336" />
            <Text style={styles.resultStatValue}>{QUIZ_QUESTIONS.length - score}</Text>
            <Text style={styles.resultStatLabel}>Wrong</Text>
          </View>
        </View>

        <View style={styles.resultActions}>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
            <Icon name="refresh" size={20} color="#1976D2" />
            <Text style={styles.restartButtonText}>Try Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.homeButton} 
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="home" size={20} color="#FFFFFF" />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Quiz</Text>
          <Text style={styles.headerSubtitle}>
            Test your political science knowledge
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {!quizStarted ? renderQuizStart() : showResult ? renderResult() : renderQuestion()}
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
  startContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  startTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  startDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flex: 0.3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  questionContainer: {
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
    marginBottom: 30,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionButtonSelected: {
    borderColor: '#1976D2',
    backgroundColor: '#E3F2FD',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionCircleSelected: {
    backgroundColor: '#1976D2',
  },
  optionLetter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  optionLetterSelected: {
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#1976D2',
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976D2',
    borderRadius: 25,
    paddingVertical: 15,
  },
  nextButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resultContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 24,
    color: '#666',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  resultStat: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flex: 0.4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  resultStatLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flex: 0.45,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  restartButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flex: 0.45,
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default QuizScreen;