/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { StoryView } from '../../story-view/entities/story-view.entity';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  // nullable: story can exist without a feed post (story-only content)
  @Column({ name: 'post_id', nullable: true })
  postId!: number;

  @Index()
  @Column({
    name: 'expires_at',
    type: 'timestamptz',
    default: () => `NOW() + INTERVAL '24 hours'`,
  })
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;

  // relations
  @ManyToOne(() => User, (user) => user.stories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => Post, (post) => post.story, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @OneToMany(() => StoryView, (view) => view.story, { cascade: true })
  views!: StoryView[];
}
