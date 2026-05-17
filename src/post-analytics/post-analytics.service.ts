/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostAnalytic } from './entities/post-analytic.entity';

@Injectable()
export class PostAnalyticsService {
  constructor(
    @InjectRepository(PostAnalytic)
    private readonly repository: Repository<PostAnalytic>,
  ) {}

  async incrementMetric(
    post_id: number,
    metric:
      | 'view_count'
      | 'like_count'
      | 'comment_count'
      | 'share_count'
      | 'save_count',
  ) {
    return await this.repository.increment({ post_id }, metric, 1);
  }

  async getAnalytics(post_id: number) {
    return await this.repository.findOne({ where: { post_id } });
  }
}
