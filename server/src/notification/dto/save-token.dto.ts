import { StringProperty } from '@/shared/property-decorator';

export class SaveTokenDto {
  @StringProperty()
  token: string;

  @StringProperty({ optional: true })
  deviceId?: string;
}
