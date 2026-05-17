import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Req,
} from '@nestjs/common';
import { UserFollowService } from './user-follow.service';
import { CreateUserFollowDto } from './dto/create-user-follow.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('user-follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}

  @Post()
  async follow(
    @Req() req: AuthenticatedRequest,
    @Body() createUserFollowDto: CreateUserFollowDto,
  ) {
    const followerId = req.user.id;
    return await this.userFollowService.follow(followerId, createUserFollowDto);
  }

  @Delete(':followingId')
  async unfollow(
    @Req() req: AuthenticatedRequest,
    @Param('followingId') followingId: number,
  ) {
    const followerId = req.user.id;
    return await this.userFollowService.unfollow(followerId, followingId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: number) {
    return await this.userFollowService.getFollowing(userId);
  }

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: number) {
    return await this.userFollowService.getFollowers(userId);
  }
}
