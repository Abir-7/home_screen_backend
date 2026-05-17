import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  findAll() {
    return this.userProfileRepository.find();
  }

  async findOne(id: number) {
    const profile = await this.userProfileRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`UserProfile with ID ${id} not found`);
    }
    return profile;
  }

  create(createUserProfileDto: CreateUserProfileDto) {
    const profile = this.userProfileRepository.create(createUserProfileDto);
    return this.userProfileRepository.save(profile);
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, updateUserProfileDto);
    return this.userProfileRepository.save(profile);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return this.userProfileRepository.remove(profile);
  }
}
