import { PrismaService } from '../../prisma/prisma.service';
import { Environment } from '@prisma/client';

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
}
