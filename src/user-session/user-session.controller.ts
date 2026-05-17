import { Controller, Post, Body, Delete, Param, Get, Req } from '@nestjs/common';
import { UserSessionService } from './user-session.service';
import { CreateUserSessionDto } from './dto/create-user-session.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('user-session')
export class UserSessionController {
  constructor(private readonly service: UserSessionService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUserSessionDto,
  ) {
    const userId = req.user.id;
    return await this.service.create(userId, dto);
  }

  @Get()
  async findActive(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return await this.service.findActive(userId);
  }

  @Delete(':token')
  async revoke(@Param('token') token: string) {
    return await this.service.revoke(token);
  }
}
