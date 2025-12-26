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
            console.log('Starting seeding...');
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
                        .doc(q.id); // Use specific ID to avoid dupes on re-run
                    batch.set(docRef, { ...q, levelId });
                });
            });

            await batch.commit();
            console.log('Database seeded successfully!');
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
            return QUIZ_QUESTIONS[levelId] || []; // Fail-safe
        }
    },

    // Save Quiz Result
    saveQuizResult: async (userId, userProfile, levelId, score, totalQuestions) => {
        try {
            const timestamp = firestore.FieldValue.serverTimestamp();

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
                    completedAt: timestamp,
                });

            // 2. Update Leaderboard (atomic transaction)
            const leaderboardRef = firestore().collection(LEADERBOARD_COLLECTION).doc(userId);

            await firestore().runTransaction(async (transaction) => {
                const doc = await transaction.get(leaderboardRef);

                let newTotalScore = score;
                let quizzesPlayed = 1;

                if (doc.exists) {
                    const data = doc.data();
                    newTotalScore = (data.totalScore || 0) + score;
                    quizzesPlayed = (data.quizzesPlayed || 0) + 1;
                }

                transaction.set(leaderboardRef, {
                    userId,
                    displayName: userProfile.displayName || 'Anonymous',
                    photoURL: userProfile.photoURL,
                    totalScore: newTotalScore,
                    quizzesPlayed,
                    lastActive: timestamp,
                }, { merge: true });
            });

            return true;
        } catch (error) {
            console.error('Error saving result:', error);
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

            return snapshot.docs.map((doc, index) => ({
                ...doc.data(),
                rank: index + 1,
            }));
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    }
};
