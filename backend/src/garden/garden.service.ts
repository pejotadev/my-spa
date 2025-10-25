import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnvironmentRepository } from './repositories/environment.repository';
import { Environment } from './entities/environment.entity';
import { Light } from './entities/light.entity';
import { Plant } from './entities/plant.entity';
import { Genetics } from './entities/genetics.entity';
import { PlantHistory } from './entities/plant-history.entity';
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
      ...data,
      plantId,
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
    const updatedPlant = await EnvironmentRepository.updatePlant(plantId, { currentStage: data.currentStage });

    // Criar entrada no histórico automaticamente
    await EnvironmentRepository.createPlantHistory({
      plantId,
      stage: data.currentStage,
      notes: `Stage changed to ${data.currentStage}`,
    });

    return updatedPlant;
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
}
