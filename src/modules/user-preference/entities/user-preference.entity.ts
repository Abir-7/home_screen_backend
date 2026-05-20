import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { Interest } from '../../interest/entities/interest.entity';

@Entity('user_preferences')
export class UserPreference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  user_id!: number;

  @ManyToMany(() => Interest)
  @JoinTable({
    name: 'user_preferences_interests',
    joinColumn: { name: 'user_preference_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'interest_id', referencedColumnName: 'id' },
  })
  interests!: Interest[];

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'user_preferences_categories',
    joinColumn: { name: 'user_preference_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories!: Category[];

  @OneToOne(() => User, (user: User) => user.preference)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
