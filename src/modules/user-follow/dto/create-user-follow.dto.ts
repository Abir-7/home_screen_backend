import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserFollowDto {
  @IsNumber()
  @IsNotEmpty()
  following_id!: number;
}
