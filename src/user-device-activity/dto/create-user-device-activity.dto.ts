import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDeviceActivityDto {
  @IsString()
  @IsNotEmpty()
  deviceId!: string;

  @IsString()
  @IsNotEmpty()
  ipAddress!: string;
}
