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
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name!: string;

  @Column({ name: 'city', type: 'varchar', length: 100, nullable: true })
  city!: string;

  @Column({ name: 'country', type: 'varchar', length: 100, nullable: true })
  country!: string;

  @Index()
  @Column({ name: 'latitude', type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude!: number;

  @Index()
  @Column({ name: 'longitude', type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  // relations
  @OneToMany(() => PostLocationCheckin, (pl) => pl.locationCheckin)
  postLocationCheckins!: PostLocationCheckin[];
}
