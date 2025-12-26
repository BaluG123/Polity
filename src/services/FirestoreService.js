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
            console.log('Saving quiz result:', { userId, userProfile, levelId, score, totalQuestions });
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
            console.log('Quiz history saved successfully');

            // 2. Update Leaderboard (atomic transaction)
            const leaderboardRef = firestore().collection(LEADERBOARD_COLLECTION).doc(userId);

            await firestore().runTransaction(async (transaction) => {
                const doc = await transaction.get(leaderboardRef);

                let newTotalScore = score;
                let quizzesPlayed = 1;

                if (doc.exists) {
                    const data = doc.data();
                    console.log('Existing leaderboard data:', data);
                    newTotalScore = (data.totalScore || 0) + score;
                    quizzesPlayed = (data.quizzesPlayed || 0) + 1;
                }

                const leaderboardData = {
                    userId,
                    displayName: userProfile.displayName || userProfile.email || 'Anonymous',
                    photoURL: userProfile.photoURL || null,
                    totalScore: newTotalScore,
                    quizzesPlayed,
                    lastActive: timestamp,
                };

                console.log('Saving leaderboard data:', leaderboardData);
                transaction.set(leaderboardRef, leaderboardData, { merge: true });
            });

            console.log('Leaderboard updated successfully');
            return true;
        } catch (error) {
            console.error('Error saving quiz result:', error);
            throw error;
        }
    },

    // Fetch Leaderboard
    getLeaderboard: async (limit = 50) => {
        try {
            console.log('Fetching leaderboard from Firestore...');
            const snapshot = await firestore()
                .collection(LEADERBOARD_COLLECTION)
                .orderBy('totalScore', 'desc')
                .limit(limit)
                .get();

            console.log(`Found ${snapshot.docs.length} leaderboard entries`);
            let results = snapshot.docs.map((doc, index) => ({
                ...doc.data(),
                rank: index + 1,
                totalScore: doc.data().totalScore || 0, // Ensure totalScore is always a number
                quizzesPlayed: doc.data().quizzesPlayed || 0, // Ensure quizzesPlayed is always a number
            }));
            
            // If no data exists, return sample data
            if (results.length === 0) {
                results = [
                    {
                        userId: 'sample1',
                        displayName: 'Rajesh Kumar',
                        totalScore: 95,
                        quizzesPlayed: 12,
                        rank: 1,
                        photoURL: null
                    },
                    {
                        userId: 'sample2',
                        displayName: 'Priya Sharma',
                        totalScore: 87,
                        quizzesPlayed: 10,
                        rank: 2,
                        photoURL: null
                    },
                    {
                        userId: 'sample3',
                        displayName: 'Amit Singh',
                        totalScore: 82,
                        quizzesPlayed: 9,
                        rank: 3,
                        photoURL: null
                    },
                    {
                        userId: 'sample4',
                        displayName: 'Sneha Patel',
                        totalScore: 78,
                        quizzesPlayed: 8,
                        rank: 4,
                        photoURL: null
                    },
                    {
                        userId: 'sample5',
                        displayName: 'Vikram Gupta',
                        totalScore: 75,
                        quizzesPlayed: 7,
                        rank: 5,
                        photoURL: null
                    }
                ];
            }
            
            console.log('Leaderboard results:', results);
            return results;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            // Return sample data on error too
            return [
                {
                    userId: 'sample1',
                    displayName: 'Rajesh Kumar',
                    totalScore: 95,
                    quizzesPlayed: 12,
                    rank: 1,
                    photoURL: null
                },
                {
                    userId: 'sample2',
                    displayName: 'Priya Sharma',
                    totalScore: 87,
                    quizzesPlayed: 10,
                    rank: 2,
                    photoURL: null
                },
                {
                    userId: 'sample3',
                    displayName: 'Amit Singh',
                    totalScore: 82,
                    quizzesPlayed: 9,
                    rank: 3,
                    photoURL: null
                },
                {
                    userId: 'sample4',
                    displayName: 'Sneha Patel',
                    totalScore: 78,
                    quizzesPlayed: 8,
                    rank: 4,
                    photoURL: null
                },
                {
                    userId: 'sample5',
                    displayName: 'Vikram Gupta',
                    totalScore: 75,
                    quizzesPlayed: 7,
                    rank: 5,
                    photoURL: null
                }
            ];
        }
    },

    // Test Firestore connection
    testConnection: async () => {
        try {
            console.log('Testing Firestore connection...');
            const testDoc = await firestore().collection('test').doc('connection').get();
            console.log('Firestore connection test successful');
            return true;
        } catch (error) {
            console.error('Firestore connection test failed:', error);
            return false;
        }
    }
};
