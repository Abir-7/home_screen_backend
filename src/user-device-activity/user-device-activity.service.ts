import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDeviceActivity } from './entities/user-device-activity.entity';
import { CreateUserDeviceActivityDto } from './dto/create-user-device-activity.dto';

@Injectable()
export class UserDeviceActivityService {
  constructor(
    @InjectRepository(UserDeviceActivity)
    private readonly repository: Repository<UserDeviceActivity>,
  ) {}

  async logActivity(userId: number, dto: CreateUserDeviceActivityDto) {
    // Prevent duplicate entries for the same user-device-ip
    const existing = await this.repository.findOne({
      where: {
        userId,
        deviceId: dto.deviceId,
        ipAddress: dto.ipAddress,
      },
    });

    if (existing) return existing;

    const activity = this.repository.create({
      userId,
      ...dto,
    });
    return await this.repository.save(activity);
  }

  async findOtherUsersByDeviceOrIp(userId: number, deviceId: string, ipAddress: string) {
    return await this.repository
      .createQueryBuilder('activity')
      .where('activity.userId != :userId', { userId })
      .andWhere('(activity.deviceId = :deviceId OR activity.ipAddress = :ipAddress)', {
        deviceId,
        ipAddress,
      })
      .distinctOn(['activity.userId'])
      .getMany();
  }
}
