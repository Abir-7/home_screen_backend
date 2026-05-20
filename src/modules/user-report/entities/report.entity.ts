import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';

export enum ReportReason {
  SPAM = 'spam',
  INAPPROPRIATE = 'inappropriate',
  HARASSMENT = 'harassment',
  OTHER = 'other',
}

export enum ReportStatus {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  RESOLVED = 'resolved',
}

@Entity('reports')
export class Report extends BaseEntity {
  @Column({ name: 'reporter_id' })
  reporterId!: number;

  @Column({ name: 'post_id', nullable: true })
  post_id?: number;

  @Column({ name: 'comment_id', nullable: true })
  comment_id?: number;

  @Column({ name: 'reason', type: 'enum', enum: ReportReason })
  reason!: ReportReason;

  @Column({ name: 'details', type: 'text', nullable: true })
  details?: string;

  @Column({ name: 'status', type: 'enum', enum: ReportStatus, default: ReportStatus.PENDING })
  status!: ReportStatus;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reporter_id' })
  reporter!: User;

  @ManyToOne(() => Post, (post) => post.id, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post?: Post;

  @ManyToOne(() => PostComment, (comment) => comment.id, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment?: PostComment;
}
