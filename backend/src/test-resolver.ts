import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  @Query(() => String)
  async testFeature(): Promise<string> {
    return 'Feature system is working!';
  }
}
