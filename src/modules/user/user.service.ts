import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmail(
    email: string,
    includePassword = false,
  ): Promise<User | null> {
    if (includePassword) {
      return await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email })
        .getOne();
    }
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByPhone(
    phone: string,
    includePassword = false,
  ): Promise<User | null> {
    if (includePassword) {
      return await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.phone = :phone', { phone })
        .getOne();
    }
    return await this.userRepository.findOne({ where: { phone } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
