import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_follows')
@Index(['follower_id', 'following_id'], { unique: true })
export class UserFollow extends BaseEntity {
  @Column({ name: 'follower_id' })
  follower_id!: number;

  @Column({ name: 'following_id' })
  following_id!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'follower_id' })
  follower!: User;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'following_id' })
  following!: User;
}
