import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UserDeviceActivityService } from './user-device-activity.service';
import { CreateUserDeviceActivityDto } from './dto/create-user-device-activity.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('user-device-activity')
export class UserDeviceActivityController {
  constructor(private readonly service: UserDeviceActivityService) {}

  @Post()
  async log(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUserDeviceActivityDto,
  ) {
    const user_id = req.user.id;
    return await this.service.logActivity(user_id, dto);
  }
}
