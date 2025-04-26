import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SaveTokenDto } from './dto/save-token.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('save-token')
  async saveToken(@Body('device') device: SaveTokenDto) {
    return this.notificationService.saveToken(device);
  }
}
