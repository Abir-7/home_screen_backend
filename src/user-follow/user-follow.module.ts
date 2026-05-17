import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollow } from './entities/user-follow.entity';
import { UserFollowService } from './user-follow.service';
import { UserFollowController } from './user-follow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollow])],
  controllers: [UserFollowController],
  providers: [UserFollowService],
})
export class UserFollowModule {}
