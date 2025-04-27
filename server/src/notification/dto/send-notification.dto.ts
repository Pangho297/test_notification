import { StringProperty } from '@/shared/property-decorator';

export class SendNotificationDto {
  @StringProperty()
  token: string;

  @StringProperty()
  title: string;

  @StringProperty()
  body: string;
}
