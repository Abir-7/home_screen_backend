import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostTaggedUserService } from './post-tagged-user.service';
import { CreatePostTaggedUserDto } from './dto/create-post-tagged-user.dto';
import { UpdatePostTaggedUserDto } from './dto/update-post-tagged-user.dto';

@Controller('post-tagged-user')
export class PostTaggedUserController {
  constructor(private readonly postTaggedUserService: PostTaggedUserService) {}

  @Post()
  create(@Body() createPostTaggedUserDto: CreatePostTaggedUserDto) {
    return this.postTaggedUserService.create(createPostTaggedUserDto);
  }

  @Get()
  findAll() {
    return this.postTaggedUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postTaggedUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostTaggedUserDto: UpdatePostTaggedUserDto) {
    return this.postTaggedUserService.update(+id, updatePostTaggedUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postTaggedUserService.remove(+id);
  }
}
