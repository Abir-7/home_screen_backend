import { Test, TestingModule } from '@nestjs/testing';
import { PostTaggedUserController } from './post-tagged-user.controller';
import { PostTaggedUserService } from './post-tagged-user.service';

describe('PostTaggedUserController', () => {
  let controller: PostTaggedUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTaggedUserController],
      providers: [PostTaggedUserService],
    }).compile();

    controller = module.get<PostTaggedUserController>(PostTaggedUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
