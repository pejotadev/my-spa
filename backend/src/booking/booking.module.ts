import { Module } from '@nestjs/common';
import { BookingResolver } from './booking.resolver';
import { NylasModule } from '../nylas/nylas.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [NylasModule, PrismaModule],
  providers: [BookingResolver],
})
export class BookingModule {}
