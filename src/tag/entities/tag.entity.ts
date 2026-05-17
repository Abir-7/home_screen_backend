import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { PostTag } from '../../post-tag/entities/post-tag.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Index({ unique: true })
  @Column({ name: 'name', unique: true })
  name!: string;

  @OneToMany(() => PostTag, (postTag) => postTag.tag)
  postTags!: PostTag[];
}
