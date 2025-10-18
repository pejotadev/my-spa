import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class ServiceProviderCategory {
  @Field(() => ID)
  id: string;

  @Field()
  serviceProviderId: string;

  @Field()
  categoryId: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  serviceProvider: User;

  @Field(() => Category)
  category: Category;
}
