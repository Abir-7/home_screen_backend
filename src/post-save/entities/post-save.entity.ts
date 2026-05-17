/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
@Unique(['postId', 'userId']) // one save per user per post
export class PostSave {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'post_id' })
  postId!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // relations
  @ManyToOne(() => Post, (post) => post.saves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.savedPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
