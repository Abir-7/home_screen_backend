import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHiddenPostDto {
  @IsNumber()
  @IsNotEmpty()
  postId!: number;
}
