import { Injectable } from '@nestjs/common';
import { CreatePostLocationCheckinDto } from './dto/create-post-location-checkin.dto';
import { UpdatePostLocationCheckinDto } from './dto/update-post-location-checkin.dto';

@Injectable()
export class PostLocationCheckinService {
  create(createPostLocationCheckinDto: CreatePostLocationCheckinDto) {
    return 'This action adds a new postLocationCheckin';
  }

  findAll() {
    return `This action returns all postLocationCheckin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postLocationCheckin`;
  }

  update(
    id: number,
    updatePostLocationCheckinDto: UpdatePostLocationCheckinDto,
  ) {
    return `This action updates a #${id} postLocationCheckin`;
  }

  remove(id: number) {
    return `This action removes a #${id} postLocationCheckin`;
  }
}
