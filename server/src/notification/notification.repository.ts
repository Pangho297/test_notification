import { HttpStatus, Injectable } from '@nestjs/common';
import { SaveTokenDto } from './dto/save-token.dto';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FCMTokenDto } from './dto/fcmtoken.dto';

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async saveToken(device: SaveTokenDto): Promise<{ statusCode: HttpStatus }> {
    this.prisma.fCMToken
      .upsert({
        where: { token: device.token },
        update: { deviceId: device.deviceId, updatedAt: new Date() },
        create: { ...device },
      })
      .then((res) => res.token);
    return { statusCode: HttpStatus.CREATED };
  }

  async getFCMTokenToAll(): Promise<FCMTokenDto[]> {
    return await this.prisma.fCMToken
      .findMany()
      .then((ls) => ls.map(FCMTokenDto.from));
  }
}
