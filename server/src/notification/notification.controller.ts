import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SaveTokenDto } from './dto/save-token.dto';
import { ApiBody } from '@nestjs/swagger';

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
}
