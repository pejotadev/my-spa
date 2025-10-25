import { PrismaService } from '../../prisma/prisma.service';
import { Category, ServiceProviderCategory } from '@prisma/client';

export class CategoryRepository {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    CategoryRepository.prisma = prisma;
  }

  static async findAll(): Promise<Category[]> {
    return CategoryRepository.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async findOne(id: string): Promise<Category | null> {
    return CategoryRepository.prisma.category.findUnique({
      where: { id },
    });
  }

  static async findByName(name: string): Promise<Category | null> {
    return CategoryRepository.prisma.category.findUnique({
      where: { name },
    });
  }

  static async create(data: {
    name: string;
    description?: string;
  }): Promise<Category> {
    return CategoryRepository.prisma.category.create({
      data,
    });
  }

  static async findOrCreate(name: string, description?: string): Promise<Category> {
    const existing = await CategoryRepository.findByName(name);
    if (existing) {
      return existing;
    }

    return CategoryRepository.create({ name, description });
  }

  static async getServiceProviderCategories(serviceProviderId: string): Promise<ServiceProviderCategory[]> {
    return CategoryRepository.prisma.serviceProviderCategory.findMany({
      where: { serviceProviderId },
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
  }

  static async addCategoryToProvider(
    serviceProviderId: string,
    categoryId: string,
  ): Promise<ServiceProviderCategory> {
    return CategoryRepository.prisma.serviceProviderCategory.create({
      data: {
        serviceProviderId,
        categoryId,
      },
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
  }

  static async removeCategoryFromProvider(
    serviceProviderId: string,
    categoryId: string,
  ): Promise<ServiceProviderCategory> {
    return CategoryRepository.prisma.serviceProviderCategory.delete({
      where: {
        serviceProviderId_categoryId: {
          serviceProviderId,
          categoryId,
        },
      },
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
  }

  static async getCategoriesByProvider(serviceProviderId: string): Promise<Category[]> {
    const relations = await CategoryRepository.prisma.serviceProviderCategory.findMany({
      where: { serviceProviderId },
      include: { category: true },
    });

    return relations.map(relation => relation.category);
  }

  static async getServiceProvidersByCategory(categoryId: string): Promise<ServiceProviderCategory[]> {
    return CategoryRepository.prisma.serviceProviderCategory.findMany({
      where: { categoryId },
      include: {
        serviceProvider: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        category: true,
      },
    });
  }
}
