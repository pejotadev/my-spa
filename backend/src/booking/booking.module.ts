import { Module } from '@nestjs/common';
import { BookingResolver } from './booking.resolver';
import { NylasModule } from '../nylas/nylas.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FeaturesModule } from '../features/features.module';

@Module({
  imports: [NylasModule, PrismaModule, FeaturesModule],
  providers: [BookingResolver],
})
export class BookingModule {}

