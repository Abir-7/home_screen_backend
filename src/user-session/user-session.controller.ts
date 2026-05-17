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
    const user_id = req.user.id;
    return await this.service.create(user_id, dto);
  }

  @Get()
  async findActive(@Req() req: AuthenticatedRequest) {
    const user_id = req.user.id;
    return await this.service.findActive(user_id);
  }

  @Delete(':token')
  async revoke(@Param('token') token: string) {
    return await this.service.revoke(token);
  }
}
