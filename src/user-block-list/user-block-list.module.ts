import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBlock } from './entities/user-block.entity';
import { UserBlockService } from './user-block.service';
import { UserBlockController } from './user-block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserBlock])],
  controllers: [UserBlockController],
  providers: [UserBlockService],
  exports: [UserBlockService],
})
export class UserBlockListModule {}
