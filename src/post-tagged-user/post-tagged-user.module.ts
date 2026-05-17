import { Module } from '@nestjs/common';
import { PostTaggedUserService } from './post-tagged-user.service';
import { PostTaggedUserController } from './post-tagged-user.controller';

@Module({
  controllers: [PostTaggedUserController],
  providers: [PostTaggedUserService],
})
export class PostTaggedUserModule {}
