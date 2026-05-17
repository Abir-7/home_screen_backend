import { IsNotEmpty, IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { ReportReason } from '../entities/report.entity';

export class CreateReportDto {
  @IsNumber()
  @IsOptional()
  post_id?: number;

  @IsNumber()
  @IsOptional()
  comment_id?: number;

  @IsEnum(ReportReason)
  @IsNotEmpty()
  reason!: ReportReason;

  @IsString()
  @IsOptional()
  details?: string;
}
