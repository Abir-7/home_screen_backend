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

  async findOneByUser(userId: string): Promise<UserAuthentication | null> {
    return await this.userAuthRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userAuthRepository.delete(id);
  }
}
