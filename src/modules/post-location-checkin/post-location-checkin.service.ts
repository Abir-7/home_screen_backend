import { Injectable } from '@nestjs/common';
import { CreatePostLocationCheckinDto } from './dto/create-post-location-checkin.dto';
import { UpdatePostLocationCheckinDto } from './dto/update-post-location-checkin.dto';

@Injectable()
export class PostLocationCheckinService {
  create(createPostLocationCheckinDto: CreatePostLocationCheckinDto) {
    return 'This action adds a new post_location_checkin';
  }

  findAll() {
    return `This action returns all post_location_checkin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post_location_checkin`;
  }

  update(
    id: number,
    updatePostLocationCheckinDto: UpdatePostLocationCheckinDto,
  ) {
    return `This action updates a #${id} post_location_checkin`;
  }

  remove(id: number) {
    return `This action removes a #${id} post_location_checkin`;
  }
}
