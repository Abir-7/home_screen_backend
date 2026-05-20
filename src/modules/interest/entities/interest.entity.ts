import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('interests')
export class Interest extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;
}
