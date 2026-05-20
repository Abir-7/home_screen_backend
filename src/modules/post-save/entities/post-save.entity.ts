import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('post_saves')
@Unique(['post_id', 'user_id']) // one save per user per post
export class PostSave {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'post_id' })
  post_id!: number;

  @Index()
  @Column({ name: 'user_id' })
  user_id!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  // relations
  @ManyToOne(() => Post, (post) => post.saves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.savedPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
