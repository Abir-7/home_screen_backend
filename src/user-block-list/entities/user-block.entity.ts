import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_blocks')
@Index(['blockerId', 'blockedId'], { unique: true })
export class UserBlock extends BaseEntity {
  @Column({ name: 'blocker_id' })
  blockerId!: number;

  @Column({ name: 'blocked_id' })
  blockedId!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blocker_id' })
  blocker!: User;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blocked_id' })
  blocked!: User;
}
