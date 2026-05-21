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
      user: { id: dto.user_id as any },
      interests: dto.interest_ids?.map((id) => ({ id })),
      categories: dto.category_ids?.map((id) => ({ id })),
    } as any);
    return this.userPreferenceRepository.save(preference);
  }

  async update(id: string, dto: UpdateUserPreferenceDto) {
    const preference = await this.findOne(id as any);
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

  remove(id: string) {
    return this.userPreferenceRepository.delete(id);
  }
}
