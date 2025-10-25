import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataLoaderService } from '../dataloaders/dataloader.service';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private dataLoaderService: DataLoaderService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp().getRequest();
    
    // Adicionar DataLoaders ao contexto da requisição
    ctx.dataLoaders = {
      user: this.dataLoaderService.createUserLoader(),
      category: this.dataLoaderService.createCategoryLoader(),
      genetics: this.dataLoaderService.createGeneticsLoader(),
      environment: this.dataLoaderService.createEnvironmentLoader(),
      plant: this.dataLoaderService.createPlantLoader(),
      light: this.dataLoaderService.createLightLoader(),
      serviceProviderCategory: this.dataLoaderService.createServiceProviderCategoryLoader(),
      userEnvironments: this.dataLoaderService.createUserEnvironmentsLoader(),
      environmentLights: this.dataLoaderService.createEnvironmentLightsLoader(),
      environmentPlants: this.dataLoaderService.createEnvironmentPlantsLoader(),
    };

    return next.handle();
  }
}
