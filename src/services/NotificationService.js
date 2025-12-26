import notifee, { TriggerType, RepeatFrequency, AndroidImportance } from '@notifee/react-native';

class NotificationService {
    constructor() {
        this.channelId = 'study-reminders';
    }

    async configure() {
        await notifee.requestPermission();

        // Create a channel (required for Android)
        await notifee.createChannel({
            id: this.channelId,
            name: 'Study Reminders',
            importance: AndroidImportance.HIGH,
        });
    }

    async scheduleDailyReminder(hour = 20, minute = 0) {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a time-based trigger
        const date = new Date(Date.now());
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(0);

        // If time has passed today, schedule for tomorrow
        if (date.getTime() <= Date.now()) {
            date.setDate(date.getDate() + 1);
        }

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
            alarmManager: true, // Allow waking up device on Android
        };

        try {
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
            console.log(`Reminder scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
            return true;
        } catch (e) {
            console.error('Error scheduling notification:', e);
            return false;
        }
    }

    async cancelAll() {
        await notifee.cancelAllNotifications();
    }
}

export default new NotificationService();
