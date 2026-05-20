import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { UserReportService } from './user-report.service';
import { UserReportController } from './user-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [UserReportController],
  providers: [UserReportService],
  exports: [UserReportService],
})
export class UserReportModule {}
