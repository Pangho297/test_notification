import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SaveTokenDto } from './dto/save-token.dto';
import { ApiBody } from '@nestjs/swagger';
import { SendNotificationDto } from './dto/send-notification.dto';
import { SendNotificationToAllDto } from './dto/send-notification-to-all.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('save-token')
  @ApiBody({
    type: SaveTokenDto,
    examples: {
      body: {
        value: {
          token: 'string',
          deviceId: 'string',
        },
      },
    },
  })
  async saveToken(@Body() device: SaveTokenDto) {
    return this.notificationService.saveToken(device);
  }

  @Post('send')
  @ApiBody({
    type: SendNotificationDto,
    examples: {
      body: {
        value: {
          token: 'string',
          title: 'string',
          body: 'string',
        },
      },
    },
  })
  async sendNotification(@Body() notification: SendNotificationDto) {
    return this.notificationService.sendNotification(notification);
  }

  @Post('send/all')
  @ApiBody({
    type: SendNotificationToAllDto,
    examples: {
      body: {
        value: {
          title: 'string',
          body: 'string',
        },
      },
    },
  })
  async sendNotificationToAll(@Body() notification: SendNotificationToAllDto) {
    return this.notificationService.sendNotificationToAll(notification);
  }
}
