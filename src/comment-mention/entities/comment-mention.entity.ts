import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';
import { User } from '../../user/entities/user.entity';

@Entity('comment_mentions')
@Index(['comment_id', 'user_id'], { unique: true })
export class CommentMention extends BaseEntity {
  @Column({ name: 'comment_id' })
  comment_id!: number;

  @Column({ name: 'user_id' })
  user_id!: number;

  @ManyToOne(() => PostComment, (comment) => comment.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment!: PostComment;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
