import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthenticationService } from './user-authentication.service';
import { UserAuthenticationController } from './user-authentication.controller';
import { UserAuthentication } from './entities/user-authentication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuthentication])],
  providers: [UserAuthenticationService],
  controllers: [UserAuthenticationController],
  exports: [UserAuthenticationService],
})
export class UserAuthenticationModule {}
