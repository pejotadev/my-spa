import { PrismaService } from '../../prisma/prisma.service';
import { Environment, Light, Plant, Genetics, PlantHistory } from '@prisma/client';
import { PlantCodeGenerator } from '../utils/plant-code-generator';

export class EnvironmentRepository {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    EnvironmentRepository.prisma = prisma;
    PlantCodeGenerator.setPrisma(prisma);
  }

  // Environment CRUD
  static async createEnvironment(data: {
    name: string;
    isIndoor: boolean;
    width: number;
    height: number;
    depth?: number;
    userId: string;
  }): Promise<Environment> {
    return EnvironmentRepository.prisma.environment.create({
      data,
    });
  }

  static async getAllEnvironmentsByUser(userId: string): Promise<Environment[]> {
    return EnvironmentRepository.prisma.environment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getAllEnvironmentsByUserWithRelations(userId: string): Promise<any[]> {
    return EnvironmentRepository.prisma.environment.findMany({
      where: { userId },
      include: {
        lights: true,
        plants: {
          include: {
            genetics: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getEnvironmentById(id: string): Promise<Environment | null> {
    return EnvironmentRepository.prisma.environment.findUnique({
      where: { id },
    });
  }

  static async updateEnvironment(id: string, data: Partial<Environment>): Promise<Environment> {
    return EnvironmentRepository.prisma.environment.update({
      where: { id },
      data,
    });
  }

  static async deleteEnvironment(id: string): Promise<Environment> {
    return EnvironmentRepository.prisma.environment.delete({
      where: { id },
    });
  }

  static async getEnvironmentByIdAndUser(id: string, userId: string): Promise<Environment | null> {
    return EnvironmentRepository.prisma.environment.findFirst({
      where: { 
        id,
        userId 
      },
    });
  }

  // Light CRUD
  static async createLight(data: {
    type: string;
    watts?: number;
    environmentId: string;
  }): Promise<Light> {
    return EnvironmentRepository.prisma.light.create({
      data,
    });
  }

  static async getLightsByEnvironment(environmentId: string): Promise<Light[]> {
    return EnvironmentRepository.prisma.light.findMany({
      where: { environmentId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async getLightById(id: string): Promise<Light | null> {
    return EnvironmentRepository.prisma.light.findUnique({
      where: { id },
    });
  }

  static async updateLight(id: string, data: Partial<Light>): Promise<Light> {
    return EnvironmentRepository.prisma.light.update({
      where: { id },
      data,
    });
  }

  static async deleteLight(id: string): Promise<Light> {
    return EnvironmentRepository.prisma.light.delete({
      where: { id },
    });
  }

  static async getLightByIdAndEnvironment(id: string, environmentId: string): Promise<Light | null> {
    return EnvironmentRepository.prisma.light.findFirst({
      where: { 
        id,
        environmentId 
      },
    });
  }

  // Genetics CRUD
  static async createGenetics(data: {
    name: string;
    description?: string;
  }): Promise<Genetics> {
    return EnvironmentRepository.prisma.genetics.create({
      data,
    });
  }

  static async getAllGenetics(): Promise<Genetics[]> {
    return EnvironmentRepository.prisma.genetics.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getGeneticsById(id: string): Promise<Genetics | null> {
    return EnvironmentRepository.prisma.genetics.findUnique({
      where: { id },
    });
  }

  static async getGeneticsByName(name: string): Promise<Genetics | null> {
    return EnvironmentRepository.prisma.genetics.findUnique({
      where: { name },
    });
  }

  static async updateGenetics(id: string, data: Partial<Genetics>): Promise<Genetics> {
    return EnvironmentRepository.prisma.genetics.update({
      where: { id },
      data,
    });
  }

  static async deleteGenetics(id: string): Promise<Genetics> {
    return EnvironmentRepository.prisma.genetics.delete({
      where: { id },
    });
  }

  // Plant CRUD
  static async createPlant(data: {
    description?: string;
    geneticsId: string;
    environmentId: string;
  }): Promise<Plant> {
    // Gerar código único para a planta
    const code = await PlantCodeGenerator.generateUniqueCode();
    
    return EnvironmentRepository.prisma.plant.create({
      data: {
        ...data,
        code,
      },
      include: {
        genetics: true,
      },
    });
  }

  static async getPlantsByEnvironment(environmentId: string): Promise<Plant[]> {
    const plants = await EnvironmentRepository.prisma.plant.findMany({
      where: { environmentId },
      include: {
        genetics: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('Found plants:', plants.map(p => ({ id: p.id, code: p.code, currentStage: p.currentStage })));
    return plants;
  }

  static async getPlantById(id: string): Promise<Plant | null> {
    return EnvironmentRepository.prisma.plant.findUnique({
      where: { id },
      include: {
        genetics: true,
      },
    });
  }

  static async getPlantByIdAndEnvironment(id: string, environmentId: string): Promise<Plant | null> {
    return EnvironmentRepository.prisma.plant.findFirst({
      where: { 
        id,
        environmentId 
      },
      include: {
        genetics: true,
      },
    });
  }

  static async updatePlant(id: string, data: Partial<Plant>): Promise<Plant> {
    return EnvironmentRepository.prisma.plant.update({
      where: { id },
      data,
      include: {
        genetics: true,
      },
    });
  }

  static async deletePlant(id: string): Promise<Plant> {
    return EnvironmentRepository.prisma.plant.delete({
      where: { id },
    });
  }

  // Plant History CRUD
  static async createPlantHistory(data: {
    plantId: string;
    stage: string;
    typeId: string;
    notes?: string;
    data?: string;
  }): Promise<PlantHistory> {
    return EnvironmentRepository.prisma.plantHistory.create({
      data,
      include: {
        type: true,
      },
    });
  }

  static async getPlantHistory(plantId: string): Promise<PlantHistory[]> {
    return EnvironmentRepository.prisma.plantHistory.findMany({
      where: { plantId },
      orderBy: { createdAt: 'desc' },
      include: {
        type: true,
      },
    });
  }

  static async getPlantHistoryById(id: string, plantId?: string): Promise<PlantHistory | null> {
    return EnvironmentRepository.prisma.plantHistory.findFirst({
      where: { 
        id,
        ...(plantId && { plantId })
      },
      include: {
        type: true,
      },
    });
  }

  static async updatePlantHistory(id: string, data: Partial<PlantHistory>): Promise<PlantHistory> {
    return EnvironmentRepository.prisma.plantHistory.update({
      where: { id },
      data,
      include: {
        type: true,
      },
    });
  }

  static async deletePlantHistory(id: string): Promise<PlantHistory> {
    return EnvironmentRepository.prisma.plantHistory.delete({
      where: { id },
      include: {
        type: true,
      },
    });
  }
}
