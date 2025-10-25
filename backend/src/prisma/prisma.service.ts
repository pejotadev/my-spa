import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private readonly enableQueryLogs = process.env.NODE_ENV === 'development';

  async onModuleInit() {
    await this.$connect();
    
    if (this.enableQueryLogs) {
      this.logger.debug('🗄️  Database connected with query logging enabled');
    }
  }
}
