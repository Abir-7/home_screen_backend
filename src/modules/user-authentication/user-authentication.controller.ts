import { Controller, Get, Param } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';

@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(private readonly userAuthService: UserAuthenticationService) {}

  @Get()
  findAll() {
    return this.userAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAuthService.findOne(+id);
  }
}
