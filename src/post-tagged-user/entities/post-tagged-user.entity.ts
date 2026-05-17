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
@Unique(['postId', 'taggedUserId']) // can't tag same user twice on a post
export class PostTaggedUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'post_id' })
  postId!: number;

  @Index()
  @Column({ name: 'tagged_user_id' })
  taggedUserId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;

  // relations
  @ManyToOne(() => Post, (post) => post.taggedUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.taggedPosts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagged_user_id' })
  taggedUser!: User;
}
