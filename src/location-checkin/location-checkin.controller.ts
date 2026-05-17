import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationCheckinService } from './location-checkin.service';
import { CreateLocationCheckinDto } from './dto/create-location-checkin.dto';
import { UpdateLocationCheckinDto } from './dto/update-location-checkin.dto';

@Controller('location-checkin')
export class LocationCheckinController {
  constructor(private readonly locationCheckinService: LocationCheckinService) {}

  @Post()
  create(@Body() createLocationCheckinDto: CreateLocationCheckinDto) {
    return this.locationCheckinService.create(createLocationCheckinDto);
  }

  @Get()
  findAll() {
    return this.locationCheckinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationCheckinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationCheckinDto: UpdateLocationCheckinDto) {
    return this.locationCheckinService.update(+id, updateLocationCheckinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationCheckinService.remove(+id);
  }
}
