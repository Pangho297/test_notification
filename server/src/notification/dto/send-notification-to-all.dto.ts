import { StringProperty } from '@/shared/property-decorator';

export class SendNotificationToAllDto {
  @StringProperty()
  title: string;

  @StringProperty()
  body: string;
}
