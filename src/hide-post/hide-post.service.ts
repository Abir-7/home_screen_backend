import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HiddenPost } from './entities/hidden-post.entity';
import { CreateHiddenPostDto } from './dto/create-hidden-post.dto';

@Injectable()
export class HidePostService {
  constructor(
    @InjectRepository(HiddenPost)
    private readonly hiddenPostRepository: Repository<HiddenPost>,
  ) {}

  async hide(userId: number, createHiddenPostDto: CreateHiddenPostDto) {
    const hiddenPost = this.hiddenPostRepository.create({
      userId,
      postId: createHiddenPostDto.postId,
    });
    return await this.hiddenPostRepository.save(hiddenPost);
  }

  async unhide(userId: number, postId: number) {
    return await this.hiddenPostRepository.softDelete({
      userId,
      postId,
    });
  }
}
