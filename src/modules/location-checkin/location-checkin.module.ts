import { Module } from '@nestjs/common';
import { LocationCheckinService } from './location-checkin.service';
import { LocationCheckinController } from './location-checkin.controller';

@Module({
  controllers: [LocationCheckinController],
  providers: [LocationCheckinService],
})
export class LocationCheckinModule {}
