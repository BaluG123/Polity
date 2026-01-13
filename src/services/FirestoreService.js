import firestore from '@react-native-firebase/firestore';
import { QUIZ_LEVELS, QUIZ_QUESTIONS } from '../data/polityData';

const LEVELS_COLLECTION = 'quiz_levels';
const QUESTIONS_COLLECTION = 'quiz_questions';
const RESULTS_COLLECTION = 'quiz_results';
const LEADERBOARD_COLLECTION = 'leaderboard';

export const FirestoreService = {
    // Check if levels need updating and update them automatically
    checkAndUpdateLevels: async () => {
        try {
            const snapshot = await firestore().collection(LEVELS_COLLECTION).get();
            
            if (snapshot.empty) {
                // No levels exist, seed everything
                return await FirestoreService.seedDatabase();
            }
            
            // Check if any level needs updating by comparing timeLimit
            let needsUpdate = false;
            const existingLevels = {};
            
            snapshot.docs.forEach(doc => {
                existingLevels[doc.id] = doc.data();
            });
            
            // Compare with local data
            for (const level of QUIZ_LEVELS) {
                const existing = existingLevels[level.id];
                if (!existing || existing.timeLimit !== level.timeLimit || existing.questionsCount !== level.questionsCount) {
                    needsUpdate = true;
                    break;
                }
            }
            
            if (needsUpdate) {
                // Update levels silently
                const batch = firestore().batch();
                QUIZ_LEVELS.forEach((level) => {
                    const docRef = firestore().collection(LEVELS_COLLECTION).doc(level.id);
                    batch.set(docRef, level);
                });
                await batch.commit();
            }
            
            return true;
        } catch (error) {
            return false;
        }
    },

    // Check if database is seeded
    checkIsSeeded: async () => {
        try {
            const snapshot = await firestore().collection(LEVELS_COLLECTION).limit(1).get();
            return !snapshot.empty;
        } catch (error) {
            return false;
        }
    },

    // Update quiz levels only (without re-seeding questions)
    updateQuizLevels: async () => {
        try {
            const batch = firestore().batch();

            // Update Levels only
            QUIZ_LEVELS.forEach((level) => {
                const docRef = firestore().collection(LEVELS_COLLECTION).doc(level.id);
                batch.set(docRef, level, { merge: true }); // Use merge to update existing
            });

            await batch.commit();
            return true;
        } catch (error) {
            console.error('Error updating quiz levels:', error);
            throw error;
        }
    },

    // Seed database with local data
    seedDatabase: async () => {
        try {
            const batch = firestore().batch();

            // Seed/Update Levels (overwrite existing)
            QUIZ_LEVELS.forEach((level) => {
                const docRef = firestore().collection(LEVELS_COLLECTION).doc(level.id);
                batch.set(docRef, level);
            });

            // Seed Questions (only if they don't exist to avoid duplicates)
            Object.keys(QUIZ_QUESTIONS).forEach((levelId) => {
                const questions = QUIZ_QUESTIONS[levelId];
                questions.forEach((q) => {
                    const docRef = firestore()
                        .collection(QUESTIONS_COLLECTION)
                        .doc(q.id);
                    batch.set(docRef, { ...q, levelId }, { merge: true });
                });
            });

            await batch.commit();
            return true;
        } catch (error) {
            throw error;
        }
    },

    // Fetch Quiz Levels
    getQuizLevels: async () => {
        try {
            // First, check and update levels if needed
            await FirestoreService.checkAndUpdateLevels();
            
            const snapshot = await firestore().collection(LEVELS_COLLECTION).orderBy('questionsCount', 'asc').get();
            if (snapshot.empty) {
                return QUIZ_LEVELS;
            }
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            return QUIZ_LEVELS;
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
                // Auto-seed questions for this level if they don't exist
                const questions = QUIZ_QUESTIONS[levelId] || [];
                if (questions.length > 0) {
                    const batch = firestore().batch();
                    questions.forEach((q) => {
                        const docRef = firestore()
                            .collection(QUESTIONS_COLLECTION)
                            .doc(q.id);
                        batch.set(docRef, { ...q, levelId });
                    });
                    await batch.commit();
                    return questions;
                }
                return [];
            }
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
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

            // Save detailed result to user history
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

            // Update Leaderboard (atomic transaction)
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
