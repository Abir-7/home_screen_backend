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

@Entity('post_likes')
@Unique(['post_id', 'user_id']) // one like per user per post
export class PostLike {
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
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.likedPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
