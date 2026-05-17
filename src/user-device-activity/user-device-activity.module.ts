import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceActivity } from './entities/user-device-activity.entity';
import { UserDeviceActivityService } from './user-device-activity.service';
import { UserDeviceActivityController } from './user-device-activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeviceActivity])],
  controllers: [UserDeviceActivityController],
  providers: [UserDeviceActivityService],
  exports: [UserDeviceActivityService],
})
export class UserDeviceActivityModule {}
