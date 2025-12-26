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
    const { user } = useSelector(state => state.auth);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {
        setLoading(true);
        const result = await FirestoreService.getLeaderboard();
        setData(result);
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadLeaderboard();
        setRefreshing(false);
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
                    <Text style={styles.scoreText}>{item.totalScore}</Text>
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
                    <View style={{ width: 40 }} />
                </View>
                <Text style={styles.headerSubtitle}>Top Performers</Text>
            </LinearGradient>

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
    listContent: {
        padding: 20,
        paddingTop: 30,
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
