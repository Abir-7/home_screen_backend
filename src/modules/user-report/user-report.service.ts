import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class UserReportService {
  constructor(
    @InjectRepository(Report)
    private readonly repository: Repository<Report>,
  ) {}

  async create(reporterId: number, dto: CreateReportDto) {
    const report = this.repository.create({
      reporterId,
      ...dto,
    });
    return await this.repository.save(report);
  }
}
