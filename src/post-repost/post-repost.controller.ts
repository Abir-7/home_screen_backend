import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostRepostService } from './post-repost.service';
import { CreatePostRepostDto } from './dto/create-post-repost.dto';
import { UpdatePostRepostDto } from './dto/update-post-repost.dto';

@Controller('post-repost')
export class PostRepostController {
  constructor(private readonly postRepostService: PostRepostService) {}

  @Post()
  create(@Body() createPostRepostDto: CreatePostRepostDto) {
    return this.postRepostService.create(createPostRepostDto);
  }

  @Get()
  findAll() {
    return this.postRepostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postRepostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostRepostDto: UpdatePostRepostDto) {
    return this.postRepostService.update(+id, updatePostRepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postRepostService.remove(+id);
  }
}
