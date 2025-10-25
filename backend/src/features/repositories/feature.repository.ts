import { PrismaService } from '../../prisma/prisma.service';
import { Feature, UserFeature } from '@prisma/client';

export class FeatureRepository {
  private static prisma: PrismaService;

  static setPrisma(prisma: PrismaService) {
    FeatureRepository.prisma = prisma;
  }

  // Feature CRUD
  static async createFeature(data: {
    name: string;
    description?: string;
    score: number;
    isActive?: boolean;
  }): Promise<Feature> {
    return FeatureRepository.prisma.feature.create({
      data,
    });
  }

  static async getAllFeatures(): Promise<Feature[]> {
    return FeatureRepository.prisma.feature.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getFeatureByName(name: string): Promise<Feature | null> {
    return FeatureRepository.prisma.feature.findUnique({
      where: { name },
    });
  }

  static async getFeatureById(id: string): Promise<Feature | null> {
    return FeatureRepository.prisma.feature.findUnique({
      where: { id },
    });
  }

  static async updateFeature(id: string, data: Partial<Feature>): Promise<Feature> {
    return FeatureRepository.prisma.feature.update({
      where: { id },
      data,
    });
  }

  static async deleteFeature(id: string): Promise<Feature> {
    return FeatureRepository.prisma.feature.delete({
      where: { id },
    });
  }

  // User Feature Management
  static async enableFeatureForUser(userId: string, featureName: string): Promise<UserFeature> {
    const feature = await FeatureRepository.getFeatureByName(featureName);
    if (!feature) {
      throw new Error(`Feature ${featureName} not found`);
    }

    return FeatureRepository.prisma.userFeature.upsert({
      where: {
        userId_featureId: {
          userId,
          featureId: feature.id,
        },
      },
      update: {
        isEnabled: true,
      },
      create: {
        userId,
        featureId: feature.id,
        isEnabled: true,
      },
    });
  }

  static async disableFeatureForUser(userId: string, featureName: string): Promise<UserFeature> {
    const feature = await FeatureRepository.getFeatureByName(featureName);
    if (!feature) {
      throw new Error(`Feature ${featureName} not found`);
    }

    return FeatureRepository.prisma.userFeature.upsert({
      where: {
        userId_featureId: {
          userId,
          featureId: feature.id,
        },
      },
      update: {
        isEnabled: false,
      },
      create: {
        userId,
        featureId: feature.id,
        isEnabled: false,
      },
    });
  }

  static async getUserFeatures(userId: string): Promise<UserFeature[]> {
    return FeatureRepository.prisma.userFeature.findMany({
      where: { userId },
      include: {
        feature: true,
      },
    });
  }

  static async isFeatureEnabledForUser(userId: string, featureName: string): Promise<boolean> {
    const user = await FeatureRepository.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userFeatures: {
          include: {
            feature: true,
          },
        },
      },
    });

    if (!user) return false;

    // Verifica se o usuário tem a feature habilitada explicitamente
    const userFeature = user.userFeatures.find(
      uf => uf.feature.name === featureName && uf.isEnabled
    );

    if (userFeature) return true;

    // Verifica se o usuário tem score suficiente para a feature
    const feature = await FeatureRepository.getFeatureByName(featureName);
    if (!feature || !feature.isActive) return false;

    return user.score >= feature.score;
  }

  static async updateUserScore(userId: string, score: number): Promise<void> {
    await FeatureRepository.prisma.user.update({
      where: { id: userId },
      data: { score },
    });
  }

  static async getUserScore(userId: string): Promise<number> {
    const user = await FeatureRepository.prisma.user.findUnique({
      where: { id: userId },
      select: { score: true },
    });

    return user?.score || 0;
  }

  static async getFeaturesByUser(userId: string): Promise<Feature[]> {
    const userFeatures = await FeatureRepository.prisma.userFeature.findMany({
      where: { 
        userId,
        isEnabled: true,
      },
      include: {
        feature: true,
      },
    });

    return userFeatures.map(uf => uf.feature);
  }
}
