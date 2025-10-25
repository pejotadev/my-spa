import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnvironmentRepository } from './repositories/environment.repository';
import { Environment } from './entities/environment.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

@Injectable()
export class GardenService {
  constructor(private prisma: PrismaService) {
    EnvironmentRepository.setPrisma(prisma);
  }

  async createEnvironment(data: CreateEnvironmentDto, userId: string): Promise<Environment> {
    return EnvironmentRepository.createEnvironment({
      ...data,
      userId,
    });
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
}
