import { PartialType } from '@nestjs/mapped-types';
import { CreatePostTaggedUserDto } from './create-post-tagged-user.dto';

export class UpdatePostTaggedUserDto extends PartialType(
  CreatePostTaggedUserDto,
) {}
