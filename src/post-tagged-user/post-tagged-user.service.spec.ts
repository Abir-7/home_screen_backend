import { Test, TestingModule } from '@nestjs/testing';
import { PostTaggedUserService } from './post-tagged-user.service';

describe('PostTaggedUserService', () => {
  let service: PostTaggedUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTaggedUserService],
    }).compile();

    service = module.get<PostTaggedUserService>(PostTaggedUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
