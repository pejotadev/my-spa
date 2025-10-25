import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Category, Genetics, Environment, Plant, Light } from '@prisma/client';

@Injectable()
export class DataLoaderService {
  constructor(private prisma: PrismaService) {}

  // User DataLoaders
  createUserLoader() {
    return new DataLoader<string, User>(async (ids: readonly string[]) => {
      const users = await this.prisma.user.findMany({
        where: { id: { in: ids as string[] } },
        select: {
          id: true,
          email: true,
          password: true,
          firstName: true,
          lastName: true,
          role: true,
          nylasGrantId: true,
          score: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
        },
      });
      
      const userMap = new Map(users.map(user => [user.id, user]));
      return ids.map(id => userMap.get(id)!);
    });
  }

  // Category DataLoaders
  createCategoryLoader() {
    return new DataLoader<string, Category>(async (ids: readonly string[]) => {
      const categories = await this.prisma.category.findMany({
        where: { id: { in: ids as string[] } },
      });
      
      const categoryMap = new Map(categories.map(category => [category.id, category]));
      return ids.map(id => categoryMap.get(id)!);
    });
  }

  // Genetics DataLoaders
  createGeneticsLoader() {
    return new DataLoader<string, Genetics>(async (ids: readonly string[]) => {
      const genetics = await this.prisma.genetics.findMany({
        where: { id: { in: ids as string[] } },
      });
      
      const geneticsMap = new Map(genetics.map(genetics => [genetics.id, genetics]));
      return ids.map(id => geneticsMap.get(id)!);
    });
  }

  // Environment DataLoaders
  createEnvironmentLoader() {
    return new DataLoader<string, Environment>(async (ids: readonly string[]) => {
      const environments = await this.prisma.environment.findMany({
        where: { id: { in: ids as string[] } },
      });
      
      const environmentMap = new Map(environments.map(environment => [environment.id, environment]));
      return ids.map(id => environmentMap.get(id)!);
    });
  }

  // Plant DataLoaders
  createPlantLoader() {
    return new DataLoader<string, Plant & { genetics?: Genetics }>(async (ids: readonly string[]) => {
      const plants = await this.prisma.plant.findMany({
        where: { id: { in: ids as string[] } },
        include: {
          genetics: true,
        },
      });
      
      const plantMap = new Map(plants.map(plant => [plant.id, plant]));
      return ids.map(id => plantMap.get(id)!);
    });
  }

  // Light DataLoaders
  createLightLoader() {
    return new DataLoader<string, Light>(async (ids: readonly string[]) => {
      const lights = await this.prisma.light.findMany({
        where: { id: { in: ids as string[] } },
      });
      
      const lightMap = new Map(lights.map(light => [light.id, light]));
      return ids.map(id => lightMap.get(id)!);
    });
  }

  // ServiceProviderCategory DataLoaders
  createServiceProviderCategoryLoader() {
    return new DataLoader<string, any>(async (ids: readonly string[]) => {
      const relations = await this.prisma.serviceProviderCategory.findMany({
        where: { id: { in: ids as string[] } },
        include: {
          category: true,
          serviceProvider: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      
      const relationMap = new Map(relations.map(relation => [relation.id, relation]));
      return ids.map(id => relationMap.get(id)!);
    });
  }

  // Batch loaders for related data
  createUserEnvironmentsLoader() {
    return new DataLoader<string, Environment[]>(async (userIds: readonly string[]) => {
      const environments = await this.prisma.environment.findMany({
        where: { userId: { in: userIds as string[] } },
        orderBy: { createdAt: 'desc' },
      });
      
      const environmentsByUser = new Map<string, Environment[]>();
      environments.forEach(env => {
        if (!environmentsByUser.has(env.userId)) {
          environmentsByUser.set(env.userId, []);
        }
        environmentsByUser.get(env.userId)!.push(env);
      });
      
      return userIds.map(userId => environmentsByUser.get(userId) || []);
    });
  }

  createEnvironmentLightsLoader() {
    return new DataLoader<string, Light[]>(async (environmentIds: readonly string[]) => {
      const lights = await this.prisma.light.findMany({
        where: { environmentId: { in: environmentIds as string[] } },
        orderBy: { createdAt: 'asc' },
      });
      
      const lightsByEnvironment = new Map<string, Light[]>();
      lights.forEach(light => {
        if (!lightsByEnvironment.has(light.environmentId)) {
          lightsByEnvironment.set(light.environmentId, []);
        }
        lightsByEnvironment.get(light.environmentId)!.push(light);
      });
      
      return environmentIds.map(envId => lightsByEnvironment.get(envId) || []);
    });
  }

  createEnvironmentPlantsLoader() {
    return new DataLoader<string, (Plant & { genetics?: Genetics })[]>(async (environmentIds: readonly string[]) => {
      const plants = await this.prisma.plant.findMany({
        where: { environmentId: { in: environmentIds as string[] } },
        include: {
          genetics: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      
      const plantsByEnvironment = new Map<string, (Plant & { genetics?: Genetics })[]>();
      plants.forEach(plant => {
        if (!plantsByEnvironment.has(plant.environmentId)) {
          plantsByEnvironment.set(plant.environmentId, []);
        }
        plantsByEnvironment.get(plant.environmentId)!.push(plant);
      });
      
      return environmentIds.map(envId => plantsByEnvironment.get(envId) || []);
    });
  }
}
