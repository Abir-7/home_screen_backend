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

  findAll() {
    return this.userAuthRepository.find();
  }

  findOne(id: number) {
    return this.userAuthRepository.findOneBy({ id });
  }

  create(authData: Partial<UserAuthentication>) {
    const auth = this.userAuthRepository.create(authData);
    return this.userAuthRepository.save(auth);
  }
}
