import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationCheckinDto } from './create-location-checkin.dto';

export class UpdateLocationCheckinDto extends PartialType(CreateLocationCheckinDto) {}
