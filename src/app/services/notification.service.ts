import { Injectable } from '@angular/core';
import { LocalNotificationSchema, LocalNotifications, Schedule, ScheduleResult } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private platform: Platform) { }

  init() {
    this.requestPermission();
    this.listenForNotifications();
  }

  // Request permission to show notifications
  async requestPermission() {
    if (this.platform.is('capacitor') && this.platform.is('android')) {
      this.createAndroidChannels();
    }

    const granted = await LocalNotifications.requestPermissions();
    if (granted.display !== 'granted') {
      console.log('Permission not granted to show notifications');
    }
    // else {
    //   this.scheduleNotification('Test', 'This is a test notification', 1);
    // }
  }

  // Schedule a notification
  async scheduleNotification(title: string, body: string, id: number, ongoing?: boolean, schedule?: Schedule) {
    const notifs: LocalNotificationSchema[] = [
      {
        title,
        body,
        id,
        ongoing,
        smallIcon: 'res://logo',
        iconColor: '#ffffff'
      }
    ];

    await LocalNotifications.schedule({
      notifications: notifs
    });
  }

  // Cancel a notification
  async cancelNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }

  // Get pending notifications
  async getPendingNotifications(): Promise<ScheduleResult> {
    return await LocalNotifications.getPending();
  }

  // Listen for notification interactions
  private listenForNotifications() {
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notification received: ', notification);
    });

    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
      const notification = notificationAction.notification;
      console.log('Notification action performed: ', notification);
    });
  }


  // Create Notification Channels, only for Android
  async createAndroidChannels() {
    await LocalNotifications.createChannel({
      id: 'app',
      name: 'App',
      description: 'Notification channels used for app related alerts.'
    });

    await LocalNotifications.createChannel({
      id: 'quiz',
      name: 'Quiz',
      description: 'Quiz start time, end time, remaining time, etc.'
    });
  }
}
