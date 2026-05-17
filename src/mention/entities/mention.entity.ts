import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../post/entities/post.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';
import { User } from '../../user/entities/user.entity';

@Entity('mentions')
@Index(['post_id', 'comment_id', 'user_id'], { unique: true })
export class Mention extends BaseEntity {
  @Column({ name: 'post_id', nullable: true })
  post_id?: number;

  @Column({ name: 'comment_id', nullable: true })
  comment_id?: number;

  @Column({ name: 'user_id' })
  user_id!: number;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post?: Post;

  @ManyToOne(() => PostComment, (comment) => comment.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: PostComment;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
