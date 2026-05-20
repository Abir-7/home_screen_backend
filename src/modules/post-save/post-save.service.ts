import { Injectable } from '@nestjs/common';
import { CreatePostSaveDto } from './dto/create-post-save.dto';
import { UpdatePostSaveDto } from './dto/update-post-save.dto';

@Injectable()
export class PostSaveService {
  create(createPostSaveDto: CreatePostSaveDto) {
    return 'This action adds a new postSave';
  }

  findAll() {
    return `This action returns all postSave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postSave`;
  }

  update(id: number, updatePostSaveDto: UpdatePostSaveDto) {
    return `This action updates a #${id} postSave`;
  }

  remove(id: number) {
    return `This action removes a #${id} postSave`;
  }
}
