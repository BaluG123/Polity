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
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FirestoreService } from '../services/FirestoreService';
import { useSelector } from 'react-redux';
import { getTheme } from '../theme/palette';

const LeaderboardScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { themeMode } = useSelector(state => state.app);
    const insets = useSafeAreaInsets();
    const theme = getTheme(themeMode);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {
        setLoading(true);
        try {
            const result = await FirestoreService.getLeaderboard();
            setData(result);
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
            <View style={[
                styles.rankCard,
                { backgroundColor: isCurrentUser ? theme.surfaceAlt : theme.surface, borderColor: isCurrentUser ? theme.primary : theme.border },
                isCurrentUser && styles.currentUserCard,
            ]}>
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
                        <View style={[styles.avatarPlaceholder, { backgroundColor: theme.surfaceAlt }]}>
                            <Text style={[styles.avatarInitials, { color: theme.muted }]}>
                                {(item.displayName || 'U').charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <View>
                        <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1}>
                            {item.displayName || 'Anonymous'}
                        </Text>
                        <Text style={[styles.userStats, { color: theme.muted }]}>
                            {item.quizzesPlayed || 0} Quizzes • Streak: {item.currentStreak || 0}
                        </Text>
                    </View>
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreText, { color: theme.primary }]}>{item.totalScore || 0}</Text>
                    <Text style={[styles.scoreLabel, { color: theme.muted }]}>pts</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle="light-content" backgroundColor={theme.primaryDark} />

            <LinearGradient
                colors={[theme.primaryDark, theme.primary, '#00897B']}
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

            <View style={styles.leaderboardSection}>
                <Text style={[styles.leaderboardTitle, { color: theme.text }]}>Top Players</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.userId}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} tintColor={theme.primary} />
                    }
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Icon name="emoji-events" size={60} color={theme.muted} />
                                <Text style={[styles.emptyText, { color: theme.text }]}>No rankings yet.</Text>
                                <Text style={[styles.emptySubText, { color: theme.muted }]}>Be the first to take a quiz!</Text>
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
    userStatsInfo: {
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
        marginBottom: 15,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    rankCard: {
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    currentUserCard: {
        borderWidth: 2,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarInitials: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userStats: {
        fontSize: 12,
    },
    scoreContainer: {
        alignItems: 'flex-end',
        minWidth: 60,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreLabel: {
        fontSize: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    emptySubText: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default LeaderboardScreen;
