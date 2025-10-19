import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NylasService } from '../nylas/nylas.service';
import { SimpleJwtGuard } from '../auth/simple-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver()
@UseGuards(SimpleJwtGuard, RolesGuard)
@Roles('SERVICE_PROVIDER')
export class SchedulerResolver {
  constructor(private readonly nylasService: NylasService) {}

  // Configuration Queries
  @Query(() => String, { name: 'getMyConfigurations' })
  async getMyConfigurations(@CurrentUser() user: any) {
    try {
      const configurations = await this.nylasService.getConfigurations();
      return JSON.stringify(configurations);
    } catch (error) {
      throw new Error(`Failed to fetch configurations: ${error.message}`);
    }
  }

  @Query(() => String, { name: 'getConfiguration' })
  async getConfiguration(
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      const configuration = await this.nylasService.getConfiguration(configurationId);
      return JSON.stringify(configuration);
    } catch (error) {
      throw new Error(`Failed to fetch configuration: ${error.message}`);
    }
  }

  // Configuration Mutations
  @Mutation(() => String, { name: 'createConfiguration' })
  async createConfiguration(
    @Args('configurationData') configurationData: string,
    @CurrentUser() user: any
  ) {
    try {
      const parsedData = JSON.parse(configurationData);
      const configuration = await this.nylasService.createConfiguration(parsedData);
      return JSON.stringify(configuration);
    } catch (error) {
      throw new Error(`Failed to create configuration: ${error.message}`);
    }
  }

  @Mutation(() => String, { name: 'updateConfiguration' })
  async updateConfiguration(
    @Args('configurationId') configurationId: string,
    @Args('configurationData') configurationData: string,
    @CurrentUser() user: any
  ) {
    try {
      const parsedData = JSON.parse(configurationData);
      const configuration = await this.nylasService.updateConfiguration(configurationId, parsedData);
      return JSON.stringify(configuration);
    } catch (error) {
      throw new Error(`Failed to update configuration: ${error.message}`);
    }
  }

  @Mutation(() => Boolean, { name: 'deleteConfiguration' })
  async deleteConfiguration(
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.nylasService.deleteConfiguration(configurationId);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete configuration: ${error.message}`);
    }
  }

  // Booking Queries
  @Query(() => String, { name: 'getMyBookings' })
  async getMyBookings(
    @Args('configurationId') configurationId: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @CurrentUser() user: any,
    @Args('pageToken', { nullable: true }) pageToken?: string
  ) {
    try {
      const bookings = await this.nylasService.getBookings(configurationId, limit, pageToken);
      return JSON.stringify(bookings);
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }

  @Query(() => String, { name: 'getBooking' })
  async getBooking(
    @Args('bookingId') bookingId: string,
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      const booking = await this.nylasService.getBooking(bookingId, configurationId);
      return JSON.stringify(booking);
    } catch (error) {
      throw new Error(`Failed to fetch booking: ${error.message}`);
    }
  }

  // Booking Mutations
  @Mutation(() => String, { name: 'updateBooking' })
  async updateBooking(
    @Args('bookingId') bookingId: string,
    @Args('configurationId') configurationId: string,
    @Args('bookingData') bookingData: string,
    @CurrentUser() user: any
  ) {
    try {
      const parsedData = JSON.parse(bookingData);
      const booking = await this.nylasService.updateBooking(bookingId, configurationId, parsedData);
      return JSON.stringify(booking);
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }

  @Mutation(() => String, { name: 'confirmBooking' })
  async confirmBooking(
    @Args('bookingId') bookingId: string,
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      const booking = await this.nylasService.confirmBooking(bookingId, configurationId);
      return JSON.stringify(booking);
    } catch (error) {
      throw new Error(`Failed to confirm booking: ${error.message}`);
    }
  }

  @Mutation(() => String, { name: 'cancelBooking' })
  async cancelBooking(
    @Args('bookingId') bookingId: string,
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      const booking = await this.nylasService.cancelBooking(bookingId, configurationId);
      return JSON.stringify(booking);
    } catch (error) {
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  }

  @Mutation(() => Boolean, { name: 'deleteBooking' })
  async deleteBooking(
    @Args('bookingId') bookingId: string,
    @Args('configurationId') configurationId: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.nylasService.deleteBooking(bookingId, configurationId);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete booking: ${error.message}`);
    }
  }

  // Availability Queries
  @Query(() => String, { name: 'getAvailability' })
  async getAvailability(
    @Args('configurationId') configurationId: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
    @CurrentUser() user: any
  ) {
    try {
      const availability = await this.nylasService.getAvailability(configurationId, startTime, endTime);
      return JSON.stringify(availability);
    } catch (error) {
      throw new Error(`Failed to fetch availability: ${error.message}`);
    }
  }
}
