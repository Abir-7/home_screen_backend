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

  async follow(follower_id: number, createUserFollowDto: CreateUserFollowDto) {
    const follow = this.userFollowRepository.create({
      follower_id,
      following_id: createUserFollowDto.following_id,
    });
    return await this.userFollowRepository.save(follow);
  }

  async unfollow(follower_id: number, following_id: number) {
    return await this.userFollowRepository.softDelete({
      follower_id,
      following_id,
    });
  }

  async getFollowing(user_id: number) {
    return await this.userFollowRepository.find({
      where: { follower_id: user_id },
      relations: ['following'],
    });
  }

  async getFollowers(user_id: number) {
    return await this.userFollowRepository.find({
      where: { following_id: user_id },
      relations: ['follower'],
    });
  }
}
