import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Story } from '../../story/entities/story.entity';

@Entity('story_views')
@Unique(['story_id', 'viewer_user_id']) // one view per user per story
export class StoryView {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'story_id' })
  story_id!: number;

  @Index()
  @Column({ name: 'viewer_user_id' })
  viewer_user_id!: number;

  @CreateDateColumn({ name: 'viewed_at' })
  viewed_at!: Date;

  // relations
  @ManyToOne(() => Story, (story) => story.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'story_id' })
  story!: Story;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'viewer_user_id' })
  viewer!: User;
}
