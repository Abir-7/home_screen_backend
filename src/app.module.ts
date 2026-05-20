import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserAuthenticationModule } from './modules/user-authentication/user-authentication.module';
import { UserPreferenceModule } from './modules/user-preference/user-preference.module';
import { LocationCheckinModule } from './modules/location-checkin/location-checkin.module';
import { PostLocationCheckinModule } from './modules/post-location-checkin/post-location-checkin.module';
import { PostModule } from './modules/post/post.module';
import { PostTaggedUserModule } from './modules/post-tagged-user/post-tagged-user.module';
import { StoryModule } from './modules/story/story.module';
import { StoryViewModule } from './modules/story-view/story-view.module';
import { PostLikeModule } from './modules/post-like/post-like.module';

import { PostSaveModule } from './modules/post-save/post-save.module';
import { PostCommentModule } from './modules/post-comment/post-comment.module';
import { PostCommentLikeModule } from './modules/post-comment-like/post-comment-like.module';
import { UserFollowModule } from './modules/user-follow/user-follow.module';
import { HidePostModule } from './modules/hide-post/hide-post.module';
import { UserDeviceActivityModule } from './modules/user-device-activity/user-device-activity.module';
import { UserSessionModule } from './modules/user-session/user-session.module';
import { TagModule } from './modules/tag/tag.module';
import { PostTagModule } from './modules/post-tag/post-tag.module';
import { MentionModule } from './modules/mention/mention.module';
import { PostAnalyticsModule } from './modules/post-analytics/post-analytics.module';
import { UserBlockListModule } from './modules/user-block-list/user-block-list.module';
import { UserReportModule } from './modules/user-report/user-report.module';
import { CategoryModule } from './modules/category/category.module';
import { InterestModule } from './modules/interest/interest.module';
import { AuthModule } from './modules/auth/auth.module';
import { QueueModule } from './modules/queue/queue.module';
@Module({
  imports: [
    QueueModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    UserProfileModule,
    UserAuthenticationModule,
    UserPreferenceModule,
    LocationCheckinModule,
    PostLocationCheckinModule,
    PostModule,
    PostTaggedUserModule,
    StoryModule,
    StoryViewModule,
    PostLikeModule,
    PostSaveModule,
    PostCommentModule,
    PostCommentLikeModule,
    UserFollowModule,
    HidePostModule,
    UserDeviceActivityModule,
    UserSessionModule,
    TagModule,
    PostTagModule,
    MentionModule,
    PostAnalyticsModule,
    UserBlockListModule,
    UserReportModule,
    CategoryModule,
    InterestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
