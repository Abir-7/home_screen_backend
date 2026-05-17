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
@Unique(['storyId', 'viewerUserId']) // one view per user per story
export class StoryView {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'story_id' })
  storyId!: number;

  @Index()
  @Column({ name: 'viewer_user_id' })
  viewerUserId!: number;

  @CreateDateColumn()
  viewedAt!: Date;

  // relations
  @ManyToOne(() => Story, (story) => story.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'story_id' })
  story!: Story;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'viewer_user_id' })
  viewer!: User;
}
