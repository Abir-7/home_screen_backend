import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum AuthType {
  PHONE = 'phone',
  EMAIL = 'email',
  PASSWORD = 'password',
}

@Entity('user_authentications')
export class UserAuthentication {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  otp?: string;

  @Column({
    type: 'enum',
    enum: AuthType,
  })
  type!: AuthType;

  @Column({ nullable: true })
  token?: string;

  @ManyToOne(() => User, (user: User) => user.authentications)
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
