import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeaturesService } from '../features.service';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private featuresService: FeaturesService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const featureName = this.getFeatureName(context);

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!featureName) {
      return true; // Se não há feature especificada, permite acesso
    }

    const isEnabled = await this.featuresService.isFeatureEnabledForUser(user.id, featureName);
    
    if (!isEnabled) {
      throw new ForbiddenException(`Feature ${featureName} is not enabled for this user`);
    }

    return true;
  }

  private getFeatureName(context: ExecutionContext): string {
    const handler = context.getHandler();
    const featureName = this.reflector.get<string>('feature', handler);
    return featureName;
  }
}

// Decorator para marcar features
export const RequireFeature = (featureName: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('feature', featureName, descriptor.value);
    return descriptor;
  };
};
