import { Test, TestingModule } from '@nestjs/testing';
import { StoryViewController } from './story-view.controller';
import { StoryViewService } from './story-view.service';

describe('StoryViewController', () => {
  let controller: StoryViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryViewController],
      providers: [StoryViewService],
    }).compile();

    controller = module.get<StoryViewController>(StoryViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
