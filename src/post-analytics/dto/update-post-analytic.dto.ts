import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePostAnalyticDto {
  @IsNumber()
  @IsNotEmpty()
  post_id!: number;
}
