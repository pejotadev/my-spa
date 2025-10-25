import { PrismaService } from '../../prisma/prisma.service';
import { Environment, Light } from '@prisma/client';

export class EnvironmentRepository {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    EnvironmentRepository.prisma = prisma;
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
}
