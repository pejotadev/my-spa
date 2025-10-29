import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnvironmentRepository } from './repositories/environment.repository';
import { Environment } from './entities/environment.entity';
import { Light } from './entities/light.entity';
import { Plant } from './entities/plant.entity';
import { Genetics } from './entities/genetics.entity';
import { PlantHistory } from './entities/plant-history.entity';
import { PlantHistoryType } from './entities/plant-history-type.entity';
import { Harvest } from './entities/harvest.entity';
import { HarvestHistory } from './entities/harvest-history.entity';
import { HarvestHistoryType } from './entities/harvest-history-type.entity';
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
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { CreateHarvestHistoryDto } from './dto/create-harvest-history.dto';
import { UpdateHarvestHistoryDto } from './dto/update-harvest-history.dto';
import { UpdateHarvestStageDto } from './dto/update-harvest-stage.dto';
import { CreateHarvestHistoryTypeDto } from './dto/harvest-history-type.dto';
import { UpdateHarvestHistoryTypeDto } from './dto/harvest-history-type.dto';
import { CreatePlantHistoryTypeDto } from './dto/plant-history-type.dto';
import { UpdatePlantHistoryTypeDto } from './dto/plant-history-type.dto';

@Injectable()
export class GardenService {
  constructor(private prisma: PrismaService) {
    EnvironmentRepository.setPrisma(prisma);
  }

  async createEnvironment(data: CreateEnvironmentDto, userId: string): Promise<Environment> {
    const environment = await EnvironmentRepository.createEnvironment({
      ...data,
      userId,
    });

    // Se for outdoor, adicionar automaticamente o Sol
    if (!data.isIndoor) {
      await EnvironmentRepository.createLight({
        type: 'Sun',
        environmentId: environment.id,
      });
    }

    return environment;
  }

  async getAllEnvironmentsByUser(userId: string): Promise<Environment[]> {
    return EnvironmentRepository.getAllEnvironmentsByUser(userId);
  }

  async getEnvironmentById(id: string, userId: string): Promise<Environment> {
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(id, userId);
    
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return environment;
  }

  async updateEnvironment(id: string, data: UpdateEnvironmentDto, userId: string): Promise<Environment> {
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(id, userId);
    
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return EnvironmentRepository.updateEnvironment(id, data);
  }

  async deleteEnvironment(id: string, userId: string): Promise<Environment> {
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(id, userId);
    
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return EnvironmentRepository.deleteEnvironment(id);
  }

  // Light Management
  async createLight(environmentId: string, data: CreateLightDto, userId: string): Promise<Light> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return EnvironmentRepository.createLight({
      ...data,
      environmentId,
    });
  }

  async getLightsByEnvironment(environmentId: string, userId: string): Promise<Light[]> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return EnvironmentRepository.getLightsByEnvironment(environmentId);
  }

  async updateLight(lightId: string, environmentId: string, data: UpdateLightDto, userId: string): Promise<Light> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a luz pertence ao environment
    const light = await EnvironmentRepository.getLightByIdAndEnvironment(lightId, environmentId);
    if (!light) {
      throw new NotFoundException('Light not found');
    }

    return EnvironmentRepository.updateLight(lightId, data);
  }

  async deleteLight(lightId: string, environmentId: string, userId: string): Promise<Light> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a luz pertence ao environment
    const light = await EnvironmentRepository.getLightByIdAndEnvironment(lightId, environmentId);
    if (!light) {
      throw new NotFoundException('Light not found');
    }

    return EnvironmentRepository.deleteLight(lightId);
  }

  // Genetics Management
  async createGenetics(data: CreateGeneticsDto): Promise<Genetics> {
    return EnvironmentRepository.createGenetics(data);
  }

  async getAllGenetics(): Promise<Genetics[]> {
    return EnvironmentRepository.getAllGenetics();
  }

  async getGeneticsById(id: string): Promise<Genetics> {
    const genetics = await EnvironmentRepository.getGeneticsById(id);
    if (!genetics) {
      throw new NotFoundException('Genetics not found');
    }
    return genetics;
  }

  async updateGenetics(id: string, data: UpdateGeneticsDto): Promise<Genetics> {
    const genetics = await EnvironmentRepository.getGeneticsById(id);
    if (!genetics) {
      throw new NotFoundException('Genetics not found');
    }
    return EnvironmentRepository.updateGenetics(id, data);
  }

  async deleteGenetics(id: string): Promise<Genetics> {
    const genetics = await EnvironmentRepository.getGeneticsById(id);
    if (!genetics) {
      throw new NotFoundException('Genetics not found');
    }
    return EnvironmentRepository.deleteGenetics(id);
  }

  // Plant Management
  async createPlant(environmentId: string, data: CreatePlantDto, userId: string): Promise<Plant> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a genética existe
    const genetics = await EnvironmentRepository.getGeneticsById(data.geneticsId);
    if (!genetics) {
      throw new NotFoundException('Genetics not found');
    }

    return EnvironmentRepository.createPlant({
      ...data,
      environmentId,
    });
  }

  async getPlantsByEnvironment(environmentId: string, userId: string): Promise<Plant[]> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return EnvironmentRepository.getPlantsByEnvironment(environmentId);
  }

  async getPlantById(plantId: string, environmentId: string, userId: string): Promise<Plant> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    return plant;
  }

  async updatePlant(plantId: string, environmentId: string, data: UpdatePlantDto, userId: string): Promise<Plant> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Se estiver atualizando a genética, verificar se existe
    if (data.geneticsId) {
      const genetics = await EnvironmentRepository.getGeneticsById(data.geneticsId);
      if (!genetics) {
        throw new NotFoundException('Genetics not found');
      }
    }

    return EnvironmentRepository.updatePlant(plantId, data);
  }

  async deletePlant(plantId: string, environmentId: string, userId: string): Promise<Plant> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    return EnvironmentRepository.deletePlant(plantId);
  }

  // Plant History Management
  async createPlantHistory(plantId: string, environmentId: string, data: CreatePlantHistoryDto, userId: string): Promise<PlantHistory> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    return EnvironmentRepository.createPlantHistory({
      plantId,
      stage: data.stage,
      typeId: data.typeId,
      notes: data.notes,
      data: data.data,
    });
  }

  async getPlantHistory(plantId: string, environmentId: string, userId: string): Promise<PlantHistory[]> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    return EnvironmentRepository.getPlantHistory(plantId);
  }

  async updatePlantStage(plantId: string, environmentId: string, data: UpdatePlantStageDto, userId: string): Promise<Plant> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Atualizar o stage atual da planta
    console.log('Updating plant stage:', { plantId, currentStage: data.currentStage });
    const updatedPlant = await EnvironmentRepository.updatePlant(plantId, { currentStage: data.currentStage });
    console.log('Updated plant:', updatedPlant);

    // Criar entrada no histórico automaticamente
    await EnvironmentRepository.createPlantHistory({
      plantId,
      stage: data.currentStage,
      typeId: 'type1', // Default to 'notes' type
      notes: `Stage changed to ${data.currentStage}`,
    });

    return updatedPlant;
  }

  async createHarvest(data: CreateHarvestDto, userId: string): Promise<Harvest> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(data.environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(data.plantId, data.environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Verificar se a planta está no stage flowering
    if (plant.currentStage !== 'flowering') {
      throw new ForbiddenException('Plant must be in flowering stage to harvest');
    }

    // Verificar se a planta já foi colhida
    if (plant.harvest) {
      throw new ForbiddenException('Plant has already been harvested');
    }

    // Criar o registro de harvest
    const harvest = await this.prisma.harvest.create({
      data: {
        plantId: data.plantId,
        weight: data.weight,
        notes: data.notes,
        harvestDate: new Date(),
      },
      include: {
        plant: {
          include: {
            genetics: true,
          },
        },
      },
    });

    // Marcar a planta como colhida
    await EnvironmentRepository.updatePlant(data.plantId, { 
      harvest: true,
      harvestDate: harvest.harvestDate
    });

    // Criar entrada no histórico da planta automaticamente
    await EnvironmentRepository.createPlantHistory({
      plantId: data.plantId,
      stage: 'flowering', // Manter o stage atual
      typeId: 'type1', // Default to 'notes' type
      notes: `Plant harvested${data.weight ? ` - Weight: ${data.weight}g` : ''}${data.notes ? ` - Notes: ${data.notes}` : ''}`,
    });

    // Criar entrada no histórico de harvest automaticamente
    if (data.weight) {
      await this.prisma.harvestHistory.create({
        data: {
          harvestId: harvest.id,
          stage: 'drying', // Stage inicial
          typeId: 'harvest_type2', // Weight on harvest type
          notes: data.notes || 'Initial harvest weight',
          data: JSON.stringify({
            weight: data.weight,
            notes: data.notes || 'Initial harvest weight'
          }),
        },
      });
    }

    return harvest;
  }

  async updateHarvestStage(harvestId: string, data: UpdateHarvestStageDto, userId: string): Promise<Harvest> {
    // Verificar se o harvest existe e pertence ao usuário
    const harvest = await this.prisma.harvest.findFirst({
      where: { id: harvestId },
      include: {
        plant: {
          include: {
            environment: true
          }
        }
      }
    });

    if (!harvest) {
      throw new NotFoundException('Harvest not found');
    }

    // Verificar se o environment pertence ao usuário
    if (harvest.plant.environment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this harvest');
    }

    // Atualizar o stage atual do harvest
    console.log('Updating harvest stage:', { harvestId, stage: data.stage });
    await this.prisma.harvest.update({
      where: { id: harvestId },
      data: { stage: data.stage },
    });

    // Criar entrada no histórico automaticamente
    await this.prisma.harvestHistory.create({
      data: {
        harvestId,
        stage: data.stage,
        typeId: 'harvest_type1', // Default to 'notes' type for harvest
        notes: `Stage changed to ${data.stage}`,
      },
    });

    // Buscar o harvest completo com histórico atualizado
    const updatedHarvest = await this.prisma.harvest.findUnique({
      where: { id: harvestId },
      include: {
        plant: {
          include: {
            genetics: true,
          },
        },
        history: {
          include: {
            type: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    console.log('Updated harvest:', updatedHarvest);

    if (!updatedHarvest) {
      throw new NotFoundException('Harvest not found after update');
    }

    return updatedHarvest;
  }

  async updatePlantHistory(historyId: string, plantId: string, environmentId: string, data: UpdatePlantHistoryDto, userId: string): Promise<PlantHistory> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Verificar se o histórico pertence à planta
    const history = await EnvironmentRepository.getPlantHistoryById(historyId, plantId);
    if (!history) {
      throw new NotFoundException('History entry not found');
    }

    return EnvironmentRepository.updatePlantHistory(historyId, data);
  }

  async deletePlantHistory(historyId: string, plantId: string, environmentId: string, userId: string): Promise<boolean> {
    // Verificar se o environment pertence ao usuário
    const environment = await EnvironmentRepository.getEnvironmentByIdAndUser(environmentId, userId);
    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    // Verificar se a planta pertence ao environment
    const plant = await EnvironmentRepository.getPlantByIdAndEnvironment(plantId, environmentId);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    // Verificar se o histórico pertence à planta
    const history = await EnvironmentRepository.getPlantHistoryById(historyId, plantId);
    if (!history) {
      throw new NotFoundException('History entry not found');
    }

    await EnvironmentRepository.deletePlantHistory(historyId);
    return true;
  }

  // Plant History Type methods
  async getPlantHistoryTypes(): Promise<PlantHistoryType[]> {
    return this.prisma.plantHistoryType.findMany({
      where: { isActive: true },
      orderBy: { displayName: 'asc' },
    });
  }

  async getPlantHistoryType(id: string): Promise<PlantHistoryType> {
    const historyType = await this.prisma.plantHistoryType.findUnique({
      where: { id },
    });

    if (!historyType) {
      throw new NotFoundException('Plant history type not found');
    }

    return historyType;
  }

  async createPlantHistoryType(data: CreatePlantHistoryTypeDto): Promise<PlantHistoryType> {
    return this.prisma.plantHistoryType.create({
      data,
    });
  }

  async updatePlantHistoryType(id: string, data: UpdatePlantHistoryTypeDto): Promise<PlantHistoryType> {
    const historyType = await this.prisma.plantHistoryType.findUnique({
      where: { id },
    });

    if (!historyType) {
      throw new NotFoundException('Plant history type not found');
    }

    return this.prisma.plantHistoryType.update({
      where: { id },
      data,
    });
  }

  async deletePlantHistoryType(id: string): Promise<PlantHistoryType> {
    const historyType = await this.prisma.plantHistoryType.findUnique({
      where: { id },
    });

    if (!historyType) {
      throw new NotFoundException('Plant history type not found');
    }

    return this.prisma.plantHistoryType.delete({
      where: { id },
    });
  }

  // Harvest History Type methods
  async getHarvestHistoryTypes(): Promise<HarvestHistoryType[]> {
    return this.prisma.harvestHistoryType.findMany({
      where: { isActive: true },
      orderBy: { displayName: 'asc' },
    });
  }

  async getHarvestHistoryTypeById(id: string): Promise<HarvestHistoryType | null> {
    return this.prisma.harvestHistoryType.findUnique({
      where: { id },
    });
  }

  async createHarvestHistoryType(data: CreateHarvestHistoryTypeDto): Promise<HarvestHistoryType> {
    return this.prisma.harvestHistoryType.create({
      data: {
        ...data,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateHarvestHistoryType(id: string, data: UpdateHarvestHistoryTypeDto): Promise<HarvestHistoryType> {
    return this.prisma.harvestHistoryType.update({
      where: { id },
      data,
    });
  }

  async deleteHarvestHistoryType(id: string): Promise<boolean> {
    await this.prisma.harvestHistoryType.delete({
      where: { id },
    });
    return true;
  }

  // Harvest History methods
  async getHarvestHistory(harvestId: string): Promise<HarvestHistory[]> {
    return this.prisma.harvestHistory.findMany({
      where: { harvestId },
      include: {
        type: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getHarvestByPlant(plantId: string): Promise<Harvest | null> {
    return this.prisma.harvest.findFirst({
      where: { plantId },
      include: {
        history: {
          include: {
            type: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async createHarvestHistory(data: CreateHarvestHistoryDto): Promise<HarvestHistory> {
    return this.prisma.harvestHistory.create({
      data,
      include: {
        type: true,
      },
    });
  }

  async updateHarvestHistory(historyId: string, harvestId: string, data: UpdateHarvestHistoryDto): Promise<HarvestHistory> {
    // Verificar se o histórico pertence ao harvest
    const existingHistory = await this.prisma.harvestHistory.findFirst({
      where: { id: historyId, harvestId },
    });

    if (!existingHistory) {
      throw new NotFoundException('Harvest history not found');
    }

    return this.prisma.harvestHistory.update({
      where: { id: historyId },
      data,
      include: {
        type: true,
      },
    });
  }

  async deleteHarvestHistory(historyId: string, harvestId: string): Promise<boolean> {
    // Verificar se o histórico pertence ao harvest
    const existingHistory = await this.prisma.harvestHistory.findFirst({
      where: { id: historyId, harvestId },
    });

    if (!existingHistory) {
      throw new NotFoundException('Harvest history not found');
    }

    await this.prisma.harvestHistory.delete({
      where: { id: historyId },
    });
    return true;
  }
}
