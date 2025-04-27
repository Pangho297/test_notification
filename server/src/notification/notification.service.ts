import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SaveTokenDto } from './dto/save-token.dto';
import { NotificationRepository } from './notification.repository';
import { SendNotificationDto } from './dto/send-notification.dto';
import { SendNotificationToAllDto } from './dto/send-notification-to-all.dto';

@Injectable()
export class NotificationService {
  private firebaseAdmin: admin.app.App;

  constructor(private readonly notificationRepository: NotificationRepository) {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  async saveToken(device: SaveTokenDto) {
    this.notificationRepository.saveToken(device);
  }

  async sendNotification({ token, ...notification }: SendNotificationDto) {
    try {
      const message = {
        token,
        notification,
      };
      return await this.firebaseAdmin.messaging().send(message);
    } catch (error) {
      console.error('FCM 전송 실패', error);
    }
  }

  async sendNotificationToAll(notification: SendNotificationToAllDto) {
    const tokens = await this.notificationRepository.getFCMTokenToAll();
    const messages = tokens.map(({ token }) => ({
      token,
      notification,
    }));

    return Promise.all(
      messages.map((message) => this.firebaseAdmin.messaging().send(message)),
    );
  }
}
