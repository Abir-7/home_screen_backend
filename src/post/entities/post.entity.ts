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
import { Story } from '../../story/entities/story.entity';
import { PostTaggedUser } from '../../post-tagged-user/entities/post-tagged-user.entity';
import { PostLocationCheckin } from '../../post-location-checkin/entities/post-location-checkin.entity';

export enum PostType {
  REEL = 'reel',
  PHOTO = 'photo',
  VIDEO = 'video',
}

export enum PostAudience {
  EVERYONE = 'everyone',
  FRIENDS = 'friends',
  ONLY_ME = 'only_me',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @Column({
    name: 'post_type',
    type: 'enum',
    enum: PostType,
    default: PostType.REEL,
  })
  postType!: PostType;

  @Column({ type: 'text', nullable: true })
  caption!: string;

  @Column({
    name: 'cover_image_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  coverImageUrl!: string;

  @Column({
    type: 'enum',
    enum: PostAudience,
    default: PostAudience.EVERYONE,
  })
  audience!: PostAudience;

  @Column({ name: 'share_to_story', default: false })
  shareToStory!: boolean;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status!: PostStatus;

  @Index()
  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;

  // relations
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => Story, (story) => story.post)
  story!: Story;

  @OneToMany(() => PostTaggedUser, (tag) => tag.post, { cascade: true })
  taggedUsers!: PostTaggedUser[];

  @OneToOne(() => PostLocationCheckin, (pl) => pl.post, { cascade: true })
  postLocationCheckin!: PostLocationCheckin;
}
