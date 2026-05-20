import { Entity, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';

@Entity('post_comment_likes')
@Unique(['comment_id', 'user_id']) // one like per user per comment
export class PostCommentLike extends BaseEntity {
  @Index()
  @Column({ name: 'comment_id' })
  comment_id!: number;

  @Index()
  @Column({ name: 'user_id' })
  user_id!: number;

  // relations
  @ManyToOne(() => PostComment, (comment) => comment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment!: PostComment;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
