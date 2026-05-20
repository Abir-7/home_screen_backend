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
  post_id!: number;

  @Column({ name: 'location_checkin_id' })
  locationCheckinId!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  // relations
  @OneToOne(() => Post, (post) => post.post_location_checkin, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => LocationCheckin, (lc) => lc.postLocationCheckins)
  @JoinColumn({ name: 'location_checkin_id' })
  locationCheckin!: LocationCheckin;
}
