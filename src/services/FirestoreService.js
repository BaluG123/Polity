import firestore from '@react-native-firebase/firestore';
import { QUIZ_LEVELS, QUIZ_QUESTIONS } from '../data/polityData';

const LEVELS_COLLECTION = 'quiz_levels';
const QUESTIONS_COLLECTION = 'quiz_questions';
const RESULTS_COLLECTION = 'quiz_results';
const LEADERBOARD_COLLECTION = 'leaderboard';

export const FirestoreService = {
    // Check if database is seeded
    checkIsSeeded: async () => {
        try {
            const snapshot = await firestore().collection(LEVELS_COLLECTION).limit(1).get();
            return !snapshot.empty;
        } catch (error) {
            console.error('Error checking seed status:', error);
            return false;
        }
    },

    // Seed database with local data
    seedDatabase: async () => {
        try {
            const batch = firestore().batch();

            // Seed Levels
            QUIZ_LEVELS.forEach((level) => {
                const docRef = firestore().collection(LEVELS_COLLECTION).doc(level.id);
                batch.set(docRef, level);
            });

            // Seed Questions
            Object.keys(QUIZ_QUESTIONS).forEach((levelId) => {
                const questions = QUIZ_QUESTIONS[levelId];
                questions.forEach((q) => {
                    const docRef = firestore()
                        .collection(QUESTIONS_COLLECTION)
                        .doc(q.id);
                    batch.set(docRef, { ...q, levelId });
                });
            });

            await batch.commit();
            return true;
        } catch (error) {
            console.error('Error seeding database:', error);
            throw error;
        }
    },

    // Fetch Quiz Levels
    getQuizLevels: async () => {
        try {
            const snapshot = await firestore().collection(LEVELS_COLLECTION).orderBy('questionsCount', 'asc').get();
            if (snapshot.empty) {
                // Fallback to local data if empty (or auto-seed logic could be here)
                return QUIZ_LEVELS;
            }
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error fetching levels:', error);
            return QUIZ_LEVELS; // Fail-safe
        }
    },

    // Fetch Questions for a Level
    getQuestionsByLevel: async (levelId) => {
        try {
            const snapshot = await firestore()
                .collection(QUESTIONS_COLLECTION)
                .where('levelId', '==', levelId)
                .get();

            if (snapshot.empty) {
                return QUIZ_QUESTIONS[levelId] || [];
            }
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error fetching questions:', error);
            return QUIZ_QUESTIONS[levelId] || [];
        }
    },

    // Save Quiz Result
    saveQuizResult: async (userId, userProfile, levelId, score, totalQuestions) => {
        try {
            const timestamp = firestore.FieldValue.serverTimestamp();

            // Intelligent Scoring Algorithm
            const calculateIntelligentScore = (levelId, score, totalQuestions) => {
                const percentage = (score / totalQuestions) * 100;
                
                // Base points per correct answer
                const basePointsPerQuestion = {
                    'beginner': 10,
                    'intermediate': 15,
                    'advanced': 25,
                    'expert': 40
                };

                // Difficulty multiplier
                const difficultyMultiplier = {
                    'beginner': 1.0,
                    'intermediate': 1.5,
                    'advanced': 2.0,
                    'expert': 3.0
                };

                // Performance bonus based on percentage
                let performanceBonus = 1.0;
                if (percentage >= 90) performanceBonus = 2.0;      // Excellent: 200% bonus
                else if (percentage >= 80) performanceBonus = 1.5; // Very Good: 150% bonus
                else if (percentage >= 70) performanceBonus = 1.2; // Good: 120% bonus
                else if (percentage >= 60) performanceBonus = 1.0; // Average: 100% (no bonus)
                else performanceBonus = 0.5;                       // Below Average: 50% penalty

                // Speed bonus (assuming faster completion = better performance)
                const speedBonus = 1.1; // 10% bonus for completing quiz

                // Calculate final points
                const basePoints = score * (basePointsPerQuestion[levelId] || 10);
                const difficultyPoints = basePoints * (difficultyMultiplier[levelId] || 1.0);
                const finalPoints = Math.round(difficultyPoints * performanceBonus * speedBonus);

                return Math.max(finalPoints, 1); // Minimum 1 point for participation
            };

            const intelligentPoints = calculateIntelligentScore(levelId, score, totalQuestions);

            // 1. Save detailed result to user history
            await firestore()
                .collection('users')
                .doc(userId)
                .collection('quiz_history')
                .add({
                    levelId,
                    score,
                    totalQuestions,
                    percentage: (score / totalQuestions) * 100,
                    pointsEarned: intelligentPoints,
                    completedAt: timestamp,
                });

            // 2. Update Leaderboard (atomic transaction)
            const leaderboardRef = firestore().collection(LEADERBOARD_COLLECTION).doc(userId);

            await firestore().runTransaction(async (transaction) => {
                const doc = await transaction.get(leaderboardRef);

                let newTotalScore = intelligentPoints;
                let quizzesPlayed = 1;
                let bestStreak = 1;
                let currentStreak = 1;

                if (doc.exists) {
                    const data = doc.data() || {};
                    newTotalScore = (data.totalScore || 0) + intelligentPoints;
                    quizzesPlayed = (data.quizzesPlayed || 0) + 1;
                    
                    // Calculate streak (consecutive quizzes with >60% score)
                    const percentage = (score / totalQuestions) * 100;
                    if (percentage >= 60) {
                        currentStreak = (data.currentStreak || 0) + 1;
                        bestStreak = Math.max(currentStreak, data.bestStreak || 0);
                    } else {
                        currentStreak = 0;
                        bestStreak = data.bestStreak || 0;
                    }
                } else {
                    // First time user - set initial values
                    const percentage = (score / totalQuestions) * 100;
                    if (percentage >= 60) {
                        currentStreak = 1;
                        bestStreak = 1;
                    } else {
                        currentStreak = 0;
                        bestStreak = 0;
                    }
                }

                const leaderboardData = {
                    userId,
                    displayName: userProfile.displayName || userProfile.email || 'Anonymous',
                    photoURL: userProfile.photoURL || null,
                    totalScore: newTotalScore,
                    quizzesPlayed,
                    currentStreak,
                    bestStreak,
                    averageScore: Math.round(newTotalScore / quizzesPlayed),
                    lastActive: timestamp,
                    lastQuizLevel: levelId,
                };

                transaction.set(leaderboardRef, leaderboardData, { merge: true });
            });

            return { success: true, pointsEarned: intelligentPoints };
        } catch (error) {
            console.error('Error saving quiz result:', error);
            throw error;
        }
    },

    // Fetch Leaderboard
    getLeaderboard: async (limit = 50) => {
        try {
            const snapshot = await firestore()
                .collection(LEADERBOARD_COLLECTION)
                .orderBy('totalScore', 'desc')
                .limit(limit)
                .get();

            const results = snapshot.docs.map((doc, index) => ({
                ...doc.data(),
                rank: index + 1,
                totalScore: doc.data().totalScore || 0,
                quizzesPlayed: doc.data().quizzesPlayed || 0,
            }));
            
            return results;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    },

    // Test Firestore connection
    testConnection: async () => {
        try {
            const testDoc = await firestore().collection('test').doc('connection').get();
            return true;
        } catch (error) {
            console.error('Firestore connection test failed:', error);
            return false;
        }
    },

    // Check user's leaderboard entry
    checkUserLeaderboardEntry: async (userId) => {
        try {
            const doc = await firestore().collection(LEADERBOARD_COLLECTION).doc(userId).get();
            
            if (doc.exists) {
                return doc.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error checking user leaderboard entry:', error);
            return null;
        }
    },

    // Get user's quiz history
    getUserQuizHistory: async (userId) => {
        try {
            const snapshot = await firestore()
                .collection('users')
                .doc(userId)
                .collection('quiz_history')
                .orderBy('completedAt', 'desc')
                .get();
            
            const history = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            return history;
        } catch (error) {
            console.error('Error getting user quiz history:', error);
            return [];
        }
    }
};
