import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NylasService } from '../nylas/nylas.service';
import { SimpleJwtGuard } from '../auth/simple-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class BookingResolver {
  constructor(
    private readonly nylasService: NylasService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => String, { name: 'getServiceProvidersByCategory' })
  @Public()
  async getServiceProvidersByCategory(@Args('categoryId') categoryId: string) {
    try {
      const serviceProviders = await this.prisma.serviceProviderCategory.findMany({
        where: { categoryId },
        include: {
          serviceProvider: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return JSON.stringify(serviceProviders);
    } catch (error) {
      throw new Error(`Failed to fetch service providers: ${error.message}`);
    }
  }

  @Query(() => String, { name: 'getProviderConfigurations' })
  @Public()
  async getProviderConfigurations(@Args('providerEmail') providerEmail: string) {
    try {
      // For now, we'll get all configurations since we're using a single grant
      // In a real app, you'd filter by provider
      const configurations = await this.nylasService.getConfigurations();
      return JSON.stringify(configurations);
    } catch (error) {
      throw new Error(`Failed to fetch provider configurations: ${error.message}`);
    }
  }

  @Query(() => String, { name: 'getAvailability' })
  @Public()
  async getAvailability(
    @Args('configurationId') configurationId: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
  ) {
    try {
      const availability = await this.nylasService.getAvailability(
        configurationId,
        startTime,
        endTime,
      );
      return JSON.stringify(availability);
    } catch (error) {
      throw new Error(`Failed to fetch availability: ${error.message}`);
    }
  }
}
