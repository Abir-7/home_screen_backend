import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserBlockDto {
  @IsNumber()
  @IsNotEmpty()
  blockedId!: number;
}
