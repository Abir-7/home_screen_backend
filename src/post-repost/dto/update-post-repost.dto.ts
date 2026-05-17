import { PartialType } from '@nestjs/mapped-types';
import { CreatePostRepostDto } from './create-post-repost.dto';

export class UpdatePostRepostDto extends PartialType(CreatePostRepostDto) {}
