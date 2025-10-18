import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AddCategoryToProviderDto } from './dto/add-category-to-provider.dto';
import { Category, ServiceProviderCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findOrCreateCategory(name: string, description?: string): Promise<Category> {
    // Primeiro tenta encontrar a categoria existente
    let category = await this.findByName(name);
    
    if (!category) {
      // Se não existir, cria uma nova
      category = await this.create({
        name,
        description,
      });
    }
    
    return category;
  }

  async getServiceProviderCategories(serviceProviderId: string): Promise<ServiceProviderCategory[]> {
    return this.prisma.serviceProviderCategory.findMany({
      where: { serviceProviderId },
      include: {
        category: true,
        serviceProvider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addCategoryToProvider(
    serviceProviderId: string,
    addCategoryDto: AddCategoryToProviderDto,
  ): Promise<ServiceProviderCategory> {
    // Encontra ou cria a categoria
    const category = await this.findOrCreateCategory(
      addCategoryDto.categoryName,
      addCategoryDto.description,
    );

    // Verifica se o service provider já tem essa categoria
    const existingRelation = await this.prisma.serviceProviderCategory.findUnique({
      where: {
        serviceProviderId_categoryId: {
          serviceProviderId,
          categoryId: category.id,
        },
      },
    });

    if (existingRelation) {
      throw new Error('Service provider already has this category');
    }

    // Cria a relação
    return this.prisma.serviceProviderCategory.create({
      data: {
        serviceProviderId,
        categoryId: category.id,
      },
      include: {
        category: true,
        serviceProvider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async removeCategoryFromProvider(
    serviceProviderId: string,
    categoryId: string,
  ): Promise<ServiceProviderCategory> {
    const relation = await this.prisma.serviceProviderCategory.findUnique({
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
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!relation) {
      throw new Error('Service provider does not have this category');
    }

    await this.prisma.serviceProviderCategory.delete({
      where: {
        serviceProviderId_categoryId: {
          serviceProviderId,
          categoryId,
        },
      },
    });

    return relation;
  }

  async getCategoriesByProvider(serviceProviderId: string): Promise<Category[]> {
    const relations = await this.prisma.serviceProviderCategory.findMany({
      where: { serviceProviderId },
      include: { category: true },
      orderBy: { category: { name: 'asc' } },
    });

    return relations.map(relation => relation.category);
  }
}
