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

@Entity('post_tagged_users')
@Unique(['post_id', 'tagged_user_id']) // can't tag same user twice on a post
export class PostTaggedUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'post_id' })
  post_id!: number;

  @Index()
  @Column({ name: 'tagged_user_id' })
  tagged_user_id!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // relations
  @ManyToOne(() => Post, (post) => post.tagged_users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.taggedPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagged_user_id' })
  taggedUser!: User;
}
