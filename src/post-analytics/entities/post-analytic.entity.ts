import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('post_analytics')
export class PostAnalytic extends BaseEntity {
  @Column({ name: 'post_id' })
  post_id!: number;

  @Column({ name: 'view_count', default: 0 })
  view_count!: number;

  @Column({ name: 'like_count', default: 0 })
  like_count!: number;

  @Column({ name: 'comment_count', default: 0 })
  comment_count!: number;

  @Column({ name: 'share_count', default: 0 })
  share_count!: number;

  @Column({ name: 'save_count', default: 0 })
  save_count!: number;

  @OneToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
