import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { SimpleFeaturesResolver } from './simple-features.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FeaturesService, SimpleFeaturesResolver],
  exports: [FeaturesService],
})
export class FeaturesModule {}
