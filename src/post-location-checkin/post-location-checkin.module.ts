import { Module } from '@nestjs/common';
import { PostLocationCheckinService } from './post-location-checkin.service';
import { PostLocationCheckinController } from './post-location-checkin.controller';

@Module({
  controllers: [PostLocationCheckinController],
  providers: [PostLocationCheckinService],
})
export class PostLocationCheckinModule {}
