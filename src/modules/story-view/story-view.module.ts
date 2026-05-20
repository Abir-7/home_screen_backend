import { Module } from '@nestjs/common';
import { StoryViewService } from './story-view.service';
import { StoryViewController } from './story-view.controller';

@Module({
  controllers: [StoryViewController],
  providers: [StoryViewService],
})
export class StoryViewModule {}
