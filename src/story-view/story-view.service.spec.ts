import { Test, TestingModule } from '@nestjs/testing';
import { StoryViewService } from './story-view.service';

describe('StoryViewService', () => {
  let service: StoryViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryViewService],
    }).compile();

    service = module.get<StoryViewService>(StoryViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
