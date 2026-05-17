import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostSaveService } from './post-save.service';
import { CreatePostSaveDto } from './dto/create-post-save.dto';
import { UpdatePostSaveDto } from './dto/update-post-save.dto';

@Controller('post-save')
export class PostSaveController {
  constructor(private readonly postSaveService: PostSaveService) {}

  @Post()
  create(@Body() createPostSaveDto: CreatePostSaveDto) {
    return this.postSaveService.create(createPostSaveDto);
  }

  @Get()
  findAll() {
    return this.postSaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postSaveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostSaveDto: UpdatePostSaveDto) {
    return this.postSaveService.update(+id, updatePostSaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postSaveService.remove(+id);
  }
}
