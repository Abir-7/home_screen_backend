import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  findAll() {
    return this.interestRepository.find();
  }

  async findOne(id: string) {
    return this.interestRepository.findOneBy({ id: id as any });
  }

  create(data: Partial<Interest>) {
    const interest = this.interestRepository.create(data);
    return this.interestRepository.save(interest);
  }

  async update(id: string, data: Partial<Interest>) {
    await this.interestRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.interestRepository.delete(id);
  }
}
