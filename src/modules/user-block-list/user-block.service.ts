import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBlock } from './entities/user-block.entity';
import { CreateUserBlockDto } from './dto/create-user-block.dto';

@Injectable()
export class UserBlockService {
  constructor(
    @InjectRepository(UserBlock)
    private readonly repository: Repository<UserBlock>,
  ) {}

  async block(blockerId: number, dto: CreateUserBlockDto) {
    const block = this.repository.create({
      blockerId,
      blockedId: dto.blockedId,
    });
    return await this.repository.save(block);
  }

  async unblock(blockerId: number, blockedId: number) {
    return await this.repository.delete({ blockerId, blockedId });
  }

  async isBlocked(blockerId: number, blockedId: number) {
    const count = await this.repository.count({
      where: { blockerId, blockedId },
    });
    return count > 0;
  }
}
