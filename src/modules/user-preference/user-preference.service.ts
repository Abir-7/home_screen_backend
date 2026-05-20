import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreference } from './entities/user-preference.entity';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectRepository(UserPreference)
    private userPreferenceRepository: Repository<UserPreference>,
  ) {}

  findAll() {
    return this.userPreferenceRepository.find({
      relations: ['interests', 'categories'],
    });
  }

  findOne(id: number) {
    return this.userPreferenceRepository.findOne({
      where: { id },
      relations: ['interests', 'categories'],
    });
  }

  findByUserId(user_id: number) {
    return this.userPreferenceRepository.find({
      where: { user_id: user_id },
      relations: ['interests', 'categories'],
    });
  }

  async create(dto: CreateUserPreferenceDto) {
    const preference = this.userPreferenceRepository.create({
      user_id: dto.user_id,
      interests: dto.interest_ids?.map((id) => ({ id })),
      categories: dto.category_ids?.map((id) => ({ id })),
    });
    return this.userPreferenceRepository.save(preference);
  }

  async update(id: number, dto: UpdateUserPreferenceDto) {
    const preference = await this.findOne(id);
    if (!preference) {
      throw new NotFoundException(`UserPreference with ID ${id} not found`);
    }

    if (dto.interest_ids) {
      preference.interests = dto.interest_ids.map((id) => ({ id }) as any);
    }
    if (dto.category_ids) {
      preference.categories = dto.category_ids.map((id) => ({ id }) as any);
    }
    if (dto.user_id) {
      preference.user_id = dto.user_id;
    }

    return this.userPreferenceRepository.save(preference);
  }

  remove(id: number) {
    return this.userPreferenceRepository.delete(id);
  }
}
