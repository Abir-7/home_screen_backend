import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHiddenPostDto {
  @IsNumber()
  @IsNotEmpty()
  post_id!: number;
}
