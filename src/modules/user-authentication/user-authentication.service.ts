import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthentication } from './entities/user-authentication.entity';

@Injectable()
export class UserAuthenticationService {
  constructor(
    @InjectRepository(UserAuthentication)
    private userAuthRepository: Repository<UserAuthentication>,
  ) {}

  async findAll(): Promise<UserAuthentication[]> {
    return await this.userAuthRepository.find();
  }

  async findOne(id: number): Promise<UserAuthentication | null> {
    return await this.userAuthRepository.findOneBy({ id });
  }

  async create(
    authData: Partial<UserAuthentication>,
  ): Promise<UserAuthentication> {
    const auth = this.userAuthRepository.create(authData);
    return await this.userAuthRepository.save(auth);
  }
}
