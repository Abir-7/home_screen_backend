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

  async hide(user_id: number, createHiddenPostDto: CreateHiddenPostDto) {
    const hiddenPost = this.hiddenPostRepository.create({
      user_id,
      post_id: createHiddenPostDto.post_id,
    });
    return await this.hiddenPostRepository.save(hiddenPost);
  }

  async unhide(user_id: number, post_id: number) {
    return await this.hiddenPostRepository.softDelete({
      user_id,
      post_id,
    });
  }
}
