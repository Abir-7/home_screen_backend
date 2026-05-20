import { Injectable } from '@nestjs/common';
import { CreatePostTaggedUserDto } from './dto/create-post-tagged-user.dto';
import { UpdatePostTaggedUserDto } from './dto/update-post-tagged-user.dto';

@Injectable()
export class PostTaggedUserService {
  create(createPostTaggedUserDto: CreatePostTaggedUserDto) {
    return 'This action adds a new postTaggedUser';
  }

  findAll() {
    return `This action returns all postTaggedUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postTaggedUser`;
  }

  update(id: number, updatePostTaggedUserDto: UpdatePostTaggedUserDto) {
    return `This action updates a #${id} postTaggedUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} postTaggedUser`;
  }
}
