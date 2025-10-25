import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GardenService } from './garden.service';
import { Environment } from './entities/environment.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
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
}
