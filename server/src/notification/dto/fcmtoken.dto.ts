import { FCMToken } from '@prisma/client';

import { StringProperty } from '@/shared/property-decorator';

export class FCMTokenDto {
  static from = (fcmToken: FCMToken): FCMTokenDto => {
    const res = new FCMTokenDto();
    res.token = fcmToken.token;
    res.deviceId = fcmToken.deviceId;
    return res;
  };

  @StringProperty()
  token: string;

  @StringProperty({ optional: true })
  deviceId: string;
}
