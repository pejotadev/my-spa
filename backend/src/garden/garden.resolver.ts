import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GardenService } from './garden.service';
import { Environment } from './entities/environment.entity';
import { Light } from './entities/light.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { SimpleJwtGuard } from '../auth/simple-jwt.guard';

@Resolver(() => Environment)
@UseGuards(SimpleJwtGuard, RolesGuard)
@Roles('CUSTOMER')
export class GardenResolver {
  constructor(private readonly gardenService: GardenService) {}

  @Query(() => [Environment])
  async getMyEnvironments(@CurrentUser() user: any): Promise<Environment[]> {
    return this.gardenService.getAllEnvironmentsByUser(user.userId);
  }

  @Query(() => Environment)
  async getEnvironment(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: any
  ): Promise<Environment> {
    return this.gardenService.getEnvironmentById(id, user.userId);
  }

  @Mutation(() => Environment)
  async createEnvironment(
    @Args('input') input: CreateEnvironmentDto,
    @CurrentUser() user: any
  ): Promise<Environment> {
    return this.gardenService.createEnvironment(input, user.userId);
  }

  @Mutation(() => Environment)
  async updateEnvironment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateEnvironmentDto,
    @CurrentUser() user: any
  ): Promise<Environment> {
    return this.gardenService.updateEnvironment(id, input, user.userId);
  }

  @Mutation(() => Environment)
  async deleteEnvironment(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: any
  ): Promise<Environment> {
    return this.gardenService.deleteEnvironment(id, user.userId);
  }

  // Light Management
  @Query(() => [Light])
  async getLightsByEnvironment(
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<Light[]> {
    return this.gardenService.getLightsByEnvironment(environmentId, user.userId);
  }

  @Mutation(() => Light)
  async createLight(
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: CreateLightDto,
    @CurrentUser() user: any
  ): Promise<Light> {
    return this.gardenService.createLight(environmentId, input, user.userId);
  }

  @Mutation(() => Light)
  async updateLight(
    @Args('lightId', { type: () => ID }) lightId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: UpdateLightDto,
    @CurrentUser() user: any
  ): Promise<Light> {
    return this.gardenService.updateLight(lightId, environmentId, input, user.userId);
  }

  @Mutation(() => Light)
  async deleteLight(
    @Args('lightId', { type: () => ID }) lightId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<Light> {
    return this.gardenService.deleteLight(lightId, environmentId, user.userId);
  }
}
