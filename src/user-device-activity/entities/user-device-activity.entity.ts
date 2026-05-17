import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_device_activities')
@Index(['user_id', 'deviceId'])
@Index(['ipAddress'])
export class UserDeviceActivity extends BaseEntity {
  @Column({ name: 'user_id' })
  user_id!: number;

  @Column({ name: 'device_id' })
  deviceId!: string;

  @Column({ name: 'ip_address' })
  ipAddress!: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
