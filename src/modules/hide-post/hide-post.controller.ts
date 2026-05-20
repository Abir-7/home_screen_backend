import { Controller, Post, Body, Delete, Param, Req } from '@nestjs/common';
import { HidePostService } from './hide-post.service';
import { CreateHiddenPostDto } from './dto/create-hidden-post.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('hide-post')
export class HidePostController {
  constructor(private readonly hidePostService: HidePostService) {}

  @Post()
  async hide(
    @Req() req: AuthenticatedRequest,
    @Body() createHiddenPostDto: CreateHiddenPostDto,
  ) {
    const user_id = req.user.id;
    return await this.hidePostService.hide(user_id, createHiddenPostDto);
  }

  @Delete(':post_id')
  async unhide(
    @Req() req: AuthenticatedRequest,
    @Param('post_id') post_id: number,
  ) {
    const user_id = req.user.id;
    return await this.hidePostService.unhide(user_id, post_id);
  }
}
