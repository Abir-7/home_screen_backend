import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  findAll() {
    return this.userProfileRepository.find();
  }

  findOne(id: number) {
    return this.userProfileRepository.findOneBy({ id });
  }

  create(profileData: Partial<UserProfile>) {
    const profile = this.userProfileRepository.create(profileData);
    return this.userProfileRepository.save(profile);
  }
}
