import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSession } from './entities/user-session.entity';
import { CreateUserSessionDto } from './dto/create-user-session.dto';

@Injectable()
export class UserSessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly repository: Repository<UserSession>,
  ) {}

  async create(userId: number, dto: CreateUserSessionDto) {
    const session = this.repository.create({
      userId,
      ...dto,
      expiresAt: new Date(dto.expiresAt),
    });
    return await this.repository.save(session);
  }

  async findActive(userId: number) {
    return await this.repository.find({
      where: { userId },
    });
  }

  async revoke(sessionToken: string) {
    return await this.repository.softDelete({ sessionToken });
  }
}
