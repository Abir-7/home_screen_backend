export class CreateUserProfileDto {
  full_name!: string;
  profile_image?: string;
  user_name?: string;
  national_id?: string;
  address?: string;
  birth_date?: Date;
  gender?: string;
  userId!: number;
}
