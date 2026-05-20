import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Interest])],
  controllers: [InterestController],
  providers: [InterestService],
  exports: [TypeOrmModule, InterestService],
})
export class InterestModule {}
