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
    const follower_id = req.user.id;
    return await this.userFollowService.follow(
      follower_id,
      createUserFollowDto,
    );
  }

  @Delete(':following_id')
  async unfollow(
    @Req() req: AuthenticatedRequest,
    @Param('following_id') following_id: number,
  ) {
    const follower_id = req.user.id;
    return await this.userFollowService.unfollow(follower_id, following_id);
  }

  @Get('following/:user_id')
  async getFollowing(@Param('user_id') user_id: number) {
    return await this.userFollowService.getFollowing(user_id);
  }

  @Get('followers/:user_id')
  async getFollowers(@Param('user_id') user_id: number) {
    return await this.userFollowService.getFollowers(user_id);
  }
}
