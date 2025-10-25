import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FeatureRepository } from './repositories/feature.repository';
import { Feature, UserFeature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { UserFeature as PrismaUserFeature } from '@prisma/client';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {
    FeatureRepository.setPrisma(prisma);
  }

  async createFeature(data: CreateFeatureDto): Promise<Feature> {
    return FeatureRepository.createFeature(data);
  }

  async getAllFeatures(): Promise<Feature[]> {
    return FeatureRepository.getAllFeatures();
  }

  async getFeatureById(id: string): Promise<Feature | null> {
    return FeatureRepository.getFeatureById(id);
  }

  async getFeatureByName(name: string): Promise<Feature | null> {
    return FeatureRepository.getFeatureByName(name);
  }

  async updateFeature(id: string, data: UpdateFeatureDto): Promise<Feature> {
    return FeatureRepository.updateFeature(id, data);
  }

  async deleteFeature(id: string): Promise<Feature> {
    return FeatureRepository.deleteFeature(id);
  }

  async enableFeatureForUser(userId: string, featureName: string): Promise<UserFeature> {
    const result = await FeatureRepository.enableFeatureForUser(userId, featureName);
    return result as UserFeature;
  }

  async disableFeatureForUser(userId: string, featureName: string): Promise<UserFeature> {
    const result = await FeatureRepository.disableFeatureForUser(userId, featureName);
    return result as UserFeature;
  }

  async getUserFeatures(userId: string): Promise<UserFeature[]> {
    const result = await FeatureRepository.getUserFeatures(userId);
    return result as UserFeature[];
  }

  async isFeatureEnabledForUser(userId: string, featureName: string): Promise<boolean> {
    return FeatureRepository.isFeatureEnabledForUser(userId, featureName);
  }

  async updateUserScore(userId: string, score: number): Promise<void> {
    return FeatureRepository.updateUserScore(userId, score);
  }

  async getUserScore(userId: string): Promise<number> {
    return FeatureRepository.getUserScore(userId);
  }

  async getFeaturesByUser(userId: string): Promise<Feature[]> {
    return FeatureRepository.getFeaturesByUser(userId);
  }
}
