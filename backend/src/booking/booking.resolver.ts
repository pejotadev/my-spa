import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NylasService } from '../nylas/nylas.service';
import { SimpleJwtGuard } from '../auth/simple-jwt.guard';
import { Public } from '../auth/public.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { FeatureGuard, RequireFeature } from '../features/guards/feature.guard';

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
      const configurations = await this.nylasService.getConfigurations(providerEmail);
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
    @Args('serviceProviderEmail') serviceProviderEmail: string,
  ) {
    try {
      const availability = await this.nylasService.getAvailability(
        configurationId,
        startTime,
        endTime,
        serviceProviderEmail,
      );
      return JSON.stringify(availability);
    } catch (error) {
      throw new Error(`Failed to fetch availability: ${error.message}`);
    }
  }

  @Mutation(() => String, { name: 'createBooking' })
  @UseGuards(SimpleJwtGuard, FeatureGuard)
  @RequireFeature('BOOK_SERVICE')
  async createBooking(
    @Args('configurationId') configurationId: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
    @Args('customerEmail') customerEmail: string,
    @Args('customerName') customerName: string,
    @Args('serviceProviderEmail') serviceProviderEmail: string,
    @CurrentUser() user: any,
  ) {
    try {
      // The customer (logged-in user) is booking with a specific service provider

      const bookingData = {
        configuration_id: configurationId,
        start_time: Math.floor(new Date(startTime).getTime() / 1000),
        end_time: Math.floor(new Date(endTime).getTime() / 1000),
        participants: [
          {
            email: customerEmail,
            name: customerName,
          }
        ],
        title: `Meeting with ${customerName}`,
        description: `Scheduled appointment with ${customerName}`,
      };

      const booking = await this.nylasService.createBooking(bookingData, serviceProviderEmail);
      return JSON.stringify(booking);
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }
}
