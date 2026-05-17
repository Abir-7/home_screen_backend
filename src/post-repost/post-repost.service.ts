import { Injectable } from '@nestjs/common';
import { CreatePostRepostDto } from './dto/create-post-repost.dto';
import { UpdatePostRepostDto } from './dto/update-post-repost.dto';

@Injectable()
export class PostRepostService {
  create(createPostRepostDto: CreatePostRepostDto) {
    return 'This action adds a new postRepost';
  }

  findAll() {
    return `This action returns all postRepost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postRepost`;
  }

  update(id: number, updatePostRepostDto: UpdatePostRepostDto) {
    return `This action updates a #${id} postRepost`;
  }

  remove(id: number) {
    return `This action removes a #${id} postRepost`;
  }
}
