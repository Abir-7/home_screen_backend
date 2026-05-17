import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './entities/user-session.entity';
import { UserSessionService } from './user-session.service';
import { UserSessionController } from './user-session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  controllers: [UserSessionController],
  providers: [UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
