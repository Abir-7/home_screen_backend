import { Module } from '@nestjs/common';
import { PostSaveService } from './post-save.service';
import { PostSaveController } from './post-save.controller';

@Module({
  controllers: [PostSaveController],
  providers: [PostSaveService],
})
export class PostSaveModule {}
