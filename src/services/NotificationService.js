import notifee, { TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';

class NotificationService {
    constructor() {
        this.channelId = 'study-reminders';
        this.isConfigured = false;
        this.isScheduled = false;
    }

    async configure() {
        if (this.isConfigured) return;
        
        await notifee.requestPermission();

        // Create a channel (required for Android)
        await notifee.createChannel({
            id: this.channelId,
            name: 'Study Reminders',
            importance: AndroidImportance.HIGH,
        });
        
        this.isConfigured = true;
    }

    async scheduleDailyReminder(hour = 20, minute = 0) {
        // Prevent duplicate scheduling
        if (this.isScheduled) return true;
        
        try {
            // Cancel any existing notifications first
            await notifee.cancelAllNotifications();
            
            // Request permissions (required for iOS)
            await notifee.requestPermission();

            // Create a time-based trigger
            const date = new Date();
            date.setHours(hour);
            date.setMinutes(minute);
            date.setSeconds(0);
            date.setMilliseconds(0);

            // If time has passed today, schedule for tomorrow
            if (date.getTime() <= Date.now()) {
                date.setDate(date.getDate() + 1);
            }

            const trigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: date.getTime(),
                repeatFrequency: RepeatFrequency.DAILY,
                alarmManager: true,
            };

            await notifee.createTriggerNotification(
                {
                    title: 'Time to Study! 📚',
                    body: 'Keep up your streak! Spend 10 minutes on TargetPolity today.',
                    android: {
                        channelId: this.channelId,
                        pressAction: {
                            id: 'default',
                        },
                    },
                },
                trigger,
            );
            
            this.isScheduled = true;
            return true;
        } catch (e) {
            console.error('Error scheduling notification:', e);
            return false;
        }
    }

    async cancelAll() {
        await notifee.cancelAllNotifications();
        this.isScheduled = false;
    }

    // Reset flags for testing
    reset() {
        this.isConfigured = false;
        this.isScheduled = false;
    }
}

export default new NotificationService();
