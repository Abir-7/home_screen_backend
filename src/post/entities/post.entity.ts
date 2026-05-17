import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Story } from '../../story/entities/story.entity';
import { PostTaggedUser } from '../../post-tagged-user/entities/post-tagged-user.entity';
import { PostLocationCheckin } from '../../post-location-checkin/entities/post-location-checkin.entity';
import { PostLike } from '../../post-like/entities/post-like.entity';
import { PostSave } from '../../post-save/entities/post-save.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';

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

export enum ContentType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('posts')
export class Post extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  user_id!: number;

  @Column({
    name: 'post_type',
    type: 'enum',
    enum: PostType,
    default: PostType.REEL,
  })
  post_type!: PostType;

  @Column({ name: 'caption', type: 'text', nullable: true })
  caption!: string;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  image_url!: string;

  @Column({ name: 'video_url', type: 'varchar', length: 500, nullable: true })
  video_url!: string;

  @Column({
    name: 'content_type',
    type: 'enum',
    enum: ContentType,
    nullable: true,
  })
  content_type!: ContentType;

  @Column({ name: 'allow_comments', default: true })
  allow_comments!: boolean;

  @Column({
    name: 'cover_image_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  cover_image_url!: string;

  @Column({
    name: 'audience',
    type: 'enum',
    enum: PostAudience,
    default: PostAudience.EVERYONE,
  })
  audience!: PostAudience;

  @Column({ name: 'share_to_story', default: false })
  share_to_story!: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status!: PostStatus;

  @Index()
  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  published_at!: Date;

  @Index()
  @Column({ name: 'original_post_id', nullable: true })
  original_post_id!: number;

  @Column({ name: 'repost_caption', type: 'text', nullable: true })
  repost_caption!: string;

  // ─── Relations ───────────────────────────────────────────────

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // self-referencing repost
  @ManyToOne(() => Post, (post) => post.reposts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'original_post_id' })
  original_post!: Post;

  @OneToMany(() => Post, (post) => post.original_post)
  reposts!: Post[];

  @OneToOne(() => Story, (story) => story.post)
  story!: Story;

  @OneToMany(() => PostTaggedUser, (tag) => tag.post, { cascade: true })
  tagged_users!: PostTaggedUser[];

  @OneToOne(() => PostLocationCheckin, (pl) => pl.post, { cascade: true })
  post_location_checkin!: PostLocationCheckin;

  @OneToMany(() => PostLike, (like) => like.post, { cascade: true })
  likes!: PostLike[];

  @OneToMany(() => PostSave, (save) => save.post, { cascade: true })
  saves!: PostSave[];

  @OneToMany(() => PostComment, (comment) => comment.post, { cascade: true })
  comments!: PostComment[];
}
