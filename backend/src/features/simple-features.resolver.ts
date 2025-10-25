import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class SimpleFeaturesResolver {
  @Query(() => String)
  async testFeature(): Promise<string> {
    return 'Feature system is working!';
  }

  @Query(() => Boolean)
  async isFeatureEnabled(@Args('featureName') featureName: string): Promise<boolean> {
    // For now, return true for BOOK_SERVICE to test
    return featureName === 'BOOK_SERVICE';
  }
}
