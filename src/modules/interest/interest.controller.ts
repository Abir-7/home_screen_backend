import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { Interest } from './entities/interest.entity';

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  create(@Body() data: Partial<Interest>) {
    return this.interestService.create(data);
  }

  @Get()
  findAll() {
    return this.interestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Interest>) {
    return this.interestService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
