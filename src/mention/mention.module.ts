import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mention } from './entities/mention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mention])],
  exports: [TypeOrmModule],
})
export class MentionModule {}
