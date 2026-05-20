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

  @Column({ name: 'full_name', nullable: true })
  full_name!: string;

  @Column({ name: 'profile_image', nullable: true })
  profile_image!: string;

  @Column({ name: 'user_name', unique: true, nullable: true })
  user_name!: string;

  @Column({ name: 'national_id', unique: true, nullable: true })
  national_id!: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address!: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birth_date!: Date;

  @Column({ name: 'gender', nullable: true })
  gender!: string;

  @OneToOne(() => User, (user: User) => user.profile)
  @JoinColumn()
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
