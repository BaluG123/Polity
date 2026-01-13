import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { FirestoreService } from '../services/FirestoreService';

const { width } = Dimensions.get('window');

const QuizScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    setIsLoading(true);
    const fetchedLevels = await FirestoreService.getQuizLevels();
    setLevels(fetchedLevels);
    setIsLoading(false);
  };

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted && !showResult) {
      handleQuizEnd();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const handleLevelSelect = async (level) => {
    if (!user) {
      Alert.alert(
        'Sign In Required',
        'You need to sign in to take the quiz and track your progress.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate('Home') } // Go to profile/home to sign in
        ]
      );
      return;
    }

    setIsLoading(true);
    const questions = await FirestoreService.getQuestionsByLevel(level.id);
    setIsLoading(false);

    if (questions.length === 0) {
      Alert.alert('Oops', 'No questions found for this level yet.');
      return;
    }

    setCurrentQuestions(questions);
    setSelectedLevel(level);
    setTimeLeft(level.timeLimit);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correctAnswer;
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer,
      correctAnswer: currentQuestions[currentQuestion].correctAnswer,
      isCorrect,
      question: currentQuestions[currentQuestion],
    };

    const updatedUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedUserAnswers);

    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizEnd(newScore);
    }
  };

  const handleQuizEnd = async (finalScore = score) => {
    setShowResult(true);
    if (user && selectedLevel) {
      try {
        console.log('Attempting to save quiz result for user:', user.uid, user.displayName || user.email);
        const result = await FirestoreService.saveQuizResult(
          user.uid,
          user,
          selectedLevel.id,
          finalScore,
          currentQuestions.length
        );
        console.log('Score saved successfully!', result);
        if (result && result.pointsEarned) {
          console.log(`🎉 You earned ${result.pointsEarned} points!`);
        }
      } catch (error) {
        console.error('Failed to save score:', error);
        Alert.alert('Error', 'Failed to save your score to the leaderboard. Please check your internet connection.');
      }
    } else {
      console.log('Cannot save score - user or selectedLevel missing:', { user: !!user, selectedLevel: !!selectedLevel });
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowDetailedResults(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    return Math.round((score / currentQuestions.length) * 100);
  };

  const getPerformanceMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "#4CAF50" };
    if (percentage >= 75) return { message: "Excellent! 🌟", color: "#8BC34A" };
    if (percentage >= 60) return { message: "Good Job! 👍", color: "#FF9800" };
    if (percentage >= 40) return { message: "Keep Practicing! 📚", color: "#FF5722" };
    return { message: "Need More Study! 💪", color: "#F44336" };
  };

  const renderLevelSelection = () => (
    <View style={styles.levelContainer}>
      <Text style={styles.levelTitle}>Choose Your Level</Text>
      <Text style={styles.levelSubtitle}>Select difficulty based on your knowledge</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 50 }} />
      ) : levels.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading quiz levels...</Text>
          <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 20 }} />
        </View>
      ) : (
        levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[styles.levelCard, { borderLeftColor: level.color }]}
            onPress={() => handleLevelSelect(level)}
            activeOpacity={0.7}
          >
            <View style={styles.levelHeader}>
              <View style={[styles.levelIcon, { backgroundColor: level.color }]}>
                <Text style={styles.levelIconText}>{level.icon}</Text>
              </View>
              <View style={styles.levelInfo}>
                <Text style={styles.levelName}>{level.title}</Text>
                <Text style={styles.levelDescription}>{level.subtitle}</Text>
              </View>
              <Icon name="arrow-forward-ios" size={16} color="#666" />
            </View>

            <View style={styles.levelStats}>
              <View style={styles.levelStat}>
                <Icon name="quiz" size={16} color={level.color} />
                <Text style={styles.levelStatText}>{level.questionsCount} Questions</Text>
              </View>
              <View style={styles.levelStat}>
                <Icon name="timer" size={16} color={level.color} />
                <Text style={styles.levelStatText}>{Math.floor(level.timeLimit / 60)} Minutes</Text>
              </View>
              <View style={styles.levelStat}>
                <Icon name="trending-up" size={16} color={level.color} />
                <Text style={styles.levelStatText}>{level.minScore}%+ Required</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  const renderQuestion = () => {
    const question = currentQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    return (
      <View style={styles.questionContainer}>
        {/* Header with timer and progress */}
        <View style={styles.quizHeader}>
          <View style={styles.timerContainer}>
            <Icon name="timer" size={20} color={timeLeft < 60 ? "#F44336" : "#1976D2"} />
            <Text style={[styles.timerText, { color: timeLeft < 60 ? "#F44336" : "#1976D2" }]}>
              {formatTime(timeLeft)}
            </Text>
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {currentQuestion + 1} of {currentQuestions.length}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.levelBadge}>
          <Text style={[styles.levelBadgeText, { color: selectedLevel.color }]}>
            {selectedLevel.icon} {selectedLevel.title}
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
            {currentQuestion + 1 === currentQuestions.length ? 'Finish Quiz' : 'Next Question'}
          </Text>
          <Icon name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderResult = () => {
    const percentage = getScorePercentage();
    const performance = getPerformanceMessage();

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Quiz Completed! 🎉</Text>

        <View style={[styles.scoreContainer, { borderColor: performance.color }]}>
          <Text style={styles.scoreValue}>{score}/{currentQuestions.length}</Text>
          <Text style={[styles.scorePercentage, { color: performance.color }]}>{percentage}%</Text>
          <Text style={[styles.performanceMessage, { color: performance.color }]}>
            {performance.message}
          </Text>
        </View>

        <View style={styles.resultStats}>
          <View style={styles.resultStat}>
            <Icon name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.resultStatValue}>{score}</Text>
            <Text style={styles.resultStatLabel}>Correct</Text>
          </View>
          <View style={styles.resultStat}>
            <Icon name="cancel" size={24} color="#F44336" />
            <Text style={styles.resultStatValue}>{currentQuestions.length - score}</Text>
            <Text style={styles.resultStatLabel}>Wrong</Text>
          </View>
          <View style={styles.resultStat}>
            <Icon name="timer" size={24} color="#FF9800" />
            <Text style={styles.resultStatValue}>{formatTime(selectedLevel.timeLimit - timeLeft)}</Text>
            <Text style={styles.resultStatLabel}>Time Used</Text>
          </View>
        </View>

        <View style={styles.resultActions}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => setShowDetailedResults(true)}
          >
            <Icon name="visibility" size={20} color="#1976D2" />
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
            <Icon name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.restartButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDetailedResults = () => (
    <Modal
      visible={showDetailedResults}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowDetailedResults(false)}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={[selectedLevel?.color || '#1976D2', '#1565C0']}
          style={styles.modalHeader}
        >
          <View style={styles.modalHeaderContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetailedResults(false)}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Detailed Results</Text>
            <Text style={styles.modalSubtitle}>Review your answers</Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.detailsContent}>
          {userAnswers.map((answer, index) => (
            <View key={index} style={styles.answerReviewCard}>
              <View style={styles.answerHeader}>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
                <View style={[
                  styles.answerStatus,
                  { backgroundColor: answer.isCorrect ? '#4CAF50' : '#F44336' }
                ]}>
                  <Icon
                    name={answer.isCorrect ? 'check' : 'close'}
                    size={16}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <Text style={styles.reviewQuestion}>{answer.question.question}</Text>

              <View style={styles.answersSection}>
                {answer.question.options.map((option, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={[
                      styles.answerOption,
                      optionIndex === answer.correctAnswer && styles.correctOption,
                      optionIndex === answer.selectedAnswer && !answer.isCorrect && styles.wrongOption,
                    ]}
                  >
                    <Text style={styles.optionLabel}>
                      {String.fromCharCode(65 + optionIndex)}.
                    </Text>
                    <Text style={[
                      styles.answerOptionText,
                      optionIndex === answer.correctAnswer && styles.correctOptionText,
                      optionIndex === answer.selectedAnswer && !answer.isCorrect && styles.wrongOptionText,
                    ]}>
                      {option}
                    </Text>
                    {optionIndex === answer.correctAnswer && (
                      <Icon name="check-circle" size={16} color="#4CAF50" />
                    )}
                    {optionIndex === answer.selectedAnswer && !answer.isCorrect && (
                      <Icon name="cancel" size={16} color="#F44336" />
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.explanationSection}>
                <Text style={styles.explanationTitle}>💡 Explanation:</Text>
                <Text style={styles.explanationText}>{answer.question.explanation}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      {/* Header */}
      <LinearGradient
        colors={['#1976D2', '#1565C0']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Political Science Quiz</Text>
          <Text style={styles.headerSubtitle}>
            {quizStarted ? `${selectedLevel?.title} Level` : 'Test your knowledge with level-based questions'}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {!quizStarted ? renderLevelSelection() : showResult ? renderResult() : renderQuestion()}
      </ScrollView>

      {renderDetailedResults()}
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },

  // Level Selection Styles
  levelContainer: {
    paddingHorizontal: 20,
  },
  levelTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  levelSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  levelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  levelIconText: {
    fontSize: 24,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 14,
    color: '#666',
  },
  levelStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelStatText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },

  // Question Styles
  questionContainer: {
    paddingHorizontal: 20,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  progressInfo: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 3,
  },
  levelBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 2,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    lineHeight: 22,
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
    elevation: 3,
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

  // Result Styles
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 3,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  performanceMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  resultStat: {
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
  resultStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  resultStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsButton: {
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
    elevation: 2,
  },
  detailsButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flex: 0.45,
    justifyContent: 'center',
    elevation: 3,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalHeaderContent: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  detailsContent: {
    flex: 1,
    padding: 20,
  },
  answerReviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  answerStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  answersSection: {
    marginBottom: 15,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
  },
  wrongOption: {
    backgroundColor: '#FFEBEE',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 20,
  },
  answerOptionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  correctOptionText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  wrongOptionText: {
    color: '#C62828',
    fontWeight: '600',
  },
  explanationSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default QuizScreen;