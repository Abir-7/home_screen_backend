// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { UserAuthentication } from '../../user-authentication/entities/user-authentication.entity';
import { UserPreference } from '../../user-preference/entities/user-preference.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ default: false })
  is_verified!: boolean;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile!: UserProfile;

  @OneToOne(() => UserPreference, (preference) => preference.user)
  preference!: UserPreference;

  @OneToMany(() => UserAuthentication, (auth) => auth.user)
  authentications!: UserAuthentication[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;
}
