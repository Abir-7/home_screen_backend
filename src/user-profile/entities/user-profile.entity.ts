import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  full_name!: string;

  @Column({ nullable: true })
  profile_image!: string;

  @Column({ unique: true, nullable: true })
  user_name!: string;

  @Column({ unique: true, nullable: true })
  national_id!: string;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'date', nullable: true })
  birth_date!: Date;

  @Column({ nullable: true })
  gender!: string;

  @OneToOne(() => User, (user: User) => user.profile)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;
}
