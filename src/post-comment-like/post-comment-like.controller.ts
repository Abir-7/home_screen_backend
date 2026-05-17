import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostCommentLikeService } from './post-comment-like.service';
import { CreatePostCommentLikeDto } from './dto/create-post-comment-like.dto';
import { UpdatePostCommentLikeDto } from './dto/update-post-comment-like.dto';

@Controller('post-comment-like')
export class PostCommentLikeController {
  constructor(
    private readonly postCommentLikeService: PostCommentLikeService,
  ) {}

  @Post()
  create(@Body() createPostCommentLikeDto: CreatePostCommentLikeDto) {
    return this.postCommentLikeService.create(createPostCommentLikeDto);
  }

  @Get()
  findAll() {
    return this.postCommentLikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postCommentLikeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostCommentLikeDto: UpdatePostCommentLikeDto,
  ) {
    return this.postCommentLikeService.update(+id, updatePostCommentLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCommentLikeService.remove(+id);
  }
}
