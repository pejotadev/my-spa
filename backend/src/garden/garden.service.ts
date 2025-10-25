import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnvironmentRepository } from './repositories/environment.repository';
import { Environment } from './entities/environment.entity';
import { Light } from './entities/light.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';

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
}
