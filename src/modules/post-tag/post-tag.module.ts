import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTag } from './entities/post-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostTag])],
  exports: [TypeOrmModule],
})
export class PostTagModule {}
