import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiddenPost } from './entities/hidden-post.entity';
import { HidePostService } from './hide-post.service';
import { HidePostController } from './hide-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HiddenPost])],
  controllers: [HidePostController],
  providers: [HidePostService],
})
export class HidePostModule {}
