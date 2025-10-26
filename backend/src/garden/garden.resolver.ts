import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GardenService } from './garden.service';
import { Environment } from './entities/environment.entity';
import { Light } from './entities/light.entity';
import { Plant } from './entities/plant.entity';
import { Genetics } from './entities/genetics.entity';
import { PlantHistory } from './entities/plant-history.entity';
import { PlantHistoryType } from './entities/plant-history-type.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { CreateGeneticsDto } from './dto/create-genetics.dto';
import { UpdateGeneticsDto } from './dto/update-genetics.dto';
import { CreatePlantHistoryDto } from './dto/create-plant-history.dto';
import { UpdatePlantStageDto } from './dto/update-plant-stage.dto';
import { UpdatePlantHistoryDto } from './dto/update-plant-history.dto';
import { CreatePlantHistoryTypeDto } from './dto/plant-history-type.dto';
import { UpdatePlantHistoryTypeDto } from './dto/plant-history-type.dto';
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

  // Genetics Management
  @Query(() => [Genetics])
  async getAllGenetics(): Promise<Genetics[]> {
    return this.gardenService.getAllGenetics();
  }

  @Query(() => Genetics)
  async getGeneticsById(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Genetics> {
    return this.gardenService.getGeneticsById(id);
  }

  @Mutation(() => Genetics)
  async createGenetics(
    @Args('input') input: CreateGeneticsDto
  ): Promise<Genetics> {
    return this.gardenService.createGenetics(input);
  }

  @Mutation(() => Genetics)
  async updateGenetics(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateGeneticsDto
  ): Promise<Genetics> {
    return this.gardenService.updateGenetics(id, input);
  }

  @Mutation(() => Genetics)
  async deleteGenetics(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Genetics> {
    return this.gardenService.deleteGenetics(id);
  }

  // Plant Management
  @Query(() => [Plant])
  async getPlantsByEnvironment(
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<Plant[]> {
    return this.gardenService.getPlantsByEnvironment(environmentId, user.userId);
  }

  @Query(() => Plant)
  async getPlantById(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<Plant> {
    return this.gardenService.getPlantById(plantId, environmentId, user.userId);
  }

  @Mutation(() => Plant)
  async createPlant(
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: CreatePlantDto,
    @CurrentUser() user: any
  ): Promise<Plant> {
    return this.gardenService.createPlant(environmentId, input, user.userId);
  }

  @Mutation(() => Plant)
  async updatePlant(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: UpdatePlantDto,
    @CurrentUser() user: any
  ): Promise<Plant> {
    return this.gardenService.updatePlant(plantId, environmentId, input, user.userId);
  }

  @Mutation(() => Plant)
  async deletePlant(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<Plant> {
    return this.gardenService.deletePlant(plantId, environmentId, user.userId);
  }

  // Plant History Management
  @Query(() => [PlantHistory])
  async getPlantHistory(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<PlantHistory[]> {
    return this.gardenService.getPlantHistory(plantId, environmentId, user.userId);
  }

  @Mutation(() => PlantHistory)
  async createPlantHistory(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: CreatePlantHistoryDto,
    @CurrentUser() user: any
  ): Promise<PlantHistory> {
    return this.gardenService.createPlantHistory(plantId, environmentId, input, user.userId);
  }

  @Mutation(() => Plant)
  async updatePlantStage(
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: UpdatePlantStageDto,
    @CurrentUser() user: any
  ): Promise<Plant> {
    return this.gardenService.updatePlantStage(plantId, environmentId, input, user.userId);
  }

  @Mutation(() => PlantHistory)
  async updatePlantHistory(
    @Args('historyId', { type: () => ID }) historyId: string,
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @Args('input') input: UpdatePlantHistoryDto,
    @CurrentUser() user: any
  ): Promise<PlantHistory> {
    return this.gardenService.updatePlantHistory(historyId, plantId, environmentId, input, user.userId);
  }

  @Mutation(() => Boolean)
  async deletePlantHistory(
    @Args('historyId', { type: () => ID }) historyId: string,
    @Args('plantId', { type: () => ID }) plantId: string,
    @Args('environmentId', { type: () => ID }) environmentId: string,
    @CurrentUser() user: any
  ): Promise<boolean> {
    return this.gardenService.deletePlantHistory(historyId, plantId, environmentId, user.userId);
  }

  // Plant History Type queries and mutations
  @Query(() => [PlantHistoryType])
  async getPlantHistoryTypes(): Promise<PlantHistoryType[]> {
    return this.gardenService.getPlantHistoryTypes();
  }

  @Query(() => PlantHistoryType)
  async getPlantHistoryType(
    @Args('id', { type: () => ID }) id: string
  ): Promise<PlantHistoryType> {
    return this.gardenService.getPlantHistoryType(id);
  }

  @Mutation(() => PlantHistoryType)
  async createPlantHistoryType(
    @Args('input') input: CreatePlantHistoryTypeDto
  ): Promise<PlantHistoryType> {
    return this.gardenService.createPlantHistoryType(input);
  }

  @Mutation(() => PlantHistoryType)
  async updatePlantHistoryType(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePlantHistoryTypeDto
  ): Promise<PlantHistoryType> {
    return this.gardenService.updatePlantHistoryType(id, input);
  }

  @Mutation(() => PlantHistoryType)
  async deletePlantHistoryType(
    @Args('id', { type: () => ID }) id: string
  ): Promise<PlantHistoryType> {
    return this.gardenService.deletePlantHistoryType(id);
  }
}
