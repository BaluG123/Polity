import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    RefreshControl,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FirestoreService } from '../services/FirestoreService';
import { useSelector } from 'react-redux';

const LeaderboardScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userStats, setUserStats] = useState(null);
    const { user } = useSelector(state => state.auth);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {
        setLoading(true);
        try {
            console.log('Loading leaderboard...');
            const result = await FirestoreService.getLeaderboard();
            console.log('Leaderboard data received:', result);
            setData(result);
            
            // Find current user's stats
            if (user) {
                const currentUserStats = result.find(item => item.userId === user.uid);
                setUserStats(currentUserStats);
                console.log('Current user stats:', currentUserStats);
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadLeaderboard();
        setRefreshing(false);
    };

    const renderUserStatsCard = () => {
        if (!user) return null;

        const stats = userStats || {
            rank: 'N/A',
            totalScore: 0,
            quizzesPlayed: 0
        };

        const getRankDisplay = () => {
            if (!userStats) return 'Not Ranked';
            if (stats.rank === 1) return '🥇 1st Place';
            if (stats.rank === 2) return '🥈 2nd Place';
            if (stats.rank === 3) return '🥉 3rd Place';
            return `#${stats.rank}`;
        };

        const getAverageScore = () => {
            if (!stats.quizzesPlayed || stats.quizzesPlayed === 0) return 0;
            return Math.round(stats.totalScore / stats.quizzesPlayed);
        };

        return (
            <View style={styles.userStatsContainer}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.userStatsCard}
                >
                    <View style={styles.userStatsHeader}>
                        <View style={styles.userAvatarContainer}>
                            {user.photoURL ? (
                                <Image source={{ uri: user.photoURL }} style={styles.userAvatar} />
                            ) : (
                                <View style={styles.userAvatarPlaceholder}>
                                    <Text style={styles.userAvatarText}>
                                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userStatsName}>
                                {user.displayName || user.email || 'Anonymous'}
                            </Text>
                            <Text style={styles.userStatsRank}>{getRankDisplay()}</Text>
                        </View>
                        <View style={styles.userStatsMainScore}>
                            <Text style={styles.userStatsTotalScore}>{stats.totalScore}</Text>
                            <Text style={styles.userStatsScoreLabel}>Total Points</Text>
                        </View>
                    </View>

                    <View style={styles.userStatsGrid}>
                        <View style={styles.userStatItem}>
                            <Icon name="quiz" size={24} color="#FFFFFF" />
                            <Text style={styles.userStatValue}>{stats.quizzesPlayed}</Text>
                            <Text style={styles.userStatLabel}>Quizzes</Text>
                        </View>
                        <View style={styles.userStatItem}>
                            <Icon name="trending-up" size={24} color="#FFFFFF" />
                            <Text style={styles.userStatValue}>{getAverageScore()}</Text>
                            <Text style={styles.userStatLabel}>Avg Score</Text>
                        </View>
                        <View style={styles.userStatItem}>
                            <Icon name="emoji-events" size={24} color="#FFFFFF" />
                            <Text style={styles.userStatValue}>
                                {stats.rank <= 3 && userStats ? '🏆' : stats.rank || 'N/A'}
                            </Text>
                            <Text style={styles.userStatLabel}>Rank</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    };

    const testAddToLeaderboard = async () => {
        if (!user) {
            Alert.alert('Error', 'You need to be signed in to test this feature.');
            return;
        }

        try {
            await FirestoreService.saveQuizResult(
                user.uid,
                user,
                'beginner', // test level
                5, // test score
                10 // total questions
            );
            Alert.alert('Success', 'Test entry added to leaderboard!');
            await loadLeaderboard();
        } catch (error) {
            Alert.alert('Error', `Failed to add test entry: ${error.message}`);
        }
    };

    const renderItem = ({ item }) => {
        const isCurrentUser = user && item.userId === user.uid;
        let rankColor = '#666';
        let iconName = null;

        if (item.rank === 1) {
            rankColor = '#FFD700'; // Gold
            iconName = 'emoji-events';
        } else if (item.rank === 2) {
            rankColor = '#C0C0C0'; // Silver
        } else if (item.rank === 3) {
            rankColor = '#CD7F32'; // Bronze
        }

        return (
            <View style={[styles.rankCard, isCurrentUser && styles.currentUserCard]}>
                <View style={styles.rankPosition}>
                    {iconName ? (
                        <Icon name={iconName} size={24} color={rankColor} />
                    ) : (
                        <Text style={[styles.rankText, { color: rankColor }]}>#{item.rank}</Text>
                    )}
                </View>

                <View style={styles.userInfo}>
                    {item.photoURL ? (
                        <Image source={{ uri: item.photoURL }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarInitials}>
                                {(item.displayName || 'U').charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <View>
                        <Text style={styles.userName} numberOfLines={1}>
                            {item.displayName || 'Anonymous'}
                        </Text>
                        <Text style={styles.userStats}>
                            {item.quizzesPlayed || 0} Quizzes Played
                        </Text>
                    </View>
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{item.totalScore || 0}</Text>
                    <Text style={styles.scoreLabel}>pts</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

            <LinearGradient
                colors={['#1976D2', '#1565C0']}
                style={[styles.header, { paddingTop: insets.top + 20 }]}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Leaderboard</Text>
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={loadLeaderboard}
                    >
                        <Icon name="refresh" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerSubtitle}>Top Performers</Text>
            </LinearGradient>

            {renderUserStatsCard()}

            <View style={styles.leaderboardSection}>
                <Text style={styles.leaderboardTitle}>🏆 Top Players</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.userId}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1976D2']} />
                    }
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Icon name="emoji-events" size={60} color="#E0E0E0" />
                                <Text style={styles.emptyText}>No rankings yet.</Text>
                                <Text style={styles.emptySubText}>Be the first to take a quiz!</Text>
                            </View>
                        )
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    refreshButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#E3F2FD',
        textAlign: 'center',
        marginTop: 5,
    },
    debugText: {
        fontSize: 12,
        color: '#E3F2FD',
        textAlign: 'center',
        marginTop: 5,
        fontStyle: 'italic',
    },
    debugButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
        marginTop: 10,
        alignSelf: 'center',
    },
    debugButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    userStatsContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    userStatsCard: {
        borderRadius: 20,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    userStatsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userAvatarContainer: {
        marginRight: 15,
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    userAvatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    userAvatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userInfo: {
        flex: 1,
    },
    userStatsName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    userStatsRank: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '600',
    },
    userStatsMainScore: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    userStatsTotalScore: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userStatsScoreLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },
    userStatsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 15,
        paddingVertical: 15,
    },
    userStatItem: {
        alignItems: 'center',
        flex: 1,
    },
    userStatValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 8,
        marginBottom: 4,
    },
    userStatLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },
    leaderboardSection: {
        flex: 1,
        paddingHorizontal: 20,
    },
    leaderboardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    rankCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    currentUserCard: {
        borderWidth: 2,
        borderColor: '#1976D2',
        backgroundColor: '#E3F2FD',
    },
    rankPosition: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarInitials: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userStats: {
        fontSize: 12,
        color: '#666',
    },
    scoreContainer: {
        alignItems: 'flex-end',
        minWidth: 60,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    scoreLabel: {
        fontSize: 12,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 20,
    },
    emptySubText: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
});

export default LeaderboardScreen;
