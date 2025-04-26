import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SaveTokenDto } from './dto/save-token.dto';
import { NotificationRepository } from './notification.repository';

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
}
