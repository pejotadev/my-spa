import { Module } from '@nestjs/common';
import { GardenService } from './garden.service';
import { GardenResolver } from './garden.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GardenService, GardenResolver],
  exports: [GardenService],
})
export class GardenModule {}
