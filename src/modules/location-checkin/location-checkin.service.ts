import { Injectable } from '@nestjs/common';
import { CreateLocationCheckinDto } from './dto/create-location-checkin.dto';
import { UpdateLocationCheckinDto } from './dto/update-location-checkin.dto';

@Injectable()
export class LocationCheckinService {
  create(createLocationCheckinDto: CreateLocationCheckinDto) {
    return 'This action adds a new locationCheckin';
  }

  findAll() {
    return `This action returns all locationCheckin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationCheckin`;
  }

  update(id: number, updateLocationCheckinDto: UpdateLocationCheckinDto) {
    return `This action updates a #${id} locationCheckin`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationCheckin`;
  }
}
