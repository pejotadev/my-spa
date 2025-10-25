import { Module } from '@nestjs/common';
import { NylasService } from './nylas.service';

@Module({
  providers: [NylasService],
  exports: [NylasService],
})
export class NylasModule {}

