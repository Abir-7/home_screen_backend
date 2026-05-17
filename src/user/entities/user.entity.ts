/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { Post } from '../../post/entities/post.entity';
import { Story } from '../../story/entities/story.entity';
import { PostTaggedUser } from '../../post-tagged-user/entities/post-tagged-user.entity';
import { UserPreference } from '../../user-preference/entities/user-preference.entity';
import { UserAuthentication } from '../../user-authentication/entities/user-authentication.entity';
import { PostLike } from '../../post-like/entities/post-like.entity';
import { PostRepost } from '../../post-repost/entities/post-repost.entity';
import { PostSave } from '../../post-save/entities/post-save.entity';
import { PostComment } from '../../post-comment/entities/post-comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ default: false })
  is_verified!: boolean;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile!: UserProfile;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @OneToMany(() => Story, (story) => story.user)
  stories!: Story[];

  @OneToMany(() => PostTaggedUser, (tag) => tag.taggedUser)
  taggedPosts!: PostTaggedUser[];

  @OneToOne(() => UserPreference, (preference) => preference.user)
  preference!: UserPreference;

  @OneToMany(() => UserAuthentication, (auth) => auth.user)
  authentications!: UserAuthentication[];

  @OneToMany(() => PostLike, (like) => like.user)
  likedPosts!: PostLike[];

  @OneToMany(() => PostRepost, (repost) => repost.user)
  reposts!: PostRepost[];

  @OneToMany(() => PostSave, (save) => save.user)
  savedPosts!: PostSave[];

  @OneToMany(() => PostComment, (comment) => comment.user)
  comments!: PostComment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  last_update!: Date;
}
