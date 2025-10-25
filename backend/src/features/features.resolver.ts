import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeaturesService } from './features.service';
import { Feature, UserFeature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => [Feature])
  async getAllFeatures(): Promise<Feature[]> {
    return this.featuresService.getAllFeatures();
  }

  @Query(() => Feature, { nullable: true })
  async getFeatureById(@Args('id') id: string): Promise<Feature | null> {
    return this.featuresService.getFeatureById(id);
  }

  @Query(() => Feature, { nullable: true })
  async getFeatureByName(@Args('name') name: string): Promise<Feature | null> {
    return this.featuresService.getFeatureByName(name);
  }

  @Query(() => [UserFeature])
  async getMyFeatures(@CurrentUser() user: any): Promise<UserFeature[]> {
    return this.featuresService.getUserFeatures(user.id);
  }

  @Query(() => [Feature])
  async getMyEnabledFeatures(@CurrentUser() user: any): Promise<Feature[]> {
    return this.featuresService.getFeaturesByUser(user.id);
  }

  @Query(() => Boolean)
  async isFeatureEnabled(
    @Args('featureName') featureName: string,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    if (!user) return false;
    return this.featuresService.isFeatureEnabledForUser(user.id, featureName);
  }

  @Query(() => Int)
  async getMyScore(@CurrentUser() user: any): Promise<number> {
    return this.featuresService.getUserScore(user.id);
  }

  @Mutation(() => Feature)
  async createFeature(@Args('input') input: CreateFeatureDto): Promise<Feature> {
    return this.featuresService.createFeature(input);
  }

  @Mutation(() => Feature)
  async updateFeature(
    @Args('id') id: string,
    @Args('input') input: UpdateFeatureDto,
  ): Promise<Feature> {
    return this.featuresService.updateFeature(id, input);
  }

  @Mutation(() => Feature)
  async deleteFeature(@Args('id') id: string): Promise<Feature> {
    return this.featuresService.deleteFeature(id);
  }

  @Mutation(() => UserFeature)
  async enableFeatureForUser(
    @Args('userId') userId: string,
    @Args('featureName') featureName: string,
  ): Promise<UserFeature> {
    return this.featuresService.enableFeatureForUser(userId, featureName);
  }

  @Mutation(() => UserFeature)
  async disableFeatureForUser(
    @Args('userId') userId: string,
    @Args('featureName') featureName: string,
  ): Promise<UserFeature> {
    return this.featuresService.disableFeatureForUser(userId, featureName);
  }

  @Mutation(() => Boolean)
  async updateUserScore(
    @Args('userId') userId: string,
    @Args('score') score: number,
  ): Promise<boolean> {
    await this.featuresService.updateUserScore(userId, score);
    return true;
  }
}
