import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AddCategoryToProviderDto } from './dto/add-category-to-provider.dto';
import { Category, ServiceProviderCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {
    CategoryRepository.setPrisma(prisma);
  }

  async findAll(): Promise<Category[]> {
    return CategoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category | null> {
    return CategoryRepository.findOne(id);
  }

  async findByName(name: string): Promise<Category | null> {
    return CategoryRepository.findByName(name);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return CategoryRepository.create(createCategoryDto);
  }

  async findOrCreateCategory(name: string, description?: string): Promise<Category> {
    return CategoryRepository.findOrCreate(name, description);
  }

  async getServiceProviderCategories(serviceProviderId: string): Promise<ServiceProviderCategory[]> {
    return CategoryRepository.getServiceProviderCategories(serviceProviderId);
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
    return CategoryRepository.addCategoryToProvider(serviceProviderId, category.id);
  }

  async removeCategoryFromProvider(
    serviceProviderId: string,
    categoryId: string,
  ): Promise<ServiceProviderCategory> {
    return CategoryRepository.removeCategoryFromProvider(serviceProviderId, categoryId);
  }

  async getCategoriesByProvider(serviceProviderId: string): Promise<Category[]> {
    return CategoryRepository.getCategoriesByProvider(serviceProviderId);
  }
}
