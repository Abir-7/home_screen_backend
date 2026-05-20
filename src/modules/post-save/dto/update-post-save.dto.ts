import { PartialType } from '@nestjs/mapped-types';
import { CreatePostSaveDto } from './create-post-save.dto';

export class UpdatePostSaveDto extends PartialType(CreatePostSaveDto) {}
