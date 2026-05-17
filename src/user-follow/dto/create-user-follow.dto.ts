import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserFollowDto {
  @IsNumber()
  @IsNotEmpty()
  followingId!: number;
}
