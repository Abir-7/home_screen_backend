import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoryViewService } from './story-view.service';
import { CreateStoryViewDto } from './dto/create-story-view.dto';
import { UpdateStoryViewDto } from './dto/update-story-view.dto';

@Controller('story-view')
export class StoryViewController {
  constructor(private readonly storyViewService: StoryViewService) {}

  @Post()
  create(@Body() createStoryViewDto: CreateStoryViewDto) {
    return this.storyViewService.create(createStoryViewDto);
  }

  @Get()
  findAll() {
    return this.storyViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storyViewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoryViewDto: UpdateStoryViewDto,
  ) {
    return this.storyViewService.update(+id, updateStoryViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyViewService.remove(+id);
  }
}
