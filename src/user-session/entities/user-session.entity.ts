import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_sessions')
export class UserSession extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @Index()
  @Column({ name: 'session_token', unique: true })
  sessionToken!: string;

  @Column({ name: 'device_info', type: 'text', nullable: true })
  deviceInfo!: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress!: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
