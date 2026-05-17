import { Controller, Get, Param } from '@nestjs/common';
import { PostAnalyticsService } from './post-analytics.service';

@Controller('post-analytics')
export class PostAnalyticsController {
  constructor(private readonly service: PostAnalyticsService) {}

  @Get(':post_id')
  async getAnalytics(@Param('post_id') post_id: number) {
    return await this.service.getAnalytics(post_id);
  }
}
