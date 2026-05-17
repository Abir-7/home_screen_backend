import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateUserSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionToken!: string;

  @IsString()
  deviceInfo?: string;

  @IsString()
  ipAddress?: string;

  @IsDateString()
  @IsNotEmpty()
  expiresAt!: string;
}
