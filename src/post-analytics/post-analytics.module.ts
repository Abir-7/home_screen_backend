import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostAnalytic } from './entities/post-analytic.entity';
import { PostAnalyticsService } from './post-analytics.service';
import { PostAnalyticsController } from './post-analytics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostAnalytic])],
  controllers: [PostAnalyticsController],
  providers: [PostAnalyticsService],
  exports: [PostAnalyticsService],
})
export class PostAnalyticsModule {}
