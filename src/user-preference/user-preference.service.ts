import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreference } from './entities/user-preference.entity';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectRepository(UserPreference)
    private userPreferenceRepository: Repository<UserPreference>,
  ) {}

  findAll() {
    return this.userPreferenceRepository.find();
  }

  findOne(id: number) {
    return this.userPreferenceRepository.findOneBy({ id });
  }

  findByUserId(userId: number) {
    return this.userPreferenceRepository.find({ where: { user_id: userId } });
  }

  create(data: Partial<UserPreference>) {
    const preference = this.userPreferenceRepository.create(data);
    return this.userPreferenceRepository.save(preference);
  }

  async update(id: number, data: Partial<UserPreference>) {
    await this.userPreferenceRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userPreferenceRepository.delete(id);
  }
}
