import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rage } from './rage.entity';
import { RageService } from './rage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rage])],
  providers: [RageService],
  exports: [RageService],
})
export class RageModule {}
