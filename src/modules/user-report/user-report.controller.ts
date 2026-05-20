import { Controller, Post, Body, Req } from '@nestjs/common';
import { UserReportService } from './user-report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('user-report')
export class UserReportController {
  constructor(private readonly service: UserReportService) {}

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateReportDto) {
    const reporterId = req.user.id;
    return await this.service.create(reporterId, dto);
  }
}
