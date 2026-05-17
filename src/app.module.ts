import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { LocationCheckinModule } from './location-checkin/location-checkin.module';
import { PostLocationCheckinModule } from './post-location-checkin/post-location-checkin.module';
import { PostModule } from './post/post.module';
import { PostTaggedUserModule } from './post-tagged-user/post-tagged-user.module';
import { StoryModule } from './story/story.module';
import { StoryViewModule } from './story-view/story-view.module';
import { PostLikeModule } from './post-like/post-like.module';

import { PostSaveModule } from './post-save/post-save.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { PostCommentLikeModule } from './post-comment-like/post-comment-like.module';
@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
