import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFollow } from './entities/user-follow.entity';
import { CreateUserFollowDto } from './dto/create-user-follow.dto';

@Injectable()
export class UserFollowService {
  constructor(
    @InjectRepository(UserFollow)
    private readonly userFollowRepository: Repository<UserFollow>,
  ) {}

  async follow(followerId: number, createUserFollowDto: CreateUserFollowDto) {
    const follow = this.userFollowRepository.create({
      followerId,
      followingId: createUserFollowDto.followingId,
    });
    return await this.userFollowRepository.save(follow);
  }

  async unfollow(followerId: number, followingId: number) {
    return await this.userFollowRepository.softDelete({
      followerId,
      followingId,
    });
  }

  async getFollowing(userId: number) {
    return await this.userFollowRepository.find({
      where: { followerId: userId },
      relations: ['following'],
    });
  }

  async getFollowers(userId: number) {
    return await this.userFollowRepository.find({
      where: { followingId: userId },
      relations: ['follower'],
    });
  }
}
