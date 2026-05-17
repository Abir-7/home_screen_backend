import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';

@Entity('post_comment_likes')
@Unique(['commentId', 'userId']) // one like per user per comment
export class PostCommentLike {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'comment_id' })
  commentId!: number;

  @Index()
  @Column({ name: 'user_id' })
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

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
