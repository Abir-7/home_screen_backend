import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../post/entities/post.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity('post_tags')
@Index(['postId', 'tagId'], { unique: true })
export class PostTag extends BaseEntity {
  @Column({ name: 'post_id' })
  postId!: number;

  @Column({ name: 'tag_id' })
  tagId!: number;

  @ManyToOne(() => Post, (post) => post.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag;
}
