import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { PostLocationCheckin } from '../../post-location-checkin/entities/post-location-checkin.entity';

@Entity('location_checkins')
export class LocationCheckin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country!: string;

  @Index()
  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude!: number;

  @Index()
  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;

  // relations
  @OneToMany(() => PostLocationCheckin, (pl) => pl.locationCheckin)
  postLocationCheckins!: PostLocationCheckin[];
}
