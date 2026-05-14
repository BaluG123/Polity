import firestore from '@react-native-firebase/firestore';
const RESULTS_COLLECTION = 'quiz_results';
const LEADERBOARD_COLLECTION = 'leaderboard';

export const FirestoreService = {
    // Save quiz score only for leaderboard/social proof. Quiz content is offline-first JSON.
    saveQuizResult: async (userId, userProfile, levelId, score, totalQuestions) => {
        try {
            const timestamp = firestore.FieldValue.serverTimestamp();

            // Intelligent Scoring Algorithm
            const calculateIntelligentScore = (levelId, score, totalQuestions) => {
                const percentage = (score / totalQuestions) * 100;
                
                const basePointsPerQuestion = {
                    'beginner': 10,
                    'intermediate': 15,
                    'advanced': 25,
                    'expert': 40
                };

                const difficultyMultiplier = {
                    'beginner': 1.0,
                    'intermediate': 1.5,
                    'advanced': 2.0,
                    'expert': 3.0
                };

                let performanceBonus = 1.0;
                if (percentage >= 90) performanceBonus = 2.0;
                else if (percentage >= 80) performanceBonus = 1.5;
                else if (percentage >= 70) performanceBonus = 1.2;
                else if (percentage >= 60) performanceBonus = 1.0;
                else performanceBonus = 0.5;

                const speedBonus = 1.1;
                const basePoints = score * (basePointsPerQuestion[levelId] || 10);
                const difficultyPoints = basePoints * (difficultyMultiplier[levelId] || 1.0);
                const finalPoints = Math.round(difficultyPoints * performanceBonus * speedBonus);

                return Math.max(finalPoints, 1);
            };

            const intelligentPoints = calculateIntelligentScore(levelId, score, totalQuestions);

            // Update leaderboard only. Detailed quiz history remains local/offline.
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
                    
                    const percentage = (score / totalQuestions) * 100;
                    if (percentage >= 60) {
                        currentStreak = (data.currentStreak || 0) + 1;
                        bestStreak = Math.max(currentStreak, data.bestStreak || 0);
                    } else {
                        currentStreak = 0;
                        bestStreak = data.bestStreak || 0;
                    }
                } else {
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
            return [];
        }
    },

    // Test Firestore connection
    testConnection: async () => {
        try {
            const testDoc = await firestore().collection('test').doc('connection').get();
            return true;
        } catch (error) {
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
            return [];
        }
    }
};
