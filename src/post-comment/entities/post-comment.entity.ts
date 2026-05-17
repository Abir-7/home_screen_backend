import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { PostCommentLike } from '../../post-comment-like/entities/post-comment-like.entity';

export enum CommentStatus {
  ACTIVE = 'active',
  DELETED = 'deleted', // soft delete — keeps reply thread intact
  HIDDEN = 'hidden', // moderated
}

@Entity('post_comments')
export class PostComment extends BaseEntity {
  @Index()
  @Column({ name: 'post_id' })
  postId!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  // null = top-level comment, set = reply to a comment
  @Index()
  @Column({ name: 'parent_id', nullable: true })
  parentId!: number;

  @Column({ type: 'text' })
  body!: string;

  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: CommentStatus.ACTIVE,
  })
  status!: CommentStatus;

  // relations
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // self-referencing for nested replies
  @ManyToOne(() => PostComment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id' })
  parent!: PostComment;

  @OneToMany(() => PostComment, (comment) => comment.parent)
  replies!: PostComment[];

  @OneToMany(() => PostCommentLike, (like) => like.comment, { cascade: true })
  likes!: PostCommentLike[];
}
