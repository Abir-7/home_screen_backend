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

@Entity('posts')
export class Post extends BaseEntity {
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

  @Index()
  @Column({ name: 'original_post_id', nullable: true })
  originalPostId!: number;

  @Column({ name: 'repost_caption', type: 'text', nullable: true })
  repostCaption!: string;

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
  originalPost!: Post;

  @OneToMany(() => Post, (post) => post.originalPost)
  reposts!: Post[];

  @OneToOne(() => Story, (story) => story.post)
  story!: Story;

  @OneToMany(() => PostTaggedUser, (tag) => tag.post, { cascade: true })
  taggedUsers!: PostTaggedUser[];

  @OneToOne(() => PostLocationCheckin, (pl) => pl.post, { cascade: true })
  postLocationCheckin!: PostLocationCheckin;

  @OneToMany(() => PostLike, (like) => like.post, { cascade: true })
  likes!: PostLike[];

  @OneToMany(() => PostSave, (save) => save.post, { cascade: true })
  saves!: PostSave[];

  @OneToMany(() => PostComment, (comment) => comment.post, { cascade: true })
  comments!: PostComment[];
}
