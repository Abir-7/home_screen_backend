import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentMention } from './entities/comment-mention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentMention])],
  exports: [TypeOrmModule],
})
export class CommentMentionModule {}
