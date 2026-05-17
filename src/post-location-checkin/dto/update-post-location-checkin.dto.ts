import { PartialType } from '@nestjs/mapped-types';
import { CreatePostLocationCheckinDto } from './create-post-location-checkin.dto';

export class UpdatePostLocationCheckinDto extends PartialType(CreatePostLocationCheckinDto) {}
