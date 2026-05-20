import { Controller, Post, Body, Delete, Param, Req } from '@nestjs/common';
import { UserBlockService } from './user-block.service';
import { CreateUserBlockDto } from './dto/create-user-block.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('user-block-list')
export class UserBlockController {
  constructor(private readonly service: UserBlockService) {}

  @Post()
  async block(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUserBlockDto,
  ) {
    const blockerId = req.user.id;
    return await this.service.block(blockerId, dto);
  }

  @Delete(':blockedId')
  async unblock(
    @Req() req: AuthenticatedRequest,
    @Param('blockedId') blockedId: number,
  ) {
    const blockerId = req.user.id;
    return await this.service.unblock(blockerId, blockedId);
  }
}
