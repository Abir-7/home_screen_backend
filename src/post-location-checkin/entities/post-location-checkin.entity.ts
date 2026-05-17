/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { LocationCheckin } from '../../location-checkin/entities/location-checkin.entity';

@Entity('post_location_checkins')
export class PostLocationCheckin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'post_id' })
  postId!: number;

  @Column({ name: 'location_checkin_id' })
  locationCheckinId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  // relations
  @OneToOne(() => Post, (post) => post.postLocationCheckin, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => LocationCheckin, (lc) => lc.postLocationCheckins)
  @JoinColumn({ name: 'location_checkin_id' })
  locationCheckin!: LocationCheckin;
}
