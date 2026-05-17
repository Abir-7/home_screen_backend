/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('post_reposts')
@Unique(['postId', 'userId']) // one repost per user per post
export class PostRepost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'post_id' })
  postId!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  // optional caption when reposting (like a quote repost)
  @Column({ type: 'text', nullable: true })
  caption!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;

  // relations
  @ManyToOne(() => Post, (post) => post.reposts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.reposts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
