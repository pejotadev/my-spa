import { Module } from '@nestjs/common';
import { SchedulerResolver } from './scheduler.resolver';
import { NylasModule } from '../nylas/nylas.module';

@Module({
  imports: [NylasModule],
  providers: [SchedulerResolver],
})
export class SchedulerModule {}
