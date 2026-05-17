import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostLocationCheckinService } from './post-location-checkin.service';
import { CreatePostLocationCheckinDto } from './dto/create-post-location-checkin.dto';
import { UpdatePostLocationCheckinDto } from './dto/update-post-location-checkin.dto';

@Controller('post-location-checkin')
export class PostLocationCheckinController {
  constructor(private readonly postLocationCheckinService: PostLocationCheckinService) {}

  @Post()
  create(@Body() createPostLocationCheckinDto: CreatePostLocationCheckinDto) {
    return this.postLocationCheckinService.create(createPostLocationCheckinDto);
  }

  @Get()
  findAll() {
    return this.postLocationCheckinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postLocationCheckinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostLocationCheckinDto: UpdatePostLocationCheckinDto) {
    return this.postLocationCheckinService.update(+id, updatePostLocationCheckinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postLocationCheckinService.remove(+id);
  }
}
